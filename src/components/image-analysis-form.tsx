"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { assessLivestockHealth, type AssessLivestockHealthOutput } from '@/ai/flows/image-based-livestock-health-assessment';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, BadgeCheck, FileUp, Loader2, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  photo: z.any().refine(file => file instanceof File, 'A photo is required.'),
  species: z.string().min(1, 'Species is required.'),
  additionalDetails: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function ImageAnalysisForm() {
  const [result, setResult] = useState<AssessLivestockHealthOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('photo', file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const toDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setResult(null);

    try {
      const photoDataUri = await toDataUri(data.photo);
      const response = await assessLivestockHealth({
        photoDataUri,
        species: data.species,
        additionalDetails: data.additionalDetails,
      });
      setResult(response);
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'There was an error processing the image. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="photo">Livestock Photo</Label>
          <Input id="photo" type="file" accept="image/*" onChange={handleFileChange} />
          {errors.photo && <p className="text-sm text-destructive">{errors.photo.message as string}</p>}
        </div>

        {previewUrl && (
          <div className="w-full max-w-sm mx-auto">
            <Image src={previewUrl} alt="Livestock preview" width={400} height={300} className="rounded-md object-cover" />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="species">Species</Label>
          <Select onValueChange={(value) => setValue('species', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a species" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cow">Cow</SelectItem>
              <SelectItem value="pig">Pig</SelectItem>
              <SelectItem value="sheep">Sheep</SelectItem>
              <SelectItem value="chicken">Chicken</SelectItem>
              <SelectItem value="goat">Goat</SelectItem>
            </SelectContent>
          </Select>
          {errors.species && <p className="text-sm text-destructive">{errors.species.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalDetails">Additional Details</Label>
          <Textarea id="additionalDetails" {...register('additionalDetails')} placeholder="e.g., 'Animal seems lethargic', 'Visible rash on the left flank'" />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileUp className="mr-2 h-4 w-4" />}
          Analyze Photo
        </Button>
      </form>

      {result && (
        <Card className="bg-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              AI Health Assessment Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <BadgeCheck className="h-4 w-4" />
              <AlertTitle>Health Assessment</AlertTitle>
              <AlertDescription>{result.healthAssessment}</AlertDescription>
            </Alert>

            {result.potentialIssues && result.potentialIssues.length > 0 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Potential Issues Identified</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.potentialIssues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <div>
              <Label>Confidence Level: {Math.round(result.confidenceLevel * 100)}%</Label>
              <Progress value={result.confidenceLevel * 100} className="mt-2" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
