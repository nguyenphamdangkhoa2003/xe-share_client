"use client";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { FaLock, FaUser } from "react-icons/fa";

const SignUpPage = () => {
    const { isLoaded, signUp } = useSignUp();
    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: "",
        fullName: "",
        repassword: "",
    });

    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);
        setError("");

        if (!isLoaded) return;

        if (form.password !== form.repassword) {
            setError("Mật khẩu nhập lại không khớp!");
            setIsPending(false);
            return;
        }

        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            });

            await signUp.prepareEmailAddressVerification();
            setIsPending(false);
            router.push("/verify-email");
        } catch (err: any) {
            setError(err.errors[0]?.message || "Có lỗi xảy ra");
            setIsPending(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    Đăng ký tài khoản
                </h2>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                <form onSubmit={handleSignUp} className="space-y-4">
                    {/* Họ và tên */}
                    <div className="relative">
                        <FaUser className="absolute left-3 top-3 text-gray-500" size={18} />
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Họ và tên"
                            value={form.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 pl-10 border rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <MdEmail className="absolute left-3 top-3 text-gray-500" size={20} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 pl-10 border rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Mật khẩu */}
                    <div className="relative">
                        <FaLock className="absolute left-3 top-3 text-gray-500" size={18} />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Mật khẩu"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 pl-10 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                        >
                            {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                        </button>
                    </div>

                    {/* Nhập lại mật khẩu */}
                    <div className="relative">
                        <FaLock className="absolute left-3 top-3 text-gray-500" size={18} />
                        <input
                            type={showRePassword ? "text" : "password"}
                            name="repassword"
                            placeholder="Nhập lại mật khẩu"
                            value={form.repassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 pl-10 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowRePassword(!showRePassword)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                        >
                            {showRePassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                        </button>
                    </div>

                    {/* Nút đăng ký */}
                    <Button type="submit" variant="login" className="w-full" disabled={isPending}>
                        {isPending ? "Đang đăng ký..." : "Đăng ký"}
                    </Button>
                </form>

                <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
                    Đã có tài khoản?{" "}
                    <a href="/sign-in" className="text-blue-500 hover:underline">
                        Đăng nhập
                    </a>
                </p>
                
            </div>
        </div>
    );
};

export default SignUpPage;
