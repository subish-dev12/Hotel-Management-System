import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://jybtdupavrwlbusfjlcg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5YnRkdXBhdnJ3bGJ1c2ZqbGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NDkzODcsImV4cCI6MjA0ODEyNTM4N30.na5Xv2t3LBED5PuzUrw37AYRlFBK8HANIMjbMpH1RJQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
