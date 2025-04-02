import { Clerk } from '@clerk/clerk-js';

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!clerkPublishableKey) {
    throw new Error(
        'Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable'
    );
}

const clerkSecretKey = process.env.CLERK_SECRET_KEY;
if (!clerkSecretKey) {
    throw new Error('Missing CLERK_SECRET_KEY environment variable');
}

const clerkClient = new Clerk(clerkPublishableKey);

export const getClerkClient = () => {
    if (!clerkClient) {
        throw new Error('Clerk client not initialized');
    }
    return clerkClient;
};

export const fetchClerkApi = async (
    endpoint: string,
    options?: RequestInit
) => {
    const response = await fetch(`http://127.0.0.1:8000/api/v1${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${clerkSecretKey}`,
            ...options?.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`Clerk API error: ${response.statusText}`);
    }

    return response.json();
};
