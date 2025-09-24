"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, Search, Filter, Users } from "lucide-react"

interface Employee {
  id: string
  name: string
  nameEn: string
  position: string
  positionEn: string
  department: string
  departmentEn: string
  phone: string
  email: string
  image?: string
  ward?: string
  experience: string
  education: string
  educationEn: string
}

const employees: Employee[] = [
  {
    id: "1",
    name: "राम बहादुर शर्मा",
    nameEn: "Ram Bahadur Sharma",
    position: "मुख्य प्रशासकीय अधिकारी",
    positionEn: "Chief Administrative Officer",
    department: "प्रशासन",
    departmentEn: "Administration",
    phone: "+977-1-4567890",
    email: "cao@palika.gov.np",
    image: "/placeholder-user.jpg",
    experience: "15 years",
    education: "स्नातकोत्तर प्रशासन",
    educationEn: "Masters in Administration",
  },
  {
    id: "2",
    name: "सीता देवी पौडेल",
    nameEn: "Sita Devi Poudel",
    position: "लेखा अधिकारी",
    positionEn: "Accounts Officer",
    department: "लेखा",
    departmentEn: "Accounts",
    phone: "+977-1-4567891",
    email: "accounts@palika.gov.np",
    image: "/placeholder-user.jpg",
    experience: "12 years",
    education: "स्नातकोत्तर लेखा",
    educationEn: "Masters in Accounting",
  },
  {
    id: "3",
    name: "हरि प्रसाद गुरुङ",
    nameEn: "Hari Prasad Gurung",
    position: "इन्जिनियर",
    positionEn: "Engineer",
    department: "पूर्वाधार",
    departmentEn: "Infrastructure",
    phone: "+977-1-4567892",
    email: "engineer@palika.gov.np",
    image: "/placeholder-user.jpg",
    experience: "10 years",
    education: "सिभिल इन्जिनियरिङ",
    educationEn: "Civil Engineering",
  },
  {
    id: "4",
    name: "गीता कुमारी थापा",
    nameEn: "Gita Kumari Thapa",
    position: "सामाजिक विकास अधिकारी",
    positionEn: "Social Development Officer",
    department: "सामाजिक विकास",
    departmentEn: "Social Development",
    phone: "+977-1-4567893",
    email: "social@palika.gov.np",
    image: "/placeholder-user.jpg",
    experience: "8 years",
    education: "समाजशास्त्र स्नातकोत्तर",
    educationEn: "Masters in Sociology",
  },
  {
    id: "5",
    name: "कृष्ण बहादुर मगर",
    nameEn: "Krishna Bahadur Magar",
    position: "वडा सचिव",
    positionEn: "Ward Secretary",
    department: "वडा कार्यालय",
    departmentEn: "Ward Office",
    phone: "+977-1-4567894",
    email: "ward1@palika.gov.np",
    image: "/placeholder-user.jpg",
    ward: "Ward 1",
    experience: "6 years",
    education: "स्नातक",
    educationEn: "Bachelor's Degree",
  },
  {
    id: "6",
    name: "लक्ष्मी श्रेष्ठ",
    nameEn: "Laxmi Shrestha",
    position: "स्वास्थ्य सहायक",
    positionEn: "Health Assistant",
    department: "स्वास्थ्य",
    departmentEn: "Health",
    phone: "+977-1-4567895",
    email: "health@palika.gov.np",
    image: "/placeholder-user.jpg",
    experience: "9 years",
    education: "स्वास्थ्य विज्ञान",
    educationEn: "Health Sciences",
  },
]

const departments = [
  { value: "all", label: "All Departments", labelNp: "सबै विभागहरू" },
  { value: "administration", label: "Administration", labelNp: "प्रशासन" },
  { value: "accounts", label: "Accounts", labelNp: "लेखा" },
  { value: "infrastructure", label: "Infrastructure", labelNp: "पूर्वाधार" },
  { value: "social", label: "Social Development", labelNp: "सामाजिक विकास" },
  { value: "ward", label: "Ward Office", labelNp: "वडा कार्यालय" },
  { value: "health", label: "Health", labelNp: "स्वास्थ्य" },
]

interface EmployeeDirectoryProps {
  language: "en" | "np"
}

export function EmployeeDirectory({ language }: EmployeeDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.positionEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.departmentEn.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment =
      selectedDepartment === "all" ||
      employee.departmentEn.toLowerCase().includes(selectedDepartment) ||
      employee.department.toLowerCase().includes(selectedDepartment)

    return matchesSearch && matchesDepartment
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center justify-center">
          <Users className="h-8 w-8 mr-3 text-primary" />
          {language === "en" ? "Employee Directory" : "कर्मचारी निर्देशिका"}
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {language === "en"
            ? "Meet our dedicated team of professionals serving the community"
            : "समुदायको सेवा गर्ने हाम्रो समर्पित पेशेवरहरूको टोलीलाई चिन्नुहोस्"}
        </p>
      </div>

      {/* Search and Filter Controls */}
      <Card className="border-0 bg-card/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === "en" ? "Search employees..." : "कर्मचारीहरू खोज्नुहोस्..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value}>
                        {language === "en" ? dept.label : dept.labelNp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  List
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {language === "en"
          ? `Showing ${filteredEmployees.length} of ${employees.length} employees`
          : `${employees.length} मध्ये ${filteredEmployees.length} कर्मचारीहरू देखाइँदै`}
      </div>

      {/* Employee Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50">
              <CardHeader className="text-center pb-4">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={employee.image || "/placeholder.svg"} alt={employee.nameEn} />
                  <AvatarFallback className="text-lg">
                    {employee.nameEn
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {language === "en" ? employee.nameEn : employee.name}
                </CardTitle>
                <CardDescription className="mb-2">
                  {language === "en" ? employee.positionEn : employee.position}
                </CardDescription>
                <Badge variant="secondary" className="mb-2">
                  {language === "en" ? employee.departmentEn : employee.department}
                </Badge>
                {employee.ward && (
                  <Badge variant="outline" className="text-xs">
                    {employee.ward}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{employee.email}</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>
                      <span className="font-medium">{language === "en" ? "Experience:" : "अनुभव:"}</span>{" "}
                      {employee.experience}
                    </div>
                    <div>
                      <span className="font-medium">{language === "en" ? "Education:" : "शिक्षा:"}</span>{" "}
                      {language === "en" ? employee.educationEn : employee.education}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="border-0 bg-card/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={employee.image || "/placeholder.svg"} alt={employee.nameEn} />
                    <AvatarFallback>
                      {employee.nameEn
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {language === "en" ? employee.nameEn : employee.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">
                          {language === "en" ? employee.departmentEn : employee.department}
                        </Badge>
                        {employee.ward && (
                          <Badge variant="outline" className="text-xs">
                            {employee.ward}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {language === "en" ? employee.positionEn : employee.position}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{employee.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{employee.email}</span>
                      </div>
                      <div className="text-muted-foreground">
                        <span className="font-medium">{language === "en" ? "Experience:" : "अनुभव:"}</span>{" "}
                        {employee.experience}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Results */}
      {filteredEmployees.length === 0 && (
        <Card className="border-0 bg-card/50">
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {language === "en" ? "No employees found" : "कुनै कर्मचारी फेला परेन"}
            </h3>
            <p className="text-muted-foreground">
              {language === "en"
                ? "Try adjusting your search terms or filters"
                : "आफ्नो खोज शब्दहरू वा फिल्टरहरू समायोजन गर्ने प्रयास गर्नुहोस्"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
