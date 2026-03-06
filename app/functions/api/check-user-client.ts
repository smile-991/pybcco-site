import { createClient } from "@supabase/supabase-js";

export async function onRequestGet(context: any) {
  try {
    const url = new URL(context.request.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return new Response(JSON.stringify({ error: "Missing email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      context.env.SUPABASE_URL,
      context.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: client, error } = await supabase
      .from("clients")
      .select("id, full_name, phone")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        found: !!client,
        client: client || null,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: error.message || "Server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}