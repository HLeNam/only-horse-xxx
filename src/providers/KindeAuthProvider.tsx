"use client";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

const KindeAuthProvider = ({ children }: { children: React.ReactNode }) => {
    return <KindeProvider>{children}</KindeProvider>;
};

export default KindeAuthProvider;
