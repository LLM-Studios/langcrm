import { createClient } from '@supabase/supabase-js';

const API_URL = process.env.SUPABASE_API_URL;
const ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!API_URL || !ANON_KEY) {
	throw new Error('Missing supabase env vars');
}

const supabase = createClient(API_URL, ANON_KEY);

export default supabase;
