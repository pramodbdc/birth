import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BirthForm from "./components/birth-form";

export default function BirthPage() {
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
