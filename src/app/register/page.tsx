
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="24px"
      height="24px"
      {...props}
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  );
}

export default function RegisterPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and limit to 10 digits
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhone(value);
      setPhoneError('');
    } else if (value === '') {
      setPhone('');
      setPhoneError('');
    } else {
      setPhoneError('Phone number must contain only 10 digits.');
    }
  };

  const handleSendOtp = () => {
    if (phone.length === 10) {
      setOtpSent(true);
      setPhoneError('');
    } else {
      setPhoneError('Please enter a valid 10-digit phone number.');
    }
  };

  const handleVerifyOtp = () => {
    // Logic to verify OTP and register
    // For now, just toggling back for demonstration
    setOtpSent(false);
  }

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight font-headline">
            Create an Account
          </CardTitle>
          <CardDescription>
            Join AgriSafeNet to start monitoring your livestock.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">
                <Mail className="mr-2" /> Email
              </TabsTrigger>
              <TabsTrigger value="phone">
                <Phone className="mr-2" /> Phone
              </TabsTrigger>
            </TabsList>
            <TabsContent value="email" className="space-y-4 pt-4">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
            </TabsContent>
            <TabsContent value="phone" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName-phone">First Name</Label>
                  <Input id="firstName-phone" placeholder="John" required disabled={otpSent}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName-phone">Last Name</Label>
                  <Input id="lastName-phone" placeholder="Doe" required disabled={otpSent}/>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone-register">Phone Number</Label>
                <Input
                  id="phone-register"
                  type="tel"
                  placeholder="9876543210"
                  required
                  disabled={otpSent}
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={10}
                />
                 {phoneError && <p className="text-sm text-destructive">{phoneError}</p>}
              </div>
              {otpSent && (
                <div className="space-y-2">
                  <Label htmlFor="otp">One-Time Password (OTP)</Label>
                  <Input id="otp" type="text" placeholder="Enter OTP" required />
                </div>
              )}
              <Button
                type="button"
                className="w-full"
                onClick={otpSent ? handleVerifyOtp : handleSendOtp}
              >
                {otpSent ? "Verify OTP & Register" : "Send OTP"}
              </Button>
            </TabsContent>
          </Tabs>

          <Separator className="my-6">
            <span className="px-2 bg-background text-muted-foreground text-sm">
              OR SIGN UP WITH
            </span>
          </Separator>

          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              <GoogleIcon className="mr-2 h-5 w-5" />
              Sign up with Google
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Log In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
