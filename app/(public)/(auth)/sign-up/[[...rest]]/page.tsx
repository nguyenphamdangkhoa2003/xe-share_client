'use client';
import { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, User, Lock } from 'lucide-react';

const SignUpPage = () => {
    const { isLoaded, signUp } = useSignUp();
    const router = useRouter();

    const [form, setForm] = useState({
        email: '',
        password: '',
        fullName: '',
        repassword: '',
    });

    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError('');

    if (!isLoaded) return;

    if (form.password !== form.repassword) {
        setError('Mật khẩu nhập lại không khớp!');
        setIsPending(false);
        return;
    }

    try {
        const [firstName, ...lastNameArr] = form.fullName.trim().split(' ');
        const lastName = lastNameArr.join(' ');

        const response = await signUp.create({
            emailAddress: form.email,
            password: form.password,
            firstName: firstName || '', 
            lastName: lastName || '',
        });
        

        await signUp.prepareEmailAddressVerification(); 
        setIsPending(false);
        router.push('/verify-email');
    } catch (err: any) {
        setError(err.errors[0]?.message || 'Có lỗi xảy ra');
        setIsPending(false);
    }
};


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">
                        Đăng ký tài khoản
                    </CardTitle>
                </CardHeader>

                <CardContent className="grid gap-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSignUp} className="space-y-4">
                        
                        {/* Họ và tên */}
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Họ và tên</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="Họ và tên"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        {/* Mật khẩu */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Mật khẩu</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Mật khẩu"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="pl-10 pr-10"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }>
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Nhập lại mật khẩu */}
                        <div className="space-y-2">
                            <Label htmlFor="repassword">
                                Nhập lại mật khẩu
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="repassword"
                                    name="repassword"
                                    type={showRePassword ? 'text' : 'password'}
                                    placeholder="Nhập lại mật khẩu"
                                    value={form.repassword}
                                    onChange={handleChange}
                                    className="pl-10 pr-10"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() =>
                                        setShowRePassword(!showRePassword)
                                    }>
                                    {showRePassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                         <div id="clerk-captcha"></div>                   
                        {/* Nút đăng ký */}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending}>
                            {isPending ? 'Đang đăng ký...' : 'Đăng ký'}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        Đã có tài khoản?{' '}
                        <a
                            href="/sign-in"
                            className="text-primary hover:underline">
                            Đăng nhập
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignUpPage;
