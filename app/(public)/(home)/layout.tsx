import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

function Homelayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navbar />
            <main className="flex-grow mt-10 ">{children}</main>
            <Footer />
        </div>
    );
}

export default Homelayout;
