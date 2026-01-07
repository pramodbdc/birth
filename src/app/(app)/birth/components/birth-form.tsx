'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { birthFormSchema, type BirthFormValues } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { submitBirthRecord } from '../actions';
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';

export default function BirthForm() {
  const form = useForm<BirthFormValues>({
    resolver: zodResolver(birthFormSchema),
    defaultValues: {
      gender: '',
      dob: '',
      name: '',
      saadhaar: '',
      aadhaar: '',
      pbirth: '',
      hfname: '',
      faadhaar: '',
      mname: '',
      maadhaar: '',
      padress: '',
      bhadress: '',
      dor: '',
      dom: '',
      registrar: '',
      registrarh: '',
      registration: '',
      district: '',
      sbd: '',
      districth: '',
      sbdh: '',
      state: '',
      stateh: '',
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationPlaceholder, setRegistrationPlaceholder] = useState("DYYYY############");

  const registrationDate = useWatch({ control: form.control, name: 'dor' });

  useEffect(() => {
    const generatePlaceholder = () => {
      try {
        const year = registrationDate && registrationDate.length >= 4 ? registrationDate.slice(0, 4) : String(new Date().getFullYear());
        let suffix = "";
        for (let i = 0; i < 12; i++) suffix += Math.floor(Math.random() * 10);
        return `D${year}${suffix}`;
      } catch {
        return "DYYYY############";
      }
    };
    setRegistrationPlaceholder(generatePlaceholder());
  }, [registrationDate]);
  
  const onSubmit = async (data: BirthFormValues) => {
    setIsSubmitting(true);
    try {
      if (!data.registration) {
        data.registration = registrationPlaceholder;
      }
      await submitBirthRecord(data);
      toast({
        title: 'Success!',
        description: 'Birth record submitted successfully.',
      });
      router.push(`/birthlist/${data.registration}`);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    } finally {
        setIsSubmitting(false);
    }
  };
  
  const sections = [
    { title: "Child's Information", fields: ["name", "dob", "gender", "pbirth"] },
    { title: "Identification", fields: ["saadhaar", "aadhaar"] },
    { title: "Parents' Information", fields: ["hfname", "faadhaar", "mname", "maadhaar"] },
    { title: "Address Information", fields: ["padress", "bhadress"] },
    { title: "Registration Details", fields: ["dor", "dom", "registration"] },
    { title: "Registrar Information", fields: ["state", "stateh", "district", "districth", "sbd", "sbdh", "registrar", "registrarh"] },
  ];

  const renderField = (name: keyof BirthFormValues) => {
    const fieldMap: Record<keyof BirthFormValues, React.ReactNode> = {
      name: <Input placeholder="Full Name in English" {...form.register("name")} />,
      dob: <Input type="date" {...form.register("dob")} />,
      gender: (
        <Select onValueChange={(value) => form.setValue('gender', value)}>
          <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="MALE">Male</SelectItem>
            <SelectItem value="FEMALE">Female</SelectItem>
            <SelectItem value="OTHER">Other</SelectItem>
          </SelectContent>
        </Select>
      ),
      pbirth: <Input placeholder="Place of birth (English)" {...form.register("pbirth")} />,
      saadhaar: (
        <Select onValueChange={(value) => form.setValue('saadhaar', value)}>
          <SelectTrigger><SelectValue placeholder="Select ID Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="aadhaar">Aadhaar No</SelectItem>
            <SelectItem value="eid">EID No</SelectItem>
          </SelectContent>
        </Select>
      ),
      aadhaar: <Input placeholder="EID/Aadhaar No" {...form.register("aadhaar")} />,
      hfname: <Input placeholder="Father's name (English)" {...form.register("hfname")} />,
      faadhaar: <Input placeholder="Father's Aadhaar No (Optional)" {...form.register("faadhaar")} />,
      mname: <Input placeholder="Mother's Name (English)" {...form.register("mname")} />,
      maadhaar: <Input placeholder="Mother's Aadhaar No (Optional)" {...form.register("maadhaar")} />,
      padress: <Input placeholder="Permanent Address (English)" {...form.register("padress")} />,
      bhadress: <Input placeholder="Address at time of birth (English)" {...form.register("bhadress")} />,
      dor: <Input type="date" {...form.register("dor")} />,
      dom: <Input type="time" {...form.register("dom")} />,
      registration: <Input placeholder={registrationPlaceholder} {...form.register("registration")} />,
      registrar: <Input placeholder="Registrar Name (English)" {...form.register("registrar")} />,
      registrarh: <Input placeholder="Registrar Name (Hindi)" {...form.register("registrarh")} />,
      district: <Input placeholder="Registrar District (English)" {...form.register("district")} />,
      sbd: <Input placeholder="Registrar Tehsil/Block (English)" {...form.register("sbd")} />,
      districth: <Input placeholder="Registrar District (Hindi)" {...form.register("districth")} />,
      sbdh: <Input placeholder="Registrar Tehsil/Block (Hindi)" {...form.register("sbdh")} />,
      state: <Input placeholder="State (English)" {...form.register("state")} />,
      stateh: <Input placeholder="State (Hindi)" {...form.register("stateh")} />,
    };

    const labelMap: Record<string, string> = {
        name: "Full Name", dob: "Date of Birth", gender: "Gender", pbirth: "Place of Birth", saadhaar: "ID Type", aadhaar: "Aadhaar/EID No", hfname: "Father's Name (English)", faadhaar: "Father's Aadhaar No", mname: "Mother's Name (English)", maadhaar: "Mother's Aadhaar No", padress: "Permanent Address (English)", bhadress: "Address at time of birth", dor: "Date of Registration", dom: "Time of Registration", registration: "Registration No (Optional)", registrar: "Registrar Name (English)", registrarh: "Registrar Name (Hindi)", district: "Registrar District (English)", sbd: "Registrar Tehsil/Block (English)", districth: "Registrar District (Hindi)", sbdh: "Registrar Tehsil/Block (Hindi)", state: "State (English)", stateh: "State (Hindi)"
    };
    
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{labelMap[name]}</FormLabel>
            <FormControl>{fieldMap[name]}</FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {sections.map((section, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">{section.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.fields.map(fieldName => (
                <div key={fieldName} className={['padress', 'bhadress'].includes(fieldName) ? 'md:col-span-2 lg:col-span-3' : ''}>
                  {renderField(fieldName as keyof BirthFormValues)}
                </div>
              ))}
            </div>
            {index < sections.length - 1 && <Separator className="my-6" />}
          </div>
        ))}
        
        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit & Preview
          </Button>
        </div>
      </form>
    </Form>
  );
}
