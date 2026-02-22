import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jcjplqqrgaxysmwzqgvc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjanBscXFyZ2F4eXNtd3pxZ3ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MjQzNTQsImV4cCI6MjA4NzAwMDM1NH0.cAggH2Nfx7fbU3rAxc6cSLNM2GNcA8SUEY5xu4Qa0Kk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
