"use client"

import { useEffect, useState } from "react";
import { Stethoscope, Twitter, Linkedin, Facebook } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-muted text-muted-foreground mt-12">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">AgriSafeNet</span>
            </Link>
            <p className="text-sm">
              AI-Powered Livestock Health Monitoring.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Features</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/image-analysis" className="text-sm hover:text-primary">Image Analysis</Link></li>
              <li><Link href="/prescription-digitizer" className="text-sm hover:text-primary">Prescription Digitizer</Link></li>
              <li><Link href="/withdrawal-calculator" className="text-sm hover:text-primary">Withdrawal Calculator</Link></li>
              <li><Link href="/mrl-compliance" className="text-sm hover:text-primary">MRL Compliance</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-sm hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Connect With Us</h3>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="hover:text-primary">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-primary">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-primary">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center">
          {currentYear !== null ? (
            <p className="text-sm">
              &copy; {currentYear} AgriSafeNet. All Rights Reserved.
            </p>
          ) : (
             <div className="h-5 w-64 bg-muted-foreground/20 rounded animate-pulse" />
          )}
          <div className="flex space-x-4 mt-4 sm:mt-0">
             <Link href="#" className="text-xs hover:text-primary">Privacy Policy</Link>
             <Link href="#" className="text-xs hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
