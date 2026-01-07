'use client';

import { useQRCode } from 'next-qrcode';
import Barcode from 'react-barcode';
import Image from 'next/image';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type BirthPreviewProps = {
  data: any; 
};

export default function BirthPreview({ data }: BirthPreviewProps) {
  const { Canvas } = useQRCode();

  const u = (v: any) => (v ? String(v).toUpperCase() : '');

  const emblem = PlaceHolderImages.find(img => img.id === 'emblem-of-india') as ImagePlaceholder;
  const stateLogo = PlaceHolderImages.find(img => img.id === 'state-logo') as ImagePlaceholder;
  const healthLogo = PlaceHolderImages.find(img => img.id === 'health-dept-logo') as ImagePlaceholder;

  return (
    <div className="max-w-4xl mx-auto bg-white p-2 text-black shadow-lg print:shadow-none">
      <div className="border-2 border-black p-4">
        <header className="grid grid-cols-3 text-center items-start mb-4">
          <div className="flex flex-col items-center justify-start pt-8">
            <p className="text-sm">सं.1</p>
            <p className="text-sm">No.1</p>
            {stateLogo && <Image width={60} height={60} src={stateLogo.imageUrl} alt={stateLogo.description} data-ai-hint={stateLogo.imageHint} />}
          </div>
          <div className="flex flex-col items-center">
            {emblem && <Image width={60} height={60} src={emblem.imageUrl} alt={emblem.description} data-ai-hint={emblem.imageHint} />}
            <p className="text-sm font-semibold">{u(data.stateh)} सरकार</p>
            <p className="text-sm font-bold">GOVERNMENT OF {u(data.state)}</p>
            <p className="text-sm font-semibold">चिकित्सा एवं स्वास्थ्यविभाग</p>
            <p className="text-sm font-semibold">DEPARTMENT OF MEDICAL AND HEALTH</p>
            <p className="text-sm font-semibold">{u(data.registrar)}</p>
            <p className="text-sm font-semibold">{u(data.registrarh)}</p>
            <p className="text-green-800 font-semibold mt-2">जन्म प्रमाण पत्र</p>
            <p className="text-green-800 font-semibold">BIRTH CERTIFICATE</p>
          </div>
          <div className="flex flex-col items-center justify-start pt-8">
            <p className="text-sm">प्रपत्र-5</p>
            <p className="text-sm">FORM-5</p>
            {healthLogo && <Image width={60} height={60} src={healthLogo.imageUrl} alt={healthLogo.description} data-ai-hint={healthLogo.imageHint} />}
          </div>
        </header>

        <section className="text-xs font-medium space-y-2 mb-4 text-justify">
          <p>(जन्म मृत्यु रजिस्ट्री करण अधिनियम, 1969 की धारा 12 / 17 तथा {u(data.stateh)} जन्म मृत्यु रजिस्ट्री करण नियम, 2002 के नियम 8/13 के अंतर्गत जारी किया गया )</p>
          <p>(ISSUED UNDER SECTION 12/17 OF THE REGISTRATION OF BIRTHS & DEATHS ACT, 1969 AND RULE 8/13 OF THE {u(data.state)} REGISTRATION OF BIRTHS & DEATHS RULES 2002.)</p>
          <p className="mt-2">यह प्रमाणित किया जाता है निम्नलिखित सूचना जन्म के मूल अभिलेख से ली गई है जो कि {u(data.registrarh)} जिला {u(data.districth)} तहसील {u(data.sbdh)} राज्य/संघ प्रदेश {u(data.stateh)} , भारत के रजिस्टर में उल्लिखित है।</p>
          <p>THIS IS TO CERTIFY THAT THE FOLLOWING INFORMATION HAS BEEN TAKEN FROM THE ORIGINAL RECORD OF BIRTH WHICH IS THE REGISTER FOR OF {u(data.registrar)} OF TAHSIL/BLOCK {u(data.sbd)} DISTRICT {u(data.district)} STATE/UNION TERRITORY {u(data.state)}, INDIA.</p>
        </section>

        <section className="grid grid-cols-2 gap-x-8 text-xs font-medium">
          <div className="space-y-3">
            <p>नाम / NAME : {u(data.name)}</p>
            <p>आधार संख्या / AADHAAR NO. : {data.maskedAadhaar}</p>
            <div>
              <p>जन्म तिथि | DATE OF BIRTH:</p>
              <p>{u(data.dob)}</p>
              <p>{u(data.dobInWords)}</p>
            </div>
            <p>माता का नाम/ NAME OF MOTHER: {u(data.mname)}</p>
            <p>आधार नंबर / MOTHER'S AADHAAR NO: {data.maskedMaadhaar}</p>
            <p>बच्चे के जन्म के समय माता-पिता का पता/ADDRESS OF PARENTS AT THE TIME OF BIRTH OF THE CHILD: {u(data.bhadress)}</p>
            <p>पंजीकरण संख्या / REGISTRATION NUMBER: {u(data.registration)}</p>
            <p>टिप्पणी/ REMARKS (IF ANY):</p>
            <p>जारी करने की तिथि / DATE OF ISSUE: {u(data.dor)}</p>
            <p>UPDATED ON: {u(data.dor)} {u(data.dom)}</p>
            <div className="pt-2">
              <Canvas
                text={"https://edistrict.up.nic.in"}
                options={{
                  quality: 0.3,
                  level: "M",
                  margin: 3,
                  scale: 4,
                  width: 80,
                  color: {
                    dark: '#000000FF',
                    light: '#FFFFFFFF',
                  },
                }}
              />
            </div>
          </div>
          <div className="space-y-3">
            <p>लिंग / SEX : {u(data.gender)}</p>
            <div className="pt-5"> {/* to align with AADHAAR NO */}
              <p>जन्म स्थान /PLACE OF BIRTH: {u(data.pbirth)}</p>
            </div>
            <div className="pt-1"> {/* to align with DOB */}
             <p>पिता का नाम / NAME OF FATHER: {u(data.hfname)}</p>
            </div>
            <p>आधार नंबर / FATHER'S AADHAAR NO: {data.maskedFaadhaar}</p>
            <div className="pt-2"> {/* To align with Mother's Address */}
                <p>माता-पिता का स्थायी पता / PERMANENT ADDRESS OF PARENTS:</p>
                <p>{u(data.padress)}</p>
            </div>
            <p className="pt-2">पंजीकरण तारीख / DATE OF REGISTRATION: {u(data.dor)}</p>
            <div className="pt-4">
              <p>जारी करने वाला पदाधिकारी / ISSUING AUTHORITY :</p>
              <div className="text-center font-bold mt-2">
                <p>रजिस्ट्रार (जन्म एवं मृत्यु)</p>
                <p>REGISTRAR (BIRTH & DEATH)</p>
                <p>{u(data.registrarh)}</p>
                <p>{u(data.registrar)}</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center text-xs mt-4">
          <p>"THIS IS COMPUTER GENERATED CERTIFICATE."</p>
          <p>"THE GOVT. OF INDIA VIDE CIRCULAR NO. 1/12/2014-VS(CRS) DATED 27- JULY-2015 HAS</p>
          <p>APPROVED THIS CERTIFICATE AS A VALID LEGAL DOCUMENT FOR ALL OFFICIAL PURPOSES."</p>
          <p className="mt-2">" प्रत्येक जन्म मृत्यु का पंजीकरण सुनिश्चित करें" / ENSURE REGISTRATION OF EVERY BIRTH AND DEATH "</p>
          <div className="flex justify-center mt-2">
            <Barcode value={data.registration || ''} height={40} width={2} displayValue={false} />
          </div>
        </footer>
      </div>
    </div>
  );
}
