import { z } from 'zod';

export const pilotSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name.').max(100),
  email: z.string().trim().email('Enter a valid work email.').max(255),
  company: z.string().trim().min(2, 'Enter your company name.').max(150),
  phone: z.string().trim().min(7, 'Enter your phone number.').max(30).regex(/^[+()\d\s.\-]+$/, 'Enter a valid phone number.'),
  plan: z.enum(['Pilot', 'Starter', '24/7 Pro Dispatch']),
});