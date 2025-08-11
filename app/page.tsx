"use client"

import { useState } from "react"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { DashboardCard } from "@/components/dashboard-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ClipboardList,
  Building2,
  Fuel,
  FileText,
  Users,
  TrendingUp,
  Calendar,
  Bell,
  FileCheck,
  MessageSquare,
  ArrowUpRight,
  Clock,
  Sun,
  Plus,
  Eye,
  Download,
  BarChart3,
  PieChartIcon,
  Activity,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  BarChart,
  Bar,
  Pie,
} from "recharts"

const dashboardModules = [
  {
    title: "Planning Module",
    titleNp: "योजना मोड्युल",
    description: "Manage municipal planning for budget, timelines, and essential resources for local projects.",
    descriptionNp: "स्थानीय परियोजनाहरूको लागि बजेट, समयसीमा, र आवश्यक स्रोतहरूको नगरपालिका योजना व्यवस्थापन गर्नुहोस्।",
    icon: ClipboardList,
    href: "/planning",
    stats: {
      label: "Active Projects",
      labelNp: "सक्रिय परियोजनाहरू",
      value: "12",
    },
  },
  {
    title: "Business Registration",
    titleNp: "व्यवसाय दर्ता",
    description: "Online registration and renewal system for local businesses.",
    descriptionNp: "स्थानीय व्यवसायहरूको लागि अनलाइन दर्ता र नवीकरण प्रणाली।",
    icon: Building2,
    href: "/business",
    stats: {
      label: "Registered Businesses",
      labelNp: "दर्ता भएका व्यवसायहरू",
      value: "248",
    },
  },
  {
    title: "Fuel Management",
    titleNp: "इन्धन व्यवस्थापन",
    description: "Track and allocate fuel resources for municipal vehicles and public services.",
    descriptionNp: "नगरपालिका सवारी साधन र सार्वजनिक सेवाहरूको लागि इन्धन स्रोतहरू ट्र्याक र बाँडफाँड गर्नुहोस्।",
    icon: Fuel,
    href: "/fuel",
    stats: {
      label: "Monthly Allocation",
      labelNp: "मासिक बाँडफाँड",
      value: "2,450L",
    },
  },
  {
    title: "Sifaris (Recommendations)",
    titleNp: "सिफारिस",
    description: "Request official municipal recommendation letters for various government processes.",
    descriptionNp: "विभिन्न सरकारी प्रक्रियाहरूको लागि आधिकारिक नगरपालिका सिफारिस पत्रहरू अनुरोध गर्नुहोस्।",
    icon: FileCheck,
    href: "/sifaris",
    stats: {
      label: "Pending Requests",
      labelNp: "बाँकी अनुरोधहरू",
      value: "18",
    },
  },
  {
    title: "Gunaso (Complaints)",
    titleNp: "गुनासो",
    description: "Submit and track formal complaints about municipal services and issues.",
    descriptionNp: "नगरपालिका सेवाहरू र समस्याहरूको बारेमा औपचारिक गुनासोहरू पेश र ट्र्याक गर्नुहोस्।",
    icon: MessageSquare,
    href: "/gunaso",
    stats: {
      label: "Open Complaints",
      labelNp: "खुला गुनासोहरू",
      value: "7",
    },
  },
  {
    title: "Governance & Reports",
    titleNp: "शासन र रिपोर्टहरू",
    description: "Access governance reports and official municipal notices.",
    descriptionNp: "शासन रिपोर्टहरू र आधिकारिक नगरपालिका सूचनाहरू पहुँच गर्नुहोस्।",
    icon: FileText,
    href: "/governance",
    stats: {
      label: "New Reports",
      labelNp: "नयाँ रिपोर्टहरू",
      value: "5",
    },
  },
]

const monthlyRevenueData = [
  { month: "Jan", revenue: 180000, expenses: 120000 },
  { month: "Feb", revenue: 220000, expenses: 140000 },
  { month: "Mar", revenue: 245000, expenses: 160000 },
  { month: "Apr", revenue: 280000, expenses: 180000 },
  { month: "May", revenue: 320000, expenses: 200000 },
  { month: "Jun", revenue: 350000, expenses: 220000 },
]

const departmentBudgetData = [
  { name: "Infrastructure", value: 35, color: "#1F4E79" },
  { name: "Education", value: 25, color: "#FFC107" },
  { name: "Health", value: 20, color: "#005B4F" },
  { name: "Administration", value: 12, color: "#E5E5E5" },
  { name: "Others", value: 8, color: "#9CA3AF" },
]

const applicationStatusData = [
  { status: "Approved", count: 45 },
  { status: "Pending", count: 23 },
  { status: "Under Review", count: 18 },
  { status: "Rejected", count: 7 },
]

export default function Dashboard() {
  const [language, setLanguage] = useState<"en" | "np">("en")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <SidebarNavigation />

      {/* Main Content */}
      <div className="md:ml-64 p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="mb-6 sm:mb-8 mt-16 sm:mt-12 md:mt-0">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 sm:mb-6">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F4E79] mb-2">
                {language === "en" ? "Municipal Dashboard" : "नगरपालिका ड्यासबोर्ड"}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                {language === "en"
                  ? "Welcome back! Here's what's happening in your municipality today."
                  : "फिर्ता स्वागत छ! आज तपाईंको नगरपालिकामा के भइरहेको छ।"}
              </p>
            </div>

            {/* Weather Widget */}
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Sun className="h-6 w-6 sm:h-8 sm:w-8" />
                  <div>
                    <p className="text-xs sm:text-sm opacity-90">{language === "en" ? "Kathmandu" : "काठमाडौं"}</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold">24°C</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Button className="bg-[#1F4E79] hover:bg-[#1F4E79]/90">
              <Plus className="h-4 w-4 mr-2" />
              {language === "en" ? "New Application" : "नयाँ आवेदन"}
            </Button>
            <Button
              variant="outline"
              className="border-[#1F4E79] text-[#1F4E79] hover:bg-[#1F4E79] hover:text-white bg-transparent"
            >
              <Eye className="h-4 w-4 mr-2" />
              {language === "en" ? "View Reports" : "रिपोर्टहरू हेर्नुहोस्"}
            </Button>
            <Button
              variant="outline"
              className="border-[#FFC107] text-[#FFC107] hover:bg-[#FFC107] hover:text-[#1F4E79] bg-transparent"
            >
              <Download className="h-4 w-4 mr-2" />
              {language === "en" ? "Export Data" : "डाटा निर्यात"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <Card className="bg-gradient-to-r from-[#1F4E79] to-[#2563eb] text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  {language === "en" ? "Total Citizens" : "कुल नागरिकहरू"}
                </div>
                <ArrowUpRight className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">15,432</div>
              <div className="flex items-center text-sm opacity-90">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.5% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-[#FFC107] to-[#f59e0b] text-[#1F4E79] border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  {language === "en" ? "Revenue This Month" : "यस महिनाको राजस्व"}
                </div>
                <ArrowUpRight className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">Rs. 3,45,000</div>
              <Progress value={75} className="h-2 bg-white/20" />
              <p className="text-sm mt-1 opacity-80">75% of monthly target</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between text-[#1F4E79]">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  {language === "en" ? "Upcoming Events" : "आगामी कार्यक्रमहरू"}
                </div>
                <Badge variant="secondary" className="bg-[#1F4E79] text-white">
                  8
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#1F4E79] mb-2">8</div>
              <p className="text-sm text-gray-600">Next: Ward Meeting (Tomorrow)</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between text-[#1F4E79]">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  {language === "en" ? "Notifications" : "सूचनाहरू"}
                </div>
                <Badge variant="destructive">12</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#1F4E79] mb-2">12</div>
              <p className="text-sm text-gray-600">3 urgent, 9 normal</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Revenue Chart */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-[#1F4E79] flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                {language === "en" ? "Revenue vs Expenses" : "राजस्व बनाम खर्च"}
              </CardTitle>
              <CardDescription>
                {language === "en" ? "Monthly comparison for the current year" : "चालू वर्षको मासिक तुलना"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#1F4E79" name="Revenue" />
                  <Bar dataKey="expenses" fill="#FFC107" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Budget Distribution */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-[#1F4E79] flex items-center">
                <PieChartIcon className="h-5 w-5 mr-2" />
                {language === "en" ? "Budget Distribution" : "बजेट वितरण"}
              </CardTitle>
              <CardDescription>
                {language === "en" ? "Department-wise budget allocation" : "विभागीय बजेट बाँडफाँड"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={departmentBudgetData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {departmentBudgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {dashboardModules.map((module, index) => (
            <DashboardCard
              key={index}
              title={module.title}
              titleNp={module.titleNp}
              description={module.description}
              descriptionNp={module.descriptionNp}
              icon={module.icon}
              href={module.href}
              stats={module.stats}
              language={language}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent Activity */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-[#1F4E79] flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                {language === "en" ? "Recent Activity" : "हालैका गतिविधिहरू"}
              </CardTitle>
              <CardDescription>
                {language === "en"
                  ? "Latest updates and activities across all modules"
                  : "सबै मोड्युलहरूमा भएका पछिल्ला अपडेटहरू र गतिविधिहरू"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[#FFC107]/10 to-transparent rounded-lg border-l-4 border-l-[#FFC107]">
                  <div className="w-3 h-3 bg-[#FFC107] rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1F4E79]">
                      {language === "en" ? "New business registration submitted" : "नयाँ व्यवसाय दर्ता पेश गरियो"}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />2 hours ago
                    </p>
                  </div>
                  <Badge variant="secondary">New</Badge>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[#1F4E79]/10 to-transparent rounded-lg border-l-4 border-l-[#1F4E79]">
                  <div className="w-3 h-3 bg-[#1F4E79] rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1F4E79]">
                      {language === "en" ? "Fuel allocation approved for Ward 5" : "वडा ५ को लागि इन्धन बाँडफाँड स्वीकृत"}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />4 hours ago
                    </p>
                  </div>
                  <Badge variant="outline" className="border-green-500 text-green-600">
                    Approved
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg border-l-4 border-l-green-500">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1F4E79]">
                      {language === "en"
                        ? "Planning meeting scheduled for next week"
                        : "अर्को हप्ताको लागि योजना बैठक तय गरियो"}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />1 day ago
                    </p>
                  </div>
                  <Badge variant="outline" className="border-blue-500 text-blue-600">
                    Scheduled
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Status Overview */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-[#1F4E79] flex items-center">
                <FileCheck className="h-5 w-5 mr-2" />
                {language === "en" ? "Application Status Overview" : "आवेदन स्थिति अवलोकन"}
              </CardTitle>
              <CardDescription>
                {language === "en" ? "Current status of all applications" : "सबै आवेदनहरूको हालको स्थिति"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applicationStatusData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          item.status === "Approved"
                            ? "bg-green-500"
                            : item.status === "Pending"
                              ? "bg-yellow-500"
                              : item.status === "Under Review"
                                ? "bg-blue-500"
                                : "bg-red-500"
                        }`}
                      ></div>
                      <span className="text-sm font-medium text-[#1F4E79]">{item.status}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-[#1F4E79]">{item.count}</span>
                      <Progress value={(item.count / 93) * 100} className="w-16 h-2" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">
                    {language === "en" ? "Total Applications" : "कुल आवेदनहरू"}
                  </span>
                  <span className="text-xl font-bold text-[#1F4E79]">93</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
