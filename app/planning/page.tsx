"use client";

import type React from "react";

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
  Calendar,
  TrendingUp,
  CheckCircle,
  DollarSign,
  Users,
  MapPin,
  Globe,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const budgetData = [
  {
    category: "Infrastructure",
    categoryNp: "पूर्वाधार",
    allocated: 2500000,
    spent: 1800000,
    percentage: 72,
  },
  {
    category: "Education",
    categoryNp: "शिक्षा",
    allocated: 1500000,
    spent: 900000,
    percentage: 60,
  },
  {
    category: "Healthcare",
    categoryNp: "स्वास्थ्य सेवा",
    allocated: 1200000,
    spent: 800000,
    percentage: 67,
  },
  {
    category: "Water & Sanitation",
    categoryNp: "पानी र सरसफाइ",
    allocated: 800000,
    spent: 600000,
    percentage: 75,
  },
];

const projects = [
  {
    id: 1,
    name: "Road Construction - Ward 3",
    nameNp: "सडक निर्माण - वडा ३",
    status: "in-progress",
    progress: 65,
    budget: 1500000,
    deadline: "2024-12-15",
    ward: "Ward 3",
  },
  {
    id: 2,
    name: "School Building Renovation",
    nameNp: "विद्यालय भवन मर्मत",
    status: "planning",
    progress: 25,
    budget: 800000,
    deadline: "2024-11-30",
    ward: "Ward 5",
  },
  {
    id: 3,
    name: "Water Supply System",
    nameNp: "खानेपानी आपूर्ति प्रणाली",
    status: "completed",
    progress: 100,
    budget: 600000,
    deadline: "2024-10-20",
    ward: "Ward 1",
  },
];

export default function PlanningModule() {
  const [language, setLanguage] = useState<"en" | "np">("en");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    projectName: "",
    projectNameNp: "",
    description: "",
    category: "",
    ward: "",
    priority: "",
    budget: "",
    deadline: "",
  });

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.projectName ||
      !formData.projectNameNp ||
      !formData.description ||
      !formData.category ||
      !formData.ward ||
      !formData.priority ||
      !formData.budget ||
      !formData.deadline
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: language === "en" ? "Success!" : "सफल!",
        description:
          language === "en"
            ? "New project plan has been created successfully"
            : "नयाँ परियोजना योजना सफलतापूर्वक सिर्जना गरिएको छ",
        variant: "default",
      });

      setFormData({
        projectName: "",
        projectNameNp: "",
        description: "",
        category: "",
        ward: "",
        priority: "",
        budget: "",
        deadline: "",
      });

      setActiveTab("dashboard");
    } catch (error) {
      toast({
        title: language === "en" ? "Error" : "त्रुटि",
        description:
          language === "en"
            ? "Failed to create project plan. Please try again."
            : "परियोजना योजना सिर्जना गर्न असफल। कृपया फेरि प्रयास गर्नुहोस्।",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      case "planning":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      completed: { en: "Completed", np: "सम्पन्न" },
      "in-progress": { en: "In Progress", np: "प्रगतिमा" },
      planning: { en: "Planning", np: "योजनामा" },
    };
    return statusMap[status as keyof typeof statusMap]?.[language] || status;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarNavigation />

      <div className="md:ml-64 p-4 md:p-8">
        <div className="mb-8 mt-12 md:mt-0 flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1F4E79] mb-2">
              {language === "en" ? "Planning Module" : "योजना मोड्युल"}
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {language === "en"
                ? "Manage municipal planning for budget, timelines, and resources"
                : "बजेट, समयसीमा, र स्रोतहरूको नगरपालिका योजना व्यवस्थापन गर्नुहोस्"}
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">
              {language === "en" ? "Dashboard" : "ड्यासबोर्ड"}
            </TabsTrigger>
            <TabsTrigger value="timeline">
              {language === "en" ? "Timeline" : "समयसीमा"}
            </TabsTrigger>
            <TabsTrigger value="add-plan">
              {language === "en" ? "Add Plan" : "योजना थप्नुहोस्"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-[#1F4E79] text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {language === "en" ? "Total Budget" : "कुल बजेट"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Rs. 60,00,000</div>
                </CardContent>
              </Card>

              <Card className="bg-[#FFC107] text-[#1F4E79]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    {language === "en" ? "Budget Spent" : "खर्च भएको बजेट"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Rs. 41,00,000</div>
                </CardContent>
              </Card>

              <Card className="bg-white border-l-4 border-l-[#1F4E79]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center text-[#1F4E79]">
                    <Users className="h-4 w-4 mr-2" />
                    {language === "en"
                      ? "Active Projects"
                      : "सक्रिय परियोजनाहरू"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#1F4E79]">12</div>
                </CardContent>
              </Card>

              <Card className="bg-white border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center text-[#1F4E79]">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {language === "en" ? "Completed" : "सम्पन्न"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">8</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79]">
                  {language === "en"
                    ? "Budget Allocation by Category"
                    : "श्रेणी अनुसार बजेट बाँडफाँड"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-[#1F4E79]">
                          {language === "en" ? item.category : item.categoryNp}
                        </span>
                        <span className="text-sm text-gray-600">
                          Rs. {item.spent.toLocaleString()} / Rs.{" "}
                          {item.allocated.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                      <div className="text-xs text-gray-500 text-right">
                        {item.percentage}%{" "}
                        {language === "en" ? "utilized" : "उपयोग"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <div className="grid gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="border-l-4 border-l-[#FFC107]"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-[#1F4E79]">
                          {language === "en" ? project.name : project.nameNp}
                        </CardTitle>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge
                            className={`${getStatusColor(
                              project.status
                            )} text-white`}
                          >
                            {getStatusText(project.status)}
                          </Badge>
                          <span className="text-sm text-gray-600 flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {project.ward}
                          </span>
                          <span className="text-sm text-gray-600 flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {project.deadline}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[#1F4E79]">
                          Rs. {project.budget.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          {language === "en" ? "Budget" : "बजेट"}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {language === "en" ? "Progress" : "प्रगति"}
                        </span>
                        <span className="text-sm text-gray-600">
                          {project.progress}%
                        </span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="add-plan" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1F4E79]">
                  {language === "en" ? "Add New Plan" : "नयाँ योजना थप्नुहोस्"}
                </CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Create a new municipal project plan with budget and timeline"
                    : "बजेट र समयसीमा सहित नयाँ नगरपालिका परियोजना योजना सिर्जना गर्नुहोस्"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleCreatePlan} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="project-name">
                        {language === "en"
                          ? "Project Name (English)"
                          : "परियोजनाको नाम (अंग्रेजी)"}
                      </Label>
                      <Input
                        id="project-name"
                        placeholder="Enter project name"
                        value={formData.projectName}
                        onChange={(e) =>
                          handleInputChange("projectName", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-name-np">
                        {language === "en"
                          ? "Project Name (Nepali)"
                          : "परियोजनाको नाम (नेपाली)"}
                      </Label>
                      <Input
                        id="project-name-np"
                        placeholder="परियोजनाको नाम लेख्नुहोस्"
                        value={formData.projectNameNp}
                        onChange={(e) =>
                          handleInputChange("projectNameNp", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">
                      {language === "en" ? "Description" : "विवरण"}
                    </Label>
                    <Textarea
                      id="description"
                      placeholder={
                        language === "en"
                          ? "Enter project description"
                          : "परियोजनाको विवरण लेख्नुहोस्"
                      }
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category">
                        {language === "en" ? "Category" : "श्रेणी"}
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          handleInputChange("category", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              language === "en"
                                ? "Select category"
                                : "श्रेणी छान्नुहोस्"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="infrastructure">
                            {language === "en" ? "Infrastructure" : "पूर्वाधार"}
                          </SelectItem>
                          <SelectItem value="education">
                            {language === "en" ? "Education" : "शिक्षा"}
                          </SelectItem>
                          <SelectItem value="healthcare">
                            {language === "en"
                              ? "Healthcare"
                              : "स्वास्थ्य सेवा"}
                          </SelectItem>
                          <SelectItem value="water-sanitation">
                            {language === "en"
                              ? "Water & Sanitation"
                              : "पानी र सरसफाइ"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ward">
                        {language === "en" ? "Ward" : "वडा"}
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
                    <div className="space-y-2">
                      <Label htmlFor="priority">
                        {language === "en" ? "Priority" : "प्राथमिकता"}
                      </Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) =>
                          handleInputChange("priority", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              language === "en"
                                ? "Select priority"
                                : "प्राथमिकता छान्नुहोस्"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">
                            {language === "en" ? "High" : "उच्च"}
                          </SelectItem>
                          <SelectItem value="medium">
                            {language === "en" ? "Medium" : "मध्यम"}
                          </SelectItem>
                          <SelectItem value="low">
                            {language === "en" ? "Low" : "न्यून"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="budget">
                        {language === "en" ? "Budget (NPR)" : "बजेट (रुपैयाँ)"}
                      </Label>
                      <Input
                        id="budget"
                        type="number"
                        placeholder="0"
                        value={formData.budget}
                        onChange={(e) =>
                          handleInputChange("budget", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline">
                        {language === "en" ? "Deadline" : "समयसीमा"}
                      </Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={(e) =>
                          handleInputChange("deadline", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("dashboard")}
                    >
                      {language === "en" ? "Cancel" : "रद्द गर्नुहोस्"}
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#1F4E79] hover:bg-[#1F4E79]/90"
                    >
                      {language === "en"
                        ? "Create Plan"
                        : "योजना सिर्जना गर्नुहोस्"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
