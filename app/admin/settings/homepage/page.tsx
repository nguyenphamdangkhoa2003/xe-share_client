"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash, CloudUpload, Send } from "lucide-react";


export default function HomePage() {
  const [banner, setBanner] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const editorRef = useRef<HTMLElement>(null);

  // Xử lý upload banner
  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setBanner(event.target.files[0]);
    }
  };

  // Xử lý Submit
  const handleSubmit = () => {
    console.log("Banner:", banner);
    console.log("Nội dung:", content);
    alert("Dữ liệu đã được lưu!");
  };

  // Khởi tạo editor khi component mount
  useEffect(() => {
    const initEditor = async () => {
      const { RichTextEditor } = await import('@vaadin/rich-text-editor');
      
      // Đăng ký custom element nếu chưa có
      if (!customElements.get('vaadin-rich-text-editor')) {
        customElements.define('vaadin-rich-text-editor', RichTextEditor);
      }

      // Thêm event listener nếu editor tồn tại
      if (editorRef.current) {
        editorRef.current.addEventListener('value-changed', (e: Event) => {
          const customEvent = e as CustomEvent<{ value: string }>;
          setContent(customEvent.detail.value);
        });
      }
    };

    initEditor();
  }, []);

  return (
    <div className="p-3">
      <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight">Cấu hình Trang Chủ</h2>

      <div className="container mx-auto py-10 space-y-10 max-w-lvh">
        {/* Phần Banner */}
        <Card>
          <CardHeader>
            <CardTitle>Banner Trang Chủ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border p-4 rounded-lg flex flex-col items-center">
              {banner ? (
                <div className="w-full flex items-center justify-between">
                  <span className="truncate">{banner.name}</span>
                  <Button variant="destructive" size="icon" onClick={() => setBanner(null)}>
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center cursor-pointer">
                  <CloudUpload className="w-8 h-8 text-gray-500" />
                  <span className="mt-2 text-sm text-gray-500">Nhấn để tải lên</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleBannerUpload} 
                  />
                </label>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Phần Nội dung Rich Text */}
        <Card>
          <CardHeader>
            <CardTitle>Nội dung Trang Chủ</CardTitle>
          </CardHeader>
          <CardContent>
            <vaadin-rich-text-editor
              ref={editorRef}
              style={{ height: "300px", width: "100%" }}
              theme="compact"
            />
            <div className="flex justify-end mt-4">
              <Button onClick={handleSubmit}>
                <Send className="mr-2 w-4 h-4" /> Lưu Thay Đổi
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}