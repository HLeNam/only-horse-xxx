import AuthPage from "@/components/home/auth-page/AuthPage";
import HomePage from "@/components/home/home-page/HomePage";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
    const { getUser } = getKindeServerSession();

    const user = await getUser();

    console.log("🚀 ~ Home ~ user:", user);

    return <main>{user ? <HomePage /> : <AuthPage />}</main>;
}
