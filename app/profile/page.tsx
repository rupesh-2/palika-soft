"use client"

import { useState } from "react"
import { SidebarNavigation } from "@/components/sidebar-navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Settings, Shield, Globe, Save, Edit, LogOut } from "lucide-react"

const userProfile = {
  id: "USR001",
  name: "Ram Bahadur Thapa",
  email: "ram.thapa@email.com",
  phone: "+977-9841234567",
  citizenship: "12-34-56-78901",
  ward: "Ward 3",
  address: "Kathmandu Metropolitan City, Ward 3, Thamel",
  userType: "citizen",
  registrationDate: "2024-01-15",
  lastLogin: "2024-11-05 10:30 AM",
  status: "active",
}

const activityLog = [
  {
    id: 1,
    action: "Business Registration Submitted",
    actionNp: "व्यवसाय दर्ता पेश गरियो",
    date: "2024-11-01",
    time: "2:30 PM",
    status: "completed",
  },
  {
    id: 2,
    action: "Fuel Token Request",
    actionNp: "इन्धन टोकन अनुरोध",
    date: "2024-10-28",
    time: "11:15 AM",
    status: "approved",
  },
  {
    id: 3,
    action: "Recommendation Submitted",
    actionNp: "सिफारिस पेश गरियो",
    date: "2024-10-25",
    time: "4:45 PM",
    status: "under-review",
  },
]

export default function ProfilePage() {
  const [language, setLanguage] = useState<"en" | "np">("en")
  const [isEditing, setIsEditing] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "completed":
        return "bg-blue-500"
      case "approved":
        return "bg-green-500"
      case "under-review":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    const statusMap = {
      active: { en: "Active", np: "सक्रिय" },
      completed: { en: "Completed", np: "सम्पन्न" },
      approved: { en: "Approved", np: "स्वीकृत" },
      "under-review": { en: "Under Review", np: "समीक्षाधीन" },
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
              {language === "en" ? "User Profile" : "प्रयोगकर्ता प्रोफाइल"}
            </h1>
            <p className="text-gray-600">
              {language === "en"
                ? "Manage your account information and settings"
                : "आफ्नो खाता जानकारी र सेटिङहरू व्यवस्थापन गर्नुहोस्"}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setLanguage(language === "en" ? "np" : "en")}>
            <Globe className="h-4 w-4 mr-2" />
            {language === "en" ? "नेपाली" : "English"}
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">{language === "en" ? "Profile" : "प्रोफाइल"}</TabsTrigger>
            <TabsTrigger value="security">{language === "en" ? "Security" : "सुरक्षा"}</TabsTrigger>
            <TabsTrigger value="activity">{language === "en" ? "Activity" : "गतिविधि"}</TabsTrigger>
            <TabsTrigger value="settings">{language === "en" ? "Settings" : "सेटिङहरू"}</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-[#1F4E79] flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      {language === "en" ? "Personal Information" : "व्यक्तिगत जानकारी"}
                    </CardTitle>
                    <CardDescription>
                      {language === "en"
                        ? "Update your personal details and contact information"
                        : "आफ्नो व्यक्तिगत विवरण र सम्पर्क जानकारी अपडेट गर्नुहोस्"}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? (language === "en" ? "Cancel" : "रद्द गर्नुहोस्") : language === "en" ? "Edit" : "सम्पादन"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Summary */}
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <div className="w-16 h-16 bg-[#1F4E79] rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#1F4E79]">{userProfile.name}</h3>
                    <p className="text-sm text-gray-600">ID: {userProfile.id}</p>
                    <Badge className={`${getStatusColor(userProfile.status)} text-white mt-1`}>
                      {getStatusText(userProfile.status)}
                    </Badge>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">{language === "en" ? "Full Name" : "पूरा नाम"}</Label>
                    <Input
                      id="full-name"
                      value={userProfile.name}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{language === "en" ? "Email Address" : "इमेल ठेगाना"}</Label>
                    <Input
                      id="email"
                      value={userProfile.email}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{language === "en" ? "Phone Number" : "फोन नम्बर"}</Label>
                    <Input
                      id="phone"
                      value={userProfile.phone}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="citizenship">{language === "en" ? "Citizenship Number" : "नागरिकता नम्बर"}</Label>
                    <Input
                      id="citizenship"
                      value={userProfile.citizenship}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ward">{language === "en" ? "Ward" : "वडा"}</Label>
                    {isEditing ? (
                      <Select defaultValue="ward-3">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((ward) => (
                            <SelectItem key={ward} value={`ward-${ward}`}>
                              {language === "en" ? `Ward ${ward}` : `वडा ${ward}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input value={userProfile.ward} disabled className="bg-gray-50" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registration-date">{language === "en" ? "Registration Date" : "दर्ता मिति"}</Label>
                    <Input value={userProfile.registrationDate} disabled className="bg-gray-50" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">{language === "en" ? "Full Address" : "पूरा ठेगाना"}</Label>
                  <Input
                    id="address"
                    value={userProfile.address}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-4">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      {language === "en" ? "Cancel" : "रद्द गर्नुहोस्"}
                    </Button>
                    <Button className="bg-[#1F4E79] hover:bg-[#1F4E79]/90">
                      <Save className="h-4 w-4 mr-2" />
                      {language === "en" ? "Save Changes" : "परिवर्तनहरू सेभ गर्नुहोस्"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79] flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  {language === "en" ? "Security Settings" : "सुरक्षा सेटिङहरू"}
                </CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Manage your password and security preferences"
                    : "आफ्नो पासवर्ड र सुरक्षा प्राथमिकताहरू व्यवस्थापन गर्नुहोस्"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Password Change */}
                <div className="space-y-4">
                  <h3 className="font-medium text-[#1F4E79]">
                    {language === "en" ? "Change Password" : "पासवर्ड परिवर्तन गर्नुहोस्"}
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">
                        {language === "en" ? "Current Password" : "हालको पासवर्ड"}
                      </Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">{language === "en" ? "New Password" : "नयाँ पासवर्ड"}</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-new-password">
                        {language === "en" ? "Confirm New Password" : "नयाँ पासवर्ड पुष्टि गर्नुहोस्"}
                      </Label>
                      <Input id="confirm-new-password" type="password" />
                    </div>
                  </div>
                  <Button className="bg-[#1F4E79] hover:bg-[#1F4E79]/90">
                    {language === "en" ? "Update Password" : "पासवर्ड अपडेट गर्नुहोस्"}
                  </Button>
                </div>

                {/* Login History */}
                <div className="space-y-4 pt-6 border-t">
                  <h3 className="font-medium text-[#1F4E79]">{language === "en" ? "Login History" : "लगइन इतिहास"}</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{language === "en" ? "Last Login" : "अन्तिम लगइन"}</p>
                        <p className="text-sm text-gray-600">{userProfile.lastLogin}</p>
                      </div>
                      <Badge className="bg-green-500 text-white">
                        {language === "en" ? "Current Session" : "हालको सत्र"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79]">
                  {language === "en" ? "Recent Activity" : "हालैका गतिविधिहरू"}
                </CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Your recent interactions with municipal services"
                    : "नगरपालिका सेवाहरूसँग तपाईंको हालैका अन्तरक्रियाहरू"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityLog.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-[#1F4E79]">
                          {language === "en" ? activity.action : activity.actionNp}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {activity.date} at {activity.time}
                        </p>
                      </div>
                      <Badge className={`${getStatusColor(activity.status)} text-white`}>
                        {getStatusText(activity.status)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79] flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  {language === "en" ? "Account Settings" : "खाता सेटिङहरू"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Language Preference */}
                <div className="space-y-4">
                  <h3 className="font-medium text-[#1F4E79]">
                    {language === "en" ? "Language Preference" : "भाषा प्राथमिकता"}
                  </h3>
                  <Select defaultValue={language}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="np">नेपाली</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Notifications */}
                <div className="space-y-4 pt-6 border-t">
                  <h3 className="font-medium text-[#1F4E79]">
                    {language === "en" ? "Notification Preferences" : "सूचना प्राथमिकताहरू"}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>{language === "en" ? "Email Notifications" : "इमेल सूचनाहरू"}</span>
                      <Button variant="outline" size="sm">
                        {language === "en" ? "Enabled" : "सक्षम"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{language === "en" ? "SMS Notifications" : "SMS सूचनाहरू"}</span>
                      <Button variant="outline" size="sm">
                        {language === "en" ? "Enabled" : "सक्षम"}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Account Actions */}
                <div className="space-y-4 pt-6 border-t">
                  <h3 className="font-medium text-[#1F4E79]">
                    {language === "en" ? "Account Actions" : "खाता कार्यहरू"}
                  </h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <LogOut className="h-4 w-4 mr-2" />
                      {language === "en" ? "Sign Out" : "साइन आउट गर्नुहोस्"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
