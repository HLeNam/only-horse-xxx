import { getUserProfileAction } from "@/app/update-profile/actions";
import LogoutButton from "@/components/LogoutButton";
import { ModeToggle } from "@/components/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Home, LayoutDashboard, Shirt, User } from "lucide-react";
import Link from "next/link";

const SIDEBAR_LINKS = [
    {
        icon: Home,
        label: "Home",
        href: "/",
    },
    {
        icon: Shirt,
        label: "Merch",
        href: "/merch",
    },
];

const Sidebar = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const userProfile = await getUserProfileAction();

    const isAdmin = process.env.NEXT_PUBLIC_ADMIN_EMAIL === user?.email;

    return (
        <div className="flex lg:w-1/5 flex-col gap-3 px-2 border-r sticky left-0 top-0 h-screen">
            <Link href={`/update-profile`} className="max-w-fit">
                <Avatar className="mt-4 cursor-pointer">
                    <AvatarImage
                        src={userProfile?.image || user?.picture || `/user-placeholder.png`}
                        alt="User Avatar"
                    />
                    <AvatarFallback>{user?.username?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
            </Link>

            <nav className="flex flex-col gap-3">
                {SIDEBAR_LINKS.map((link) => {
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal"
                        >
                            <link.icon className="size-6" />
                            <span className="hidden lg:block">{link.label}</span>
                        </Link>
                    );
                })}

                {isAdmin && (
                    <Link
                        href={`/secret-dashboard`}
                        className="flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal"
                    >
                        <LayoutDashboard className="size-6" />
                        <span className="hidden lg:block">Dashboard</span>
                    </Link>
                )}

                <DropdownMenu>
                    <div className="flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal ">
                        <DropdownMenuTrigger className="flex items-center gap-2 outline-none cursor-pointer w-full">
                            <User className="w-6 h-6" />
                            <span className="hidden lg:block">Setting</span>
                        </DropdownMenuTrigger>
                    </div>

                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={`#`}>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                        </Link>
                        <LogoutButton />
                    </DropdownMenuContent>
                </DropdownMenu>

                <ModeToggle />
            </nav>
        </div>
    );
};

export default Sidebar;
