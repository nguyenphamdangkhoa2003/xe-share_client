import { SignUp } from '@clerk/nextjs';

function SignUpPage() {
    return (
        <div className="flex justify-center items-center pt-20 min-h-screen pb-10">
            <div className="w-full max-w-md mx-4">
                <SignUp />
            </div>
        </div>
    );
}

export default SignUpPage;
