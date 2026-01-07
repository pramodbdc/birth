'use server';

import { auth, db } from '@/lib/firebase';
import { birthFormSchema, type BirthFormValues } from '@/lib/schemas';
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

const SERVICE_CHARGE = 15;

export async function submitBirthRecord(values: BirthFormValues) {
  const validatedFields = birthFormSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error('Invalid form data.');
  }

  const user = auth.currentUser;
  if (!user) {
    throw new Error('You must be logged in to perform this action.');
  }

  try {
    // Find user document to get current balance and doc ID
    const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
    const userDocs = await getDocs(userQuery);

    if (userDocs.empty) {
      throw new Error('User data not found.');
    }

    const userDocRef = userDocs.docs[0].ref;
    const userData = userDocs.docs[0].data();
    const currentBalance = userData.ballance || 0;

    if (currentBalance < SERVICE_CHARGE) {
      throw new Error('Insufficient balance.');
    }

    // Add birth record
    const birthsRef = collection(userDocRef, "births");
    await addDoc(birthsRef, validatedFields.data);

    // Update wallet
    const newBalance = currentBalance - SERVICE_CHARGE;
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB');
    const currentTime = currentDate.toLocaleTimeString();

    await updateDoc(userDocRef, {
      ballance: newBalance,
    });

    const walletRef = collection(userDocRef, "wallets");
    await addDoc(walletRef, {
      charge: SERVICE_CHARGE,
      service: "Birth Certificate",
      date: formattedDate,
      time: currentTime,
      details: `Application for ${validatedFields.data.name}`,
    });
    
    revalidatePath('/dashboard');
    revalidatePath('/birthlist');

  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
        throw new Error(err.message);
    }
    throw new Error('An unexpected error occurred while submitting the record.');
  }
}
