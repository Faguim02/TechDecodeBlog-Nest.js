import { createClient } from "@supabase/supabase-js";

export const supabase = (supabaseUrl: string, supabaseKEY: string) => {
    const supabase = createClient(supabaseUrl, supabaseKEY, {
        auth: {
            persistSession: false
        }
    })

    return supabase
}