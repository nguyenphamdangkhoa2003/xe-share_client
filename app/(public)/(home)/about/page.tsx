'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const teamMembers = [
  { name: "Nguyễn Phạm Đăng Khoa", role: "Backend", image: "/images/avatar.png" },
  { name: "Võ Xuân Thịnh", role: "Giảng viên hướng dẫn", image: "/images/avatar.png" },
  { name: "Phạm Mạnh Tuấn", role: "Frontend", image: "/images/avatar.png" },
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto pb-8 pt-16 px-6">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Về Chúng Tôi
      </h2>
      <Card className="bg-white shadow-lg">
        <CardContent className="text-lg text-gray-700 space-y-4">
          <p>
            - Website đặt xe đi chung của chúng tôi cung cấp nền tảng kết nối những người có nhu cầu đi chung xe với nhau, giúp tiết kiệm chi phí và giảm thiểu tác động môi trường.
          </p>
          <p>
            - Chúng tôi cam kết mang đến một dịch vụ an toàn, tiện lợi và minh bạch, nơi tài xế và hành khách có thể dễ dàng tìm kiếm và thỏa thuận giá cả.
          </p>
          <p>
            - Với giao diện hiện đại, thân thiện và tích hợp nhiều tính năng thông minh, chúng tôi hy vọng sẽ mang đến trải nghiệm tốt nhất cho người dùng.
          </p>
          <p>
            - Đội ngũ quản lý của chúng tôi luôn sẵn sàng hỗ trợ và đảm bảo chất lượng dịch vụ, giúp nền tảng hoạt động ổn định và hiệu quả.
          </p>
        </CardContent>
      </Card>

      <h3 className="text-2xl font-semibold text-center text-gray-900 my-8">
        Đội Ngũ Quản Lý
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
        {teamMembers.map((member, index) => (
          <Card key={index} className="bg-white shadow-md text-center p-6 w-72 mx-auto">
            <CardHeader>
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <CardTitle>{member.name}</CardTitle>
              <CardDescription>{member.role}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
