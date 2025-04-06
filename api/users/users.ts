import { SetPasswordData } from '@/api/users/types';
import { fetchClerkApi } from '../clerkApi';

export const getUsers = async (search?: string) => {
    const defaultParams = {
        email_address_query: search || '',
    };
    const query = new URLSearchParams(defaultParams).toString();
    return await fetchClerkApi(`/users${search !== '' ? `?${query}` : ''}`);
};

export const getUserById = async (userId: string) => {
    return await fetchClerkApi(`/users/${userId}`);
};

export const updateUser = async (userId: string, data: any) => {
    return await fetchClerkApi(`/users/${userId}`, {
        method: 'PATCH',
        data: JSON.stringify(data),
    });
};

export const deleteUserProfileImage = async (userId: string) => {
    return await fetchClerkApi(`/users/${userId}/profile_image`, {
        method: 'DELETE',
    });
};

export const uploadUserProfileImage = async (userId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return await fetchClerkApi(`/users/${userId}/profile_image`, {
        method: 'POST',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const toggleBanUser = async (userID: string, endpoint: string) => {
    return await fetchClerkApi(`/users/${userID}/toggle-ban`, {
        method: 'POST',
        data: {
            endpoint,
        },
    });
};

export const deleteUser = async (userId: string) => {
    return await fetchClerkApi(`/users/${userId}`, {
        method: 'DELETE',
    });
};
