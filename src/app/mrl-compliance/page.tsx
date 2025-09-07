"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2, FlaskConical, Search, XCircle } from 'lucide-react';

const mockMrlData: { [key: string]: { status: 'Compliant' | 'Non-Compliant' | 'Restricted', details: string } } = {
  'penicillin': { status: 'Compliant', details: 'MRL set at 50 µg/kg for muscle tissue in cattle.' },
  'ivermectin': { status: 'Compliant', details: 'MRL set at 20 µg/kg for liver tissue in sheep.' },
  'tetracycline': { status: 'Restricted', details: 'Use is restricted in lactating animals. Check specific regulations.' },
  'chloramphenicol': { status: 'Non-Compliant', details: 'Banned for use in food-producing animals in many regions due to public health risks.' },
};

export default function MRLCompliancePage() {
  const [medicine, setMedicine] = useState('');
  const [result, setResult] = useState<{ status: 'Compliant' | 'Non-Compliant' | 'Restricted', details: string } | null>(null);
  const [searched, setSearched] = useState(false);

  const handleCheckCompliance = () => {
    setSearched(true);
    const medicineKey = medicine.toLowerCase().trim();
    if (mockMrlData[medicineKey]) {
      setResult(mockMrlData[medicineKey]);
    } else {
      setResult(null);
    }
  };

  const getBadgeVariant = (status: 'Compliant' | 'Non-Compliant' | 'Restricted') => {
    switch (status) {
      case 'Compliant': return 'default';
      case 'Non-Compliant': return 'destructive';
      case 'Restricted': return 'secondary';
    }
  }

  const getIcon = (status: 'Compliant' | 'Non-Compliant' | 'Restricted') => {
    switch (status) {
      case 'Compliant': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'Non-Compliant': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'Restricted': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">MRL Compliance Status</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Check if a medicine complies with Maximum Residue Limits.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Check Medicine Compliance</CardTitle>
          <CardDescription>Enter a medicine name to check its MRL status. Data is for advisory purposes only.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex w-full items-center space-x-2">
            <div className="flex-grow space-y-2">
              <Label htmlFor="medicine" className="sr-only">Medicine Name</Label>
              <Input id="medicine" placeholder="e.g., Penicillin, Ivermectin" value={medicine} onChange={(e) => setMedicine(e.target.value)} />
            </div>
            <Button onClick={handleCheckCompliance} className="self-end">
              <Search className="mr-2 h-4 w-4" />
              Check
            </Button>
          </div>
          
          {searched && (
            <Card className="bg-accent/20">
              <CardHeader>
                <CardTitle>Compliance Result for "{medicine}"</CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <Alert>
                    {getIcon(result.status)}
                    <AlertTitle className="flex items-center gap-2">
                      Status: <Badge variant={getBadgeVariant(result.status)}>{result.status}</Badge>
                    </AlertTitle>
                    <AlertDescription>
                      {result.details}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertTitle>Not Found</AlertTitle>
                    <AlertDescription>
                      No MRL data found for "{medicine}". Please verify the spelling or consult official sources.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
