"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { LogIn, Globe, Building2 } from "lucide-react"

const userTypes = [
  { value: "citizen", label: "Citizen", labelNp: "नागरिक" },
  { value: "staff", label: "Municipal Staff", labelNp: "नगरपालिका कर्मचारी" },
  { value: "officer", label: "Municipal Officer", labelNp: "नगरपालिका अधिकारी" },
]

export default function LoginPage() {
  const [language, setLanguage] = useState<"en" | "np">("en")
  const [userType, setUserType] = useState("citizen")
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="h-8 w-8 text-[#1F4E79]" />
            <h1 className="text-2xl font-bold text-[#1F4E79]">
              {language === "en" ? "Belbari Municipality" : "बेलबारी नगरपालिका"}
            </h1>
          </div>
          <p className="text-gray-600">{language === "en" ? "Management System" : "व्यवस्थापन प्रणाली"}</p>
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

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-[#1F4E79]">
              {language === "en" ? "Sign In" : "साइन इन गर्नुहोस्"}
            </CardTitle>
            <CardDescription className="text-center">
              {language === "en"
                ? "Enter your credentials to access the system"
                : "प्रणालीमा पहुँच गर्न आफ्नो प्रमाणहरू प्रविष्ट गर्नुहोस्"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* User Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="user-type">{language === "en" ? "User Type" : "प्रयोगकर्ता प्रकार"}</Label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger>
                  <SelectValue placeholder={language === "en" ? "Select user type" : "प्रयोगकर्ता प्रकार छान्नुहोस्"} />
                </SelectTrigger>
                <SelectContent>
                  {userTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {language === "en" ? type.label : type.labelNp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Email/Username */}
            <div className="space-y-2">
              <Label htmlFor="email">
                {userType === "citizen"
                  ? language === "en"
                    ? "Email or Phone"
                    : "इमेल वा फोन"
                  : language === "en"
                    ? "Employee ID"
                    : "कर्मचारी ID"}
              </Label>
              <Input
                id="email"
                type={userType === "citizen" ? "email" : "text"}
                placeholder={
                  userType === "citizen"
                    ? language === "en"
                      ? "Enter email or phone number"
                      : "इमेल वा फोन नम्बर प्रविष्ट गर्नुहोस्"
                    : language === "en"
                      ? "Enter employee ID"
                      : "कर्मचारी ID प्रविष्ट गर्नुहोस्"
                }
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">{language === "en" ? "Password" : "पासवर्ड"}</Label>
              <Input
                id="password"
                type="password"
                placeholder={language === "en" ? "Enter password" : "पासवर्ड प्रविष्ट गर्नुहोस्"}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" checked={rememberMe} onCheckedChange={setRememberMe} />
                <Label htmlFor="remember" className="text-sm">
                  {language === "en" ? "Remember me" : "मलाई सम्झनुहोस्"}
                </Label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-[#1F4E79] hover:underline">
                {language === "en" ? "Forgot password?" : "पासवर्ड बिर्सनुभयो?"}
              </Link>
            </div>

            {/* Sign In Button */}
            <Button className="w-full bg-[#1F4E79] hover:bg-[#1F4E79]/90">
              <LogIn className="h-4 w-4 mr-2" />
              {language === "en" ? "Sign In" : "साइन इन गर्नुहोस्"}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">{language === "en" ? "or" : "वा"}</span>
              </div>
            </div>

            {/* Sign Up Link */}
            {userType === "citizen" && (
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {language === "en" ? "Don't have an account?" : "खाता छैन?"}
                  <Link href="/auth/signup" className="ml-1 text-[#1F4E79] hover:underline font-medium">
                    {language === "en" ? "Sign up" : "साइन अप गर्नुहोस्"}
                  </Link>
                </p>
              </div>
            )}

            {/* Staff Registration Notice */}
            {userType !== "citizen" && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-700 text-center">
                  {language === "en"
                    ? "Staff accounts are created by system administrators. Contact IT department for access."
                    : "कर्मचारी खाताहरू प्रणाली प्रशासकहरूद्वारा सिर्जना गरिन्छ। पहुँचको लागि IT विभागलाई सम्पर्क गर्नुहोस्।"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>
            {language === "en"
              ? "© 2025 Belbari Municipality Management System. All rights reserved."
              : "© २०२५ बेलबारी नगरपालिका व्यवस्थापन प्रणाली। सबै अधिकार सुरक्षित।"}
          </p>
        </div>
      </div>
    </div>
  )
}
