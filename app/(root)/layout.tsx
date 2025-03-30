import Navbar from '@/components/Navbar';
import React from 'react';

function Homelayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            {children}
        </div>
    );
}

export default Homelayout;
