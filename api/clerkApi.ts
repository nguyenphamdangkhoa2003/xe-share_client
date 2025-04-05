import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
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

// Tạo instance Axios
const clerkAxiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${clerkSecretKey}`,
    },
});

export const getClerkClient = () => {
    if (!clerkClient) {
        throw new Error('Clerk client not initialized');
    }
    return clerkClient;
};
export const fetchClerkApi = async <T = any>(
    endpoint: string,
    config?: AxiosRequestConfig
): Promise<T> => {
    try {
        const response = await clerkAxiosInstance(endpoint, config);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Server responded with error (4xx, 5xx)
            if (error.response) {
                const serverMessage =
                    error.response.data?.message ||
                    error.response.data?.error ||
                    error.response.statusText;

                throw new Error(serverMessage || 'Server error occurred');
            }
            // No response received
            if (error.request) {
                throw new Error('No response received from server');
            }
        }
        // Other errors
        throw new Error('Request failed to send');
    }
};
