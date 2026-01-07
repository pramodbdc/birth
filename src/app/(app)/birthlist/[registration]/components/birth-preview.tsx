'use client';

import { useQRCode } from 'next-qrcode';
import Barcode from 'react-barcode';
import Image from 'next/image';

type BirthPreviewProps = {
  data: any; 
};

export default function BirthPreview({ data }: BirthPreviewProps) {
  const { Canvas } = useQRCode();

  const u = (v: any) => (v ? String(v).toUpperCase() : '');

  return (
    <div className="border border-black p-1 mx-auto max-w-4xl bg-white text-black" style={{ fontSize: '0.6rem', color: '#211F5F' }}>
      <div className="border-2 border-black p-2.5">
        
        <header className="grid grid-cols-3 text-center items-start mb-4">
          <div className="flex flex-col items-center justify-start pt-8">
            <p>सं.1</p>
            <p>No.1</p>
            <Image width={60} height={60} src="/2.jpg" alt="State Logo" />
          </div>
          <div className="flex flex-col items-center">
            <Image width={60} height={60} src="/1.png" alt="Emblem of India" />
            <p className="font-semibold">{u(data.stateh)} सरकार</p>
            <p className="font-bold">GOVERNMENT OF {u(data.state)}</p>
            <p className="font-semibold">चिकित्सा एवं स्वास्थ्यविभाग</p>
            <p className="font-semibold">DEPARTMENT OF MEDICAL AND HEALTH</p>
            <p className="font-semibold">{u(data.registrar)}</p>
            <p className="font-semibold">{u(data.registrarh)}</p>
            
            <p className="font-semibold mt-2" style={{ color: '#003300' }}>
            जन्म प्रमाण पत्र
            </p>
            <p className="font-semibold" style={{ color: '#003300' }}>
            BIRTH CERTIFICATE
            </p>
          </div>
          <div className="flex flex-col items-center justify-start pt-8">
            <p>प्रपत्र-5</p>
            <p>FORM-5</p>
            <Image width={60} height={60} src="/3.png" alt="Health Dept Logo" />
          </div>
        </header>
        
        <section className="font-medium mb-4">
            <p>
              (जन्म मृत्यु रजिस्ट्री करण अधिनियम, 1969 की धारा 12 / 17 तथा {u(data.stateh)} जन्म मृत्यु रजिस्ट्री करण नियम, 2002 के नियम 8/13 के अंतर्गत जारी किया गया )
            </p>
            <p>
              (ISSUED UNDER SECTION 12/17 OF THE REGISTRATION OF BIRTHS & DEATHS ACT, 1969 AND RULE 8/13 OF THE {u(data.state)} REGISTRATION OF BIRTHS & DEATHS RULES 2002.)
            </p>
            
            <p className="mt-3">
              यह प्रमाणित किया जाता है निम्नलिखित सूचना जन्म के मूल अभिलेख से ली गई है जो कि {u(data.registrarh)} जिला {u(data.districth)} तहसील {u(data.sbdh)} राज्य/संघ प्रदेश {u(data.stateh)} , भारत के रजिस्टर में उल्लिखित है।
            </p>
            <p>
              THIS IS TO CERTIFY THAT THE FOLLOWING INFORMATION HAS BEEN TAKEN FROM THE ORIGINAL RECORD OF BIRTH WHICH IS THE REGISTER FOR OF {u(data.registrar)} OF TAHSIL/BLOCK {u(data.sbd)} DISTRICT {u(data.district)} STATE/UNION TERRITORY {u(data.state)}, INDIA.
            </p>
        </section>
        
        <section className="grid grid-cols-2 gap-x-8 font-medium">
          <div>
            <p>नाम / NAME : {u(data.name)}</p>
           
            <p className="mt-3">आधार संख्या / AADHAAR NO. :</p>
            <p>{data.maskedAadhaar}</p>
             
            <p className="mt-3">जन्म तिथि | DATE OF BIRTH:</p>
            <p>{u(data.dob)}</p>
            <p>{u(data.dobInWords)}</p>
             
            <p className="mt-3">माता का नाम/ NAME OF MOTHER:</p>
            <p>{u(data.mname)}</p>
            
            <p className="mt-3">आधार नंबर / MOTHER'S AADHAAR NO:</p>
            <p>{data.maskedMaadhaar}</p>
            
            <p className="mt-3">
              बच्चे के जन्म के समय माता-पिता का पता/ADDRESS OF PARENTS AT THE TIME
              OF BIRTH OF THE CHILD:
            </p>
            <p>{u(data.bhadress)}</p>
           
            <p className="mt-3">पंजीकरण संख्या / REGISTRATION NUMBER:</p>
            <p>{u(data.registration)}</p>
           
            <p className="mt-3">टिप्पणी/ REMARKS (IF ANY):</p>
            <p>REMARKS</p>
            
            <p className="mt-3">जारी करने की तिथि / DATE OF ISSUE:</p>
            <p>{u(data.dor)}</p>
            
            <p className="mt-3">UPDATED ON</p>
            <p>{u(data.dor)} {u(data.dom)}</p>
            <Canvas
              text={u(data.registration)}
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
          <div>
            <p>लिंग / SEX : {u(data.gender)}</p>
            
            <p className="mt-6">जन्म स्थान /PLACE OF BIRTH:</p>
            <p>{u(data.pbirth)}</p>
            
            <p className="mt-3">पिता का नाम / NAME OF FATHER:</p>
            <p>{u(data.hfname)}</p>
            
            <p className="mt-3">आधार नंबर / FATHER'S AADHAAR NO:</p>
            <p>{data.maskedFaadhaar}</p>
           
            <p className="mt-3">माता-पिता का स्थायी पता / PERMANENT ADDRESS OF PARENTS:</p>
            <p className="mt-3">{u(data.padress)}</p>
            <br/>
            <p>पंजीकरण तारीख / DATE OF REGISTRATION:</p>
            <p>{u(data.dor)}</p>
          
            <p className="mt-5">जारी करने वाला पदाधिकारी / ISSUING AUTHORITY :</p>
            <br/>
            <br/>
            <br/>
            <div className="text-center font-bold mt-2">
              <p>रजिस्ट्रार (जन्म एवं मृत्यु)</p>
              <p>REGISTRAR (BIRTH & DEATH)</p>
              <p className="mt-1">{u(data.registrarh)} </p>
              <p>{u(data.registrar)} </p>
            </div>
          </div>
        </section>

        <footer className="text-center mt-4">
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
