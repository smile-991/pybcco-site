import { createClient } from "@supabase/supabase-js";

export async function onRequestGet(context: any) {
  try {
    const url = new URL(context.request.url);
    const phone = url.searchParams.get("phone");

    if (!phone) {
      return new Response(JSON.stringify({ error: "Missing phone" }), {
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
      .eq("phone", phone)
      .maybeSingle();

    if (error) throw error;

    if (!client) {
      return new Response(
        JSON.stringify({
          found: false,
          client: null,
          projectsCount: 0,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    const { count } = await supabase
      .from("projects")
      .select("id", { count: "exact", head: true })
      .eq("client_id", client.id);

    return new Response(
      JSON.stringify({
        found: true,
        client,
        projectsCount: count || 0,
      }),
      { headers: { "Content-Type": "application/json" } }
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