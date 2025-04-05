import { fetchClerkApi } from '@/api/clerkApi';
import { EmailDataForm } from '@/api/email/types';
import { AxiosRequestConfig } from 'axios';
export const deleteEmail = async (emailId: string) => {
    return await fetchClerkApi(`/email/${emailId}`, {
        method: 'DELETE',
    });
};

export const updateEmail = async (emailId: string, data: EmailDataForm) => {
    return fetchClerkApi(`/email/${emailId}`, {
        method: 'PATCH',
        data,
    });
};
