import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HeartPulse, ScanText, FileSpreadsheet, FlaskConical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground font-headline sm:text-5xl lg:text-6xl">
          Monitoring Antimicrobial Use in Animals with AgriSafeNet
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground sm:mt-6">
          Leveraging AI to promote responsible antimicrobial use, safeguard animal health, and ensure a sustainable future for agriculture.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/image-analysis">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="hover:bg-primary/10 hover:text-primary">
            <Link href="/how-to-use">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Main Image */}
      <section className="flex justify-center">
        <Image
          src="https://picsum.photos/1200/400"
          alt="A veterinarian examining a cow in a field"
          width={1200}
          height={400}
          className="rounded-lg shadow-md object-cover"
          data-ai-hint="livestock veterinarian"
        />
      </section>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Why is it important to monitor antimicrobial use?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                The rise of antimicrobial resistance (AMR) is a global threat to both human and animal health. Responsible and prudent use of antimicrobials in livestock is crucial to preserving their efficacy.
              </p>
              <p>
                Monitoring consumption and administration patterns helps veterinarians and farmers make informed decisions, optimize treatment protocols, and comply with regulations like Maximum Residue Limits (MRLs), ultimately protecting the food chain and public health.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>What is AgriSafeNet?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                AgriSafeNet is an AI-powered platform designed to provide farmers and veterinarians with the tools needed for modern livestock management. We focus on enhancing animal health surveillance and promoting responsible medication use.
              </p>
              <p>
                Our system uses cutting-edge technology to analyze data, from images to handwritten notes, offering actionable insights to improve herd health and operational efficiency.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-8">
           <Card>
            <CardHeader>
              <CardTitle>Core Features</CardTitle>
              <CardDescription>Explore our powerful tools.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/image-analysis" className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10">
                <HeartPulse className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Health Assessment</h3>
                  <p className="text-sm text-muted-foreground">AI-driven image analysis.</p>
                </div>
              </Link>
              <Link href="/prescription-digitizer" className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10">
                <ScanText className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Prescription Digitizer</h3>
                  <p className="text-sm text-muted-foreground">Convert notes to text.</p>
                </div>
              </Link>
              <Link href="/withdrawal-calculator" className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10">
                <FileSpreadsheet className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Withdrawal Calculator</h3>
                  <p className="text-sm text-muted-foreground">Estimate safe periods.</p>
                </div>
              </Link>
              <Link href="/mrl-compliance" className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10">
                <FlaskConical className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">MRL Compliance</h3>
                  <p className="text-sm text-muted-foreground">Check residue limits.</p>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
