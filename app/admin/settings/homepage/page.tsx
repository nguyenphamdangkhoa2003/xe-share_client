"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Plus, CloudUpload, Send } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type ContentState = {
  title: string;
  image: File | null;
  paragraphs: string[];
  subContents: { subTitle: string; subText: string }[];
};

export default function HomePage() {
  const [banner, setBanner] = useState<File | null>(null);
  const [content1, setContent1] = useState<ContentState>({ 
    title: "", 
    image: null,
    paragraphs: [""], 
    subContents: [] 
  });
  const [content2, setContent2] = useState<ContentState>({ 
    title: "", 
    image: null,
    paragraphs: [""], 
    subContents: [] 
  });

  // Xử lý upload banner
  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setBanner(event.target.files[0]);
    }
  };

  // Xử lý upload hình ảnh cho nội dung
  const handleContentImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>, 
    contentState: ContentState, 
    setContent: React.Dispatch<React.SetStateAction<ContentState>>
  ) => {
    if (event.target.files?.length) {
      setContent({ ...contentState, image: event.target.files[0] });
    }
  };

  // Thêm tiêu đề phụ
  const addSubContent = (contentState: ContentState, setContent: React.Dispatch<React.SetStateAction<ContentState>>) => {
    setContent({ ...contentState, subContents: [...contentState.subContents, { subTitle: "", subText: "" }] });
  };

  // Xóa tiêu đề phụ
  const removeSubContent = (index: number, contentState: ContentState, setContent: React.Dispatch<React.SetStateAction<ContentState>>) => {
    setContent({ ...contentState, subContents: contentState.subContents.filter((_, i) => i !== index) });
  };

  // Cập nhật tiêu đề phụ
  const handleSubContentChange = (
    index: number,
    key: "subTitle" | "subText",
    value: string,
    contentState: ContentState,
    setContent: React.Dispatch<React.SetStateAction<ContentState>>
  ) => {
    const newSubContents = [...contentState.subContents];
    newSubContents[index][key] = value;
    setContent({ ...contentState, subContents: newSubContents });
  };

  // Thêm đoạn nội dung
  const addParagraph = (contentState: ContentState, setContent: React.Dispatch<React.SetStateAction<ContentState>>) => {
    setContent({ ...contentState, paragraphs: [...contentState.paragraphs, ""] });
  };

  // Xóa đoạn nội dung
  const removeParagraph = (index: number, contentState: ContentState, setContent: React.Dispatch<React.SetStateAction<ContentState>>) => {
    setContent({ ...contentState, paragraphs: contentState.paragraphs.filter((_, i) => i !== index) });
  };

  // Cập nhật nội dung đoạn văn
  const handleParagraphChange = (
    index: number,
    value: string,
    contentState: ContentState,
    setContent: React.Dispatch<React.SetStateAction<ContentState>>
  ) => {
    const newParagraphs = [...contentState.paragraphs];
    newParagraphs[index] = value;
    setContent({ ...contentState, paragraphs: newParagraphs });
  };

  // Xử lý Submit cho từng phần
  const handleBannerSubmit = () => {
    console.log("Banner được gửi:", banner);
    alert("Banner đã được lưu!");
  };

  const handleContent1Submit = () => {
    console.log("Nội dung 1 được gửi:", content1);
    alert("Nội dung 1 đã được lưu!");
  };

  const handleContent2Submit = () => {
    console.log("Nội dung 2 được gửi:", content2);
    alert("Nội dung 2 đã được lưu!");
  };

  return (
    <div className="p-3">
      <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight">Cấu hình Trang Chủ</h2>

      <div className="container mx-auto py-10 space-y-10 max-w-lvh">
        {/* Phần 1: Thêm Banner */}
        <Card>
          <CardHeader>
            <CardTitle>Thêm Banner</CardTitle>
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
                  <input type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />
                </label>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <Button onClick={handleBannerSubmit}>
                <Send className="mr-2 w-4 h-4" /> Lưu Banner
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Nội dung 1 */}
        <Card>
          <CardHeader>
            <CardTitle>Thêm Nội Dung 1</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Phần hình ảnh cho nội dung 1 */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Hình ảnh nội dung (không bắt buộc)</h3>
              <div className="border p-4 rounded-lg flex flex-col items-center">
                {content1.image ? (
                  <div className="w-full flex items-center justify-between">
                    <span className="truncate">{content1.image.name}</span>
                    <Button variant="destructive" size="icon" onClick={() => setContent1({ ...content1, image: null })}>
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
                      onChange={(e) => handleContentImageUpload(e, content1, setContent1)} 
                    />
                  </label>
                )}
              </div>
            </div>

            <Input 
              value={content1.title} 
              onChange={(e) => setContent1({ ...content1, title: e.target.value })} 
              placeholder="Nhập tiêu đề" 
            />

            {/* Phần đoạn văn */}
            {content1.paragraphs.map((text, index) => (
              <div key={`para-${index}`} className="mt-3 flex items-center space-x-2">
                <Textarea 
                  value={text} 
                  onChange={(e) => handleParagraphChange(index, e.target.value, content1, setContent1)} 
                  placeholder="Nhập nội dung" 
                />
                <Button variant="destructive" size="icon" onClick={() => removeParagraph(index, content1, setContent1)}>
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            ))}

            <Button className="mt-4" onClick={() => addParagraph(content1, setContent1)} variant="outline">
              <Plus className="mr-2 w-4 h-4" /> Thêm đoạn nội dung
            </Button>

            {/* Phần tiêu đề phụ */}
            {content1.subContents.map((sub, index) => (
              <div key={`sub-${index}`} className="border p-4 rounded-lg mt-3">
                <Input
                  value={sub.subTitle}
                  onChange={(e) => handleSubContentChange(index, "subTitle", e.target.value, content1, setContent1)}
                  placeholder="Nhập tiêu đề phụ"
                />
                <Textarea
                  value={sub.subText}
                  onChange={(e) => handleSubContentChange(index, "subText", e.target.value, content1, setContent1)}
                  placeholder="Nhập nội dung của tiêu đề phụ"
                  className="mt-2"
                />
                <Button variant="destructive" size="sm" className="mt-2" onClick={() => removeSubContent(index, content1, setContent1)}>
                  <Trash className="w-4 h-4 mr-2" /> Xóa tiêu đề phụ
                </Button>
              </div>
            ))}

            <Button className="mt-4 md:ml-2" onClick={() => addSubContent(content1, setContent1)} variant="outline">
              <Plus className="mr-2 w-4 h-4" /> Thêm tiêu đề phụ
            </Button>

            <div className="flex justify-end mt-6">
              <Button onClick={handleContent1Submit}>
                <Send className="mr-2 w-4 h-4" /> Lưu Nội Dung 1
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Nội dung 2 */}
        <Card>
          <CardHeader>
            <CardTitle>Thêm Nội Dung 2</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Phần hình ảnh cho nội dung 2 */}
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">Hình ảnh nội dung (không bắt buộc)</h3>
              <div className="border p-4 rounded-lg flex flex-col items-center">
                {content2.image ? (
                  <div className="w-full flex items-center justify-between">
                    <span className="truncate">{content2.image.name}</span>
                    <Button variant="destructive" size="icon" onClick={() => setContent2({ ...content2, image: null })}>
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
                      onChange={(e) => handleContentImageUpload(e, content2, setContent2)} 
                    />
                  </label>
                )}
              </div>
            </div>

            <Input 
              value={content2.title} 
              onChange={(e) => setContent2({ ...content2, title: e.target.value })} 
              placeholder="Nhập tiêu đề" 
            />

            {/* Phần đoạn văn */}
            {content2.paragraphs.map((text, index) => (
              <div key={`para-${index}`} className="mt-3 flex items-center space-x-2">
                <Textarea 
                  value={text} 
                  onChange={(e) => handleParagraphChange(index, e.target.value, content2, setContent2)} 
                  placeholder="Nhập nội dung" 
                />
                <Button variant="destructive" size="icon" onClick={() => removeParagraph(index, content2, setContent2)}>
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            ))}

            <Button className="mt-4" onClick={() => addParagraph(content2, setContent2)} variant="outline">
              <Plus className="mr-2 w-4 h-4" /> Thêm đoạn nội dung
            </Button>

            {/* Phần tiêu đề phụ */}
            {content2.subContents.map((sub, index) => (
              <div key={`sub-${index}`} className="border p-4 rounded-lg mt-3">
                <Input
                  value={sub.subTitle}
                  onChange={(e) => handleSubContentChange(index, "subTitle", e.target.value, content2, setContent2)}
                  placeholder="Nhập tiêu đề phụ"
                />
                <Textarea
                  value={sub.subText}
                  onChange={(e) => handleSubContentChange(index, "subText", e.target.value, content2, setContent2)}
                  placeholder="Nhập nội dung của tiêu đề phụ"
                  className="mt-2"
                />
                <Button variant="destructive" size="sm" className="mt-2" onClick={() => removeSubContent(index, content2, setContent2)}>
                  <Trash className="w-4 h-4 mr-2" /> Xóa tiêu đề phụ
                </Button>
              </div>
            ))}

            <Button className="mt-4 md:ml-2" onClick={() => addSubContent(content2, setContent2)} variant="outline">
              <Plus className="mr-2 w-4 h-4" /> Thêm tiêu đề phụ
            </Button>

            <div className="flex justify-end mt-6">
              <Button onClick={handleContent2Submit}>
                <Send className="mr-2 w-4 h-4" /> Lưu Nội Dung 2
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}