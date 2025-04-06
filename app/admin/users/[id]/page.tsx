'use client';
import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

// API imports
import {
    deleteUserProfileImage,
    getUserById,
    updateUser,
    uploadUserProfileImage,
} from '@/api/users/users';
import { addEmail, deleteEmail, updateEmail } from '@/api/email/email';

// Type imports
import { User, EmailAddress, SetPasswordData } from '@/api/users/types';
import { EmailDataForm } from '@/api/email/types';
// Component imports
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Loading from '@/components/ui/loading';
import { UserDetailDataTable } from '@/app/admin/users/[id]/UserDetailTableData';
import { PersonInformationForm } from '@/components/form/PersonInformationForm';
import { UploadButton } from '@/components/ButtonUpload';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import PasswordDialog, {
    setPasswordFormSchema,
} from '@/components/PasswordDialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Icon imports
import { FaArrowLeftLong } from 'react-icons/fa6';
import { FaBan, FaRegEdit } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { TbLock } from 'react-icons/tb';
import { AlertCircle, MoreHorizontal, Trash } from 'lucide-react';
import { CiMail, CiWarning } from 'react-icons/ci';
import { MdOutlineVerified } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';

// Utility imports
import { getInitials } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import { EmailFormDialog } from '@/components/EmailFormDialog';
import { ConfirmDialog } from '@/components/ConfirmDialog';

interface Params {
    id: string;
}

export default function UserPage({
    params: paramsPromise,
}: {
    params: Promise<Params>;
}) {
    const router = useRouter();
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

    const params = use(paramsPromise);
    const { id } = params;

    // Query for fetching user data
    const {
        data: user,
        isLoading,
        error,
        refetch,
    } = useQuery<User>({
        queryKey: ['user', id],
        queryFn: () => getUserById(id),
    });

    // Mutations
    const deleteEmailMutation = useMutation({
        mutationFn: deleteEmail,
        onSuccess: () => {
            toast.success('Email deleted successfully');
            refetch();
        },
        onError: (error) => toast.error(error.message),
    });

    const updateEmailMutation = useMutation({
        mutationFn: ({
            emailId,
            data,
        }: {
            emailId: string;
            data: EmailDataForm;
        }) => updateEmail(emailId, data),
        onSuccess: () => {
            toast.success('Email updated successfully');
            refetch();
        },
        onError: (error) => toast.error(error.message),
    });

    const addEmailMutation = useMutation({
        mutationFn: (data: EmailDataForm) => addEmail(data),
        onSuccess: () => {
            toast.success('Email added successfully');
            refetch();
        },
        onError: (error) => toast.error(error.message),
    });

    const deleteUserProfileImageMutation = useMutation({
        mutationFn: (id: string) => deleteUserProfileImage(id),
        onSuccess: (data) => refetch(),
        onError: (error) => toast.error(error.message),
    });
    const setPasswordMutation = useMutation({
        mutationFn: (data: SetPasswordData) => updateUser(id, data),
        onSuccess: () => {
            toast.success('Password updated successfully');
            refetch();
            setIsPasswordDialogOpen(false);
        },
        onError: (error) => toast.error(error.message),
    });

    const uploadAvatarMutation = useMutation({
        mutationFn: ({ userId, file }: { userId: string; file: File }) =>
            uploadUserProfileImage(userId, file),
        onSuccess: (data) => {
            toast.success('Upload avatar successful');
            refetch();
        },
        onError: (error) => toast.error(error.message),
    });

    const setIsYouCanDeleteYouraccount = useMutation({
        mutationFn: ({ userId, data }: { userId: string; data: object }) =>
            updateUser(userId, data),
    });
    // Table column definitions
    const emailColumns: ColumnDef<EmailAddress>[] = [
        {
            accessorKey: 'emailAddress',
            cell: ({ row }) => (
                <div className="flex items-center gap-2 p-2">
                    <CiMail className="text-gray-500" />
                    <span className="font-medium text-gray-400">
                        {row.original.emailAddress}
                    </span>
                    {row.original.verification ? (
                        <MdOutlineVerified className="text-green-500" />
                    ) : (
                        <CiWarning className="text-orange-500" />
                    )}
                    {row.original.id === user?.primaryEmailAddressId && (
                        <span className="text-blue-600 text-xs">Primary</span>
                    )}
                </div>
            ),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() =>
                                updateEmailMutation.mutate({
                                    emailId: row.original.id,
                                    data: {
                                        primary: !(
                                            row.original.id ===
                                            user?.primaryEmailAddressId
                                        ),
                                    },
                                })
                            }
                            disabled={
                                row.original.id === user?.primaryEmailAddressId
                            }>
                            Set as primary
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                updateEmailMutation.mutate({
                                    emailId: row.original.id,
                                    data: {
                                        verified: !row.original.verification,
                                    },
                                })
                            }>
                            Mark as{' '}
                            {row.original.verification
                                ? 'unverified'
                                : 'verified'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            disabled={deleteEmailMutation.isPending}
                            onSelect={(e) => {
                                e.preventDefault();
                            }}>
                            <ConfirmDialog
                                title="Remove email"
                                description="Are you sure you want to delete this user's email?"
                                confirmText="Remove email"
                                cancelText="Cancel"
                                onConfirm={() => {
                                    deleteEmailMutation.mutate(row.original.id);
                                }}>
                                <div className="text-red-500">Remove email</div>
                            </ConfirmDialog>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    // Handlers
    const handleSetPassword = (
        values: z.infer<typeof setPasswordFormSchema>
    ) => {
        setPasswordMutation.mutate(values);
    };

    const handleBack = () => router.back();

    const handleUploadAvatar = (file: File) => {
        uploadAvatarMutation.mutate({ userId: user?.id || '', file });
    };
    // Loading state
    if (isLoading) return <Loading />;

    // Error state
    if (error || !user) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {error?.message || 'User not found'}
                </AlertDescription>
                <Button variant="outline" onClick={handleBack} className="mt-4">
                    Go Back
                </Button>
            </Alert>
        );
    }

    const fullName =
        `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Username';
    const primaryEmail =
        user.emailAddresses?.[0]?.emailAddress || 'No email provided';
    const role = user.publicMetadata?.role || 'User';
    return (
        <div className="container mx-auto p-4 space-y-6">
            <Button
                variant="ghost"
                onClick={handleBack}
                className="flex items-center gap-2">
                <FaArrowLeftLong /> Back to Users
            </Button>

            <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow">
                <Avatar className="h-20 w-20">
                    {user.hasImage && (
                        <AvatarImage src={user.imageUrl} alt={fullName} />
                    )}
                    <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">{fullName}</h2>
                        {user.banned && (
                            <div className="text-sm text-red-500 flex items-center gap-1 font-bold">
                                <FaBan className="text-red-500" />
                                Banned
                            </div>
                        )}
                    </div>
                    <p className="text-gray-600">{primaryEmail}</p>
                    <p className="text-sm text-blue-600">Role: {role}</p>
                </div>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                    {user.hasImage && (
                                        <AvatarImage
                                            src={user.imageUrl}
                                            alt={fullName}
                                        />
                                    )}
                                    <AvatarFallback>
                                        {getInitials(fullName)}
                                    </AvatarFallback>
                                </Avatar>
                                <UploadButton
                                    onUpload={handleUploadAvatar}
                                    isUploading={uploadAvatarMutation.isPending}
                                />
                                <ConfirmDialog
                                    title="Delete profile image"
                                    description="Are you sure you want to delete this user's profile image?"
                                    confirmText="Delete profile image"
                                    onConfirm={() => {
                                        deleteUserProfileImageMutation.mutate(
                                            user.id
                                        );
                                    }}>
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer">
                                        Clear
                                    </Button>
                                </ConfirmDialog>
                            </div>
                            <PersonInformationForm
                                id={id}
                                initialValues={{
                                    firstName: user.firstName || '',
                                    lastName: user.lastName || '',
                                }}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Email Addresses</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <UserDetailDataTable
                                columns={emailColumns}
                                data={user.emailAddresses || []}
                            />
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="link">+ Add email</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Add new email address
                                        </DialogTitle>
                                    </DialogHeader>
                                    <EmailFormDialog
                                        userId={id}
                                        mutation={addEmailMutation}
                                        onSuccess={refetch}
                                    />
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Social Accounts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {user.externalAccounts?.length ? (
                                <div className="flex flex-col gap-2">
                                    {user.externalAccounts.map((row) => {
                                        return (
                                            <div
                                                key={row.id}
                                                className="flex gap-2 items-center justify-start">
                                                {row.provider ===
                                                'oauth_google' ? (
                                                    <>
                                                        <FcGoogle />
                                                        <div className="font-bold">
                                                            Google
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaGithub />
                                                        <div className="font-bold">
                                                            Github
                                                        </div>
                                                    </>
                                                )}
                                                <div className="text-muted-foreground">
                                                    {row.username ||
                                                        row.emailAddress}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="bg-blue-50 text-center p-3">
                                    No social accounts linked
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {user.passwordEnabled ? (
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2 items-center">
                                        <TbLock />
                                        <span>••••••••••</span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        onClick={() =>
                                            setIsPasswordDialogOpen(true)
                                        }>
                                        <FaRegEdit />
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="bg-blue-50 text-center p-3">
                                        No password set
                                    </div>
                                    <Button
                                        variant="link"
                                        onClick={() =>
                                            setIsPasswordDialogOpen(true)
                                        }>
                                        + Set password
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="settings">
                    <Card>
                        <CardHeader>
                            <CardTitle>User permissions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    value=""
                                    onChange={(e) => {
                                        e.preventDefault(),
                                            setIsYouCanDeleteYouraccount.mutate(
                                                {
                                                    userId: user.id,
                                                    data: {
                                                        delete_self_enabled:
                                                            !user.deleteSelfEnabled,
                                                    },
                                                }
                                            );
                                    }}
                                    defaultChecked={user.deleteSelfEnabled}
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Allow user delete to their account
                                </span>
                            </label>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <PasswordDialog
                open={isPasswordDialogOpen}
                onOpenChange={setIsPasswordDialogOpen}
                handleSetPassword={handleSetPassword}
            />
        </div>
    );
}
