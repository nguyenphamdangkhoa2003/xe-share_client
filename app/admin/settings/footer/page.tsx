"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Facebook, Linkedin, Instagram, Twitter, Plus, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Định nghĩa kiểu cho social links
type SocialLinks = {
  [key: string]: string;
};

const socialMediaOptions = [
  { value: "facebook", label: "Facebook", icon: Facebook, color: "text-blue-600" },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin, color: "text-blue-700" },
  { value: "instagram", label: "Instagram", icon: Instagram, color: "text-pink-600" },
  { value: "twitter", label: "Twitter", icon: Twitter, color: "text-blue-400" },
];

export default function FooterSettingPage() {
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    address: "",
  });

  const [socialLinks, setSocialLinks] = useState<SocialLinks>({});
  const [selectedSocial, setSelectedSocial] = useState("");
  const [socialLinkInput, setSocialLinkInput] = useState("");

  // Lấy danh sách các mạng xã hội chưa được thêm
  const availableSocials = socialMediaOptions.filter(
    (option) => !socialLinks[option.value]
  );

  // Xử lý thay đổi thông tin liên hệ
  const handleContactInfoChange = (field: string, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  // Thêm mạng xã hội mới
  const handleAddSocial = () => {
    if (selectedSocial && socialLinkInput) {
      setSocialLinks(prev => ({
        ...prev,
        [selectedSocial]: socialLinkInput
      }));
      setSelectedSocial("");
      setSocialLinkInput("");
    }
  };

  // Xóa mạng xã hội
  const handleRemoveSocial = (platform: string) => {
    const newSocialLinks = { ...socialLinks };
    delete newSocialLinks[platform];
    setSocialLinks(newSocialLinks);
  };

  // Xử lý submit thông tin liên hệ
  const handleContactSubmit = () => {
    console.log("Contact info submitted:", contactInfo);
    alert("Thông tin liên hệ đã được lưu!");
  };

  // Xử lý submit mạng xã hội
  const handleSocialSubmit = () => {
    console.log("Social links submitted:", socialLinks);
    alert("Thông tin mạng xã hội đã được lưu!");
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
                  value={contactInfo.phone}
                  onChange={(e) => handleContactInfoChange("phone", e.target.value)}
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  value={contactInfo.email}
                  onChange={(e) => handleContactInfoChange("email", e.target.value)}
                  placeholder="Nhập email"
                  type="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Địa chỉ</label>
              <Textarea
                value={contactInfo.address}
                onChange={(e) => handleContactInfoChange("address", e.target.value)}
                placeholder="Nhập địa chỉ"
                rows={3}
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={handleContactSubmit}>
                <Send className="mr-2 w-4 h-4" /> Lưu thông tin liên hệ
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Mạng xã hội */}
        <Card>
          <CardHeader>
            <CardTitle>Mạng xã hội</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Form thêm mới mạng xã hội */}
            <div className="flex gap-2 items-end flex-wrap md:flex-nowrap">
              <div className="space-y-2 w-full md:w-1/2">
                <label className="text-sm font-medium">Mạng xã hội</label>
                <Select value={selectedSocial} onValueChange={setSelectedSocial}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn mạng xã hội" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSocials.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.icon className={`w-4 h-4 ${option.color}`} />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 w-full md:w-1/2">
                <label className="text-sm font-medium">Đường dẫn</label>
                <Input
                  value={socialLinkInput}
                  onChange={(e) => setSocialLinkInput(e.target.value)}
                  placeholder="Nhập đường dẫn"
                />
              </div>

              <Button onClick={handleAddSocial} disabled={!selectedSocial || !socialLinkInput} className="w-full md:w-auto mt-2 md:mt-0">
                <Plus className="w-4 h-4 mr-2" /> Thêm
              </Button>
            </div>

            {/* Danh sách mạng xã hội đã thêm */}
            <div className="space-y-3 mt-4">
              {Object.entries(socialLinks).map(([platform, url]) => {
                const option = socialMediaOptions.find(opt => opt.value === platform);
                if (!option) return null;

                const Icon = option.icon;

                return (
                  <div key={platform} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3 w-0 flex-1">
                      <Icon className={`w-5 h-5 ${option.color} shrink-0`} />
                      <span className="font-medium shrink-0">{option.label}</span>
                      <span className="text-muted-foreground text-sm truncate min-w-0">{url}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveSocial(platform)}
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={handleSocialSubmit}>
                <Send className="mr-2 w-4 h-4" /> Lưu mạng xã hội
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}