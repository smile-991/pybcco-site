import { createClient } from "@supabase/supabase-js";

export async function onRequestGet(context: any) {
  try {
    const supabaseUrl = context.env?.SUPABASE_URL;
    const supabaseServiceRoleKey = context.env?.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return new Response(
        JSON.stringify({ error: "Missing Supabase environment variables." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const url = new URL(context.request.url);
    const token = String(url.searchParams.get("token") || "").trim();

    if (!token) {
      return new Response(JSON.stringify({ error: "Missing token." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { data: lead, error: leadError } = await supabase
      .from("signup_leads")
      .select("*")
      .eq("activation_token", token)
      .eq("activated", false)
      .maybeSingle();

    if (leadError) {
      return new Response(JSON.stringify({ error: leadError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!lead) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const phone = String(lead.phone || "").trim();
    const email = String(lead.email || "").trim().toLowerCase();
    const name = String(lead.name || "").trim();
    const source = lead.source ?? null;

    if (!phone || !email || !name) {
      return new Response(
        JSON.stringify({ error: "Lead data is incomplete." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    let finalUser: any = null;

    const { data: existingUser, error: existingUserError } = await supabase
      .from("users")
      .select("*")
      .eq("phone", phone)
      .maybeSingle();

    if (existingUserError) {
      return new Response(
        JSON.stringify({ error: existingUserError.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (existingUser) {
      finalUser = existingUser;
    } else {
      const userId = crypto.randomUUID();

      const { data: createdUser, error: insertUserError } = await supabase
        .from("users")
        .insert({
          id: userId,
          name,
          email,
          phone,
          source,
        })
        .select("*")
        .single();

      if (insertUserError) {
        return new Response(
          JSON.stringify({ error: insertUserError.message }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      finalUser = createdUser;
    }

    if (lead.estimated_cost !== null && lead.estimated_cost !== undefined) {
      const { data: existingEstimate } = await supabase
        .from("calculator_results")
        .select("id")
        .eq("user_id", finalUser.id)
        .eq("estimated_cost", lead.estimated_cost)
        .eq("area", lead.area)
        .eq("finishing_level", lead.finishing_level)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!existingEstimate) {
        await supabase.from("calculator_results").insert({
          user_id: finalUser.id,
          phone,
          area: lead.area,
          finishing_level: lead.finishing_level,
          estimated_cost: lead.estimated_cost,
        });
      }
    }

    const { error: updateLeadError } = await supabase
      .from("signup_leads")
      .update({
        activated: true,
        consumed: true,
      })
      .eq("id", lead.id);

    if (updateLeadError) {
      return new Response(
        JSON.stringify({ error: updateLeadError.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await supabase
      .from("signup_leads")
      .update({
        activated: true,
        consumed: true,
      })
      .eq("phone", phone)
      .eq("activated", false);

    return new Response(
      JSON.stringify({
        success: true,
        message: "تم تفعيل الحساب بنجاح.",
        user: {
          id: finalUser.id,
          name: finalUser.name,
          email: finalUser.email,
          phone: finalUser.phone,
          activatedAt: new Date().toISOString(),
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || "Unknown error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}