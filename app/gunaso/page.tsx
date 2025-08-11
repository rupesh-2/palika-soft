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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  MessageSquare,
  Upload,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  FileText,
  Camera,
  Paperclip,
  Users,
  Building,
  Wrench,
  Shield,
  DollarSign,
  Info,
} from "lucide-react"

const complaintCategories = [
  {
    id: "service-delay",
    title: "Service Delay",
    titleNp: "सेवा ढिलाइ",
    icon: Clock,
    description: "Delays in municipal services",
    descriptionNp: "नगरपालिका सेवाहरूमा ढिलाइ",
  },
  {
    id: "corruption",
    title: "Corruption",
    titleNp: "भ्रष्टाचार",
    icon: DollarSign,
    description: "Corruption or bribery issues",
    descriptionNp: "भ्रष्टाचार वा घूसखोरी समस्याहरू",
  },
  {
    id: "staff-behavior",
    title: "Staff Behavior",
    titleNp: "कर्मचारी व्यवहार",
    icon: Users,
    description: "Inappropriate staff behavior",
    descriptionNp: "अनुचित कर्मचारी व्यवहार",
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    titleNp: "पूर्वाधार",
    icon: Building,
    description: "Roads, water, electricity issues",
    descriptionNp: "सडक, पानी, बिजुली समस्याहरू",
  },
  {
    id: "maintenance",
    title: "Maintenance",
    titleNp: "मर्मत सम्भार",
    icon: Wrench,
    description: "Maintenance and repair issues",
    descriptionNp: "मर्मत र सम्भार समस्याहरू",
  },
  {
    id: "security",
    title: "Security",
    titleNp: "सुरक्षा",
    icon: Shield,
    description: "Security and safety concerns",
    descriptionNp: "सुरक्षा र सुरक्षा चिन्ताहरू",
  },
]

const priorityLevels = [
  { value: "low", label: "Low", labelNp: "कम", color: "bg-green-100 text-green-800" },
  { value: "medium", label: "Medium", labelNp: "मध्यम", color: "bg-yellow-100 text-yellow-800" },
  { value: "high", label: "High", labelNp: "उच्च", color: "bg-orange-100 text-orange-800" },
  { value: "urgent", label: "Urgent", labelNp: "तत्काल", color: "bg-red-100 text-red-800" },
]

const mockComplaints = [
  {
    id: "GUN-2024-001",
    subject: "सडक मर्मतको समस्या",
    category: "infrastructure",
    priority: "high",
    status: "resolved",
    submittedDate: "2024-01-15",
    resolvedDate: "2024-01-22",
    complainant: "राम बहादुर श्रेष्ठ",
    description: "वडा नम्बर ५ को मुख्य सडकमा ठूला खाल्डाहरू छन्",
    resolution: "सडक मर्मत कार्य सम्पन्न गरियो",
    timeline: [
      { date: "2024-01-15", status: "submitted", description: "गुनासो पेश गरियो" },
      { date: "2024-01-16", status: "in-review", description: "सम्बन्धित विभागमा पठाइयो" },
      { date: "2024-01-18", status: "investigating", description: "स्थलगत निरीक्षण गरियो" },
      { date: "2024-01-22", status: "resolved", description: "सडक मर्मत कार्य सम्पन्न" },
    ],
  },
  {
    id: "GUN-2024-002",
    subject: "पानी आपूर्ति समस्या",
    category: "infrastructure",
    priority: "medium",
    status: "in-review",
    submittedDate: "2024-01-18",
    complainant: "सीता देवी पौडेल",
    description: "वडा नम्बर ३ मा ३ दिनदेखि पानी आएको छैन",
    timeline: [
      { date: "2024-01-18", status: "submitted", description: "गुनासो पेश गरियो" },
      { date: "2024-01-19", status: "in-review", description: "पानी तथा सरसफाइ विभागमा पठाइयो" },
    ],
  },
  {
    id: "GUN-2024-003",
    subject: "कर्मचारी व्यवहार",
    category: "staff-behavior",
    priority: "medium",
    status: "investigating",
    submittedDate: "2024-01-20",
    complainant: "हरि प्रसाद गुरुङ",
    description: "काउन्टरमा कर्मचारीको अभद्र व्यवहार",
    timeline: [
      { date: "2024-01-20", status: "submitted", description: "गुनासो पेश गरियो" },
      { date: "2024-01-21", status: "in-review", description: "प्रशासन विभागमा पठाइयो" },
      { date: "2024-01-23", status: "investigating", description: "छानबिन सुरु गरियो" },
    ],
  },
]

export default function GunasoPage() {
  const [language, setLanguage] = useState<"en" | "np">("en")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedPriority, setSelectedPriority] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    complainantName: "",
    phone: "",
    email: "",
    address: "",
    subject: "",
    description: "",
    location: "",
  })
  const [attachments, setAttachments] = useState<string[]>([])
  const { toast } = useToast()

  const handleSubmitComplaint = () => {
    if (!selectedCategory || !formData.complainantName || !formData.subject || !formData.description) {
      toast({
        title: language === "en" ? "Validation Error" : "प्रमाणीकरण त्रुटि",
        description: language === "en" ? "Please fill in all required fields" : "कृपया सबै आवश्यक फिल्डहरू भर्नुहोस्",
        variant: "destructive",
      })
      return
    }

    toast({
      title: language === "en" ? "Complaint Submitted" : "गुनासो पेश गरियो",
      description:
        language === "en"
          ? "Your complaint has been submitted successfully. Tracking ID: GUN-2024-004"
          : "तपाईंको गुनासो सफलतापूर्वक पेश गरियो। ट्र्याकिङ आईडी: GUN-2024-004",
    })

    // Reset form
    setFormData({
      complainantName: "",
      phone: "",
      email: "",
      address: "",
      subject: "",
      description: "",
      location: "",
    })
    setSelectedCategory("")
    setSelectedPriority("")
    setAttachments([])
  }

  const handleAddAttachment = () => {
    const newAttachment = `attachment_${Date.now()}.jpg`
    setAttachments([...attachments, newAttachment])
    toast({
      title: language === "en" ? "File Uploaded" : "फाइल अपलोड गरियो",
      description: language === "en" ? "Attachment added successfully" : "संलग्नक सफलतापूर्वक थपियो",
    })
  }

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
    toast({
      title: language === "en" ? "File Removed" : "फाइल हटाइयो",
      description: language === "en" ? "Attachment removed successfully" : "संलग्नक सफलतापूर्वक हटाइयो",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800"
      case "investigating":
        return "bg-blue-100 text-blue-800"
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
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "investigating":
        return <Search className="h-4 w-4" />
      case "in-review":
        return <Clock className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getStatusText = (status: string) => {
    const statusMap = {
      submitted: { en: "Submitted", np: "पेश गरियो" },
      "in-review": { en: "In Review", np: "समीक्षामा" },
      investigating: { en: "Investigating", np: "छानबिन गर्दै" },
      resolved: { en: "Resolved", np: "समाधान भयो" },
      rejected: { en: "Rejected", np: "अस्वीकृत" },
    }
    return statusMap[status as keyof typeof statusMap]?.[language] || status
  }

  const filteredComplaints = mockComplaints.filter(
    (complaint) =>
      complaint.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.complainant.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarNavigation />

      <div className="md:ml-64 p-4 md:p-8">
        <div className="mb-8 mt-12 md:mt-0">
          <h1 className="text-3xl font-bold text-[#1F4E79] mb-2">
            {language === "en" ? "Gunaso (Complaints)" : "गुनासो (उजुरीहरू)"}
          </h1>
          <p className="text-gray-600">
            {language === "en"
              ? "Submit and track formal complaints about municipal services and issues"
              : "नगरपालिका सेवाहरू र समस्याहरूको बारेमा औपचारिक गुनासोहरू पेश र ट्र्याक गर्नुहोस्"}
          </p>
        </div>

        <Tabs defaultValue="submit" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="submit">{language === "en" ? "Submit Complaint" : "गुनासो पेश"}</TabsTrigger>
            <TabsTrigger value="track">{language === "en" ? "Track Status" : "स्थिति ट्र्याक"}</TabsTrigger>
            <TabsTrigger value="guidelines">{language === "en" ? "Guidelines" : "दिशानिर्देशहरू"}</TabsTrigger>
          </TabsList>

          {/* Submit Complaint Tab */}
          <TabsContent value="submit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79]">
                  {language === "en" ? "Select Complaint Category" : "गुनासो श्रेणी छान्नुहोस्"}
                </CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Choose the category that best describes your complaint"
                    : "तपाईंको गुनासोलाई राम्रोसँग वर्णन गर्ने श्रेणी छान्नुहोस्"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {complaintCategories.map((category) => {
                    const Icon = category.icon
                    return (
                      <Card
                        key={category.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedCategory === category.id ? "ring-2 ring-[#1F4E79] bg-blue-50" : ""
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-2">
                            <Icon className="h-6 w-6 text-[#1F4E79]" />
                            <h3 className="font-semibold text-[#1F4E79]">
                              {language === "en" ? category.title : category.titleNp}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600">
                            {language === "en" ? category.description : category.descriptionNp}
                          </p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {selectedCategory && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1F4E79]">
                    {language === "en" ? "Complaint Details" : "गुनासो विवरण"}
                  </CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "Provide detailed information about your complaint"
                      : "आफ्नो गुनासोको बारेमा विस्तृत जानकारी प्रदान गर्नुहोस्"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="complainantName">{language === "en" ? "Full Name" : "पूरा नाम"} *</Label>
                      <Input
                        id="complainantName"
                        value={formData.complainantName}
                        onChange={(e) => setFormData({ ...formData, complainantName: e.target.value })}
                        placeholder={language === "en" ? "Enter your full name" : "आफ्नो पूरा नाम लेख्नुहोस्"}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">{language === "en" ? "Phone Number" : "फोन नम्बर"} *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={language === "en" ? "Enter phone number" : "फोन नम्बर लेख्नुहोस्"}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div>
                      <Label htmlFor="address">{language === "en" ? "Address" : "ठेगाना"}</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder={language === "en" ? "Enter your address" : "आफ्नो ठेगाना लेख्नुहोस्"}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="subject">{language === "en" ? "Subject" : "विषय"} *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={language === "en" ? "Brief subject of complaint" : "गुनासोको संक्षिप्त विषय"}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">{language === "en" ? "Location" : "स्थान"}</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder={language === "en" ? "Location of the issue" : "समस्याको स्थान"}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="priority">{language === "en" ? "Priority Level" : "प्राथमिकता स्तर"}</Label>
                    <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={language === "en" ? "Select priority level" : "प्राथमिकता स्तर छान्नुहोस्"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityLevels.map((priority) => (
                          <SelectItem key={priority.value} value={priority.value}>
                            {language === "en" ? priority.label : priority.labelNp}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">{language === "en" ? "Detailed Description" : "विस्तृत विवरण"} *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder={
                        language === "en"
                          ? "Describe your complaint in detail..."
                          : "आफ्नो गुनासोको विस्तृत विवरण लेख्नुहोस्..."
                      }
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label>{language === "en" ? "Attachments" : "संलग्नकहरू"}</Label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-3">
                        <Paperclip className="h-4 w-4 text-[#1F4E79]" />
                        <span className="text-sm font-medium text-[#1F4E79]">
                          {language === "en"
                            ? "Upload Supporting Documents/Photos:"
                            : "सहायक कागजात/फोटोहरू अपलोड गर्नुहोस्:"}
                        </span>
                      </div>

                      {attachments.length > 0 && (
                        <div className="space-y-2 mb-3">
                          {attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-4 w-4 text-[#1F4E79]" />
                                <span className="text-sm">{attachment}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveAttachment(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={handleAddAttachment}>
                          <Camera className="h-4 w-4 mr-2" />
                          {language === "en" ? "Add Photo" : "फोटो थप्नुहोस्"}
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleAddAttachment}>
                          <Upload className="h-4 w-4 mr-2" />
                          {language === "en" ? "Upload Document" : "कागजात अपलोड"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleSubmitComplaint} className="w-full bg-[#1F4E79] hover:bg-[#1a4269]">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {language === "en" ? "Submit Complaint" : "गुनासो पेश गर्नुहोस्"}
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
                  {language === "en" ? "Track Complaint Status" : "गुनासो स्थिति ट्र्याक गर्नुहोस्"}
                </CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Search and track your submitted complaints"
                    : "आफ्ना पेश गरिएका गुनासोहरू खोज्नुहोस् र ट्र्याक गर्नुहोस्"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder={
                        language === "en"
                          ? "Search by Complaint ID, Subject, or Name"
                          : "गुनासो आईडी, विषय, वा नामले खोज्नुहोस्"
                      }
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {filteredComplaints.map((complaint) => (
                    <Card key={complaint.id} className="border-l-4 border-l-[#1F4E79]">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-[#1F4E79] text-lg">{complaint.id}</h3>
                            <p className="text-gray-600 font-medium">{complaint.subject}</p>
                            <p className="text-sm text-gray-500">{complaint.complainant}</p>
                          </div>
                          <Badge className={getStatusColor(complaint.status)}>
                            {getStatusIcon(complaint.status)}
                            <span className="ml-1">{getStatusText(complaint.status)}</span>
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">
                              {language === "en" ? "Category:" : "श्रेणी:"}
                            </span>
                            <p className="text-gray-600">
                              {language === "en"
                                ? complaintCategories.find((cat) => cat.id === complaint.category)?.title
                                : complaintCategories.find((cat) => cat.id === complaint.category)?.titleNp}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              {language === "en" ? "Submitted:" : "पेश गरिएको:"}
                            </span>
                            <p className="text-gray-600">{complaint.submittedDate}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">
                              {language === "en" ? "Priority:" : "प्राथमिकता:"}
                            </span>
                            <Badge className={priorityLevels.find((p) => p.value === complaint.priority)?.color}>
                              {language === "en"
                                ? priorityLevels.find((p) => p.value === complaint.priority)?.label
                                : priorityLevels.find((p) => p.value === complaint.priority)?.labelNp}
                            </Badge>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium text-[#1F4E79] mb-2">
                            {language === "en" ? "Progress Timeline:" : "प्रगति समयरेखा:"}
                          </h4>
                          <div className="space-y-3">
                            {complaint.timeline.map((event, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-1">
                                  <div className="w-3 h-3 bg-[#1F4E79] rounded-full"></div>
                                  {index < complaint.timeline.length - 1 && (
                                    <div className="w-0.5 h-6 bg-gray-300 ml-1 mt-1"></div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium text-[#1F4E79]">{event.date}</span>
                                    <ArrowRight className="h-3 w-3 text-gray-400" />
                                    <span className="text-sm text-gray-600">{event.description}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {complaint.resolution && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-medium text-green-800 mb-2">
                              {language === "en" ? "Resolution:" : "समाधान:"}
                            </h4>
                            <p className="text-green-700 text-sm">{complaint.resolution}</p>
                            {complaint.resolvedDate && (
                              <p className="text-green-600 text-xs mt-1">
                                {language === "en" ? "Resolved on:" : "समाधान मिति:"} {complaint.resolvedDate}
                              </p>
                            )}
                          </div>
                        )}
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
                  {language === "en" ? "Complaint Guidelines" : "गुनासो दिशानिर्देशहरू"}
                </CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Important information about the complaint process"
                    : "गुनासो प्रक्रियाको बारेमा महत्वपूर्ण जानकारी"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-[#1F4E79] mb-3 flex items-center">
                    <Info className="h-5 w-5 mr-2" />
                    {language === "en" ? "How to Submit a Complaint" : "गुनासो कसरी पेश गर्ने"}
                  </h3>
                  <ol className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <span className="font-medium text-[#1F4E79] mt-0.5">1.</span>
                      <span>
                        {language === "en"
                          ? "Select the appropriate category that best describes your complaint"
                          : "तपाईंको गुनासोलाई राम्रोसँग वर्णन गर्ने उपयुक्त श्रेणी छान्नुहोस्"}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="font-medium text-[#1F4E79] mt-0.5">2.</span>
                      <span>
                        {language === "en"
                          ? "Fill in all required information including your contact details"
                          : "तपाईंको सम्पर्क विवरण सहित सबै आवश्यक जानकारी भर्नुहोस्"}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="font-medium text-[#1F4E79] mt-0.5">3.</span>
                      <span>
                        {language === "en"
                          ? "Provide a clear and detailed description of the issue"
                          : "समस्याको स्पष्ट र विस्तृत विवरण प्रदान गर्नुहोस्"}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="font-medium text-[#1F4E79] mt-0.5">4.</span>
                      <span>
                        {language === "en"
                          ? "Attach supporting documents or photos if available"
                          : "उपलब्ध भएमा सहायक कागजात वा फोटोहरू संलग्न गर्नुहोस्"}
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="font-medium text-[#1F4E79] mt-0.5">5.</span>
                      <span>
                        {language === "en"
                          ? "Submit your complaint and note down the tracking ID"
                          : "आफ्नो गुनासो पेश गर्नुहोस् र ट्र्याकिङ आईडी नोट गर्नुहोस्"}
                      </span>
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold text-[#1F4E79] mb-3 flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    {language === "en" ? "Response Timeline" : "प्रतिक्रिया समयसीमा"}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-sm">
                          {language === "en" ? "Acknowledgment: Within 24 hours" : "स्वीकृति: २४ घण्टा भित्र"}
                        </p>
                        <p className="text-xs text-gray-600">
                          {language === "en"
                            ? "You will receive a tracking ID and confirmation"
                            : "तपाईंले ट्र्याकिङ आईडी र पुष्टिकरण प्राप्त गर्नुहुनेछ"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-sm">
                          {language === "en" ? "Initial Review: 2-3 working days" : "प्रारम्भिक समीक्षा: २-३ कार्य दिन"}
                        </p>
                        <p className="text-xs text-gray-600">
                          {language === "en"
                            ? "Complaint will be reviewed and forwarded to relevant department"
                            : "गुनासो समीक्षा गरी सम्बन्धित विभागमा पठाइनेछ"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-sm">
                          {language === "en" ? "Investigation: 5-15 working days" : "छानबिन: ५-१५ कार्य दिन"}
                        </p>
                        <p className="text-xs text-gray-600">
                          {language === "en"
                            ? "Depending on complexity and category of complaint"
                            : "गुनासोको जटिलता र श्रेणीको आधारमा"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    {language === "en" ? "Important Notes" : "महत्वपूर्ण टिप्पणीहरू"}
                  </h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>
                      {language === "en"
                        ? "• Provide accurate contact information for follow-up communication"
                        : "• फलो-अप सञ्चारको लागि सही सम्पर्क जानकारी प्रदान गर्नुहोस्"}
                    </li>
                    <li>
                      {language === "en"
                        ? "• Anonymous complaints may take longer to process"
                        : "• बेनामी गुनासोहरू प्रशोधन गर्न बढी समय लाग्न सक्छ"}
                    </li>
                    <li>
                      {language === "en"
                        ? "• You can track your complaint status anytime using the tracking ID"
                        : "• तपाईं ट्र्याकिङ आईडी प्रयोग गरेर जुनसुकै बेला आफ्नो गुनासोको स्थिति ट्र्याक गर्न सक्नुहुन्छ"}
                    </li>
                    <li>
                      {language === "en"
                        ? "• For urgent matters, contact the municipal office directly"
                        : "• तत्काल मामिलाहरूको लागि, नगरपालिका कार्यालयमा प्रत्यक्ष सम्पर्क गर्नुहोस्"}
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
