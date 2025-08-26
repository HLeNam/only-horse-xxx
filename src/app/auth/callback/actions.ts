"use server";

import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function checkAuthStatus() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return {
            EC: 1,
            EM: "User not authenticated",
            DT: null,
        };
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
    });

    // sign up
    if (!existingUser) {
        await prisma.user.create({
            data: {
                id: user.id,
                email: user.email!,
                name: user.given_name + " " + user.family_name,
                image: user.picture,
            },
        });
    }

    return {
        EC: 0,
        EM: "Success",
        DT: existingUser || null,
    };
}
