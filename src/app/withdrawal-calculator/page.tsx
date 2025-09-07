"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Calculator, Clock } from 'lucide-react';

export default function WithdrawalCalculatorPage() {
  const [animal, setAnimal] = useState('');
  const [medicine, setMedicine] = useState('');
  const [dosage, setDosage] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleCalculate = () => {
    if (!animal || !medicine || !dosage || !weight) {
      setResult("Please fill in all fields to calculate the withdrawal period.");
      return;
    }

    // This is a mock calculation. In a real app, this would involve complex logic
    // based on specific drug pharmacokinetics for each species.
    const dosageNum = parseFloat(dosage);
    const weightNum = parseFloat(weight);
    let baseHours = 0;

    switch (animal) {
      case 'cow': baseHours = 72; break;
      case 'pig': baseHours = 48; break;
      case 'sheep': baseHours = 60; break;
      default: baseHours = 24;
    }

    // Mock influence of medicine and dosage/weight ratio
    const medicineFactor = medicine.toLowerCase().includes('antibiotic') ? 1.5 : 1;
    const concentrationFactor = (dosageNum / weightNum) * 100;
    
    const totalHours = Math.round(baseHours * medicineFactor * (1 + concentrationFactor / 50));
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;

    setResult(`The advisory withdrawal period is approximately ${days} days and ${hours} hours. Please consult the official drug label and your veterinarian for the definitive withdrawal time.`);
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">Withdrawal Period Calculator</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Get an advisory withdrawal period for medication.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Enter Treatment Details</CardTitle>
          <CardDescription>All fields are required for an estimation. This is not a substitute for professional veterinary advice.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="animal">Animal Species</Label>
            <Select onValueChange={setAnimal} value={animal}>
              <SelectTrigger>
                <SelectValue placeholder="Select a species" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cow">Cow</SelectItem>
                <SelectItem value="pig">Pig</SelectItem>
                <SelectItem value="sheep">Sheep</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicine">Medicine Name</Label>
            <Input id="medicine" placeholder="e.g., Penicillin G (Antibiotic)" value={medicine} onChange={(e) => setMedicine(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dosage">Total Dosage (mg)</Label>
              <Input id="dosage" type="number" placeholder="e.g., 300" value={dosage} onChange={(e) => setDosage(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Animal Weight (kg)</Label>
              <Input id="weight" type="number" placeholder="e.g., 500" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
          </div>
          
          <Button onClick={handleCalculate} className="w-full">
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Period
          </Button>

          {result && (
            <Alert className="bg-accent/20">
              <Clock className="h-4 w-4" />
              <AlertTitle>Advisory Withdrawal Period</AlertTitle>
              <AlertDescription>
                {result}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
