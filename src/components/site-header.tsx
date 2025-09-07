
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Stethoscope } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "./ui/separator"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/image-analysis", label: "Image Analysis" },
  { href: "/prescription-digitizer", label: "Prescription Digitizer" },
  { href: "/withdrawal-calculator", label: "Withdrawal Calculator" },
  { href: "/mrl-compliance", label: "MRL Compliance" },
  { href: "/about", label: "About" },
  { href: "/how-to-use", label: "How to Use" },
  { href: "/contact", label: "Contact Us" },
];

const desktopNavItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact Us" },
];

export function SiteHeader() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="font-bold">AgriSafeNet</span>
          </Link>
        </div>
        
        <nav className="hidden items-center space-x-2 text-sm font-medium md:flex flex-1">
            {desktopNavItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "transition-colors px-3 py-2 rounded-md",
                        pathname === item.href ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    {item.label}
                </Link>
            ))}
        </nav>

        <div className="flex items-center space-x-2 ml-auto">
            <div className="hidden md:flex items-center space-x-2">
                <Button asChild variant={pathname === "/login" ? "secondary" : "ghost"}>
                    <Link href="/login">Log In</Link>
                </Button>
                <Button asChild variant={pathname === "/register" ? "secondary" : "ghost"}>
                    <Link href="/register">Register</Link>
                </Button>
            </div>
            
            <ThemeToggle />

            {/* Unified Menu for all screen sizes */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="sr-only">Main Menu</SheetTitle>
                </SheetHeader>
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Stethoscope className="h-6 w-6 text-primary" />
                  <span className="font-bold">AgriSafeNet</span>
                </Link>
                <nav className="mt-8 flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <Button key={item.href} asChild variant={pathname === item.href ? "secondary" : "ghost"} onClick={() => setIsMobileMenuOpen(false)}>
                      <Link
                        href={item.href}
                        className={cn(
                          "transition-colors justify-start",
                          pathname === item.href ? "text-primary font-semibold" : "text-muted-foreground"
                        )}
                      >
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                  <Separator />
                    <Button asChild variant="ghost" onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/login">Log In</Link>
                  </Button>
                  <Button asChild variant="ghost" onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/register">Register</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  )
}
