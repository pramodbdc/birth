'use client';
import BirthPreview from './components/birth-preview';
import { notFound, useParams } from 'next/navigation';
import { maskAadhaarNumber } from '@/ai/flows/mask-aadhaar-number';
import { dateToWords } from '@/lib/utils';
import { useEffect, useState } from 'react';

type BirthData = {
  maskedAadhaar?: string;
  maskedFaadhaar?: string;
  maskedMaadhaar?: string;
  dobInWords?: string;
  [key: string]: any;
};

export default function BirthPrintPage() {
  const params = useParams();
  const { registration } = params;
  const [data, setData] = useState<BirthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBirthRecord(registration: string) {
      const records = JSON.parse(localStorage.getItem('birthRecords') || '[]');
      const record = records.find((r: any) => r.registration === registration);

      if (!record) {
        setLoading(false);
        return null;
      }

      // Use AI flows on server and util function
      const [maskedChildAadhaar, maskedFatherAadhaar, maskedMotherAadhaar] = await Promise.all([
        maskAadhaarNumber({ aadhaarNumber: record.aadhaar || '' }),
        maskAadhaarNumber({ aadhaarNumber: record.faadhaar || '' }),
        maskAadhaarNumber({ aadhaarNumber: record.maadhaar || '' }),
      ]);

      const dobInWords = dateToWords(record.dob);

      setData({
        ...record,
        maskedAadhaar: maskedChildAadhaar.maskedAadhaarNumber,
        maskedFaadhaar: maskedFatherAadhaar.maskedAadhaarNumber,
        maskedMaadhaar: maskedMotherAadhaar.maskedAadhaarNumber,
        dobInWords,
      });
      setLoading(false);
    }
    
    if (registration && typeof registration === 'string') {
      getBirthRecord(registration);
    } else {
      setLoading(false);
    }

  }, [registration]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    notFound();
  }

  return <BirthPreview data={data} />;
}
