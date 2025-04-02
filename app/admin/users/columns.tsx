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
import { CiTrash } from 'react-icons/ci';
import { MdEditNote } from 'react-icons/md';

import { FaEye } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const columns: ColumnDef<User>[] = [
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
            </div>
        ),
    },
    {
        accessorKey: 'lastSignInAt',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Last signed in
"
            />
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
        id: 'actions',
        cell: ({ row }) => {
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
                                <FaEye />
                                View
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <div className="flex gap-2 items-center cursor-pointer">
                                <MdEditNote />
                                Update
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <div className="flex gap-2 items-center cursor-pointer text-red-500">
                                <CiTrash className="text-red-500" />
                                Detele
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
