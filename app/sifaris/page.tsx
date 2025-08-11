"use client"

import { useState } from "react"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  FileCheck,
  Upload,
  Download,
  Search,
  User,
  Home,
  Briefcase,
  Shield,
  Plane,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  QrCode,
  FileText,
  Info,
} from "lucide-react"

const sifarisTypes = [
  {
    id: "citizenship",
    title: "Citizenship Verification",
    titleNp: "नागरिकता प्रमाणीकरण",
    icon: User,
    description: "For citizenship certificate verification",
    descriptionNp: "नागरिकता प्रमाणपत्र प्रमाणीकरणको लागि",
    documents: ["Citizenship Certificate", "Ward Recommendation", "Birth Certificate"],
    documentsNp: ["नागरिकता प्रमाणपत्र", "वडा सिफारिस", "जन्म प्रमाणपत्र"],
  },
  {
    id: "migration",
    title: "Migration Certificate",
    titleNp: "बसाइसराइ प्रमाणपत्र",
    icon: Plane,
    description: "For internal migration within Nepal",
    descriptionNp: "नेपाल भित्र आन्तरिक बसाइसराइको लागि",
    documents: ["Current Address Proof", "Previous Address Certificate", "Family Details"],
    documentsNp: ["हालको ठेगाना प्रमाण", "अघिल्लो ठेगाना प्रमाणपत्र", "पारिवारिक विवरण"],
  },
  {
    id: "land",
    title: "Land Ownership",
    titleNp: "जग्गा स्वामित्व",
    icon: MapPin,
    description: "For land ownership verification",
    descriptionNp: "जग्गा स्वामित्व प्रमाणीकरणको लागि",
    documents: ["Land Certificate", "Tax Receipt", "Survey Report"],
    documentsNp: ["जग्गा प्रमाणपत्र", "कर रसिद", "सर्वेक्षण रिपोर्ट"],
  },
  {
    id: "business",
    title: "Business Verification",
    titleNp: "व्यवसाय प्रमाणीकरण",
    icon: Briefcase,
    description: "For business operation verification",
    descriptionNp: "व्यवसाय सञ्चालन प्रमाणीकरणको लागि",
    documents: ["Business Registration", "Tax Clearance", "Location Proof"],
    documentsNp: ["व्यवसाय दर्ता", "कर क्लियरेन्स", "स्थान प्रमाण"],
  },
  {
    id: "character",
    title: "Character Verification",
    titleNp: "चरित्र प्रमाणीकरण",
    icon: Shield,
    description: "For character certificate verification",
    descriptionNp: "चरित्र प्रमाणपत्र प्रमाणीकरणको लागि",
    documents: ["Citizenship Certificate", "Police Report", "Ward Recommendation"],
    documentsNp: ["नागरिकता प्रमाणपत्र", "प्रहरी रिपोर्ट", "वडा सिफारिस"],
  },
  {
    id: "income",
    title: "Income Verification",
    titleNp: "आय प्रमाणीकरण",
    icon: Home,
    description: "For income certificate verification",
    descriptionNp: "आय प्रमाणपत्र प्रमाणीकरणको लागि",
    documents: ["Income Statement", "Bank Statement", "Employment Letter"],
    documentsNp: ["आय विवरण", "बैंक स्टेटमेन्ट", "रोजगारी पत्र"],
  },
]

const mockApplications = [
  {
    id: "SIF-2024-001",
    type: "citizenship",
    applicantName: "राम बहादुर श्रेष्ठ",
    submittedDate: "2024-01-15",
    status: "approved",
    progress: 100,
    remarks: "All documents verified successfully",
    remarksNp: "सबै कागजातहरू सफलतापूर्वक प्रमाणित",
  },
  {
    id: "SIF-2024-002",
    type: "migration",
    applicantName: "सीता देवी पौडेल",
    submittedDate: "2024-01-18",
    status: "in-review",
    progress: 60,
    remarks: "Physical verification scheduled",
    remarksNp: "भौतिक प्रमाणीकरण तालिका तय",
  },
  {
    id: "SIF-2024-003",
    type: "business",
    applicantName: "हरि प्रसाद गुरुङ",
    submittedDate: "2024-01-20",
    status: "pending",
    progress: 25,
    remarks: "Waiting for document review",
    remarksNp: "कागजात समीक्षाको प्रतीक्षामा",
  },
]

export default function SifarisPage() {
  const [language, setLanguage] = useState<"en" | "np">("en")
  const [selectedType, setSelectedType] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    applicantName: "",
    citizenshipNo: "",
    address: "",
    phone: "",
    email: "",
    purpose: "",
    reason: "",
  })
  const { toast } = useToast()

  const handleSubmitApplication = () => {
    if (!selectedType || !formData.applicantName || !formData.citizenshipNo) {
      toast({
        title: language === "en" ? "Validation Error" : "प्रमाणीकरण त्रुटि",
        description: language === "en" ? "Please fill in all required fields" : "कृपया सबै आवश्यक फिल्डहरू भर्नुहोस्",
        variant: "destructive",
      })
      return
    }

    toast({
      title: language === "en" ? "Application Submitted" : "आवेदन पेश गरियो",
      description:
        language === "en"
          ? "Your Sifaris application has been submitted successfully. Tracking ID: SIF-2024-004"
          : "तपाईंको सिफारिस आवेदन सफलतापूर्वक पेश गरियो। ट्र्याकिङ आईडी: SIF-2024-004",
    })

    // Reset form
    setFormData({
      applicantName: "",
      citizenshipNo: "",
      address: "",
      phone: "",
      email: "",
      purpose: "",
      reason: "",
    })
    setSelectedType("")
  }

  const handleDownloadSifaris = (applicationId: string) => {
    toast({
      title: language === "en" ? "Download Started" : "डाउनलोड सुरु भयो",
      description:
        language === "en"
          ? `Downloading Sifaris certificate for ${applicationId}`
          : `${applicationId} को लागि सिफारिस प्रमाणपत्र डाउनलोड गर्दै`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "in-review":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "in-review":
        return <Clock className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const filteredApplications = mockApplications.filter(
    (app) =>
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarNavigation />

      <div className="md:ml-64 p-4 md:p-8">
        <div className="mb-8 mt-12 md:mt-0">
          <h1 className="text-3xl font-bold text-[#1F4E79] mb-2">
            {language === "en" ? "Sifaris (Official Recommendations)" : "सिफारिस (आधिकारिक सिफारिसहरू)"}
          </h1>
          <p className="text-gray-600">
            {language === "en"
              ? "Request official municipal recommendation letters for various government processes"
              : "विभिन्न सरकारी प्रक्रियाहरूको लागि आधिकारिक नगरपालिका सिफारिस पत्रहरू अनुरोध गर्नुहोस्"}
          </p>
        </div>

        <Tabs defaultValue="apply" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="apply">{language === "en" ? "Apply" : "आवेदन"}</TabsTrigger>
            <TabsTrigger value="track">{language === "en" ? "Track Status" : "स्थिति ट्र्याक"}</TabsTrigger>
            <TabsTrigger value="download">{language === "en" ? "Download" : "डाउनलोड"}</TabsTrigger>
            <TabsTrigger value="guidelines">{language === "en" ? "Guidelines" : "दिशानिर्देशहरू"}</TabsTrigger>
          </TabsList>

          {/* Apply Tab */}
          <TabsContent value="apply" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79]">
                  {language === "en" ? "Select Sifaris Type" : "सिफारिस प्रकार छान्नुहोस्"}
                </CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Choose the type of official recommendation you need"
                    : "तपाईंलाई चाहिने आधिकारिक सिफारिसको प्रकार छान्नुहोस्"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sifarisTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <Card
                        key={type.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedType === type.id ? "ring-2 ring-[#1F4E79] bg-blue-50" : ""
                        }`}
                        onClick={() => setSelectedType(type.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-2">
                            <Icon className="h-6 w-6 text-[#1F4E79]" />
                            <h3 className="font-semibold text-[#1F4E79]">
                              {language === "en" ? type.title : type.titleNp}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600">
                            {language === "en" ? type.description : type.descriptionNp}
                          </p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {selectedType && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1F4E79]">
                    {language === "en" ? "Application Form" : "आवेदन फारम"}
                  </CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "Fill in your details for the Sifaris application"
                      : "सिफारिस आवेदनको लागि आफ्ना विवरणहरू भर्नुहोस्"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="applicantName">{language === "en" ? "Full Name" : "पूरा नाम"} *</Label>
                      <Input
                        id="applicantName"
                        value={formData.applicantName}
                        onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                        placeholder={language === "en" ? "Enter your full name" : "आफ्नो पूरा नाम लेख्नुहोस्"}
                      />
                    </div>
                    <div>
                      <Label htmlFor="citizenshipNo">
                        {language === "en" ? "Citizenship Number" : "नागरिकता नम्बर"} *
                      </Label>
                      <Input
                        id="citizenshipNo"
                        value={formData.citizenshipNo}
                        onChange={(e) => setFormData({ ...formData, citizenshipNo: e.target.value })}
                        placeholder={language === "en" ? "Enter citizenship number" : "नागरिकता नम्बर लेख्नुहोस्"}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">{language === "en" ? "Phone Number" : "फोन नम्बर"}</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={language === "en" ? "Enter phone number" : "फोन नम्बर लेख्नुहोस्"}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{language === "en" ? "Email Address" : "इमेल ठेगाना"}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={language === "en" ? "Enter email address" : "इमेल ठेगाना लेख्नुहोस्"}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">{language === "en" ? "Current Address" : "हालको ठेगाना"}</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder={language === "en" ? "Enter your current address" : "आफ्नो हालको ठेगाना लेख्नुहोस्"}
                    />
                  </div>

                  <div>
                    <Label htmlFor="purpose">{language === "en" ? "Purpose" : "उद्देश्य"}</Label>
                    <Input
                      id="purpose"
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      placeholder={language === "en" ? "Purpose of this Sifaris" : "यो सिफारिसको उद्देश्य"}
                    />
                  </div>

                  <div>
                    <Label htmlFor="reason">{language === "en" ? "Detailed Reason" : "विस्तृत कारण"}</Label>
                    <Textarea
                      id="reason"
                      value={formData.reason}
                      onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      placeholder={
                        language === "en"
                          ? "Explain why you need this Sifaris"
                          : "तपाईंलाई यो सिफारिस किन चाहिन्छ व्याख्या गर्नुहोस्"
                      }
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>{language === "en" ? "Required Documents" : "आवश्यक कागजातहरू"}</Label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Upload className="h-4 w-4 text-[#1F4E79]" />
                        <span className="text-sm font-medium text-[#1F4E79]">
                          {language === "en" ? "Upload Documents:" : "कागजातहरू अपलोड गर्नुहोस्:"}
                        </span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {sifarisTypes
                          .find((type) => type.id === selectedType)
                          ?.documents.map((doc, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <div className="w-1 h-1 bg-[#1F4E79] rounded-full"></div>
                              <span>
                                {language === "en"
                                  ? doc
                                  : sifarisTypes.find((type) => type.id === selectedType)?.documentsNp?.[index]}
                              </span>
                            </li>
                          ))}
                      </ul>
                      <Button variant="outline" className="mt-3 bg-transparent" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        {language === "en" ? "Choose Files" : "फाइलहरू छान्नुहोस्"}
                      </Button>
                    </div>
                  </div>

                  <Button onClick={handleSubmitApplication} className="w-full bg-[#1F4E79] hover:bg-[#1a4269]">
                    <FileCheck className="h-4 w-4 mr-2" />
                    {language === "en" ? "Submit Application" : "आवेदन पेश गर्नुहोस्"}
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Track Status Tab */}
          <TabsContent value="track" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79]">
                  {language === "en" ? "Track Application Status" : "आवेदन स्थिति ट्र्याक गर्नुहोस्"}
                </CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Search and track your Sifaris applications"
                    : "आफ्ना सिफारिस आवेदनहरू खोज्नुहोस् र ट्र्याक गर्नुहोस्"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder={language === "en" ? "Search by Application ID or Name" : "आवेदन आईडी वा नामले खोज्नुहोस्"}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {filteredApplications.map((application) => (
                    <Card key={application.id} className="border-l-4 border-l-[#1F4E79]">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-[#1F4E79]">{application.id}</h3>
                            <p className="text-sm text-gray-600">{application.applicantName}</p>
                          </div>
                          <Badge className={getStatusColor(application.status)}>
                            {getStatusIcon(application.status)}
                            <span className="ml-1">
                              {language === "en"
                                ? application.status.charAt(0).toUpperCase() + application.status.slice(1)
                                : application.status === "approved"
                                  ? "स्वीकृत"
                                  : application.status === "in-review"
                                    ? "समीक्षामा"
                                    : application.status === "rejected"
                                      ? "अस्वीकृत"
                                      : "बाँकी"}
                            </span>
                          </Badge>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{language === "en" ? "Progress" : "प्रगति"}</span>
                            <span>{application.progress}%</span>
                          </div>
                          <Progress value={application.progress} className="h-2" />
                        </div>

                        <div className="text-sm text-gray-600 mb-2">
                          <p>
                            <strong>{language === "en" ? "Type:" : "प्रकार:"}</strong>{" "}
                            {language === "en"
                              ? sifarisTypes.find((type) => type.id === application.type)?.title
                              : sifarisTypes.find((type) => type.id === application.type)?.titleNp}
                          </p>
                          <p>
                            <strong>{language === "en" ? "Submitted:" : "पेश गरिएको:"}</strong>{" "}
                            {application.submittedDate}
                          </p>
                          <p>
                            <strong>{language === "en" ? "Remarks:" : "टिप्पणी:"}</strong>{" "}
                            {language === "en" ? application.remarks : application.remarksNp}
                          </p>
                        </div>

                        {application.status === "approved" && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleDownloadSifaris(application.id)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            {language === "en" ? "Download Certificate" : "प्रमाणपत्र डाउनलोड"}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Download Tab */}
          <TabsContent value="download" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79]">
                  {language === "en" ? "Download Approved Sifaris" : "स्वीकृत सिफारिसहरू डाउनलोड गर्नुहोस्"}
                </CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Download your approved Sifaris certificates"
                    : "आफ्ना स्वीकृत सिफारिस प्रमाणपत्रहरू डाउनलोड गर्नुहोस्"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockApplications
                    .filter((app) => app.status === "approved")
                    .map((application) => (
                      <Card key={application.id} className="border border-green-200 bg-green-50">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold text-[#1F4E79]">{application.id}</h3>
                              <p className="text-sm text-gray-600">{application.applicantName}</p>
                              <p className="text-xs text-green-600">
                                {language === "en" ? "Approved on" : "स्वीकृत मिति"}: {application.submittedDate}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" onClick={() => handleDownloadSifaris(application.id)}>
                                <QrCode className="h-4 w-4 mr-2" />
                                {language === "en" ? "QR Code" : "QR कोड"}
                              </Button>
                              <Button
                                size="sm"
                                className="bg-[#1F4E79] hover:bg-[#1a4269]"
                                onClick={() => handleDownloadSifaris(application.id)}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                {language === "en" ? "Download PDF" : "PDF डाउनलोड"}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guidelines Tab */}
          <TabsContent value="guidelines" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79]">
                  {language === "en" ? "Sifaris Guidelines" : "सिफारिस दिशानिर्देशहरू"}
                </CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Important information about Sifaris application process"
                    : "सिफारिस आवेदन प्रक्रियाको बारेमा महत्वपूर्ण जानकारी"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-[#1F4E79] mb-3 flex items-center">
                    <Info className="h-5 w-5 mr-2" />
                    {language === "en" ? "General Requirements" : "सामान्य आवश्यकताहरू"}
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-[#1F4E79] rounded-full mt-2"></div>
                      <span>
                        {language === "en"
                          ? "Valid citizenship certificate is mandatory for all applications"
                          : "सबै आवेदनहरूको लागि वैध नागरिकता प्रमाणपत्र अनिवार्य छ"}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-[#1F4E79] rounded-full mt-2"></div>
                      <span>
                        {language === "en"
                          ? "All documents must be clear and legible scanned copies"
                          : "सबै कागजातहरू स्पष्ट र पढ्न सकिने स्क्यान गरिएका प्रतिलिपिहरू हुनुपर्छ"}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-[#1F4E79] rounded-full mt-2"></div>
                      <span>
                        {language === "en"
                          ? "Processing time varies from 3-7 working days depending on verification requirements"
                          : "प्रमाणीकरण आवश्यकताहरूको आधारमा प्रशोधन समय ३-७ कार्य दिन फरक हुन्छ"}
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-[#1F4E79] mb-3 flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    {language === "en" ? "Document Requirements by Type" : "प्रकार अनुसार कागजात आवश्यकताहरू"}
                  </h3>
                  <div className="space-y-4">
                    {sifarisTypes.map((type) => (
                      <div key={type.id} className="border rounded-lg p-4">
                        <h4 className="font-medium text-[#1F4E79] mb-2">
                          {language === "en" ? type.title : type.titleNp}
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {type.documents.map((doc, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <div className="w-1 h-1 bg-[#FFC107] rounded-full"></div>
                              <span>{language === "en" ? doc : type.documentsNp[index]}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">
                    {language === "en" ? "Important Notes" : "महत्वपूर्ण टिप्पणीहरू"}
                  </h3>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>
                      {language === "en"
                        ? "• Physical verification may be required for certain types of Sifaris"
                        : "• केही प्रकारका सिफारिसहरूको लागि भौतिक प्रमाणीकरण आवश्यक हुन सक्छ"}
                    </li>
                    <li>
                      {language === "en"
                        ? "• Approved Sifaris certificates are valid for 6 months from issue date"
                        : "• स्वीकृत सिफारिस प्रमाणपत्रहरू जारी मितिदेखि ६ महिनासम्म मान्य हुन्छन्"}
                    </li>
                    <li>
                      {language === "en"
                        ? "• Contact municipal office for any queries or assistance"
                        : "• कुनै प्रश्न वा सहायताको लागि नगरपालिका कार्यालयमा सम्पर्क गर्नुहोस्"}
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
