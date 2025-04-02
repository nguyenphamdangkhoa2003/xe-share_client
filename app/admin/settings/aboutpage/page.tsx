"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Plus, CloudUpload, Send } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type TeamMember = {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: File | null;
};

type ContentSection = {
  id: string;
  title: string;
  content: string;
};

export default function AboutPage() {
  // State cho từng phần
  const [introduction, setIntroduction] = useState({
    title: "",
    description: "",
    image: null as File | null,
  });

  const [contentSections, setContentSections] = useState<ContentSection[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // ========== Xử lý Introduction ==========
  const handleIntroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setIntroduction({ ...introduction, image: e.target.files[0] });
    }
  };

  const handleIntroSubmit = () => {
    console.log("Introduction submitted:", introduction);
    alert("Đã lưu phần Giới thiệu!");
  };

  // ========== Xử lý Content Sections ==========
  const addContentSection = () => {
    setContentSections([
      ...contentSections,
      { id: Date.now().toString(), title: "", content: "" },
    ]);
  };

  const updateContentSection = (id: string, field: string, value: string) => {
    setContentSections(
      contentSections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const removeContentSection = (id: string) => {
    setContentSections(contentSections.filter((section) => section.id !== id));
  };

  const handleContentSubmit = () => {
    console.log("Content sections submitted:", contentSections);
    alert("Đã lưu các mục Nội dung!");
  };

  // ========== Xử lý Team Members ==========
  const addTeamMember = () => {
    setTeamMembers([
      ...teamMembers,
      {
        id: Date.now().toString(),
        name: "",
        position: "",
        bio: "",
        image: null,
      },
    ]);
  };

  const handleTeamImageUpload = (e: React.ChangeEvent<HTMLInputElement>, memberId: string) => {
    if (e.target.files?.[0]) {
      setTeamMembers(
        teamMembers.map((member) =>
          member.id === memberId ? { ...member, image: e.target.files![0] } : member
        )
      );
    }
  };

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
  };

  const handleTeamSubmit = () => {
    console.log("Team members submitted:", teamMembers);
    alert("Đã lưu thông tin Đội ngũ!");
  };

  return (
    <div className="p-3">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Setting about page
      </h2>

      <div className="container mx-auto py-10 space-y-8 max-w-lvh">
        {/* Phần Giới thiệu */}
        <Card>
          <CardHeader>
            <CardTitle>Giới thiệu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={introduction.title}
              onChange={(e) => setIntroduction({ ...introduction, title: e.target.value })}
              placeholder="Tiêu đề giới thiệu"
            />
            <Textarea
              value={introduction.description}
              onChange={(e) => setIntroduction({ ...introduction, description: e.target.value })}
              placeholder="Mô tả công ty"
              rows={4}
            />
            <div>
              <h3 className="text-sm font-medium mb-2">Ảnh đại diện</h3>
              <div className="border p-4 rounded-lg flex flex-col items-center">
                {introduction.image ? (
                  <div className="w-full flex items-center justify-between">
                    <span className="truncate">{introduction.image.name}</span>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => setIntroduction({ ...introduction, image: null })}
                    >
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
                      onChange={handleIntroImageUpload}
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleIntroSubmit}>
                <Send className="mr-2 w-4 h-4" /> Lưu Giới thiệu
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Các mục Nội dung */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Nội dung</CardTitle>
            <Button onClick={addContentSection} size="sm" variant="outline">
              <Plus className="mr-2 w-4 h-4" /> Thêm mục
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {contentSections.map((section,index) => (
              <div key={section.id} className="border p-4 rounded-lg space-y-2 relative ">
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-3"
                  onClick={() => removeContentSection(section.id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
                <h3 className="text-sm font-medium mb-2">Nội dung {index + 1} </h3>
                <Input
                  value={section.title}
                  onChange={(e) => updateContentSection(section.id, "title", e.target.value)}
                  placeholder="Tiêu đề mục"
                />
                <Textarea
                  value={section.content}
                  onChange={(e) => updateContentSection(section.id, "content", e.target.value)}
                  placeholder="Nội dung"
                  rows={4}
                />
              </div>
            ))}
            <div className="flex justify-between items-center">
              {contentSections.length === 0 && (
                <span className="text-gray-500">Chưa có mục nội dung nào</span>
              )}
              <Button onClick={handleContentSubmit}>
                <Send className="mr-2 w-4 h-4" /> Lưu Nội dung
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Đội ngũ */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Đội ngũ</CardTitle>
            <Button onClick={addTeamMember} size="sm" variant="outline">
              <Plus className="mr-2 w-4 h-4" /> Thêm thành viên
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="border p-4 rounded-lg space-y-4 relative">
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-3"
                  onClick={() => removeTeamMember(member.id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Ảnh thành viên</h3>
                  <div className="border p-4 rounded-lg flex flex-col items-center">
                    {member.image ? (
                      <div className="w-full flex items-center justify-between">
                        <span className="truncate">{member.image.name}</span>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => 
                            setTeamMembers(teamMembers.map(m => 
                              m.id === member.id ? {...m, image: null} : m
                            ))
                          }
                        >
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
                          onChange={(e) => handleTeamImageUpload(e, member.id)}
                        />
                      </label>
                    )}
                  </div>
                </div>
                <Input
                  value={member.name}
                  onChange={(e) => 
                    setTeamMembers(teamMembers.map(m => 
                      m.id === member.id ? {...m, name: e.target.value} : m
                    ))
                  }
                  placeholder="Tên thành viên"
                />
                <Input
                  value={member.position}
                  onChange={(e) => 
                    setTeamMembers(teamMembers.map(m => 
                      m.id === member.id ? {...m, position: e.target.value} : m
                    ))
                  }
                  placeholder="Vị trí"
                />
                <Textarea
                  value={member.bio}
                  onChange={(e) => 
                    setTeamMembers(teamMembers.map(m => 
                      m.id === member.id ? {...m, bio: e.target.value} : m
                    ))
                  }
                  placeholder="Tiểu sử"
                  rows={3}
                />
              </div>
            ))}
            <div className="flex justify-between items-center">
              {teamMembers.length === 0 && (
                <span className="text-gray-500">Chưa có thành viên nào</span>
              )}
              
              <Button onClick={handleTeamSubmit}>
                <Send className="mr-2 w-4 h-4 " /> Lưu Đội ngũ
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}