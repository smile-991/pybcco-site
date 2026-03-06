import { createClient } from "@supabase/supabase-js";

export async function onRequestPost(context: any) {
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

    const body = await context.request.json();

    const {
      email,
      name,
      phone,
      source,
      area,
      finishing_level,
      estimated_cost,
    } = body;

    if (!email || !name || !phone) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { error } = await supabase.from("signup_leads").insert({
      email,
      name,
      phone,
      source,
      area,
      finishing_level,
      estimated_cost,
      consumed: false,
    });

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
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