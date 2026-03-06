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
    const token = url.searchParams.get("token");

    if (!token) {
      return new Response(
        JSON.stringify({ error: "Missing token." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { data: lead, error: leadError } = await supabase
      .from("signup_leads")
      .select("*")
      .eq("activation_token", token)
      .eq("activated", false)
      .maybeSingle();

    if (leadError || !lead) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired token." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    let userId = crypto.randomUUID();

    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", lead.email)
      .maybeSingle();

    if (existingUser?.id) {
      userId = existingUser.id;
    } else {
      const { error: insertUserError } = await supabase.from("users").insert({
        id: userId,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        source: lead.source,
      });

      if (insertUserError) {
        return new Response(
          JSON.stringify({ error: insertUserError.message }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    if (lead.estimated_cost !== null && lead.estimated_cost !== undefined) {
      await supabase.from("calculator_results").insert({
        user_id: userId,
        area: lead.area,
        finishing_level: lead.finishing_level,
        estimated_cost: lead.estimated_cost,
      });
    }

    await supabase
      .from("signup_leads")
      .update({
        activated: true,
        consumed: true,
      })
      .eq("id", lead.id);

    return new Response(
      JSON.stringify({ success: true, message: "تم تفعيل الحساب بنجاح." }),
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