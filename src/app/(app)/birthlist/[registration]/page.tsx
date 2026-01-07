import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import BirthPreview from './components/birth-preview';
import { notFound } from 'next/navigation';
import { maskAadhaarNumber } from '@/ai/flows/mask-aadhaar-number';
import { formatDateToWords } from '@/ai/flows/date-formatting-tool';
import { getAuth } from 'firebase/auth';

type Props = {
  params: { registration: string };
};

async function getBirthRecord(registration: string) {
  const fbAuth = getAuth();
  const user = fbAuth.currentUser;
  
  if (!user) return null;

  const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
  const userDocs = await getDocs(userQuery);

  if (userDocs.empty) return null;
  const userDocId = userDocs.docs[0].id;
  
  const recordQuery = query(collection(db, `users/${userDocId}/births`), where("registration", "==", registration));
  const recordDocs = await getDocs(recordQuery);

  if (recordDocs.empty) return null;

  const data = recordDocs.docs[0].data();
  
  // Use AI flows on server
  const [maskedChildAadhaar, maskedFatherAadhaar, maskedMotherAadhaar, dobInWords] = await Promise.all([
    maskAadhaarNumber({ aadhaarNumber: data.aadhaar || '' }),
    maskAadhaarNumber({ aadhaarNumber: data.faadhaar || '' }),
    maskAadhaarNumber({ aadhaarNumber: data.maadhaar || '' }),
    formatDateToWords(data.dob || ''),
  ]);

  return {
    ...data,
    maskedAadhaar: maskedChildAadhaar.maskedAadhaarNumber,
    maskedFaadhaar: maskedFatherAadhaar.maskedAadhaarNumber,
    maskedMaadhaar: maskedMotherAadhaar.maskedAadhaarNumber,
    dobInWords,
  };
}

export default async function BirthPrintPage({ params }: Props) {
  const { registration } = params;
  const data = await getBirthRecord(registration);

  if (!data) {
    notFound();
  }

  return <BirthPreview data={data} />;
}

export const dynamic = 'force-dynamic';
