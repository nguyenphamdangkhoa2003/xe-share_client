'use client';

import * as React from 'react';
import {
    ArrowUpCircleIcon,
    CameraIcon,
    FileCodeIcon,
    FileTextIcon,
    LayoutDashboardIcon,
    Users,
    Settings,
    ChevronDownIcon,
    ChevronRightIcon,
} from 'lucide-react';

import { NavMain } from '@/components/NavMain';
import { NavUser } from '@/components/NavUser';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useState } from 'react';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { user, isLoaded } = useUser();
    
    const data = {
        user: {
            name: user?.fullName || null,
            email: user?.primaryEmailAddress?.emailAddress || null,
            avatar: user?.imageUrl || null,
        },
        navMain: [
            {
                title: 'Dashboard',
                url: '/admin/dashboard',
                icon: LayoutDashboardIcon,
            },
            {
                title: 'Users',
                url: '/admin/users',
                icon: Users,
            },
            {
                title: 'Settings',
                icon: Settings,
                submenu: [
                    {
                        title: 'Home',
                        url: '/admin/settings/homepage',
                    },
                    {
                        title: 'Contact',
                        url: '/admin/settings/contactpage',
                    },
                    {
                        title: 'About',
                        url: '/admin/settings/aboutpage',
                    },
                    {
                        title: 'Footer',
                        url: '/admin/settings/footer',
                    },
                ],
            },
        ],
    };

    if (!isLoaded) return 'Loading ...';
    
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <Link href="/">
                                <ArrowUpCircleIcon className="h-5 w-5" />
                                <span className="text-base font-semibold">
                                    XeShare Inc.
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}