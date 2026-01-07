import { auth, db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Eye, FilePlus2 } from 'lucide-react';
import { getAuth } from "firebase/auth";

type BirthRecord = {
  id: string;
  name: string;
  dob: string;
  registration: string;
  dor: string;
};

async function getBirthRecords() {
  const fbAuth = getAuth();
  const user = fbAuth.currentUser;
  
  if (!user) {
    // This should ideally not happen due to AuthGuard, but as a fallback
    return [];
  }

  const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
  const userDocs = await getDocs(userQuery);

  if (userDocs.empty) {
    return [];
  }

  const userDocId = userDocs.docs[0].id;
  const birthsRef = collection(db, `users/${userDocId}/births`);
  const birthsSnapshot = await getDocs(birthsRef);
  
  const records: BirthRecord[] = birthsSnapshot.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name,
    dob: doc.data().dob,
    registration: doc.data().registration,
    dor: doc.data().dor,
  }));

  return records;
}

export default async function BirthListPage() {
  const records = await getBirthRecords();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Your Birth Records</CardTitle>
            <CardDescription>A list of all submitted birth certificate applications.</CardDescription>
        </div>
        <Button asChild>
            <Link href="/birth"><FilePlus2 className="mr-2 h-4 w-4" /> New Application</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {records.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Registration No.</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.name}</TableCell>
                  <TableCell>{record.dob}</TableCell>
                  <TableCell>{record.registration}</TableCell>
                  <TableCell>{record.dor}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/birthlist/${record.registration}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold">No records found</h3>
            <p className="text-muted-foreground mt-2">You haven't submitted any birth certificate applications yet.</p>
            <Button asChild className="mt-4">
              <Link href="/birth">Create Your First Application</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export const dynamic = 'force-dynamic';
