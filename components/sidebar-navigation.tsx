"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ClipboardList,
  Building2,
  Fuel,
  FileText,
  Menu,
  X,
  Globe,
  User,
  LogOut,
  FileCheck,
  MessageSquare,
} from "lucide-react";

const navigationItems = [
  {
    title: "Dashboard",
    titleNp: "ड्यासबोर्ड",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Planning",
    titleNp: "योजना",
    href: "/planning",
    icon: ClipboardList,
  },
  {
    title: "Business Registration",
    titleNp: "व्यवसाय दर्ता",
    href: "/business",
    icon: Building2,
  },
  {
    title: "Fuel Management",
    titleNp: "इन्धन व्यवस्थापन",
    href: "/fuel",
    icon: Fuel,
  },
  {
    title: "Sifaris",
    titleNp: "सिफारिस",
    href: "/sifaris",
    icon: FileCheck,
  },
  {
    title: "Gunaso",
    titleNp: "गुनासो",
    href: "/gunaso",
    icon: MessageSquare,
  },
  {
    title: "Governance",
    titleNp: "शासन",
    href: "/governance",
    icon: FileText,
  },
];

export function SidebarNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "np">("en");

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-[#1F4E79] text-white transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-xl font-bold mb-2">
              {language === "en" ? "Palika Municipal" : "पालिका नगरपालिका"}
            </h1>
            <p className="text-blue-200 text-sm">
              {language === "en" ? "Management System" : "व्यवस्थापन प्रणाली"}
            </p>
          </div>

          {/* Language Toggle */}
          <Button
            variant="outline"
            size="sm"
            className="mb-4 sm:mb-6 w-full bg-transparent border-blue-300 text-white hover:bg-blue-600 text-xs sm:text-sm"
            onClick={() => setLanguage(language === "en" ? "np" : "en")}
          >
            <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            {language === "en" ? "नेपाली" : "English"}
          </Button>

          {/* Navigation Items */}
          <nav className="space-y-1 sm:space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-blue-600 hover:text-white text-xs sm:text-sm h-9 sm:h-10"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
                    {language === "en" ? item.title : item.titleNp}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-blue-300">
            <Link href="/profile">
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-blue-600 hover:text-white mb-2 text-xs sm:text-sm h-9 sm:h-10"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
                {language === "en" ? "Profile" : "प्रोफाइल"}
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-blue-600 hover:text-white text-xs sm:text-sm h-9 sm:h-10"
                onClick={() => setIsOpen(false)}
              >
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
                {language === "en" ? "Sign Out" : "साइन आउट"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
