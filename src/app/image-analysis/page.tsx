import { ImageAnalysisForm } from "@/components/image-analysis-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImageAnalysisPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
       <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">Image-Based Health Assessment</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Upload an image of your livestock for an AI-powered health analysis.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Analyze Livestock Photo</CardTitle>
          <CardDescription>Provide a clear photo and any relevant details for the most accurate assessment.</CardDescription>
        </CardHeader>
        <CardContent>
          <ImageAnalysisForm />
        </CardContent>
      </Card>
    </div>
  );
}
