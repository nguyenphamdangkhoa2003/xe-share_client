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

// Thêm interceptor để xử lý lỗi
clerkAxiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            // Lỗi từ phía server (4xx, 5xx)
            throw new Error(
                `Clerk API error: ${error.response.status} - ${error.response.statusText}`
            );
        } else if (error.request) {
            // Không nhận được phản hồi từ server
            throw new Error('No response received from Clerk API');
        } else {
            // Lỗi khi thiết lập request
            throw new Error(
                `Error setting up Clerk API request: ${error.message}`
            );
        }
    }
);

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
        console.error('Clerk API request failed:', error);
        throw error; 
    }
};
