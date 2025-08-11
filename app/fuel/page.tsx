"use client"

import type React from "react"

import { useState } from "react"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Fuel, Upload, QrCode, CheckCircle, Clock, X, Globe, BarChart3 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const fuelTypes = [
  { value: "petrol", label: "Petrol", labelNp: "पेट्रोल" },
  { value: "diesel", label: "Diesel", labelNp: "डिजेल" },
  { value: "kerosene", label: "Kerosene", labelNp: "मट्टितेल" },
]

const vehicleTypes = [
  { value: "motorcycle", label: "Motorcycle", labelNp: "मोटरसाइकल" },
  { value: "car", label: "Car", labelNp: "कार" },
  { value: "truck", label: "Truck", labelNp: "ट्रक" },
  { value: "bus", label: "Bus", labelNp: "बस" },
  { value: "tractor", label: "Tractor", labelNp: "ट्र्याक्टर" },
  { value: "ambulance", label: "Ambulance", labelNp: "एम्बुलेन्स" },
]

const fuelRequests = [
  {
    id: "FT001",
    requester: "Ram Bahadur Thapa",
    purpose: "Municipal Vehicle Maintenance",
    purposeNp: "नगरपालिका सवारी साधन मर्मत",
    vehicleType: "Truck",
    fuelType: "Diesel",
    requestedLiters: 50,
    status: "approved",
    requestDate: "2024-11-01",
    approvalDate: "2024-11-02",
    ward: "Ward 3",
    vehicleNumber: "Ba 1 Cha 1234",
  },
  {
    id: "FT002",
    requester: "Sita Devi Sharma",
    purpose: "Emergency Medical Service",
    purposeNp: "आपतकालीन चिकित्सा सेवा",
    vehicleType: "Ambulance",
    fuelType: "Diesel",
    requestedLiters: 30,
    status: "pending",
    requestDate: "2024-11-03",
    ward: "Ward 1",
    vehicleNumber: "Ba 2 Cha 5678",
  },
  {
    id: "FT003",
    requester: "Hari Prasad Oli",
    purpose: "Agricultural Work",
    purposeNp: "कृषि कार्य",
    vehicleType: "Tractor",
    fuelType: "Diesel",
    requestedLiters: 25,
    status: "rejected",
    requestDate: "2024-10-28",
    rejectionReason: "Insufficient documentation",
    ward: "Ward 5",
    vehicleNumber: "Ba 3 Cha 9012",
  },
]

const fuelDistribution = [
  {
    tokenId: "FT001",
    requester: "Ram Bahadur Thapa",
    fuelType: "Diesel",
    approvedLiters: 50,
    distributedLiters: 50,
    distributionDate: "2024-11-02",
    distributionPoint: "Municipal Fuel Station",
    status: "completed",
  },
  {
    tokenId: "FT004",
    requester: "Krishna Bahadur KC",
    fuelType: "Petrol",
    approvedLiters: 20,
    distributedLiters: 20,
    distributionDate: "2024-11-01",
    distributionPoint: "Ward 2 Distribution Center",
    status: "completed",
  },
]

const monthlyStats = {
  totalRequests: 45,
  approvedRequests: 32,
  rejectedRequests: 8,
  pendingRequests: 5,
  totalFuelDistributed: 1250,
  budgetUtilized: 75,
}

export default function FuelManagement() {
  const [language, setLanguage] = useState<"en" | "np">("en")
  const [activeTab, setActiveTab] = useState("request")
  const [showQRCode, setShowQRCode] = useState(false)
  const [selectedToken, setSelectedToken] = useState<string | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    requesterName: "",
    ward: "",
    vehicleType: "",
    fuelType: "",
    fuelAmount: "",
    vehicleNumber: "",
    contactNumber: "",
    purpose: "",
  })

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.requesterName ||
      !formData.ward ||
      !formData.vehicleType ||
      !formData.fuelType ||
      !formData.fuelAmount ||
      !formData.vehicleNumber ||
      !formData.contactNumber ||
      !formData.purpose
    ) {
      toast({
        title: language === "en" ? "Validation Error" : "प्रमाणीकरण त्रुटि",
        description: language === "en" ? "Please fill in all required fields" : "कृपया सबै आवश्यक फिल्डहरू भर्नुहोस्",
        variant: "destructive",
      })
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: language === "en" ? "Request Submitted!" : "अनुरोध पेश गरियो!",
        description:
          language === "en"
            ? "Your fuel request has been submitted successfully. You will be notified once it's reviewed."
            : "तपाईंको इन्धन अनुरोध सफलतापूर्वक पेश गरिएको छ। समीक्षा भएपछि तपाईंलाई सूचना दिइनेछ।",
        variant: "default",
      })

      setFormData({
        requesterName: "",
        ward: "",
        vehicleType: "",
        fuelType: "",
        fuelAmount: "",
        vehicleNumber: "",
        contactNumber: "",
        purpose: "",
      })

      setActiveTab("status")
    } catch (error) {
      toast({
        title: language === "en" ? "Submission Failed" : "पेश गर्न असफल",
        description:
          language === "en"
            ? "Failed to submit fuel request. Please try again."
            : "इन्धन अनुरोध पेश गर्न असफल। कृपया फेरि प्रयास गर्नुहोस्।",
        variant: "destructive",
      })
    }
  }

  const handleFileUpload = (documentType: string) => {
    toast({
      title: language === "en" ? "File Upload" : "फाइल अपलोड",
      description:
        language === "en" ? `${documentType} uploaded successfully` : `${documentType} सफलतापूर्वक अपलोड गरियो`,
      variant: "default",
    })
  }

  const handleGenerateToken = (tokenId: string) => {
    setSelectedToken(tokenId)
    setShowQRCode(true)
    toast({
      title: language === "en" ? "Token Generated" : "टोकन जेनेरेट गरियो",
      description:
        language === "en"
          ? `QR code token for ${tokenId} has been generated`
          : `${tokenId} को QR कोड टोकन जेनेरेट गरिएको छ`,
      variant: "default",
    })
  }

  const handleDownloadQR = () => {
    toast({
      title: language === "en" ? "Download Started" : "डाउनलोड सुरु भयो",
      description:
        language === "en" ? "QR code is being downloaded to your device" : "QR कोड तपाईंको यन्त्रमा डाउनलोड भइरहेको छ",
      variant: "default",
    })
  }

  const handleGenerateReport = () => {
    toast({
      title: language === "en" ? "Report Generated" : "रिपोर्ट जेनेरेट गरियो",
      description:
        language === "en"
          ? "Fuel management report has been generated successfully"
          : "इन्धन व्यवस्थापन रिपोर्ट सफलतापूर्वक जेनेरेट गरिएको छ",
      variant: "default",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "rejected":
        return "bg-red-500"
      case "completed":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    const statusMap = {
      approved: { en: "Approved", np: "स्वीकृत" },
      pending: { en: "Pending", np: "बाँकी" },
      rejected: { en: "Rejected", np: "अस्वीकृत" },
      completed: { en: "Completed", np: "सम्पन्न" },
    }
    return statusMap[status as keyof typeof statusMap]?.[language] || status
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarNavigation />

      <div className="md:ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8 mt-12 md:mt-0 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#1F4E79] mb-2">
              {language === "en" ? "Fuel Management" : "इन्धन व्यवस्थापन"}
            </h1>
            <p className="text-gray-600">
              {language === "en"
                ? "Track and allocate fuel resources with token-based system"
                : "टोकन आधारित प्रणालीको साथ इन्धन स्रोतहरू ट्र्याक र बाँडफाँड गर्नुहोस्"}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setLanguage(language === "en" ? "np" : "en")}>
            <Globe className="h-4 w-4 mr-2" />
            {language === "en" ? "नेपाली" : "English"}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="request">{language === "en" ? "New Request" : "नयाँ अनुरोध"}</TabsTrigger>
            <TabsTrigger value="status">{language === "en" ? "Request Status" : "अनुरोध स्थिति"}</TabsTrigger>
            <TabsTrigger value="tokens">{language === "en" ? "Fuel Tokens" : "इन्धन टोकन"}</TabsTrigger>
            <TabsTrigger value="distribution">{language === "en" ? "Distribution" : "वितरण"}</TabsTrigger>
            <TabsTrigger value="reports">{language === "en" ? "Reports" : "रिपोर्टहरू"}</TabsTrigger>
          </TabsList>

          {/* New Request Tab */}
          <TabsContent value="request" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79]">
                  {language === "en" ? "Fuel Token Request" : "इन्धन टोकन अनुरोध"}
                </CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Submit a new fuel allocation request with required documentation"
                    : "आवश्यक कागजातहरू सहित नयाँ इन्धन बाँडफाँड अनुरोध पेश गर्नुहोस्"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmitRequest} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="requester-name">{language === "en" ? "Requester Name" : "अनुरोधकर्ताको नाम"}</Label>
                      <Input
                        id="requester-name"
                        placeholder="Enter full name"
                        value={formData.requesterName}
                        onChange={(e) => handleInputChange("requesterName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ward">{language === "en" ? "Ward Number" : "वडा नम्बर"}</Label>
                      <Select value={formData.ward} onValueChange={(value) => handleInputChange("ward", value)}>
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="vehicle-type">{language === "en" ? "Vehicle Type" : "सवारी साधनको प्रकार"}</Label>
                      <Select
                        value={formData.vehicleType}
                        onValueChange={(value) => handleInputChange("vehicleType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={language === "en" ? "Select vehicle type" : "सवारी साधनको प्रकार छान्नुहोस्"}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {vehicleTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {language === "en" ? type.label : type.labelNp}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fuel-type">{language === "en" ? "Fuel Type" : "इन्धनको प्रकार"}</Label>
                      <Select value={formData.fuelType} onValueChange={(value) => handleInputChange("fuelType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={language === "en" ? "Select fuel type" : "इन्धनको प्रकार छान्नुहोस्"} />
                        </SelectTrigger>
                        <SelectContent>
                          {fuelTypes.map((fuel) => (
                            <SelectItem key={fuel.value} value={fuel.value}>
                              {language === "en" ? fuel.label : fuel.labelNp}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fuel-amount">
                        {language === "en" ? "Fuel Amount (Liters)" : "इन्धन मात्रा (लिटर)"}
                      </Label>
                      <Input
                        id="fuel-amount"
                        type="number"
                        placeholder="Enter liters"
                        value={formData.fuelAmount}
                        onChange={(e) => handleInputChange("fuelAmount", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="vehicle-number">{language === "en" ? "Vehicle Number" : "सवारी साधन नम्बर"}</Label>
                      <Input
                        id="vehicle-number"
                        placeholder="Ba 1 Cha 1234"
                        value={formData.vehicleNumber}
                        onChange={(e) => handleInputChange("vehicleNumber", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-number">{language === "en" ? "Contact Number" : "सम्पर्क नम्बर"}</Label>
                      <Input
                        id="contact-number"
                        placeholder="Enter phone number"
                        value={formData.contactNumber}
                        onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose">
                      {language === "en" ? "Purpose of Fuel Request" : "इन्धन अनुरोधको उद्देश्य"}
                    </Label>
                    <Textarea
                      id="purpose"
                      placeholder={
                        language === "en" ? "Describe the purpose for fuel request" : "इन्धन अनुरोधको उद्देश्यको वर्णन गर्नुहोस्"
                      }
                      rows={3}
                      value={formData.purpose}
                      onChange={(e) => handleInputChange("purpose", e.target.value)}
                      required
                    />
                  </div>

                  {/* Document Upload Section */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-[#1F4E79]">
                      {language === "en" ? "Required Documents" : "आवश्यक कागजातहरू"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border-dashed border-2 border-gray-300">
                        <CardContent className="p-6 text-center">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h4 className="font-medium mb-2">
                            {language === "en" ? "Vehicle Registration" : "सवारी साधन दर्ता"}
                          </h4>
                          <p className="text-sm text-gray-600 mb-4">
                            {language === "en"
                              ? "Upload vehicle registration document"
                              : "सवारी साधन दर्ता कागजात अपलोड गर्नुहोस्"}
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleFileUpload(language === "en" ? "Vehicle Registration" : "सवारी साधन दर्ता")
                            }
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            {language === "en" ? "Choose File" : "फाइल छान्नुहोस्"}
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-dashed border-2 border-gray-300">
                        <CardContent className="p-6 text-center">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h4 className="font-medium mb-2">
                            {language === "en" ? "Municipal Approval" : "नगरपालिका स्वीकृति"}
                          </h4>
                          <p className="text-sm text-gray-600 mb-4">
                            {language === "en"
                              ? "Upload approval letter (if required)"
                              : "स्वीकृति पत्र अपलोड गर्नुहोस् (आवश्यक भएमा)"}
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleFileUpload(language === "en" ? "Municipal Approval" : "नगरपालिका स्वीकृति")
                            }
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            {language === "en" ? "Choose File" : "फाइल छान्नुहोस्"}
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="bg-[#1F4E79] hover:bg-[#1F4E79]/90">
                      <Fuel className="h-4 w-4 mr-2" />
                      {language === "en" ? "Submit Request" : "अनुरोध पेश गर्नुहोस्"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Request Status Tab */}
          <TabsContent value="status" className="space-y-6">
            <div className="grid gap-6">
              {fuelRequests.map((request) => (
                <Card key={request.id} className="border-l-4 border-l-[#FFC107]">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-[#1F4E79]">
                          {language === "en" ? request.purpose : request.purposeNp}
                        </CardTitle>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge className={`${getStatusColor(request.status)} text-white`}>
                            {getStatusText(request.status)}
                          </Badge>
                          <span className="text-sm text-gray-600">ID: {request.id}</span>
                          <span className="text-sm text-gray-600">{request.ward}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[#1F4E79]">
                          {request.requestedLiters}L {request.fuelType}
                        </div>
                        <div className="text-sm text-gray-600">{language === "en" ? "Requested" : "अनुरोध"}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">{language === "en" ? "Requester:" : "अनुरोधकर्ता:"}</span>
                        <div>{request.requester}</div>
                      </div>
                      <div>
                        <span className="font-medium">{language === "en" ? "Vehicle:" : "सवारी साधन:"}</span>
                        <div>
                          {request.vehicleType} ({request.vehicleNumber})
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">{language === "en" ? "Request Date:" : "अनुरोध मिति:"}</span>
                        <div>{request.requestDate}</div>
                      </div>
                    </div>
                    {request.status === "approved" && (
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm" onClick={() => handleGenerateToken(request.id)}>
                          <QrCode className="h-4 w-4 mr-2" />
                          {language === "en" ? "Generate Token" : "टोकन जेनेरेट गर्नुहोस्"}
                        </Button>
                      </div>
                    )}
                    {request.status === "rejected" && request.rejectionReason && (
                      <div className="mt-4 p-3 bg-red-50 rounded-lg">
                        <p className="text-sm text-red-700">
                          <span className="font-medium">
                            {language === "en" ? "Rejection Reason:" : "अस्वीकार कारण:"}
                          </span>{" "}
                          {request.rejectionReason}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Fuel Tokens Tab */}
          <TabsContent value="tokens" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79]">
                  {language === "en" ? "Active Fuel Tokens" : "सक्रिय इन्धन टोकनहरू"}
                </CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "QR codes for approved fuel requests ready for distribution"
                    : "वितरणको लागि तयार स्वीकृत इन्धन अनुरोधहरूको QR कोडहरू"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {fuelRequests
                    .filter((req) => req.status === "approved")
                    .map((token) => (
                      <Card key={token.id} className="border-l-4 border-l-green-500">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="space-y-1">
                              <h3 className="font-medium text-[#1F4E79]">
                                {language === "en" ? "Token ID:" : "टोकन ID:"} {token.id}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {token.requester} - {token.requestedLiters}L {token.fuelType}
                              </p>
                              <p className="text-xs text-gray-500">
                                {language === "en" ? "Approved:" : "स्वीकृत:"} {token.approvalDate}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleGenerateToken(token.id)}>
                                <QrCode className="h-4 w-4 mr-2" />
                                {language === "en" ? "Show QR" : "QR देखाउनुहोस्"}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* QR Code Modal */}
            {showQRCode && selectedToken && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <Card className="w-96">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-[#1F4E79]">
                        {language === "en" ? "Fuel Token QR Code" : "इन्धन टोकन QR कोड"}
                      </CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => setShowQRCode(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="w-48 h-48 bg-gray-100 mx-auto flex items-center justify-center border-2 border-dashed border-gray-300">
                      <QrCode className="h-24 w-24 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1F4E79]">Token ID: {selectedToken}</p>
                      <p className="text-sm text-gray-600">
                        {language === "en"
                          ? "Present this QR code at fuel distribution point"
                          : "यो QR कोड इन्धन वितरण केन्द्रमा प्रस्तुत गर्नुहोस्"}
                      </p>
                    </div>
                    <Button className="w-full bg-[#1F4E79] hover:bg-[#1F4E79]/90" onClick={handleDownloadQR}>
                      {language === "en" ? "Download QR Code" : "QR कोड डाउनलोड गर्नुहोस्"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Distribution Tab */}
          <TabsContent value="distribution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79]">
                  {language === "en" ? "Fuel Distribution History" : "इन्धन वितरण इतिहास"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fuelDistribution.map((dist) => (
                    <Card key={dist.tokenId} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div>
                              <h3 className="font-medium text-[#1F4E79]">Token: {dist.tokenId}</h3>
                              <p className="text-sm text-gray-600">{dist.requester}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">
                                  {language === "en" ? "Fuel Type:" : "इन्धनको प्रकार:"}
                                </span>
                                <div>{dist.fuelType}</div>
                              </div>
                              <div>
                                <span className="font-medium">{language === "en" ? "Distributed:" : "वितरण:"}</span>
                                <div>
                                  {dist.distributedLiters}L / {dist.approvedLiters}L
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={`${getStatusColor(dist.status)} text-white mb-2`}>
                              {getStatusText(dist.status)}
                            </Badge>
                            <div className="text-xs text-gray-500">{dist.distributionDate}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            {/* Monthly Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-[#1F4E79] text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    {language === "en" ? "Total Requests" : "कुल अनुरोधहरू"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monthlyStats.totalRequests}</div>
                </CardContent>
              </Card>

              <Card className="bg-green-500 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {language === "en" ? "Approved" : "स्वीकृत"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monthlyStats.approvedRequests}</div>
                </CardContent>
              </Card>

              <Card className="bg-[#FFC107] text-[#1F4E79]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Fuel className="h-4 w-4 mr-2" />
                    {language === "en" ? "Fuel Distributed" : "वितरण भएको इन्धन"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{monthlyStats.totalFuelDistributed}L</div>
                </CardContent>
              </Card>

              <Card className="bg-white border-l-4 border-l-[#1F4E79]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center text-[#1F4E79]">
                    <Clock className="h-4 w-4 mr-2" />
                    {language === "en" ? "Pending" : "बाँकी"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#1F4E79]">{monthlyStats.pendingRequests}</div>
                </CardContent>
              </Card>
            </div>

            {/* Budget Utilization */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79]">
                  {language === "en" ? "Monthly Budget Utilization" : "मासिक बजेट उपयोग"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{language === "en" ? "Fuel Budget Utilized" : "इन्धन बजेट उपयोग"}</span>
                    <span className="text-sm text-gray-600">{monthlyStats.budgetUtilized}%</span>
                  </div>
                  <Progress value={monthlyStats.budgetUtilized} className="h-3" />
                  <div className="text-sm text-gray-600">
                    Rs. 1,87,500 / Rs. 2,50,000 {language === "en" ? "utilized this month" : "यस महिना उपयोग"}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filter Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79]">
                  {language === "en" ? "Generate Reports" : "रिपोर्टहरू जेनेरेट गर्नुहोस्"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>{language === "en" ? "Report Type" : "रिपोर्टको प्रकार"}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={language === "en" ? "Select report type" : "रिपोर्टको प्रकार छान्नुहोस्"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">{language === "en" ? "Monthly Summary" : "मासिक सारांश"}</SelectItem>
                        <SelectItem value="ward-wise">
                          {language === "en" ? "Ward-wise Distribution" : "वडा अनुसार वितरण"}
                        </SelectItem>
                        <SelectItem value="fuel-type">
                          {language === "en" ? "Fuel Type Analysis" : "इन्धन प्रकार विश्लेषण"}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{language === "en" ? "From Date" : "देखि मिति"}</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>{language === "en" ? "To Date" : "सम्म मिति"}</Label>
                    <Input type="date" />
                  </div>
                </div>
                <Button className="bg-[#1F4E79] hover:bg-[#1F4E79]/90" onClick={handleGenerateReport}>
                  {language === "en" ? "Generate Report" : "रिपोर्ट जेनेरेट गर्नुहोस्"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
