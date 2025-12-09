import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
import { supabase } from "./supabaseClient";

async function getData() {
  const { data, error } = await supabase
    .from("messages")
    .select("*");

  console.log(data);
}
