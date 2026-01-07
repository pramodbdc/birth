import Link from "next/link";
import { FileText } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center space-y-6">
        <Link href="/" className="flex items-center space-x-2 mb-4">
          <FileText className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">E-BirthRecord</span>
        </Link>
        {children}
      </div>
    </div>
  );
}
