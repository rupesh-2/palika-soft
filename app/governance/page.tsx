"use client"

import { useState } from "react"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Download, Search, Filter, Globe, Calendar, User, MapPin, Bell } from "lucide-react"

const recommendationCategories = [
  { value: "infrastructure", label: "Infrastructure", labelNp: "पूर्वाधार" },
  { value: "education", label: "Education", labelNp: "शिक्षा" },
  { value: "healthcare", label: "Healthcare", labelNp: "स्वास्थ्य सेवा" },
  { value: "environment", label: "Environment", labelNp: "वातावरण" },
  { value: "social-welfare", label: "Social Welfare", labelNp: "सामाजिक कल्याण" },
  { value: "governance", label: "Governance", labelNp: "शासन" },
  { value: "other", label: "Other", labelNp: "अन्य" },
]

const priorityLevels = [
  { value: "high", label: "High", labelNp: "उच्च", color: "bg-red-500" },
  { value: "medium", label: "Medium", labelNp: "मध्यम", color: "bg-yellow-500" },
  { value: "low", label: "Low", labelNp: "न्यून", color: "bg-green-500" },
]

const governanceReports = [
  {
    id: "GR001",
    title: "Municipal Budget Report 2024",
    titleNp: "नगरपालिका बजेट रिपोर्ट २०२४",
    category: "Financial",
    categoryNp: "आर्थिक",
    publishDate: "2024-10-15",
    author: "Finance Department",
    authorNp: "आर्थिक विभाग",
    description: "Annual budget allocation and expenditure report for fiscal year 2024",
    descriptionNp: "आर्थिक वर्ष २०२४ को वार्षिक बजेट बाँडफाँड र खर्च रिपोर्ट",
    fileSize: "2.5 MB",
    downloads: 245,
  },
  {
    id: "GR002",
    title: "Infrastructure Development Progress",
    titleNp: "पूर्वाधार विकास प्रगति",
    category: "Development",
    categoryNp: "विकास",
    publishDate: "2024-10-10",
    author: "Engineering Department",
    authorNp: "इन्जिनियरिङ विभाग",
    description: "Quarterly progress report on ongoing infrastructure projects",
    descriptionNp: "चलिरहेका पूर्वाधार परियोजनाहरूको त्रैमासिक प्रगति रिपोर्ट",
    fileSize: "1.8 MB",
    downloads: 189,
  },
  {
    id: "GR003",
    title: "Public Health Services Assessment",
    titleNp: "सार्वजनिक स्वास्थ्य सेवा मूल्याङ्कन",
    category: "Health",
    categoryNp: "स्वास्थ्य",
    publishDate: "2024-09-25",
    author: "Health Department",
    authorNp: "स्वास्थ्य विभाग",
    description: "Assessment of healthcare facilities and services provided to citizens",
    descriptionNp: "नागरिकहरूलाई प्रदान गरिएका स्वास्थ्य सुविधा र सेवाहरूको मूल्याङ्कन",
    fileSize: "3.2 MB",
    downloads: 156,
  },
]

const officialNotices = [
  {
    id: "ON001",
    title: "Public Holiday Announcement",
    titleNp: "सार्वजनिक बिदाको घोषणा",
    category: "General",
    categoryNp: "सामान्य",
    publishDate: "2024-11-01",
    validUntil: "2024-11-15",
    priority: "medium",
    content: "Municipality offices will remain closed on November 15th for Tihar festival celebration.",
    contentNp: "तिहार पर्वको अवसरमा नोभेम्बर १५ मा नगरपालिका कार्यालयहरू बन्द रहनेछन्।",
    department: "Administration",
    departmentNp: "प्रशासन",
  },
  {
    id: "ON002",
    title: "Water Supply Maintenance Notice",
    titleNp: "खानेपानी आपूर्ति मर्मतको सूचना",
    category: "Infrastructure",
    categoryNp: "पूर्वाधार",
    publishDate: "2024-10-28",
    validUntil: "2024-11-05",
    priority: "high",
    content: "Water supply will be disrupted in Ward 3 and 4 from 6 AM to 2 PM on November 3rd for maintenance work.",
    contentNp: "मर्मत कार्यको लागि नोभेम्बर ३ मा बिहान ६ देखि दिउँसो २ बजे सम्म वडा ३ र ४ मा खानेपानी आपूर्ति बन्द रहनेछ।",
    department: "Water Supply Department",
    departmentNp: "खानेपानी आपूर्ति विभाग",
  },
  {
    id: "ON003",
    title: "Tax Collection Deadline Extension",
    titleNp: "कर संकलन म्याद थप",
    category: "Financial",
    categoryNp: "आर्थिक",
    publishDate: "2024-10-20",
    validUntil: "2024-12-31",
    priority: "medium",
    content: "Property tax collection deadline has been extended to December 31st, 2024.",
    contentNp: "सम्पत्ति कर संकलनको म्याद डिसेम्बर ३१, २०२४ सम्म थप गरिएको छ।",
    department: "Revenue Department",
    departmentNp: "राजस्व विभाग",
  },
]

const citizenRecommendations = [
  {
    id: "CR001",
    title: "Street Light Installation Request",
    titleNp: "सडक बत्ती जडान अनुरोध",
    category: "Infrastructure",
    submittedBy: "Ram Bahadur Thapa",
    ward: "Ward 3",
    priority: "medium",
    status: "under-review",
    submissionDate: "2024-10-25",
    description: "Request for installation of street lights on the main road connecting Ward 3 to the market area.",
    descriptionNp: "वडा ३ लाई बजार क्षेत्रसँग जोड्ने मुख्य सडकमा सडक बत्ती जडानको अनुरोध।",
  },
  {
    id: "CR002",
    title: "Waste Management Improvement",
    titleNp: "फोहोर व्यवस्थापन सुधार",
    category: "Environment",
    submittedBy: "Sita Devi Sharma",
    ward: "Ward 1",
    priority: "high",
    status: "approved",
    submissionDate: "2024-10-20",
    description: "Suggestion to improve waste collection schedule and add more garbage bins in residential areas.",
    descriptionNp: "आवासीय क्षेत्रमा फोहोर संकलन तालिका सुधार र थप फोहोर डस्टबिन थप्ने सुझाव।",
  },
]

export default function GovernanceModule() {
  const [language, setLanguage] = useState<"en" | "np">("en")
  const [activeTab, setActiveTab] = useState("recommendations")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500"
      case "under-review":
        return "bg-blue-500"
      case "rejected":
        return "bg-red-500"
      case "implemented":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    const statusMap = {
      approved: { en: "Approved", np: "स्वीकृत" },
      "under-review": { en: "Under Review", np: "समीक्षाधीन" },
      rejected: { en: "Rejected", np: "अस्वीकृत" },
      implemented: { en: "Implemented", np: "कार्यान्वयन" },
    }
    return statusMap[status as keyof typeof statusMap]?.[language] || status
  }

  const getPriorityColor = (priority: string) => {
    return priorityLevels.find((p) => p.value === priority)?.color || "bg-gray-500"
  }

  const getPriorityText = (priority: string) => {
    const priorityItem = priorityLevels.find((p) => p.value === priority)
    return priorityItem ? (language === "en" ? priorityItem.label : priorityItem.labelNp) : priority
  }

  const filteredNotices = officialNotices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.titleNp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || notice.category.toLowerCase() === selectedCategory
    const matchesPriority = selectedPriority === "all" || notice.priority === selectedPriority
    return matchesSearch && matchesCategory && matchesPriority
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarNavigation />

      <div className="md:ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8 mt-12 md:mt-0 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#1F4E79] mb-2">
              {language === "en" ? "Governance & Recommendations" : "शासन र सिफारिसहरू"}
            </h1>
            <p className="text-gray-600">
              {language === "en"
                ? "Submit recommendations, access governance reports, and view official notices"
                : "सिफारिसहरू पेश गर्नुहोस्, शासन रिपोर्टहरू पहुँच गर्नुहोस्, र आधिकारिक सूचनाहरू हेर्नुहोस्"}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setLanguage(language === "en" ? "np" : "en")}>
            <Globe className="h-4 w-4 mr-2" />
            {language === "en" ? "नेपाली" : "English"}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="recommendations">
              {language === "en" ? "Submit Recommendation" : "सिफारिस पेश"}
            </TabsTrigger>
            <TabsTrigger value="reports">{language === "en" ? "Governance Reports" : "शासन रिपोर्टहरू"}</TabsTrigger>
            <TabsTrigger value="notices">{language === "en" ? "Official Notices" : "आधिकारिक सूचनाहरू"}</TabsTrigger>
            <TabsTrigger value="status">{language === "en" ? "My Submissions" : "मेरा पेशकर्ताहरू"}</TabsTrigger>
          </TabsList>

          {/* Submit Recommendation Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79]">
                  {language === "en" ? "Submit Citizen Recommendation" : "नागरिक सिफारिस पेश गर्नुहोस्"}
                </CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Share your suggestions and recommendations to improve municipal services"
                    : "नगरपालिका सेवाहरू सुधार गर्न आफ्ना सुझाव र सिफारिसहरू साझा गर्नुहोस्"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="citizen-name">{language === "en" ? "Your Full Name" : "तपाईंको पूरा नाम"}</Label>
                    <Input id="citizen-name" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-number">{language === "en" ? "Contact Number" : "सम्पर्क नम्बर"}</Label>
                    <Input id="contact-number" placeholder="Enter phone number" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <Label htmlFor="category">{language === "en" ? "Category" : "श्रेणी"}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={language === "en" ? "Select category" : "श्रेणी छान्नुहोस्"} />
                      </SelectTrigger>
                      <SelectContent>
                        {recommendationCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {language === "en" ? category.label : category.labelNp}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">{language === "en" ? "Priority Level" : "प्राथमिकता स्तर"}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={language === "en" ? "Select priority" : "प्राथमिकता छान्नुहोस्"} />
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recommendation-title">
                    {language === "en" ? "Recommendation Title" : "सिफारिसको शीर्षक"}
                  </Label>
                  <Input
                    id="recommendation-title"
                    placeholder={
                      language === "en"
                        ? "Enter a brief title for your recommendation"
                        : "आफ्नो सिफारिसको छोटो शीर्षक लेख्नुहोस्"
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recommendation-details">
                    {language === "en" ? "Detailed Description" : "विस्तृत विवरण"}
                  </Label>
                  <Textarea
                    id="recommendation-details"
                    placeholder={
                      language === "en"
                        ? "Provide detailed description of your recommendation, including current issues and proposed solutions"
                        : "हालका समस्याहरू र प्रस्तावित समाधानहरू सहित आफ्नो सिफारिसको विस्तृत विवरण प्रदान गर्नुहोस्"
                    }
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expected-outcome">{language === "en" ? "Expected Outcome" : "अपेक्षित परिणाम"}</Label>
                  <Textarea
                    id="expected-outcome"
                    placeholder={
                      language === "en"
                        ? "Describe the expected benefits and outcomes if this recommendation is implemented"
                        : "यो सिफारिस कार्यान्वयन भएमा अपेक्षित फाइदाहरू र परिणामहरूको वर्णन गर्नुहोस्"
                    }
                    rows={3}
                  />
                </div>

                <div className="flex justify-end">
                  <Button className="bg-[#1F4E79] hover:bg-[#1F4E79]/90">
                    <Send className="h-4 w-4 mr-2" />
                    {language === "en" ? "Submit Recommendation" : "सिफारिस पेश गर्नुहोस्"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Governance Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79]">
                  {language === "en" ? "Governance Reports" : "शासन रिपोर्टहरू"}
                </CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Access official municipal reports and documents"
                    : "आधिकारिक नगरपालिका रिपोर्टहरू र कागजातहरू पहुँच गर्नुहोस्"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {governanceReports.map((report) => (
                    <Card key={report.id} className="border-l-4 border-l-[#1F4E79]">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2 flex-1">
                            <div>
                              <h3 className="text-lg font-medium text-[#1F4E79]">
                                {language === "en" ? report.title : report.titleNp}
                              </h3>
                              <div className="flex items-center space-x-4 mt-1">
                                <Badge variant="outline">
                                  {language === "en" ? report.category : report.categoryNp}
                                </Badge>
                                <span className="text-sm text-gray-600 flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {report.publishDate}
                                </span>
                                <span className="text-sm text-gray-600 flex items-center">
                                  <User className="h-4 w-4 mr-1" />
                                  {language === "en" ? report.author : report.authorNp}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm">
                              {language === "en" ? report.description : report.descriptionNp}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>
                                {language === "en" ? "File Size:" : "फाइल साइज:"} {report.fileSize}
                              </span>
                              <span>
                                {language === "en" ? "Downloads:" : "डाउनलोडहरू:"} {report.downloads}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <Button className="bg-[#1F4E79] hover:bg-[#1F4E79]/90" size="sm">
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

          {/* Official Notices Tab */}
          <TabsContent value="notices" className="space-y-6">
            {/* Filter Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79]">
                  {language === "en" ? "Filter Notices" : "सूचनाहरू फिल्टर गर्नुहोस्"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder={language === "en" ? "Search notices..." : "सूचनाहरू खोज्नुहोस्..."}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === "en" ? "All Categories" : "सबै श्रेणीहरू"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{language === "en" ? "All Categories" : "सबै श्रेणीहरू"}</SelectItem>
                      <SelectItem value="general">{language === "en" ? "General" : "सामान्य"}</SelectItem>
                      <SelectItem value="infrastructure">{language === "en" ? "Infrastructure" : "पूर्वाधार"}</SelectItem>
                      <SelectItem value="financial">{language === "en" ? "Financial" : "आर्थिक"}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === "en" ? "All Priorities" : "सबै प्राथमिकताहरू"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{language === "en" ? "All Priorities" : "सबै प्राथमिकताहरू"}</SelectItem>
                      <SelectItem value="high">{language === "en" ? "High" : "उच्च"}</SelectItem>
                      <SelectItem value="medium">{language === "en" ? "Medium" : "मध्यम"}</SelectItem>
                      <SelectItem value="low">{language === "en" ? "Low" : "न्यून"}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    {language === "en" ? "Apply Filters" : "फिल्टर लागू गर्नुहोस्"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notices List */}
            <div className="space-y-4">
              {filteredNotices.map((notice) => (
                <Card key={notice.id} className="border-l-4 border-l-[#FFC107]">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-3">
                          <Bell className="h-5 w-5 text-[#FFC107]" />
                          <h3 className="text-lg font-medium text-[#1F4E79]">
                            {language === "en" ? notice.title : notice.titleNp}
                          </h3>
                          <Badge className={`${getPriorityColor(notice.priority)} text-white`}>
                            {getPriorityText(notice.priority)}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {language === "en" ? "Published:" : "प्रकाशित:"} {notice.publishDate}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {language === "en" ? "Valid Until:" : "मान्य सम्म:"} {notice.validUntil}
                          </span>
                          <Badge variant="outline">{language === "en" ? notice.category : notice.categoryNp}</Badge>
                        </div>
                        <p className="text-gray-700">{language === "en" ? notice.content : notice.contentNp}</p>
                        <div className="text-sm text-gray-500">
                          {language === "en" ? "Department:" : "विभाग:"}{" "}
                          {language === "en" ? notice.department : notice.departmentNp}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Submissions Tab */}
          <TabsContent value="status" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79]">
                  {language === "en" ? "My Recommendation Submissions" : "मेरा सिफारिस पेशकर्ताहरू"}
                </CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Track the status of your submitted recommendations"
                    : "तपाईंले पेश गर्नुभएका सिफारिसहरूको स्थिति ट्र्याक गर्नुहोस्"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {citizenRecommendations.map((recommendation) => (
                    <Card key={recommendation.id} className="border-l-4 border-l-[#1F4E79]">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2 flex-1">
                            <div>
                              <h3 className="font-medium text-[#1F4E79]">
                                {language === "en" ? recommendation.title : recommendation.titleNp}
                              </h3>
                              <div className="flex items-center space-x-4 mt-1">
                                <Badge className={`${getStatusColor(recommendation.status)} text-white`}>
                                  {getStatusText(recommendation.status)}
                                </Badge>
                                <Badge className={`${getPriorityColor(recommendation.priority)} text-white`}>
                                  {getPriorityText(recommendation.priority)}
                                </Badge>
                                <span className="text-sm text-gray-600">ID: {recommendation.id}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">
                              {language === "en" ? recommendation.description : recommendation.descriptionNp}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {recommendation.ward}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {language === "en" ? "Submitted:" : "पेश गरिएको:"} {recommendation.submissionDate}
                              </span>
                              <span>
                                {language === "en" ? "Category:" : "श्रेणी:"} {recommendation.category}
                              </span>
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
        </Tabs>
      </div>
    </div>
  )
}
