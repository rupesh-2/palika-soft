"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  Search,
  Filter,
  ArrowRight,
  Download,
  Eye,
  Bell,
  Users,
  Megaphone,
} from "lucide-react"

interface Notice {
  id: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  type: "notice" | "tender" | "announcement" | "policy"
  typeNp: string
  typeEn: string
  priority: "high" | "medium" | "low"
  publishDate: string
  expiryDate?: string
  department: string
  departmentEn: string
  attachments?: string[]
  views: number
}

interface Event {
  id: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  type: "meeting" | "program" | "training" | "ceremony"
  typeNp: string
  typeEn: string
  date: string
  time: string
  venue: string
  venueEn: string
  organizer: string
  organizerEn: string
  capacity?: number
  registered?: number
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
}

const notices: Notice[] = [
  {
    id: "1",
    title: "नयाँ व्यवसाय दर्ता प्रक्रिया सुरु",
    titleEn: "New Business Registration Process Started",
    description: "अब व्यवसाय दर्ता अनलाइनबाट गर्न सकिने भएको छ। सबै आवश्यक कागजातहरू तयार राखेर आवेदन दिन सकिन्छ।",
    descriptionEn:
      "Business registration can now be done online. All required documents should be prepared before applying.",
    type: "notice",
    typeNp: "सूचना",
    typeEn: "Notice",
    priority: "high",
    publishDate: "2024-01-15",
    expiryDate: "2024-03-15",
    department: "व्यवसाय विभाग",
    departmentEn: "Business Department",
    attachments: ["business-registration-form.pdf", "required-documents.pdf"],
    views: 1250,
  },
  {
    id: "2",
    title: "सडक मर्मत कार्यको लागि टेन्डर आह्वान",
    titleEn: "Tender Call for Road Maintenance Work",
    description: "वडा नम्बर ३ र ५ को सडक मर्मत कार्यको लागि योग्य ठेकेदारहरूबाट टेन्डर आह्वान गरिएको छ।",
    descriptionEn: "Tender is called from qualified contractors for road maintenance work in Ward No. 3 and 5.",
    type: "tender",
    typeNp: "टेन्डर",
    typeEn: "Tender",
    priority: "medium",
    publishDate: "2024-01-12",
    expiryDate: "2024-02-12",
    department: "पूर्वाधार विभाग",
    departmentEn: "Infrastructure Department",
    attachments: ["tender-document.pdf", "technical-specifications.pdf"],
    views: 890,
  },
  {
    id: "3",
    title: "कोभिड-१९ खोप कार्यक्रम",
    titleEn: "COVID-19 Vaccination Program",
    description: "सबै उमेरका नागरिकहरूको लागि निःशुल्क कोभिड-१९ खोप कार्यक्रम सञ्चालन गरिने छ।",
    descriptionEn: "Free COVID-19 vaccination program will be conducted for citizens of all ages.",
    type: "announcement",
    typeNp: "घोषणा",
    typeEn: "Announcement",
    priority: "high",
    publishDate: "2024-01-10",
    department: "स्वास्थ्य विभाग",
    departmentEn: "Health Department",
    views: 2100,
  },
]

const events: Event[] = [
  {
    id: "1",
    title: "वडा सभाको बैठक",
    titleEn: "Ward Assembly Meeting",
    description: "मासिक वडा सभाको बैठकमा सबै वडावासीहरूको उपस्थिति अनुरोध गरिन्छ।",
    descriptionEn: "All ward residents are requested to attend the monthly ward assembly meeting.",
    type: "meeting",
    typeNp: "बैठक",
    typeEn: "Meeting",
    date: "2024-01-25",
    time: "10:00 AM",
    venue: "वडा कार्यालय सभाहल",
    venueEn: "Ward Office Hall",
    organizer: "वडा कार्यालय",
    organizerEn: "Ward Office",
    capacity: 100,
    registered: 45,
    status: "upcoming",
  },
  {
    id: "2",
    title: "सफाई अभियान कार्यक्रम",
    titleEn: "Cleanliness Campaign Program",
    description: "समुदायिक सफाई अभियानमा सबै नागरिकहरूको सहभागिता अपेक्षा गरिन्छ।",
    descriptionEn: "Participation of all citizens is expected in the community cleanliness campaign.",
    type: "program",
    typeNp: "कार्यक्रम",
    typeEn: "Program",
    date: "2024-01-28",
    time: "6:00 AM",
    venue: "मुख्य बजार क्षेत्र",
    venueEn: "Main Market Area",
    organizer: "पर्यावरण समिति",
    organizerEn: "Environment Committee",
    status: "upcoming",
  },
  {
    id: "3",
    title: "डिजिटल साक्षरता तालिम",
    titleEn: "Digital Literacy Training",
    description: "वृद्ध नागरिकहरूको लागि निःशुल्क डिजिटल साक्षरता तालिम कार्यक्रम।",
    descriptionEn: "Free digital literacy training program for senior citizens.",
    type: "training",
    typeNp: "तालिम",
    typeEn: "Training",
    date: "2024-02-01",
    time: "2:00 PM",
    venue: "सामुदायिक केन्द्र",
    venueEn: "Community Center",
    organizer: "सूचना प्रविधि विभाग",
    organizerEn: "IT Department",
    capacity: 30,
    registered: 18,
    status: "upcoming",
  },
]

const noticeTypes = [
  { value: "all", label: "All Types", labelNp: "सबै प्रकार" },
  { value: "notice", label: "Notice", labelNp: "सूचना" },
  { value: "tender", label: "Tender", labelNp: "टेन्डर" },
  { value: "announcement", label: "Announcement", labelNp: "घोषणा" },
  { value: "policy", label: "Policy", labelNp: "नीति" },
]

const eventTypes = [
  { value: "all", label: "All Types", labelNp: "सबै प्रकार" },
  { value: "meeting", label: "Meeting", labelNp: "बैठक" },
  { value: "program", label: "Program", labelNp: "कार्यक्रम" },
  { value: "training", label: "Training", labelNp: "तालिम" },
  { value: "ceremony", label: "Ceremony", labelNp: "समारोह" },
]

interface NoticesEventsProps {
  language: "en" | "np"
}

export function NoticesEvents({ language }: NoticesEventsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNoticeType, setSelectedNoticeType] = useState("all")
  const [selectedEventType, setSelectedEventType] = useState("all")
  const [activeTab, setActiveTab] = useState("notices")

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.descriptionEn.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedNoticeType === "all" || notice.type === selectedNoticeType

    return matchesSearch && matchesType
  })

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.descriptionEn.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedEventType === "all" || event.type === selectedEventType

    return matchesSearch && matchesType
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "default"
      case "ongoing":
        return "destructive"
      case "completed":
        return "secondary"
      case "cancelled":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center justify-center">
          <Megaphone className="h-8 w-8 mr-3 text-primary" />
          {language === "en" ? "Notices & Events" : "सूचनाहरू र कार्यक्रमहरू"}
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {language === "en"
            ? "Stay updated with the latest announcements and upcoming events"
            : "पछिल्ला घोषणाहरू र आगामी कार्यक्रमहरूसँग अद्यावधिक रहनुहोस्"}
        </p>
      </div>

      {/* Search and Filter Controls */}
      <Card className="border-0 bg-card/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={language === "en" ? "Search notices and events..." : "सूचना र कार्यक्रमहरू खोज्नुहोस्..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Notices and Events */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notices" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>{language === "en" ? "Notices" : "सूचनाहरू"}</span>
            <Badge variant="secondary" className="ml-2">
              {filteredNotices.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{language === "en" ? "Events" : "कार्यक्रमहरू"}</span>
            <Badge variant="secondary" className="ml-2">
              {filteredEvents.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Notices Tab */}
        <TabsContent value="notices" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedNoticeType} onValueChange={setSelectedNoticeType}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {noticeTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {language === "en" ? type.label : type.labelNp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredNotices.map((notice) => (
              <Card key={notice.id} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={getPriorityColor(notice.priority) as any}>
                      {language === "en" ? notice.typeEn : notice.typeNp}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Eye className="h-4 w-4 mr-1" />
                      {notice.views}
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {language === "en" ? notice.titleEn : notice.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {language === "en" ? notice.descriptionEn : notice.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{notice.publishDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span>{language === "en" ? notice.departmentEn : notice.department}</span>
                    </div>
                  </div>

                  {notice.expiryDate && (
                    <div className="flex items-center space-x-2 text-sm text-orange-600">
                      <Clock className="h-4 w-4" />
                      <span>
                        {language === "en" ? "Expires:" : "समाप्ति:"} {notice.expiryDate}
                      </span>
                    </div>
                  )}

                  {notice.attachments && notice.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {notice.attachments.map((attachment, index) => (
                        <Button key={index} variant="outline" size="sm" className="text-xs bg-transparent">
                          <Download className="h-3 w-3 mr-1" />
                          {attachment}
                        </Button>
                      ))}
                    </div>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    {language === "en" ? "Read More" : "थप पढ्नुहोस्"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {language === "en" ? type.label : type.labelNp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={getStatusColor(event.status) as any}>
                      {language === "en" ? event.typeEn : event.typeNp}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {event.status.toUpperCase()}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {language === "en" ? event.titleEn : event.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {language === "en" ? event.descriptionEn : event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{language === "en" ? event.venueEn : event.venue}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{language === "en" ? event.organizerEn : event.organizer}</span>
                    </div>
                  </div>

                  {event.capacity && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{language === "en" ? "Registration:" : "दर्ता:"}</span>
                        <span className="font-medium">
                          {event.registered || 0} / {event.capacity}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${((event.registered || 0) / event.capacity) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      {language === "en" ? "View Details" : "विवरण हेर्नुहोस्"}
                    </Button>
                    {event.status === "upcoming" && (
                      <Button size="sm" className="flex-1">
                        {language === "en" ? "Register" : "दर्ता गर्नुहोस्"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* No Results */}
      {((activeTab === "notices" && filteredNotices.length === 0) ||
        (activeTab === "events" && filteredEvents.length === 0)) && (
        <Card className="border-0 bg-card/50">
          <CardContent className="p-12 text-center">
            {activeTab === "notices" ? (
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            ) : (
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            )}
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {language === "en"
                ? `No ${activeTab} found`
                : activeTab === "notices"
                  ? "कुनै सूचना फेला परेन"
                  : "कुनै कार्यक्रम फेला परेन"}
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
