'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LogIn, Menu, X } from 'lucide-react';
import { MdOutlineAdminPanelSettings,MdCalendarToday } from 'react-icons/md';
const Navbar = () => {
    const { user } = useUser();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav
            className="bg-background fixed w-screen z-20 top-0 start-0 border-b shadow-md"
            suppressHydrationWarning>
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3">
                    <Image
                        src="/images/logo.png"
                        height={200}
                        width={200}
                        alt="Logo"
                        className='md:block hidden'
                    />
                    <Image
                        src="/images/logo.png"
                        height={100}
                        width={150}
                        alt="Logo"
                        className='md:hidden block'
                    />
                </Link>

                {/* Menu Desktop */}
                <div className="hidden md:flex space-x-6 text-lg font-medium">
                    <Link href="/" className="hover:text-[#00aaff] transition">
                        Trang chủ
                    </Link>
                    <Link
                        href="/booking"
                        className="hover:text-[#00aaff] transition">
                        Đặt trước
                    </Link>
                    <Link
                        href="/contact"
                        className="hover:text-[#00aaff] transition">
                        Liên hệ
                    </Link>
                    <Link
                        href="/about"
                        className="hover:text-[#00aaff] transition">
                        Về chúng tôi
                    </Link>
                </div>

                {/* Phần điều khiển */}
                <div className="flex space-x-3 items-center">
                    <SignedOut>
                        <div className="hidden md:flex gap-3">
                            <Button
                                className="cursor-pointer "
                                variant="login"
                                onClick={() => router.push('/sign-in')}>
                                Đăng nhập
                            </Button>
                            <Button
                                className="cursor-pointer"
                                variant="signup"
                                onClick={() => router.push('/sign-up')}>
                                Đăng ký
                            </Button>
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <UserButton showName>
                            {user?.publicMetadata.role === 'admin' ? (
                                <UserButton.MenuItems>
                                    <UserButton.Action
                                        label="Admin Site"
                                        labelIcon={
                                            <MdOutlineAdminPanelSettings />
                                        }
                                        onClick={() => router.push('/admin')}
                                    />
                                </UserButton.MenuItems>
                            ) : null}
                            <UserButton.MenuItems>
                                    <UserButton.Action
                                        label="History booking"
                                        labelIcon={
                                            <MdCalendarToday />
                                        }
                                        onClick={() => router.push('/historybooking')}
                                    />
                                </UserButton.MenuItems>
                        </UserButton>
                    </SignedIn>

                    {/* Hamburger Menu Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="md:hidden">
                        <Menu size={28} />
                    </button>
                </div>
            </div>

            {/* Sidebar Menu (Trượt từ phải) */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-300 ease-in-out`}>
                {/* Close Button */}
                <div className="flex justify-end p-4">
                    <button onClick={() => setIsOpen(false)}>
                        <X size={28} />
                    </button>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col space-y-4 p-6 text-lg font-medium">
                    <Link
                        href="/"
                        className="hover:text-[#6f42c1] transition"
                        onClick={() => setIsOpen(false)}>
                        Trang chủ
                    </Link>
                    <Link
                        href="/booking"
                        className="hover:text-[#6f42c1] transition"
                        onClick={() => setIsOpen(false)}>
                        Đặt trước
                    </Link>
                    <Link
                        href="/contact"
                        className="hover:text-[#6f42c1] transition"
                        onClick={() => setIsOpen(false)}>
                        Liên hệ
                    </Link>
                    <Link
                        href="/about"
                        className="hover:text-[#6f42c1] transition"
                        onClick={() => setIsOpen(false)}>
                        Về chúng tôi
                    </Link>

                    <SignedOut>
                        <Button
                            className="w-full"
                            onClick={() => {
                                router.push('/sign-in');
                                setIsOpen(false);
                            }}>
                            Đăng nhập
                        </Button>
                        <Button
                            className="w-full"
                            variant="secondary"
                            onClick={() => {
                                router.push('/sign-up');
                                setIsOpen(false);
                            }}>
                            Đăng ký
                        </Button>
                    </SignedOut>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
