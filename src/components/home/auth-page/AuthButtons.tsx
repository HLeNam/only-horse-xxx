import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { Button } from "@/components/ui/button";

const AuthButtons = () => {
    return (
        <div className="flex gap-3 flex-1 md:flex-row flex-col">
            <RegisterLink className="flex-1">
                <Button
                    className="w-full text-base dark:text-white dark:bg-black dark:hover:bg-black/90"
                    variant={"outline"}
                >
                    Sign up
                </Button>
            </RegisterLink>
            <LoginLink className="flex-1">
                <Button className="w-full text-base">Login</Button>
            </LoginLink>
        </div>
    );
};

export default AuthButtons;
