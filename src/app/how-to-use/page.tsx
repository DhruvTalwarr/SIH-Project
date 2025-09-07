//how to use page
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, HelpCircle, HardDriveUpload, ScanLine, Calculator, ClipboardCheck, UserPlus, LogIn } from "lucide-react";
import Link from "next/link";

export default function HowToUsePage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">How to Use AgriSafeNet</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A step-by-step guide to leveraging our AI-powered tools for livestock health management.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><HelpCircle className="text-primary" />What is AgriSafeNet?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            AgriSafeNet is an AI-powered platform designed to assist farmers and veterinarians in monitoring livestock health and promoting responsible antimicrobial use. Our suite of tools simplifies complex tasks, from analyzing animal health through images to digitizing handwritten prescriptions.
          </p>
          <p>
            By providing actionable insights, we help you make informed decisions quickly, ensuring better animal welfare and compliance with industry regulations.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Lightbulb className="text-primary" />Step-by-Step Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start gap-4 p-4 border rounded-lg">
            <div className="flex-shrink-0 flex items-center justify-center bg-primary/10 text-primary rounded-full h-12 w-12">
              <UserPlus className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">1. Create an Account</h3>
              <p className="text-muted-foreground mt-1">
                If you're new to AgriSafeNet, you'll need to create an account. Navigate to the <Link href="/register" className="text-primary hover:underline">Register</Link> page and fill in your details.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-4 p-4 border rounded-lg">
            <div className="flex-shrink-0 flex items-center justify-center bg-primary/10 text-primary rounded-full h-12 w-12">
              <LogIn className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">2. Log In to Your Account</h3>
              <p className="text-muted-foreground mt-1">
                Once your account is created, go to the <Link href="/login" className="text-primary hover:underline">Log In</Link> page to access your dashboard and all of AgriSafeNet's features.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-4 p-4 border rounded-lg">
            <div className="flex-shrink-0 flex items-center justify-center bg-primary/10 text-primary rounded-full h-12 w-12">
              <HardDriveUpload className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">3. Image-Based Health Assessment</h3>
              <p className="text-muted-foreground mt-1">
                This feature is perfect for getting a quick, AI-powered second opinion on an animal's health. If you notice any visual abnormalities like skin conditions, lethargy, or unusual posture, use this tool. Navigate to the <Link href="/image-analysis" className="text-primary hover:underline">Image Analysis</Link> page. Upload a clear photo of your livestock, select the species, and add any observational notes. Our AI will analyze the image and provide a health assessment, identify potential issues, and give a confidence score.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-4 p-4 border rounded-lg">
            <div className="flex-shrink-0 flex items-center justify-center bg-primary/10 text-primary rounded-full h-12 w-12">
              <ScanLine className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">4. Digitize Prescriptions</h3>
              <p className="text-muted-foreground mt-1">
                To keep accurate digital records and avoid errors from hard-to-read handwriting, use this tool. Go to the <Link href="/prescription-digitizer" className="text-primary hover:underline">Prescription Digitizer</Link>. Upload an image of a handwritten prescription. The AI will extract the medication details into a clean, editable text format, saving you time and reducing errors.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-4 p-4 border rounded-lg">
            <div className="flex-shrink-0 flex items-center justify-center bg-primary/10 text-primary rounded-full h-12 w-12">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">5. Calculate Withdrawal Periods</h3>
              <p className="text-muted-foreground mt-1">
                Ensuring food safety is critical after treating an animal. Use this calculator before an animal or its products (like milk or eggs) enter the food supply. Visit the <Link href="/withdrawal-calculator" className="text-primary hover:underline">Withdrawal Calculator</Link>. Enter the animal species, medicine name, dosage, and animal weight. The tool will provide an estimated withdrawal period to help ensure food safety.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-4 p-4 border rounded-lg">
            <div className="flex-shrink-0 flex items-center justify-center bg-primary/10 text-primary rounded-full h-12 w-12">
              <ClipboardCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">6. Check MRL Compliance</h3>
              <p className="text-muted-foreground mt-1">
                Before administering a drug to a food-producing animal, it's vital to know if it's approved and what the residue limits are. On the <Link href="/mrl-compliance" className="text-primary hover:underline">MRL Compliance</Link> page, type in the name of a veterinary medicine. The system will check its status against Maximum Residue Limit (MRL) databases and inform you if it's compliant, restricted, or non-compliant for food-producing animals.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
