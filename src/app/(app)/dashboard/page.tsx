'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { FilePlus2, FileText, Loader2, Wallet } from "lucide-react";

type RecentRecord = {
  id: string;
  name: string;
  dor: string;
  registration: string;
};

export default function Dashboard() {
  const [user] = useAuthState(auth);
  const [balance, setBalance] = useState<number | null>(null);
  const [userName, setUserName] = useState('');
  const [recentRecords, setRecentRecords] = useState<RecentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      try {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const userDocs = await getDocs(q);
        if (!userDocs.empty) {
          const userData = userDocs.docs[0].data();
          setUserName(userData.name);
          setBalance(userData.ballance);

          const birthsRef = collection(db, `users/${userDocs.docs[0].id}/births`);
          const recentQuery = query(birthsRef, limit(5));
          const recentDocs = await getDocs(recentQuery);
          const records = recentDocs.docs.map(doc => ({ id: doc.id, ...doc.data() } as RecentRecord));
          setRecentRecords(records);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">Welcome, {userName || 'User'}!</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {balance !== null ? `₹${balance.toFixed(2)}` : <Loader2 className="h-6 w-6 animate-spin" />}
            </div>
            <p className="text-xs text-muted-foreground">Available for services</p>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>New Birth Certificate</CardTitle>
            <CardDescription>Start a new application for a birth certificate.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center">
            <Button asChild size="lg">
              <Link href="/birth">
                <FilePlus2 className="mr-2 h-5 w-5" />
                Apply Now
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Records</CardTitle>
            <CardDescription>Your 5 most recent applications.</CardDescription>
          </CardHeader>
          <CardContent>
            {recentRecords.length > 0 ? (
              <ul className="space-y-2">
                {recentRecords.map(record => (
                  <li key={record.id} className="flex items-center justify-between text-sm">
                    <span className="font-medium truncate pr-4">{record.name}</span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/birthlist/${record.registration}`}>View</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No recent records found.</p>
            )}
             <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/birthlist">
                  <FileText className="mr-2 h-4 w-4" />
                  View All Records
                </Link>
              </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
