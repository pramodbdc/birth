import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BirthForm from "./(app)/birth/components/birth-form";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto">
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
