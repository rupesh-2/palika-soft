"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EmployeeDirectory } from "@/components/employee-directory"
import { NoticesEvents } from "@/components/notices-events"
import {
  Building2,
  Globe,
  FileText,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  ArrowRight,
  Shield,
  Clock,
  CheckCircle,
  Award,
  Briefcase,
  Menu,
  X,
} from "lucide-react"

const services = [
  {
    title: "व्यवसाय दर्ता",
    titleEn: "Business Registration",
    description: "नयाँ व्यवसाय दर्ता र नवीकरण",
    descriptionEn: "New business registration and renewal",
    icon: Briefcase,
  },
  {
    title: "सिफारिस सेवा",
    titleEn: "Recommendation Service",
    description: "विभिन्न सिफारिस पत्रहरू",
    descriptionEn: "Various recommendation letters",
    icon: FileText,
  },
  {
    title: "नागरिकता सेवा",
    titleEn: "Citizenship Service",
    description: "नागरिकता सम्बन्धी सेवाहरू",
    descriptionEn: "Citizenship related services",
    icon: Shield,
  },
  {
    title: "योजना तथा कार्यक्रम",
    titleEn: "Plans and Programs",
    description: "विकास योजना र कार्यक्रमहरू",
    descriptionEn: "Development plans and programs",
    icon: Award,
  },
]

export default function LandingPage() {
  const [language, setLanguage] = useState<"en" | "np">("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Top Banner */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm">
        <p>
          {language === "en"
            ? "🎉 New online services available! Register for digital services today."
            : "🎉 नयाँ अनलाइन सेवाहरू उपलब्ध! आज डिजिटल सेवाहरूको लागि दर्ता गर्नुहोस्।"}
        </p>
      </div>

      {/* Navigation */}
      <nav className="bg-background border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {language === "en" ? "Belbari Municipality" : "बेलबारी नगरपालिका"}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {language === "en" ? "Management System" : "व्यवस्थापन प्रणाली"}
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-foreground hover:text-primary transition-colors">
                {language === "en" ? "Services" : "सेवाहरू"}
              </a>
              <a href="#staff" className="text-foreground hover:text-primary transition-colors">
                {language === "en" ? "Staff Directory" : "कर्मचारी सूची"}
              </a>
              <a href="#notices" className="text-foreground hover:text-primary transition-colors">
                {language === "en" ? "Notices" : "सूचनाहरू"}
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">
                {language === "en" ? "Contact" : "सम्पर्क"}
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => setLanguage(language === "en" ? "np" : "en")}>
                <Globe className="h-4 w-4 mr-2" />
                {language === "en" ? "नेपाली" : "English"}
              </Button>
              <Link href="/auth/login">
                <Button variant="outline">{language === "en" ? "Sign In" : "साइन इन"}</Button>
              </Link>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t bg-background py-4">
              <div className="flex flex-col space-y-4">
                <a
                  href="#services"
                  className="text-foreground hover:text-primary transition-colors px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {language === "en" ? "Services" : "सेवाहरू"}
                </a>
                <a
                  href="#staff"
                  className="text-foreground hover:text-primary transition-colors px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {language === "en" ? "Staff Directory" : "कर्मचारी सूची"}
                </a>
                <a
                  href="#notices"
                  className="text-foreground hover:text-primary transition-colors px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {language === "en" ? "Notices" : "सूचनाहरू"}
                </a>
                <a
                  href="#contact"
                  className="text-foreground hover:text-primary transition-colors px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {language === "en" ? "Contact" : "सम्पर्क"}
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                {language === "en"
                  ? "Digital Municipal Services for Modern Citizens"
                  : "आधुनिक नागरिकहरूको लागि डिजिटल नगरपालिका सेवाहरू"}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                {language === "en"
                  ? "Access all Belbari Municipality services online. Fast, secure, and available 24/7 for your convenience."
                  : "सबै बेलबारी नगरपालिका सेवाहरू अनलाइन पहुँच गर्नुहोस्। छिटो, सुरक्षित, र तपाईंको सुविधाको लागि २४/७ उपलब्ध।"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/login?type=citizen">
                  <Button size="lg" className="w-full sm:w-auto">
                    {language === "en" ? "Citizen Login" : "नागरिक लगइन"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/auth/login?type=staff">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                    {language === "en" ? "Staff Login" : "कर्मचारी लगइन"}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">
                        {language === "en" ? "Services Online" : "सेवाहरू अनलाइन"}
                      </span>
                    </div>
                    <Badge variant="secondary">24/7</Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                      <span className="text-sm">{language === "en" ? "Business Registration" : "व्यवसाय दर्ता"}</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                      <span className="text-sm">{language === "en" ? "Recommendation Letters" : "सिफारिस पत्रहरू"}</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                      <span className="text-sm">{language === "en" ? "Complaint System" : "गुनासो प्रणाली"}</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {language === "en" ? "Our Services" : "हाम्रा सेवाहरू"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === "en"
                ? "Comprehensive municipal services designed to serve our community efficiently"
                : "हाम्रो समुदायलाई कुशलतापूर्वक सेवा प्रदान गर्न डिजाइन गरिएका व्यापक नगरपालिका सेवाहरू"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{language === "en" ? service.titleEn : service.title}</CardTitle>
                  <CardDescription>{language === "en" ? service.descriptionEn : service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Directory Section */}
      <section id="staff" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmployeeDirectory language={language} />
        </div>
      </section>

      {/* Notices & Events Section */}
      <section id="notices" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NoticesEvents language={language} />
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Building2 className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-bold">
                    {language === "en" ? "Belbari Municipality" : "बेलबारी नगरपालिका"}
                  </h3>
                  <p className="text-sm opacity-90">{language === "en" ? "Management System" : "व्यवस्थापन प्रणाली"}</p>
                </div>
              </div>
              <p className="text-sm opacity-90 mb-6 max-w-md">
                {language === "en"
                  ? "Serving our community with dedication, transparency, and modern digital solutions for all municipal services."
                  : "सबै नगरपालिका सेवाहरूको लागि समर्पण, पारदर्शिता, र आधुनिक डिजिटल समाधानहरूसँग हाम्रो समुदायको सेवा गर्दै।"}
              </p>
              <div className="flex space-x-4">
                <Button variant="secondary" size="sm">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="sm">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="sm">
                  <Instagram className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{language === "en" ? "Quick Links" : "द्रुत लिङ्कहरू"}</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>
                  <a href="#services" className="hover:opacity-100 transition-opacity">
                    {language === "en" ? "Services" : "सेवाहरू"}
                  </a>
                </li>
                <li>
                  <a href="#staff" className="hover:opacity-100 transition-opacity">
                    {language === "en" ? "Staff Directory" : "कर्मचारी सूची"}
                  </a>
                </li>
                <li>
                  <a href="#notices" className="hover:opacity-100 transition-opacity">
                    {language === "en" ? "Notices" : "सूचनाहरू"}
                  </a>
                </li>
                <li>
                  <Link href="/auth/login" className="hover:opacity-100 transition-opacity">
                    {language === "en" ? "Login" : "लगइन"}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{language === "en" ? "Contact Info" : "सम्पर्क जानकारी"}</h4>
              <div className="space-y-3 text-sm opacity-90">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {language === "en" ? "Belbari Municipality Office, Morang" : "बेलबारी नगरपालिका कार्यालय, मोरङ"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+977-21-567890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@belbari.gov.np</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{language === "en" ? "Sun-Fri: 10:00 AM - 5:00 PM" : "आइत-शुक्र: बिहान १०:०० - बेलुका ५:००"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm opacity-90">
            <p>
              {language === "en"
                ? "© 2025 Belbari Municipality Management System. All rights reserved."
                : "© २०२५ बेलबारी नगरपालिका व्यवस्थापन प्रणाली। सबै अधिकार सुरक्षित।"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
