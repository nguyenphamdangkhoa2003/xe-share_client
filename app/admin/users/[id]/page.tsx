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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Upload } from 'lucide-react';
import { use, useState, useEffect } from 'react';
import { User } from '@/api/users/types';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { UploadButton } from '@/components/ButtonUpload';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CiMail } from 'react-icons/ci';

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
            setUser(data.data[0]);
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

    const handleUploadAvatar = () => {};
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
                        <CardContent>
                            <div></div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="settings"></TabsContent>
            </Tabs>
        </div>
    );
}
