"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Mail, Phone, MapPin, Edit, Camera } from "lucide-react";
import WalletDashboard from "./WalletDashBoard";

const UserProfile = () => {
  const user = {
    name: "Sarah Anderson",
    email: "sarah.anderson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "Member since Jan 2024",
    role: "Premium Member",
    avatarUrl: "/api/placeholder/150/150",
  };

  return (
    <div className="min-h-screen bg-[#19191D] text-[#EDEDF0]">
      <style jsx global>{`
        :root {
          --primary: #fd366e;
          --primary-foreground: #ededf0;
        }
      `}</style>

      <div className="container mx-auto py-8 px-4">
        <div className="grid gap-6 md:grid-cols-12">
          {/* Profile Section */}
          <div className="md:col-span-4 space-y-6">
            <Card className="bg-[#19191D] border-zinc-800">
              <CardHeader className="text-center pb-4">
                <div className="relative w-32 h-32 mx-auto">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback className="bg-zinc-800">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 bg-[#FD366E] hover:bg-[#FD366E]/90"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="mt-4 text-2xl font-bold">
                  {user.name}
                </CardTitle>
                <Badge className="bg-[#FD366E] text-[#EDEDF0]">
                  {user.role}
                </Badge>
                <p className="text-sm text-zinc-400 mt-2">{user.joinDate}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-zinc-300">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">{user.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{user.location}</span>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button className="flex-1 bg-[#FD366E] hover:bg-[#FD366E]/90">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-zinc-700 hover:bg-zinc-800 bg-[#19191D]"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Wallet Dashboard Section */}
          <div className="md:col-span-8 space-y-6">
            <WalletDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
