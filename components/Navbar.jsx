'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { ModeToggle } from '@/components/ModeToggle';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
    return (
        <nav className="bg-background fixed w-full z-20 top-0 start-0 border-b">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link
                    href="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image
                        src="/images/logo.png"
                        height={200}
                        width={200}
                        alt="Logo"
                    />
                </Link>

                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-3">
                    <ModeToggle />
                    <SignedOut>
                        <div className="flex gap-3">
                            <Button
                                className="cursor-pointer"
                                onClick={() => router.push('/sign-in')}>
                                Signin
                            </Button>
                            <Button
                                className="cursor-pointer"
                                variant="secondary"
                                onClick={() => router.push('/sign-up')}>
                                Signup
                            </Button>
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
