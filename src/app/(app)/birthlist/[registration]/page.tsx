'use server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import BirthPreview from './components/birth-preview';
import { notFound } from 'next/navigation';
import { maskAadhaarNumber } from '@/ai/flows/mask-aadhaar-number';
import { formatDateToWords } from '@/ai/flows/date-formatting-tool';
import { dateToWords } from '@/lib/utils';

type Props = {
  params: { registration: string };
};

async function getBirthRecord(registration: string) {
  const recordQuery = query(collection(db, `births`), where("registration", "==", registration));
  const recordDocs = await getDocs(recordQuery);

  if (recordDocs.empty) return null;

  const data = recordDocs.docs[0].data();
  
  // Use AI flows on server and util function
  const [maskedChildAadhaar, maskedFatherAadhaar, maskedMotherAadhaar] = await Promise.all([
    maskAadhaarNumber({ aadhaarNumber: data.aadhaar || '' }),
    maskAadhaarNumber({ aadhaarNumber: data.faadhaar || '' }),
    maskAadhaarNumber({ aadhaarNumber: data.maadhaar || '' }),
  ]);

  const dobInWords = dateToWords(data.dob);


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
