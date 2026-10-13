CREATE TABLE public.pilot_requests (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), created_at timestamptz NOT NULL DEFAULT now(), name text NOT NULL, email text NOT NULL, company text NOT NULL, phone text NOT NULL, plan text NOT NULL);
GRANT ALL ON public.pilot_requests TO service_role;
ALTER TABLE public.pilot_requests ENABLE ROW LEVEL SECURITY;