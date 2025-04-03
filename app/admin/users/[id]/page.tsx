'use client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getInitials } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '@/api/users/users';
import { useRouter } from 'next/navigation';
import Loading from '@/components/ui/loading';
import { FcGoogle } from 'react-icons/fc';
import { TbLock } from 'react-icons/tb';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, MoreHorizontal, Trash } from 'lucide-react';
import { CiMail } from 'react-icons/ci';
import { use, useState, useEffect } from 'react';
import { EmailAddress, User } from '@/api/users/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadButton } from '@/components/ButtonUpload';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MdOutlineVerified } from 'react-icons/md';
import { Badge } from '@/components/ui/badge';
import { FaPlus } from 'react-icons/fa6';
import { ColumnDef } from '@tanstack/react-table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { UserDetailDataTable } from '@/app/admin/users/[id]/UserDetailTableData';
import { ExternalAccount } from '@clerk/nextjs/server';
import { FaGithub } from 'react-icons/fa';

interface Params {
    id: string;
}
export default function UserPage({ params }: { params: Params }) {
    const router = useRouter();
    const unwrapParams = use<Params>(params) as Params;
    const { id } = unwrapParams;
    const [user, setUser] = useState<User>();

    const { data, isLoading, error, isSuccess } = useQuery({
        queryKey: ['user', id],
        queryFn: () => getUserById(id),
    });
    useEffect(() => {
        if (isSuccess && data) {
            setUser(data);
        }
    }, [isSuccess, data]);

    if (isLoading) return <Loading />;

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Failed to load user data</AlertDescription>
            </Alert>
        );
    }

    if (!user) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>User not found</AlertDescription>
            </Alert>
        );
    }
    const email = user?.emailAddresses[0].emailAddress || 'No email provided';
    const fullName = user?.firstName + ' ' + user?.lastName || 'User';
    const role = user.publicMetadata.role || 'User';
    const emailColumns: ColumnDef<EmailAddress>[] = [
        {
            accessorKey: 'id',
            cell: ({ row }) => (
                <div
                    key={row.id}
                    className="flex items-center gap-2 p-2  rounded-md">
                    <CiMail className="text-gray-500" />
                    <span className="font-medium text-gray-400">
                        {row.original.emailAddress}
                    </span>
                    {row.original.verification.status === 'verified' && (
                        <MdOutlineVerified className="text-green-500" />
                    )}
                    {row.original.id === user.primaryEmailAddressId && (
                        <Badge
                            variant="outline"
                            className="border-blue-200 text-blue-600">
                            Primary
                        </Badge>
                    )}
                </div>
            ),
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
                            <DropdownMenuItem></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    function getIcon(provider: string) {
        switch (provider) {
            case 'oauth_google':
                return (
                    <>
                        <FcGoogle />
                        <div className="font-bold">Google</div>
                    </>
                );
            case 'oauth_github':
                return (
                    <>
                        <FaGithub />
                        <div className="font-bold">Github</div>
                    </>
                );
        }
    }
    const socialColumns: ColumnDef<ExternalAccount>[] = [
        {
            accessorKey: 'id',
            cell: ({ row }) => (
                <div className="flex gap-2 items-center cursor-pointer">
                    {getIcon(row.original.provider)}
                    <div className="text-muted-foreground">
                        {row.original.username || row.original.emailAddress}
                    </div>
                </div>
            ),
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                return (
                    <Button variant="ghost" className="cursor-pointer">
                        <Trash className="text-red-500" />
                    </Button>
                );
            },
        },
    ];
    const handleUploadAvatar = () => {};
    console.log(user.externalAccounts);
    return (
        <div className="flex flex-col items-start gap-4 p-4">
            <Button
                variant="link"
                onClick={() => router.back()}
                className="flex items-center gap-2">
                <FaArrowLeftLong className="text-sm" />
                Back to Users
            </Button>

            <div className="flex items-center gap-4 w-full p-6 rounded-sm shadow">
                <Avatar className="h-20 w-20">
                    {user.hasImage && (
                        <AvatarImage
                            src={user.imageUrl}
                            alt={fullName}
                            className="rounded-full"
                        />
                    )}
                    <AvatarFallback className="rounded-full">
                        {getInitials(fullName)}
                    </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left gap-1">
                    <span className="truncate font-medium text-lg">
                        {fullName}
                    </span>
                    <span className="truncate text-muted-foreground">
                        {email}
                    </span>
                </div>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="flex flex-col gap-5">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 w-full p-6 rounded-sm">
                                <div className="flex flex-col justify-center items-center gap-3">
                                    <Avatar className="h-20 w-20">
                                        {user.hasImage && (
                                            <AvatarImage
                                                src={user.imageUrl}
                                                alt={fullName}
                                                className="rounded-full"
                                            />
                                        )}
                                        <AvatarFallback className="rounded-full">
                                            {getInitials(fullName)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <UploadButton
                                        onFileSelected={handleUploadAvatar}
                                    />
                                </div>
                                <div className="grid flex-1 text-left gap-1">
                                    <span className="truncate font-medium text-lg">
                                        {fullName}
                                    </span>
                                    <span className="truncate text-muted-foreground">
                                        {email}
                                    </span>
                                    <span className="truncate text-sm text-blue-600">
                                        Role: {role}
                                    </span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        User ID: {user.id}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-16">
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="firstnam">Firstname</Label>
                                    <Input
                                        type="email"
                                        id="firstnam"
                                        placeholder="Firstname"
                                    />
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="lastname">lastname</Label>
                                    <Input
                                        type="text"
                                        id="lastname"
                                        placeholder="Lastname"
                                    />
                                </div>
                                <div className="flex items-end gap-2">
                                    <Button className="cursor-pointer">
                                        Save
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer">
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Email addresses</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <UserDetailDataTable
                                columns={emailColumns}
                                data={user.emailAddresses}
                            />

                            <Button variant="link" className="cursor-pointer">
                                <FaPlus />
                                Add email
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Social accounts</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {user.externalAccounts.length === 0 ? (
                                <div className="bg-blue-50 text-center p-3">
                                    None
                                </div>
                            ) : (
                                <UserDetailDataTable
                                    columns={socialColumns}
                                    data={user.externalAccounts}
                                />
                            )}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardContent className="py-3 flex justify-between">
                                <div className="w-full">
                                    {user.passwordEnabled ? (
                                        <div className="flex justify-between">
                                            <div className="flex font-bold gap-2 items-center">
                                                <TbLock />
                                                ●●●●●●●●●●
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0">
                                                        <span className="sr-only">
                                                            Open menu
                                                        </span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>
                                                        Actions
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    ) : (
                                        <div className="w-full bg-blue-50 text-center p-3">
                                            None
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </CardHeader>
                    </Card>
                </TabsContent>

                <TabsContent value="settings"></TabsContent>
            </Tabs>
        </div>
    );
}
