"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Plus, CloudUpload, Send, Facebook, Linkedin, Instagram, Twitter } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type TeamMember = {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: File | null;
  socialMedia?: {
    [key: string]: string;
  };
};

type ContentSection = {
  id: string;
  title: string;
  content: string;
};

const socialMediaOptions = [
  { value: "facebook", label: "Facebook", icon: Facebook, color: "text-blue-600" },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin, color: "text-blue-700" },
  { value: "instagram", label: "Instagram", icon: Instagram, color: "text-pink-600" },
  { value: "twitter", label: "Twitter", icon: Twitter, color: "text-blue-400" },
];

export default function AboutPage() {
  // State cho từng phần
  const [introduction, setIntroduction] = useState({
    title: "",
    description: "",
    image: null as File | null,
  });

  const [contentSections, setContentSections] = useState<ContentSection[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // State cho thêm mạng xã hội đội ngũ
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [selectedSocial, setSelectedSocial] = useState("");
  const [socialLinkInput, setSocialLinkInput] = useState("");

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
        socialMedia: {},
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

  const handleAddMemberSocial = (memberId: string) => {
    if (selectedSocial && socialLinkInput) {
      setTeamMembers(
        teamMembers.map((member) =>
          member.id === memberId
            ? {
                ...member,
                socialMedia: {
                  ...member.socialMedia,
                  [selectedSocial]: socialLinkInput,
                },
              }
            : member
        )
      );
      setSelectedSocial("");
      setSocialLinkInput("");
      setSelectedMemberId(null);
    }
  };

  const handleRemoveMemberSocial = (memberId: string, platform: string) => {
    setTeamMembers(
      teamMembers.map((member) => {
        if (member.id === memberId && member.socialMedia) {
          const newSocialMedia = { ...member.socialMedia };
          delete newSocialMedia[platform];
          return { ...member, socialMedia: newSocialMedia };
        }
        return member;
      })
    );
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
            {contentSections.map((section, index) => (
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
                            setTeamMembers(teamMembers.map((m) =>
                              m.id === member.id ? { ...m, image: null } : m
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
                    setTeamMembers(teamMembers.map((m) =>
                      m.id === member.id ? { ...m, name: e.target.value } : m
                    ))
                  }
                  placeholder="Tên thành viên"
                />
                <Input
                  value={member.position}
                  onChange={(e) =>
                    setTeamMembers(teamMembers.map((m) =>
                      m.id === member.id ? { ...m, position: e.target.value } : m
                    ))
                  }
                  placeholder="Vị trí"
                />
                <Textarea
                  value={member.bio}
                  onChange={(e) =>
                    setTeamMembers(teamMembers.map((m) =>
                      m.id === member.id ? { ...m, bio: e.target.value } : m
                    ))
                  }
                  placeholder="Tiểu sử"
                  rows={3}
                />

                <div>
                  <h3 className="text-sm font-medium mb-2">Mạng xã hội</h3>
                  <div className="space-y-2">
                    {member.socialMedia && Object.entries(member.socialMedia).map(([platform, url]) => {
                      const option = socialMediaOptions.find(opt => opt.value === platform);
                      if (!option) return null;
                      const Icon = option.icon;
                      return (
                        <div key={platform} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 ${option.color}`} />
                            <span className="text-sm font-medium">{option.label}</span>
                            <span className="text-xs text-gray-500 truncate">{url}</span>
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleRemoveMemberSocial(member.id, platform)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      );
                    })}

                    {selectedMemberId === member.id && (
                      <div className="flex gap-2 items-end mt-2">
                        <div className="flex-1 space-y-2">
                          <label className="text-xs font-medium">Chọn mạng xã hội</label>
                          <Select value={selectedSocial} onValueChange={setSelectedSocial}>
                            <SelectTrigger className="w-full text-xs">
                              <SelectValue placeholder="Chọn" />
                            </SelectTrigger>
                            <SelectContent>
                              {socialMediaOptions
                                .filter(option => !(member.socialMedia && member.socialMedia[option.value]))
                                .map((option) => (
                                  <SelectItem key={option.value} value={option.value} className="text-xs">
                                    <div className="flex items-center gap-2">
                                      <option.icon className={`w-4 h-4 ${option.color}`} />
                                      {option.label}
                                    </div>
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex-1 space-y-2">
                          <label className="text-xs font-medium">Đường dẫn</label>
                          <Input
                            type="url"
                            className="text-xs"
                            value={socialLinkInput}
                            onChange={(e) => setSocialLinkInput(e.target.value)}
                            placeholder="Nhập link"
                          />
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAddMemberSocial(member.id)}
                          disabled={!selectedSocial || !socialLinkInput}
                        >
                          Thêm
                        </Button>
                      </div>
                    )}

                    {!selectedMemberId && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedMemberId(member.id)}
                        className="mt-2"
                      >
                        <Plus className="mr-2 w-4 h-4" /> Thêm mạng xã hội
                      </Button>
                    )}
                    {selectedMemberId === member.id && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedMemberId(null)}
                        className="mt-1 text-xs text-gray-500"
                      >
                        Hủy
                      </Button>
                    )}
                  </div>
                </div>
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