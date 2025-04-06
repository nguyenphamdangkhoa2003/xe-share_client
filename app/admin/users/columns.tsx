'use client';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/api/users/types';
import { DataTableColumnHeader } from '@/components/table/sortcolumn';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { IoTrash } from 'react-icons/io5';
import { FaBan } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { deleteUser, toggleBanUser } from '@/api/users/users';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/ConfirmDialog';
export const createColumns = (refetch: () => void): ColumnDef<User>[] => [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'user',
        header: 'User',
        cell: ({ row }) => (
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                    {row.original.imageUrl && (
                        <AvatarImage
                            src={row.original.imageUrl}
                            alt={
                                row.original.firstName +
                                ' ' +
                                row.original.lastName
                            }
                        />
                    )}
                    <AvatarFallback className="rounded-lg">
                        {row.original.firstName + ' ' + row.original.lastName}
                    </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                        {row.original.firstName + ' ' + row.original.lastName}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                        {row.original.emailAddresses[0].emailAddress ||
                            'No email provided'}
                    </span>
                </div>
                {row.original.banned && <FaBan className="text-red-500" />}
            </div>
        ),
    },
    {
        accessorKey: 'lastSignInAt',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Last signed in" />
        ),
        cell: ({ row }) => {
            const date = new Date(row.original.lastSignInAt);
            return format(date, 'PPpp');
        },
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ row }) => {
            const date = new Date(row.original.createdAt);
            return format(date, 'PPpp');
        },
        sortingFn: (rowA, rowB) => {
            const dateA = new Date(rowA.original.createdAt).getTime();
            const dateB = new Date(rowB.original.createdAt).getTime();
            return dateA - dateB;
        },
    },
    {
        accessorKey: 'actions',
        cell: ({ row }) => {
            const router = useRouter();
            const toggleBanMutation = useMutation({
                mutationFn: ({
                    userId,
                    endpoint,
                }: {
                    userId: string;
                    endpoint: string;
                }) => toggleBanUser(userId, endpoint),
                onSuccess: (data) => {
                    refetch();
                    toast.success('Operation successful');
                },
                onError: (error) => toast.error(error.message),
            });

            const deleteUserMutation = useMutation({
                mutationFn: ({ userId }: { userId: string }) =>
                    deleteUser(userId),
                onSuccess: (data) => {
                    refetch();
                    toast.success('Delete successful');
                },
                onError: (error) => toast.error(error.message),
            });

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                className="flex gap-2 items-center cursor-pointer"
                                href={`/admin/users/${row.original.id}`}>
                                <CgProfile />
                                View
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <ConfirmDialog
                                triggerText={
                                    row.original.banned ? 'Unban' : 'Ban'
                                }
                                triggerVariant="ghost"
                                title={`Are you sure you want to ${
                                    row.original.banned ? 'unban' : 'ban'
                                } this user?`}
                                description={`This will ${
                                    row.original.banned
                                        ? 'reinstate'
                                        : 'restrict'
                                } the user's access to the system.`}
                                confirmText={
                                    row.original.banned ? 'Unban' : 'Ban'
                                }
                                onConfirm={() =>
                                    toggleBanMutation.mutate({
                                        userId: row.original.id,
                                        endpoint: row.original.banned
                                            ? 'unban'
                                            : 'ban',
                                    })
                                }>
                                <div className="flex gap-2 items-center cursor-pointer text-red-500">
                                    <FaBan className="text-red-500" />
                                    {row.original.banned ? 'Unban' : 'Ban'}
                                </div>
                            </ConfirmDialog>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <ConfirmDialog
                                triggerText="Delete"
                                triggerVariant="ghost"
                                title="Are you sure you want to delete this user?"
                                description="This action cannot be undone. This will permanently delete the user and remove their data from our servers."
                                confirmText="Delete"
                                onConfirm={() =>
                                    deleteUserMutation.mutate({
                                        userId: row.original.id,
                                    })
                                }>
                                <div className="flex gap-2 items-center cursor-pointer text-red-500">
                                    <IoTrash className="text-red-500" />
                                    Delete
                                </div>
                            </ConfirmDialog>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
