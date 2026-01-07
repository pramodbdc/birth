
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BirthForm from "./(app)/birth/components/birth-form";
import PasswordForm from './components/password-form';

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check session storage to see if user is already authenticated
    if (sessionStorage.getItem('isAuthenticated') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSuccess = () => {
    sessionStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <PasswordForm onSuccess={handlePasswordSuccess} />;
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Birth Certificate Application</CardTitle>
          <CardDescription>Please fill in the details below accurately.</CardDescription>
        </CardHeader>
        <CardContent>
          <BirthForm />
        </CardContent>
      </Card>
    </div>
  );
}
