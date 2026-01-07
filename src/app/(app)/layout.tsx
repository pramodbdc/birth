import { AuthGuard } from '@/components/auth-guard';
import Header from '@/components/header';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <AuthGuard>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </AuthGuard>
    </>
  );
}
