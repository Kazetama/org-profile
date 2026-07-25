import { usePage } from '@inertiajs/react'
import AppLogoIcon from './app-logo-icon'

type Usertype = 'member' | 'admin-publika' | 'super-admin' | 'admin-psdm'

export default function AppLogo() {
    const { auth } = usePage().props as {
        auth?: {
            user?: {
                usertype?: Usertype
            }
        }
    }

    const usertype: Usertype = auth?.user?.usertype ?? 'member'

    const roleLabel: Record<Usertype, string> = {
        member: 'Mahasiswa Panel',
        'admin-publika': 'Publika Panel',
        'super-admin': 'Superadmin Panel',
        'admin-psdm': 'PSDM Panel',
    }

    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-transparent">
                <AppLogoIcon className="size-7 object-contain" />
            </div>

            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    {roleLabel[usertype]}
                </span>
            </div>
        </>
    )
}
