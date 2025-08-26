import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getKindeUser() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const isAdmin = process.env.NEXT_PUBLIC_ADMIN_EMAIL === user?.email;

    return { user, isAdmin };
}

export async function getAdminKindeUser() {
    const { user, isAdmin } = await getKindeUser();

    if (!user || !isAdmin) {
        throw new Error("Unauthorized");
    }

    return {
        user,
        isAdmin,
    };
}
