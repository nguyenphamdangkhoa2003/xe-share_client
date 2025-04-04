import { fetchClerkApi } from '../api';

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
        body: JSON.stringify(data),
    });
};
