"use client";

import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Icon Google
import { HiEye, HiEyeOff } from "react-icons/hi"; // Icon hiển thị mật khẩu
import { MdEmail } from "react-icons/md"; // Icon Email
import { FaLock } from "react-icons/fa"; // Icon Lock
import { Button } from "@/components/ui/button";

export default function CustomSignIn() {
  const { signIn, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    if (!isLoaded) return;
    try {
      await signIn.create({ identifier: email, password });
      window.location.href = "/";
    } catch (err) {
      setError("Đăng nhập thất bại. Kiểm tra lại thông tin!");
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sign-in",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      setError("Đăng nhập bằng Google thất bại!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-md w-full p-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold text-center text-[#007bff]">Đăng Nhập</h2>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        {/* Input Email */}
        <div className="relative mt-4">
          <MdEmail className="absolute left-3 top-3 text-gray-500" size={20} />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 py-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-[#007bff]"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Input Mật khẩu */}
        <div className="relative mt-4">
          <FaLock className="absolute left-3 top-3 text-gray-500" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            className="w-full p-3 py-2 pl-10 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-[#007bff]"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          >
            {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
          </button>
        </div>

        <Button
          onClick={handleSignIn}
          className="cursor-pointer w-full mt-4" size='lg' variant='login'
        >
          Đăng nhập
        </Button>

        {/* Đăng nhập bằng Google */}
        <div className="flex items-center justify-center my-6">
          <div className="h-px bg-gray-300 w-1/3"></div>
          <span className="px-3 text-gray-500">Hoặc</span>
          <div className="h-px bg-gray-300 w-1/3"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center p-3 border rounded bg-white cursor-pointer hover:bg-gray-200 transition duration-300"
        >
          <FcGoogle size={22} className="mr-2" /> Đăng nhập với Google
        </button>
        <p className="mt-4 text-center text-gray-600">
            Chưa có tài khoản?{" "}
          <a href="/sign-up" className="text-blue-500 hover:underline">
            Đăng ký
          </a>
        </p>
      </div>
    </div>
  );
}