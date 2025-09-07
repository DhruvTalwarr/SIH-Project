"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { digitizePrescription, type DigitizePrescriptionOutput } from '@/ai/flows/digitize-handwritten-prescriptions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, FileUp, Loader2, Save, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  prescription: z.any().refine(file => file instanceof File, 'A prescription image is required.'),
});

type FormValues = z.infer<typeof formSchema>;

export function PrescriptionDigitizerForm() {
  const [result, setResult] = useState<DigitizePrescriptionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('prescription', file);
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
      const prescriptionImage = await toDataUri(data.prescription);
      const response = await digitizePrescription({ prescriptionImage });
      setResult(response);
    } catch (error) {
      console.error('Digitization failed:', error);
       toast({
        variant: 'destructive',
        title: 'Digitization Failed',
        description: 'There was an error processing the prescription. Please try again with a clearer image.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="prescription">Prescription Image</Label>
          <Input id="prescription" type="file" accept="image/*" onChange={handleFileChange} />
          {errors.prescription && <p className="text-sm text-destructive">{errors.prescription.message as string}</p>}
        </div>

        {previewUrl && (
          <div className="w-full max-w-sm mx-auto p-4 border rounded-md">
            <Image src={previewUrl} alt="Prescription preview" width={400} height={500} className="rounded-md object-contain" />
          </div>
        )}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileUp className="mr-2 h-4 w-4" />}
          Digitize Prescription
        </Button>
      </form>

      {result && (
        <Card className="bg-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              Digitized Prescription Details
            </CardTitle>
            <CardDescription>
              Review and edit the extracted information below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="medicationDetails">Extracted Details</Label>
              <Textarea
                id="medicationDetails"
                defaultValue={result.medicationDetails}
                rows={6}
                className="bg-background"
              />
            </div>
            <Button onClick={() => toast({ title: "Saved!", description: "Prescription details have been saved." })} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Verify and Save
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
