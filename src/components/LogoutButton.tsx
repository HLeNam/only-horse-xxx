"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

const LogoutButton = () => {
    return (
        <LogoutLink>
            <DropdownMenuItem>Logout</DropdownMenuItem>
        </LogoutLink>
    );
};
export default LogoutButton;
