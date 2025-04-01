'use client';
import { useState, useRef } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

const VerifyEmailPage = () => {
    const { isLoaded, signUp } = useSignUp();
    const router = useRouter();
    
    const [code, setCode] = useState(Array(6).fill(""));
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);
    
    const inputsRef = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (index: number, event: React.KeyboardEvent) => {
        if (event.key === "Backspace" && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);
        setError('');

        if (!isLoaded) return;

        const verificationCode = code.join("");
        if (verificationCode.length !== 6) {
            setError('Mã xác nhận không hợp lệ.');
            setIsPending(false);
            return;
        }

        try {
            await signUp.attemptEmailAddressVerification({
                code: verificationCode,
            });

            setIsPending(false);
            router.push('/');
        } catch (err: any) {
            setError(err.errors[0]?.message || 'Có lỗi xảy ra.');
            setIsPending(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Xác minh Email
                </h2>

                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleVerify} className="space-y-4">
                    <div className="space-y-2 text-center">
                        <Label htmlFor="code">Nhập mã xác nhận</Label>
                        <div className="flex justify-center gap-2">
                            {code.map((digit, index) => (
                                <Input
                                    key={index}
                                    ref={(el) => (inputsRef.current[index] = el)}
                                    type="text"
                                    value={digit}
                                    maxLength={1}
                                    className="w-12 h-12 text-center text-xl font-bold"
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleBackspace(index, e)}
                                />
                            ))}
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? 'Đang xác minh...' : 'Xác minh'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default VerifyEmailPage;
