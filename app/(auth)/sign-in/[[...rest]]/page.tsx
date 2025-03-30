'use client';

import { useSignIn } from '@clerk/nextjs';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';
import { FaLock, FaGithub, FaFacebook } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import loginImage from '@/public/images/login-image.jpg';

export default function CustomSignIn() {
    const { signIn, isLoaded } = useSignIn();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSignIn = async () => {
        if (!isLoaded) return;
        try {
            await signIn.create({ identifier: email, password });
            window.location.href = '/';
        } catch (err) {
            setError('Đăng nhập thất bại. Kiểm tra lại thông tin!');
        }
    };

    const handleGoogleSignIn = async () => {
        if (!isLoaded) return;
        try {
            await signIn.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/sign-in',
                redirectUrlComplete: '/',
            });
        } catch (err) {
            setError('Đăng nhập bằng Google thất bại!');
        }
    };
    const handleGithubSignIn = async () => {
        if (!isLoaded) return;
        try {
            await signIn.authenticateWithRedirect({
                strategy: 'oauth_github',
                redirectUrl: '/sign-in',
                redirectUrlComplete: '/',
            });
        } catch (err) {
            setError('Đăng nhập bằng GitHub thất bại!');
        }
    };

    const handleFacebookSignIn = async () => {
        if (!isLoaded) return;
        try {
            await signIn.authenticateWithRedirect({
                strategy: 'oauth_facebook',
                redirectUrl: '/sign-in',
                redirectUrlComplete: '/',
            });
        } catch (err) {
            setError('Đăng nhập bằng Facebook thất bại!');
        }
    };
    return (
        <div className="flex min-h-screen">
            {/* Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Chào mừng trở lại
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Vui lòng nhập thông tin đăng nhập của bạn
                        </p>
                    </div>

                    {error && (
                        <div className="p-4 text-sm text-destructive bg-destructive/15 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none"
                                htmlFor="email">
                                Email
                            </label>
                            <div className="relative">
                                <MdEmail
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    size={18}
                                />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    className="pl-10"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none"
                                htmlFor="password">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <FaLock
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    size={16}
                                />
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                    {showPassword ? (
                                        <HiEyeOff size={18} />
                                    ) : (
                                        <HiEye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button
                            onClick={handleSignIn}
                            className="w-full"
                            disabled={!email || !password}>
                            Đăng nhập
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Hoặc tiếp tục với
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-2 flex-col">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleGoogleSignIn}>
                            <FcGoogle className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleGithubSignIn}>
                            <FaGithub />
                            GitHub
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleFacebookSignIn}>
                            <FaFacebook className="text-foreground mr-2 h-4 w-4" />
                            Facebook
                        </Button>
                    </div>

                    <p className="px-8 text-center text-sm text-muted-foreground">
                        Chưa có tài khoản?{' '}
                        <a
                            href="/sign-up"
                            className="underline underline-offset-4 hover:text-primary">
                            Đăng ký ngay
                        </a>
                    </p>
                </div>
            </div>

            {/* Image Section */}
            <div className="hidden lg:block relative w-1/2">
                <Image
                    src={loginImage}
                    alt="Login illustration"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
            </div>
        </div>
    );
}
