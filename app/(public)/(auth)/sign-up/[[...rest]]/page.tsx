import { SignUp } from '@clerk/nextjs';
import React from 'react';

function SignUpPage() {
    return (
        <div className="flex min-h-screen justify-center items-center">
            <SignUp />
        </div>
    );
}

export default SignUpPage;
