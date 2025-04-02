"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Facebook, Linkedin, Instagram, Twitter } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function FooterSettingPage() {
  // State cho thông tin footer
  const [footerInfo, setFooterInfo] = useState({
    phone: "",
    email: "",
    address: "",
    socialLinks: {
      facebook: "",
      linkedin: "",
      instagram: "",
      twitter: ""
    }
  });

  // Xử lý thay đổi thông tin chính
  const handleMainInfoChange = (field: string, value: string) => {
    setFooterInfo(prev => ({ ...prev, [field]: value }));
  };

  // Xử lý thay đổi mạng xã hội
  const handleSocialChange = (platform: string, value: string) => {
    setFooterInfo(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  // Xử lý submit
  const handleSubmit = () => {
    console.log("Footer info submitted:", footerInfo);
    alert("Thông tin footer đã được lưu!");
  };

  return (
    <div className="p-3">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Setting Footer
      </h2>

      <div className="container mx-auto py-10 space-y-8 max-w-lvh">
        {/* Thông tin liên hệ */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin liên hệ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Số điện thoại</label>
                <Input
                  value={footerInfo.phone}
                  onChange={(e) => handleMainInfoChange("phone", e.target.value)}
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  value={footerInfo.email}
                  onChange={(e) => handleMainInfoChange("email", e.target.value)}
                  placeholder="Nhập email"
                  type="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Địa chỉ</label>
              <Textarea
                value={footerInfo.address}
                onChange={(e) => handleMainInfoChange("address", e.target.value)}
                placeholder="Nhập địa chỉ"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Mạng xã hội */}
        <Card>
          <CardHeader>
            <CardTitle>Mạng xã hội</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Facebook className="w-5 h-5 text-blue-600" />
                  <label className="text-sm font-medium">Facebook</label>
                </div>
                <Input
                  value={footerInfo.socialLinks.facebook}
                  onChange={(e) => handleSocialChange("facebook", e.target.value)}
                  placeholder="https://facebook.com/username"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Linkedin className="w-5 h-5 text-blue-700" />
                  <label className="text-sm font-medium">LinkedIn</label>
                </div>
                <Input
                  value={footerInfo.socialLinks.linkedin}
                  onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/company/username"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Instagram className="w-5 h-5 text-pink-600" />
                  <label className="text-sm font-medium">Instagram</label>
                </div>
                <Input
                  value={footerInfo.socialLinks.instagram}
                  onChange={(e) => handleSocialChange("instagram", e.target.value)}
                  placeholder="https://instagram.com/username"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Twitter className="w-5 h-5 text-blue-400" />
                  <label className="text-sm font-medium">Twitter</label>
                </div>
                <Input
                  value={footerInfo.socialLinks.twitter}
                  onChange={(e) => handleSocialChange("twitter", e.target.value)}
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nút lưu */}
        <div className="flex justify-end">
          <Button onClick={handleSubmit}>
            <Send className="mr-2 w-4 h-4" /> Lưu thay đổi
          </Button>
        </div>
      </div>
    </div>
  );
}