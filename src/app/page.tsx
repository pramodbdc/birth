import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText } from 'lucide-react';
import Header from '@/components/header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    E-BirthRecord: Fast & Secure Birth Certificates
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Easily apply for official birth certificates online. Our streamlined process is fast, secure, and reliable.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/birth">
                      Apply Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/dashboard">
                      My Dashboard
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                 <FileText className="h-48 w-48 text-primary" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center p-6 border-t">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} E-BirthRecord. All rights reserved.</p>
      </footer>
    </div>
  );
}
