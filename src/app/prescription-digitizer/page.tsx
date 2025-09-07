import { PrescriptionDigitizerForm } from "@/components/prescription-digitizer-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrescriptionDigitizerPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">Prescription Digitization</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Convert handwritten prescriptions into editable digital text with AI.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Digitize Handwritten Prescription</CardTitle>
          <CardDescription>Upload a clear image of a prescription to extract medication details.</CardDescription>
        </CardHeader>
        <CardContent>
          <PrescriptionDigitizerForm />
        </CardContent>
      </Card>
    </div>
  );
}
