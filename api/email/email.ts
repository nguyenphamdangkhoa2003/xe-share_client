import { fetchClerkApi } from '@/api/api';
export const deleteEmail = async (emailId: string) => {
    return await fetchClerkApi(`/email/${emailId}`, {
        method: 'DELETE',
    });
};
