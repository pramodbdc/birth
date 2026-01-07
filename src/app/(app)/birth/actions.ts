'use server';

import { db } from '@/lib/firebase';
import { birthFormSchema, type BirthFormValues } from '@/lib/schemas';
import { addDoc, collection } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export async function submitBirthRecord(values: BirthFormValues) {
  const validatedFields = birthFormSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error('Invalid form data.');
  }

  try {
    const birthsRef = collection(db, "births");
    await addDoc(birthsRef, validatedFields.data);
    
    revalidatePath('/birthlist');

  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
        throw new Error(err.message);
    }
    throw new Error('An unexpected error occurred while submitting the record.');
  }
}
