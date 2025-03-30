import { SignIn } from '@clerk/nextjs';
import React from 'react';

function SignInPage() {
    return (
        <div className="flex justify-center items-center pt-20 min-h-screen pb-10">
            <div className="w-full max-w-md mx-4">
                <SignIn />
            </div>
        </div>
    );
}

export default SignInPage;
