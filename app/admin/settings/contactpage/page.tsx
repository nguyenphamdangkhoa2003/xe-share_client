"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  // State cho thông tin liên hệ
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    address: "",
    mapUrl: ""
  });

  // Xử lý thay đổi thông tin
  const handleChange = (field: string, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  // Xử lý submit
  const handleSubmit = () => {
    console.log("Contact info submitted:", contactInfo);
    alert("Thông tin liên hệ đã được lưu!");
  };

  return (
    <div className="p-3">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Setting Contact Page
      </h2>

      <div className="container mx-auto py-10 space-y-8 max-w-lvh">
        {/* Thông tin liên hệ */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin liên hệ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Số điện thoại</label>
              <Input
                value={contactInfo.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                value={contactInfo.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Nhập email"
                type="email"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Địa chỉ</label>
              <Textarea
                value={contactInfo.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="Nhập địa chỉ"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Đường dẫn Google Maps</label>
              <Input
                value={contactInfo.mapUrl}
                onChange={(e) => handleChange("mapUrl", e.target.value)}
                placeholder="Dán link Google Maps tại đây"
              />
              {contactInfo.mapUrl && (
                <div className="mt-2">
                  <div className="text-sm text-muted-foreground mb-1">
                    Preview:
                  </div>
                  <iframe
                    src={contactInfo.mapUrl.replace("/place/", "/embed?q=")}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="rounded-lg"
                  ></iframe>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleSubmit}>
                <Send className="mr-2 w-4 h-4" /> Lưu thay đổi
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}