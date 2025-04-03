import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { updateUser } from '@/api/users/users';
import { Button } from '@/components/ui/button';

// Schema validation
const formSchema = z.object({
    firstName: z.string().min(2, {
        message: 'Firstname must be at least 2 characters.',
    }),
    lastName: z.string().min(2, {
        message: 'Lastname must be at least 2 characters.',
    }),
});
type PersonInformationFormProps = {
    id: string;
    initialValues?: {
        firstName?: string;
        lastName?: string;
    };
};
// Kiểu dữ liệu cho response API
type PersonInformation = {
    id: string;
    first_name: string;
    last_name: string;
};

export function PersonInformationForm(params: PersonInformationFormProps) {
    const queryClient = useQueryClient();

    // 1. Khai báo form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: params.initialValues?.firstName,
            lastName: params.initialValues?.lastName,
        },
    });

    // 2. Tạo mutation với TanStack Query
    const { mutate, isPending } = useMutation<
        PersonInformation,
        Error,
        z.infer<typeof formSchema>
    >({
        mutationFn: async (formData) => {
            const response = await updateUser(params.id, formData);
            return response.data;
        },
        onSuccess: (data) => {
            // Xử lý khi API call thành công
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            toast.message('Profile updated successfully', {
                description: `Hello ${data.first_name} ${data.last_name}!`,
            });
            form.reset();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    // 3. Xử lý submit form
    function onSubmit(values: z.infer<typeof formSchema>) {
        mutate(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-16">
                {/* Field Firstname */}
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                            <FormLabel>Firstname</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Firstname"
                                    {...field}
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Field Lastname */}
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                            <FormLabel>Lastname</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Lastname"
                                    {...field}
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Button group */}
                <div className="flex items-end gap-2">
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Saving...' : 'Save'}
                    </Button>
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => form.reset()}
                        disabled={isPending}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    );
}
