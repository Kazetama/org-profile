import { Link, usePage } from '@inertiajs/react'
import { Activity, LayoutGrid, UserPlus } from 'lucide-react'
import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'

import { dashboard } from '@/routes'
import adminPsdm from '@/routes/admin-psdm'
import adminPublika from '@/routes/admin-publika'
import superAdmin from '@/routes/super-admin'

import type { NavItem, Usertype } from '@/types'
import AppLogo from './app-logo'

const mainNavItems: NavItem[] = [
    // mahasiswa navbar items
    {
        title: 'Dashboard',
        href: dashboard().url,
        icon: LayoutGrid,
        usertype: ['member'],
    },

    // admin navbar items
    {
        title: 'Admin Dashboard',
        href: adminPublika.dashboard().url,
        icon: LayoutGrid,
        usertype: ['admin-publika'],
    },

    {
        title: 'Event Organisasi',
        href: '/admin-publika/event',
        icon: LayoutGrid,
        usertype: ['admin-publika'],
    },

    {
        title: 'Manajemen Blog',
        icon: LayoutGrid,
        usertype: ['admin-publika'],
        items: [
            {
                title: 'Manajemen Post',
                href: '/admin-publika/posts',
                usertype: ['admin-publika'],
            },
            {
                title: 'Manajemen Kategori',
                href: '/admin-publika/categories',
                usertype: ['admin-publika'],
            },
            {
                title: 'Manajemen Tag',
                href: '/admin-publika/tags',
                usertype: ['admin-publika'],
            },
        ],
    },

    // superadmin navbar items
    {
        title: 'Superadmin Dashboard',
        href: superAdmin.dashboard().url,
        icon: LayoutGrid,
        usertype: ['super-admin'],
    },

    // ketua navbar items
    {
        title: 'Psdm Dashboard',
        href: adminPsdm.dashboard().url,
        icon: LayoutGrid,
        usertype: ['admin-psdm'],
    },

    {
        title: 'Manajemen Anggota',
        href: '/admin-psdm/members',
        icon: Activity,
        usertype: ['admin-psdm'],
    },

    {
        title: 'Open Recruitment',
        href: '/admin-psdm/recruitment',
        icon: UserPlus,
        usertype: ['admin-psdm'],
    }

]

export function AppSidebar() {
    const { auth } = usePage().props as {
        auth?: {
            user?: {
                usertype?: Usertype
            }
        }
    }

    const usertype: Usertype = auth?.user?.usertype ?? 'member'

    const filteredMainNavItems = mainNavItems.filter(
        item => !item.usertype || item.usertype.includes(usertype)
    )

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard().url} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredMainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
