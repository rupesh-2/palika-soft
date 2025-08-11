import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  titleNp: string;
  description: string;
  descriptionNp: string;
  icon: LucideIcon;
  href: string;
  stats?: {
    label: string;
    labelNp: string;
    value: string;
  };
  language: "en" | "np";
}

export function DashboardCard({
  title,
  titleNp,
  description,
  descriptionNp,
  icon: Icon,
  href,
  stats,
  language,
}: DashboardCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-[#FFC107]">
      <CardHeader className="pb-2 sm:pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-1.5 sm:p-2 bg-[#1F4E79] rounded-lg">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-sm sm:text-base md:text-lg text-[#1F4E79]">
                {language === "en" ? title : titleNp}
              </CardTitle>
              {stats && (
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#FFC107] mt-1">
                  {stats.value}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">
          {language === "en" ? description : descriptionNp}
        </CardDescription>
        {stats && (
          <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            {language === "en" ? stats.label : stats.labelNp}
          </p>
        )}
        <Button
          className="w-full bg-[#1F4E79] hover:bg-[#1F4E79]/90 text-white text-xs sm:text-sm h-8 sm:h-10"
          asChild
        >
          <a href={href}>
            {language === "en" ? "Access Module" : "मोड्युल पहुँच गर्नुहोस्"}
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
