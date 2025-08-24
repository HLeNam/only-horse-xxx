import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { Button } from "@/components/ui/button";

const AuthButtons = () => {
    return (
        <div className="flex gap-3 flex-1 md:flex-row flex-col">
            <RegisterLink className="flex-1">
                <Button className="w-full" variant={"outline"}>
                    Sign up
                </Button>
            </RegisterLink>
            <LoginLink className="flex-1">
                <Button className="w-full">Sign in</Button>
            </LoginLink>
        </div>
    );
};

export default AuthButtons;
