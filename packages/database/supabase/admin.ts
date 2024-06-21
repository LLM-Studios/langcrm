import { createClient } from "@supabase/supabase-js";

const API_URL = process.env.SUPABASE_API_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!API_URL || !SERVICE_ROLE_KEY) {
	throw new Error("Missing supabase env vars");
}

const admin = createClient(API_URL, SERVICE_ROLE_KEY);

export default admin;
