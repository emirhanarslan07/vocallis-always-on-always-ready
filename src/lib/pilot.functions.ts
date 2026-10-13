import { createServerFn } from '@tanstack/react-start';
import { pilotSchema } from './pilot-schema';

export const submitPilot = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => pilotSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { data: submission, error } = await supabaseAdmin.from('pilot_requests').insert(data).select('id').single();
    if (error || !submission) throw new Error('Your request could not be saved. Please try again.');
    return { id: submission.id };
  });