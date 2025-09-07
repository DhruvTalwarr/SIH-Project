import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, PawPrint, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline sm:text-4xl">Understanding Antimicrobials in Animals</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          A vital tool for animal health and public safety.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Pill className="text-primary" />What are Antimicrobials?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Antimicrobials are substances that kill or inhibit the growth of microorganisms such as bacteria, fungi, viruses, or protozoans. The most well-known type of antimicrobial is the antibiotic, which specifically targets bacteria.
          </p>
          <p>
            In veterinary medicine, these drugs are essential for treating diseases, ensuring animal welfare, and preventing the spread of infections within herds and flocks. Their responsible use is critical to maintaining their effectiveness and protecting both animal and human health.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><PawPrint className="text-primary" />Why are they used in Animals?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            Antimicrobials are used in animals for several key reasons:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Treatment of Disease:</strong> Just like humans, animals get sick. Antimicrobials are used to treat bacterial infections, reduce suffering, and prevent fatalities.
            </li>
            <li>
              <strong>Control of Disease Spread:</strong> In a herd or flock, if one animal is sick, antimicrobials can be used to prevent the entire group from becoming infected, which is crucial for managing large-scale livestock operations.
            </li>
            <li>
              <strong>Prevention of Disease:</strong> In specific situations where animals are at high risk of developing a bacterial disease (e.g., after surgery), a veterinarian may prescribe antimicrobials as a preventative measure.
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldCheck className="text-primary" />Advantages of Responsible Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
           <p>
            When used responsibly under veterinary supervision, antimicrobials offer significant advantages:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Improved Animal Welfare:</strong> Effective treatment of infections reduces pain and suffering in animals, leading to healthier, more productive lives.
            </li>
            <li>
              <strong>Food Safety and Security:</strong> Healthy animals contribute to a safe and stable food supply. Preventing and treating disease in livestock is essential for meeting global food demands.
            </li>
            <li>
              <strong>Economic Stability for Farmers:</strong> By preventing devastating disease outbreaks, antimicrobials help protect the livelihoods of farmers and the stability of the agricultural sector.
            </li>
            <li>
              <strong>Slowing Antimicrobial Resistance (AMR):</strong> Proper monitoring and prudent use, as promoted by platforms like AgriSafeNet, are key strategies in the global fight against the growing threat of antimicrobial resistance.
            </li>
          </ul>
        </CardContent>
      </Card>

    </div>
  );
}
