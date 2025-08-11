"use client";

import { useState } from "react";
import { SidebarNavigation } from "@/components/sidebar-navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Upload,
  CheckCircle,
  Download,
  Search,
  Globe,
  User,
  MapPin,
  QrCode,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const registrationSteps = [
  { id: 1, title: "Business Details", titleNp: "व्यवसायिक विवरण" },
  { id: 2, title: "Owner Information", titleNp: "मालिकको जानकारी" },
  { id: 3, title: "Document Upload", titleNp: "कागजात अपलोड" },
  { id: 4, title: "Review & Submit", titleNp: "समीक्षा र पेश" },
];

const businessTypes = [
  { value: "retail", label: "Retail Shop", labelNp: "खुद्रा पसल" },
  { value: "restaurant", label: "Restaurant", labelNp: "रेस्टुरेन्ट" },
  { value: "manufacturing", label: "Manufacturing", labelNp: "उत्पादन" },
  { value: "service", label: "Service Provider", labelNp: "सेवा प्रदायक" },
  { value: "agriculture", label: "Agriculture", labelNp: "कृषि" },
  { value: "other", label: "Other", labelNp: "अन्य" },
];

const registeredBusinesses = [
  {
    id: "BRN001",
    name: "Himalaya General Store",
    nameNp: "हिमालय जनरल स्टोर",
    owner: "Ram Bahadur Thapa",
    type: "Retail Shop",
    status: "active",
    registrationDate: "2024-01-15",
    renewalDate: "2025-01-15",
    ward: "Ward 3",
  },
  {
    id: "BRN002",
    name: "Everest Restaurant",
    nameNp: "एभरेस्ट रेस्टुरेन्ट",
    owner: "Sita Devi Sharma",
    type: "Restaurant",
    status: "pending-renewal",
    registrationDate: "2023-03-20",
    renewalDate: "2024-03-20",
    ward: "Ward 1",
  },
  {
    id: "BRN003",
    name: "Kathmandu Tailoring",
    nameNp: "काठमाडौं टेलरिङ",
    owner: "Hari Prasad Oli",
    type: "Service Provider",
    status: "active",
    registrationDate: "2024-02-10",
    renewalDate: "2025-02-10",
    ward: "Ward 5",
  },
];

const applicationStatus = [
  {
    id: "APP001",
    businessName: "New Tech Solutions",
    owner: "Rajesh Kumar Shrestha",
    submittedDate: "2024-11-01",
    status: "under-review",
    progress: 60,
    currentStep: "Document Verification",
    ward: "Ward 2",
  },
  {
    id: "APP002",
    businessName: "Mountain Coffee House",
    owner: "Anita Gurung",
    submittedDate: "2024-10-28",
    status: "inspection-scheduled",
    progress: 80,
    currentStep: "Physical Inspection",
    ward: "Ward 4",
  },
];

export default function BusinessRegistration() {
  const [language, setLanguage] = useState<"en" | "np">("en");
  const [activeTab, setActiveTab] = useState("register");
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    businessNameEn: "",
    businessNameNp: "",
    businessType: "",
    ward: "",
    businessAddress: "",
    businessDescription: "",
    ownerName: "",
    citizenshipNo: "",
    panNo: "",
    phone: "",
    email: "",
    dob: "",
    ownerAddress: "",
  });

  const handleSubmitApplication = async () => {
    if (currentStep === registrationSteps.length) {
      // Validate required fields
      if (
        !formData.businessNameEn ||
        !formData.businessNameNp ||
        !formData.businessType ||
        !formData.ownerName ||
        !formData.citizenshipNo ||
        !formData.panNo
      ) {
        toast({
          title: language === "en" ? "Validation Error" : "प्रमाणीकरण त्रुटि",
          description:
            language === "en"
              ? "Please fill in all required fields"
              : "कृपया सबै आवश्यक फिल्डहरू भर्नुहोस्",
          variant: "destructive",
        });
        return;
      }

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast({
          title:
            language === "en" ? "Application Submitted!" : "आवेदन पेश गरियो!",
          description:
            language === "en"
              ? "Your business registration application has been submitted successfully. You will receive updates via email."
              : "तपाईंको व्यवसाय दर्ता आवेदन सफलतापूर्वक पेश गरिएको छ। तपाईंलाई इमेल मार्फत अपडेट प्राप्त हुनेछ।",
          variant: "default",
        });

        // Reset form and go to status tab
        setFormData({
          businessNameEn: "",
          businessNameNp: "",
          businessType: "",
          ward: "",
          businessAddress: "",
          businessDescription: "",
          ownerName: "",
          citizenshipNo: "",
          panNo: "",
          phone: "",
          email: "",
          dob: "",
          ownerAddress: "",
        });
        setCurrentStep(1);
        setActiveTab("status");
      } catch (error) {
        toast({
          title: language === "en" ? "Submission Failed" : "पेश गर्न असफल",
          description:
            language === "en"
              ? "Failed to submit application. Please try again."
              : "आवेदन पेश गर्न असफल। कृपया फेरि प्रयास गर्नुहोस्।",
          variant: "destructive",
        });
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleFileUpload = (documentType: string) => {
    toast({
      title: language === "en" ? "File Upload" : "फाइल अपलोड",
      description:
        language === "en"
          ? `${documentType} uploaded successfully`
          : `${documentType} सफलतापूर्वक अपलोड गरियो`,
      variant: "default",
    });
  };

  const handleCertificateDownload = (businessName: string) => {
    toast({
      title: language === "en" ? "Download Started" : "डाउनलोड सुरु भयो",
      description:
        language === "en"
          ? `Certificate for ${businessName} is being downloaded`
          : `${businessName} को प्रमाणपत्र डाउनलोड भइरहेको छ`,
      variant: "default",
    });
  };

  const handleQRCodeGeneration = (businessName: string) => {
    toast({
      title: language === "en" ? "QR Code Generated" : "QR कोड उत्पन्न गरियो",
      description:
        language === "en"
          ? `QR code for ${businessName} has been generated`
          : `${businessName} को QR कोड उत्पन्न गरिएको छ`,
      variant: "default",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "pending-renewal":
        return "bg-yellow-500";
      case "under-review":
        return "bg-blue-500";
      case "inspection-scheduled":
        return "bg-purple-500";
      case "expired":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      active: { en: "Active", np: "सक्रिय" },
      "pending-renewal": { en: "Pending Renewal", np: "नवीकरण बाँकी" },
      "under-review": { en: "Under Review", np: "समीक्षाधीन" },
      "inspection-scheduled": { en: "Inspection Scheduled", np: "निरीक्षण तय" },
      expired: { en: "Expired", np: "म्याद सकिएको" },
    };
    return statusMap[status as keyof typeof statusMap]?.[language] || status;
  };

  const filteredBusinesses = registeredBusinesses.filter(
    (business) =>
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarNavigation />

      <div className="md:ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8 mt-12 md:mt-0 flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1F4E79] mb-2">
              {language === "en" ? "Business Registration" : "व्यवसाय दर्ता"}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {language === "en"
                ? "Online registration and renewal system for local businesses"
                : "स्थानीय व्यवसायहरूको लागि अनलाइन दर्ता र नवीकरण प्रणाली"}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "np" : "en")}
            className="text-xs sm:text-sm"
          >
            <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            {language === "en" ? "नेपाली" : "English"}
          </Button>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="register">
              {language === "en" ? "New Registration" : "नयाँ दर्ता"}
            </TabsTrigger>
            <TabsTrigger value="status">
              {language === "en" ? "Application Status" : "आवेदन स्थिति"}
            </TabsTrigger>
            <TabsTrigger value="database">
              {language === "en" ? "Business Database" : "व्यवसाय डाटाबेस"}
            </TabsTrigger>
            <TabsTrigger value="certificates">
              {language === "en" ? "Certificates" : "प्रमाणपत्रहरू"}
            </TabsTrigger>
          </TabsList>

          {/* New Registration Tab */}
          <TabsContent value="register" className="space-y-6">
            {/* Progress Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79]">
                  {language === "en" ? "Registration Progress" : "दर्ता प्रगति"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  {registrationSteps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          currentStep >= step.id
                            ? "bg-[#1F4E79] text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {currentStep > step.id ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          step.id
                        )}
                      </div>
                      <div className="ml-2 text-sm">
                        <div className="font-medium">
                          {language === "en" ? step.title : step.titleNp}
                        </div>
                      </div>
                      {index < registrationSteps.length - 1 && (
                        <div className="w-16 h-0.5 bg-gray-200 mx-4"></div>
                      )}
                    </div>
                  ))}
                </div>
                <Progress
                  value={(currentStep / registrationSteps.length) * 100}
                  className="h-2"
                />
              </CardContent>
            </Card>

            {/* Registration Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79]">
                  {language === "en"
                    ? registrationSteps[currentStep - 1]?.title
                    : registrationSteps[currentStep - 1]?.titleNp}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="business-name-en">
                          {language === "en"
                            ? "Business Name (English)"
                            : "व्यवसायको नाम (अंग्रेजी)"}
                        </Label>
                        <Input
                          id="business-name-en"
                          placeholder="Enter business name"
                          value={formData.businessNameEn}
                          onChange={(e) =>
                            handleInputChange("businessNameEn", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="business-name-np">
                          {language === "en"
                            ? "Business Name (Nepali)"
                            : "व्यवसायको नाम (नेपाली)"}
                        </Label>
                        <Input
                          id="business-name-np"
                          placeholder="व्यवसायको नाम लेख्नुहोस्"
                          value={formData.businessNameNp}
                          onChange={(e) =>
                            handleInputChange("businessNameNp", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="business-type">
                          {language === "en"
                            ? "Business Type"
                            : "व्यवसायको प्रकार"}
                        </Label>
                        <Select
                          value={formData.businessType}
                          onValueChange={(value) =>
                            handleInputChange("businessType", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                language === "en"
                                  ? "Select business type"
                                  : "व्यवसायको प्रकार छान्नुहोस्"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {businessTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {language === "en" ? type.label : type.labelNp}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ward">
                          {language === "en" ? "Ward Number" : "वडा नम्बर"}
                        </Label>
                        <Select
                          value={formData.ward}
                          onValueChange={(value) =>
                            handleInputChange("ward", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                language === "en"
                                  ? "Select ward"
                                  : "वडा छान्नुहोस्"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((ward) => (
                              <SelectItem key={ward} value={`ward-${ward}`}>
                                {language === "en"
                                  ? `Ward ${ward}`
                                  : `वडा ${ward}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business-address">
                        {language === "en"
                          ? "Business Address"
                          : "व्यवसायको ठेगाना"}
                      </Label>
                      <Textarea
                        id="business-address"
                        placeholder={
                          language === "en"
                            ? "Enter complete business address"
                            : "पूरा व्यवसायिक ठेगाना लेख्नुहोस्"
                        }
                        rows={3}
                        value={formData.businessAddress}
                        onChange={(e) =>
                          handleInputChange("businessAddress", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business-description">
                        {language === "en"
                          ? "Business Description"
                          : "व्यवसायको विवरण"}
                      </Label>
                      <Textarea
                        id="business-description"
                        placeholder={
                          language === "en"
                            ? "Describe your business activities"
                            : "आफ्नो व्यवसायिक गतिविधिहरूको वर्णन गर्नुहोस्"
                        }
                        rows={4}
                        value={formData.businessDescription}
                        onChange={(e) =>
                          handleInputChange(
                            "businessDescription",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="owner-name">
                          {language === "en"
                            ? "Owner Full Name"
                            : "मालिकको पूरा नाम"}
                        </Label>
                        <Input
                          id="owner-name"
                          placeholder="Enter full name"
                          value={formData.ownerName}
                          onChange={(e) =>
                            handleInputChange("ownerName", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="citizenship-no">
                          {language === "en"
                            ? "Citizenship Number"
                            : "नागरिकता नम्बर"}
                        </Label>
                        <Input
                          id="citizenship-no"
                          placeholder="Enter citizenship number"
                          value={formData.citizenshipNo}
                          onChange={(e) =>
                            handleInputChange("citizenshipNo", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="pan-no">
                          {language === "en" ? "PAN Number" : "प्यान नम्बर"}
                        </Label>
                        <Input
                          id="pan-no"
                          placeholder="Enter PAN number"
                          value={formData.panNo}
                          onChange={(e) =>
                            handleInputChange("panNo", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          {language === "en" ? "Phone Number" : "फोन नम्बर"}
                        </Label>
                        <Input
                          id="phone"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          {language === "en" ? "Email Address" : "इमेल ठेगाना"}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter email address"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob">
                          {language === "en" ? "Date of Birth" : "जन्म मिति"}
                        </Label>
                        <Input
                          id="dob"
                          type="date"
                          value={formData.dob}
                          onChange={(e) =>
                            handleInputChange("dob", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="owner-address">
                        {language === "en" ? "Owner Address" : "मालिकको ठेगाना"}
                      </Label>
                      <Textarea
                        id="owner-address"
                        placeholder={
                          language === "en"
                            ? "Enter permanent address"
                            : "स्थायी ठेगाना लेख्नुहोस्"
                        }
                        rows={3}
                        value={formData.ownerAddress}
                        onChange={(e) =>
                          handleInputChange("ownerAddress", e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border-dashed border-2 border-gray-300">
                        <CardContent className="p-6 text-center">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="font-medium mb-2">
                            {language === "en"
                              ? "Citizenship Certificate"
                              : "नागरिकता प्रमाणपत्र"}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            {language === "en"
                              ? "Upload scanned copy"
                              : "स्क्यान गरिएको प्रतिलिपि अपलोड गर्नुहोस्"}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleFileUpload(
                                language === "en"
                                  ? "Citizenship Certificate"
                                  : "नागरिकता प्रमाणपत्र"
                              )
                            }
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            {language === "en"
                              ? "Choose File"
                              : "फाइल छान्नुहोस्"}
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="border-dashed border-2 border-gray-300">
                        <CardContent className="p-6 text-center">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="font-medium mb-2">
                            {language === "en"
                              ? "PAN Certificate"
                              : "प्यान प्रमाणपत्र"}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4">
                            {language === "en"
                              ? "Upload scanned copy"
                              : "स्क्यान गरिएको प्रतिलिपि अपलोड गर्नुहोस्"}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleFileUpload(
                                language === "en"
                                  ? "PAN Certificate"
                                  : "प्यान प्रमाणपत्र"
                              )
                            }
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            {language === "en"
                              ? "Choose File"
                              : "फाइल छान्नुहोस्"}
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="border-dashed border-2 border-gray-300">
                      <CardContent className="p-6 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="font-medium mb-2">
                          {language === "en"
                            ? "Location Map/Property Document"
                            : "स्थान नक्सा/सम्पत्ति कागजात"}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {language === "en"
                            ? "Upload business location proof"
                            : "व्यवसायिक स्थानको प्रमाण अपलोड गर्नुहोस्"}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleFileUpload(
                              language === "en"
                                ? "Location Map/Property Document"
                                : "स्थान नक्सा/सम्पत्ति कागजात"
                            )
                          }
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {language === "en"
                            ? "Choose File"
                            : "फाइल छान्नुहोस्"}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="font-medium text-[#1F4E79] mb-4">
                        {language === "en"
                          ? "Application Summary"
                          : "आवेदन सारांश"}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">
                            {language === "en"
                              ? "Business Name:"
                              : "व्यवसायको नाम:"}
                          </span>
                          <span className="ml-2">
                            {formData.businessNameEn}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium">
                            {language === "en"
                              ? "Business Type:"
                              : "व्यवसायको प्रकार:"}
                          </span>
                          <span className="ml-2">{formData.businessType}</span>
                        </div>
                        <div>
                          <span className="font-medium">
                            {language === "en" ? "Owner Name:" : "मालिकको नाम:"}
                          </span>
                          <span className="ml-2">{formData.ownerName}</span>
                        </div>
                        <div>
                          <span className="font-medium">
                            {language === "en" ? "Ward:" : "वडा:"}
                          </span>
                          <span className="ml-2">{formData.ward}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-medium text-yellow-800 mb-2">
                        {language === "en"
                          ? "Important Notice"
                          : "महत्वपूर्ण सूचना"}
                      </h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>
                          •{" "}
                          {language === "en"
                            ? "Application will be reviewed within 5-7 working days"
                            : "आवेदन ५-७ कार्य दिन भित्र समीक्षा गरिनेछ"}
                        </li>
                        <li>
                          •{" "}
                          {language === "en"
                            ? "Physical inspection may be required"
                            : "भौतिक निरीक्षण आवश्यक पर्न सक्छ"}
                        </li>
                        <li>
                          •{" "}
                          {language === "en"
                            ? "Registration fee: Rs. 2,000"
                            : "दर्ता शुल्क: रु. २,०००"}
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                  >
                    {language === "en" ? "Previous" : "अघिल्लो"}
                  </Button>
                  <Button
                    className="bg-[#1F4E79] hover:bg-[#1F4E79]/90"
                    onClick={handleSubmitApplication}
                  >
                    {currentStep === registrationSteps.length
                      ? language === "en"
                        ? "Submit Application"
                        : "आवेदन पेश गर्नुहोस्"
                      : language === "en"
                      ? "Next"
                      : "अर्को"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Application Status Tab */}
          <TabsContent value="status" className="space-y-6">
            <div className="grid gap-6">
              {applicationStatus.map((app) => (
                <Card key={app.id} className="border-l-4 border-l-[#FFC107]">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-[#1F4E79]">
                          {app.businessName}
                        </CardTitle>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge
                            className={`${getStatusColor(
                              app.status
                            )} text-white`}
                          >
                            {getStatusText(app.status)}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            ID: {app.id}
                          </span>
                          <span className="text-sm text-gray-600 flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {app.ward}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">
                          {language === "en" ? "Submitted" : "पेश गरिएको"}
                        </div>
                        <div className="font-medium">{app.submittedDate}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            {language === "en" ? "Progress" : "प्रगति"}
                          </span>
                          <span className="text-sm text-gray-600">
                            {app.progress}%
                          </span>
                        </div>
                        <Progress value={app.progress} className="h-2" />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          {language === "en" ? "Current Step:" : "हालको चरण:"}{" "}
                          {app.currentStep}
                        </span>
                        <Button variant="outline" size="sm">
                          {language === "en"
                            ? "View Details"
                            : "विवरण हेर्नुहोस्"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Business Database Tab */}
          <TabsContent value="database" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-[#1F4E79]">
                    {language === "en"
                      ? "Registered Businesses"
                      : "दर्ता भएका व्यवसायहरू"}
                  </CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                      <Input
                        placeholder={
                          language === "en"
                            ? "Search businesses..."
                            : "व्यवसायहरू खोज्नुहोस्..."
                        }
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredBusinesses.map((business) => (
                    <Card
                      key={business.id}
                      className="border-l-4 border-l-green-500"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div>
                              <h3 className="font-medium text-[#1F4E79]">
                                {language === "en"
                                  ? business.name
                                  : business.nameNp}
                              </h3>
                              <p className="text-sm text-gray-600">
                                ID: {business.id}
                              </p>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {business.owner}
                              </span>
                              <span className="flex items-center">
                                <Building2 className="h-4 w-4 mr-1" />
                                {business.type}
                              </span>
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {business.ward}
                              </span>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <Badge
                              className={`${getStatusColor(
                                business.status
                              )} text-white`}
                            >
                              {getStatusText(business.status)}
                            </Badge>
                            <div className="text-xs text-gray-500">
                              {language === "en" ? "Renewal:" : "नवीकरण:"}{" "}
                              {business.renewalDate}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79]">
                  {language === "en"
                    ? "Business Certificates"
                    : "व्यवसायिक प्रमाणपत्रहरू"}
                </CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Download and manage business registration certificates"
                    : "व्यवसाय दर्ता प्रमाणपत्रहरू डाउनलोड र व्यवस्थापन गर्नुहोस्"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {registeredBusinesses
                    .filter((b) => b.status === "active")
                    .map((business) => (
                      <Card
                        key={business.id}
                        className="border-l-4 border-l-[#1F4E79]"
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="space-y-1">
                              <h3 className="font-medium text-[#1F4E79]">
                                {language === "en"
                                  ? business.name
                                  : business.nameNp}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {language === "en"
                                  ? "Registration ID:"
                                  : "दर्ता नम्बर:"}{" "}
                                {business.id}
                              </p>
                              <p className="text-xs text-gray-500">
                                {language === "en" ? "Issued:" : "जारी मिति:"}{" "}
                                {business.registrationDate}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleQRCodeGeneration(
                                    language === "en"
                                      ? business.name
                                      : business.nameNp
                                  )
                                }
                              >
                                <QrCode className="h-4 w-4 mr-2" />
                                {language === "en" ? "QR Code" : "QR कोड"}
                              </Button>
                              <Button
                                className="bg-[#1F4E79] hover:bg-[#1F4E79]/90"
                                size="sm"
                                onClick={() =>
                                  handleCertificateDownload(
                                    language === "en"
                                      ? business.name
                                      : business.nameNp
                                  )
                                }
                              >
                                <Download className="h-4 w-4 mr-2" />
                                {language === "en" ? "Download" : "डाउनलोड"}
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
        </Tabs>
      </div>
    </div>
  );
}
