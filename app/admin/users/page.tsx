'use client';
import { useState } from 'react';
import { createColumns } from './columns';
import { DataTable } from './data-table';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/api/users/users';
import { Input } from '@/components/ui/input';
import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Loading from '@/components/ui/loading';

function UsersPage() {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: [searchTerm],
        queryFn: () => getUsers(searchTerm),
    });
    if (isError) {
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
        </Alert>;
    }
    if (isLoading)
        return (
            <div className="p-3">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                    Users
                </h2>
                <div className="container mx-auto py-10">
                    <div className="flex items-center mb-4">
                        <Input
                            placeholder="Filter email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                    <Loading className="w-full h-56" />
                </div>
            </div>
        );
    return (
        <div className="p-3">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                Users
            </h2>
            <div className="container mx-auto py-10">
                <div className="flex items-center mb-4">
                    <Input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />
                </div>
                <DataTable
                    columns={createColumns(refetch)}
                    data={data?.data || []}
                />
            </div>
        </div>
    );
}

export default UsersPage;
