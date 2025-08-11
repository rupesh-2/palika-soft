"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { UserPlus, Globe, Building2 } from "lucide-react"

export default function SignupPage() {
  const [language, setLanguage] = useState<"en" | "np">("en")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="h-8 w-8 text-[#1F4E79]" />
            <h1 className="text-2xl font-bold text-[#1F4E79]">
              {language === "en" ? "Palika Municipal" : "पालिका नगरपालिका"}
            </h1>
          </div>
          <p className="text-gray-600">{language === "en" ? "Citizen Registration" : "नागरिक दर्ता"}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "np" : "en")}
            className="mt-4"
          >
            <Globe className="h-4 w-4 mr-2" />
            {language === "en" ? "नेपाली" : "English"}
          </Button>
        </div>

        {/* Signup Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-[#1F4E79]">
              {language === "en" ? "Create Account" : "खाता सिर्जना गर्नुहोस्"}
            </CardTitle>
            <CardDescription className="text-center">
              {language === "en"
                ? "Register as a citizen to access municipal services"
                : "नगरपालिका सेवाहरू पहुँच गर्न नागरिकको रूपमा दर्ता गर्नुहोस्"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentStep === 1 && (
              <>
                {/* Personal Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">{language === "en" ? "First Name" : "पहिलो नाम"}</Label>
                    <Input id="first-name" placeholder={language === "en" ? "First name" : "पहिलो नाम"} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">{language === "en" ? "Last Name" : "थर"}</Label>
                    <Input id="last-name" placeholder={language === "en" ? "Last name" : "थर"} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{language === "en" ? "Email Address" : "इमेल ठेगाना"}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={language === "en" ? "Enter email address" : "इमेल ठेगाना प्रविष्ट गर्नुहोस्"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{language === "en" ? "Phone Number" : "फोन नम्बर"}</Label>
                  <Input id="phone" placeholder={language === "en" ? "Enter phone number" : "फोन नम्बर प्रविष्ट गर्नुहोस्"} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="citizenship">{language === "en" ? "Citizenship Number" : "नागरिकता नम्बर"}</Label>
                  <Input
                    id="citizenship"
                    placeholder={language === "en" ? "Enter citizenship number" : "नागरिकता नम्बर प्रविष्ट गर्नुहोस्"}
                  />
                </div>

                <Button className="w-full bg-[#1F4E79] hover:bg-[#1F4E79]/90" onClick={() => setCurrentStep(2)}>
                  {language === "en" ? "Next" : "अर्को"}
                </Button>
              </>
            )}

            {currentStep === 2 && (
              <>
                {/* Address Information */}
                <div className="space-y-2">
                  <Label htmlFor="ward">{language === "en" ? "Ward Number" : "वडा नम्बर"}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={language === "en" ? "Select ward" : "वडा छान्नुहोस्"} />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((ward) => (
                        <SelectItem key={ward} value={`ward-${ward}`}>
                          {language === "en" ? `Ward ${ward}` : `वडा ${ward}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">{language === "en" ? "Full Address" : "पूरा ठेगाना"}</Label>
                  <Input
                    id="address"
                    placeholder={language === "en" ? "Enter complete address" : "पूरा ठेगाना प्रविष्ट गर्नुहोस्"}
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">{language === "en" ? "Password" : "पासवर्ड"}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={language === "en" ? "Create password" : "पासवर्ड सिर्जना गर्नुहोस्"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">
                    {language === "en" ? "Confirm Password" : "पासवर्ड पुष्टि गर्नुहोस्"}
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder={language === "en" ? "Confirm password" : "पासवर्ड पुष्टि गर्नुहोस्"}
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={setAgreeToTerms} className="mt-1" />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    {language === "en" ? (
                      <>
                        I agree to the{" "}
                        <Link href="/terms" className="text-[#1F4E79] hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-[#1F4E79] hover:underline">
                          Privacy Policy
                        </Link>
                      </>
                    ) : (
                      <>
                        म{" "}
                        <Link href="/terms" className="text-[#1F4E79] hover:underline">
                          सेवाका सर्तहरू
                        </Link>{" "}
                        र{" "}
                        <Link href="/privacy" className="text-[#1F4E79] hover:underline">
                          गोपनीयता नीति
                        </Link>{" "}
                        मा सहमत छु
                      </>
                    )}
                  </Label>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setCurrentStep(1)}>
                    {language === "en" ? "Back" : "पछाडि"}
                  </Button>
                  <Button className="flex-1 bg-[#1F4E79] hover:bg-[#1F4E79]/90" disabled={!agreeToTerms}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    {language === "en" ? "Create Account" : "खाता सिर्जना गर्नुहोस्"}
                  </Button>
                </div>
              </>
            )}

            {/* Sign In Link */}
            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                {language === "en" ? "Already have an account?" : "पहिले नै खाता छ?"}
                <Link href="/auth/login" className="ml-1 text-[#1F4E79] hover:underline font-medium">
                  {language === "en" ? "Sign in" : "साइन इन गर्नुहोस्"}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>
            {language === "en"
              ? "© 2024 Palika Municipal Management System. All rights reserved."
              : "© २०२४ पालिका नगरपालिका व्यवस्थापन प्रणाली। सबै अधिकार सुरक्षित।"}
          </p>
        </div>
      </div>
    </div>
  )
}
