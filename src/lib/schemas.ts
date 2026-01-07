import { z } from 'zod';

export const birthFormSchema = z.object({
  gender: z.string().min(1, 'Gender is required'),
  dob: z.string().min(1, 'Date of Birth is required'),
  name: z.string().min(2, 'Full Name must be at least 2 characters'),
  saadhaar: z.string().min(1, 'Please select a type'),
  aadhaar: z.string().min(12, 'Aadhaar/EID must be at least 12 digits').max(16, 'Aadhaar/EID must be at most 16 digits'),
  pbirth: z.string().min(3, 'Place of birth is required'),
  hfname: z.string().min(2, "Father's name is required"),
  faadhaar: z.string().optional(),
  mname: z.string().min(2, "Mother's name is required"),
  maadhaar: z.string().optional(),
  padress: z.string().min(10, 'Permanent Address is required'),
  bhadress: z.string().min(10, 'Address at time of birth is required'),
  dor: z.string().min(1, 'Date of registration is required'),
  dom: z.string().min(1, 'Time of registration is required'),
  registrar: z.string().min(2, 'Registrar Name (English) is required'),
  registrarh: z.string().min(2, 'Registrar Name (Hindi) is required'),
  registration: z.string().optional(),
  district: z.string().min(3, 'Registrar District is required'),
  sbd: z.string().min(3, 'Registrar Tehsil/Block is required'),
  districth: z.string().min(3, 'Registrar District (Hindi) is required'),
  sbdh: z.string().min(3, 'Registrar Tehsil/Block (Hindi) is required'),
  state: z.string().min(2, 'State is required'),
  stateh: z.string().min(2, 'State (Hindi) is required'),
});

export type BirthFormValues = z.infer<typeof birthFormSchema>;

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  name: z.string().min(2, { message: 'Name is required' }),
});
