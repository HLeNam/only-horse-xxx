"use server";

import { getKindeUser } from "@/app/actions";
import prisma from "@/lib/prisma";

type PostArgs = {
    text: string;
    mediaUrl?: string;
    mediaType?: "image" | "video";
    isPublic: boolean;
};

export async function createPostAction({ isPublic, mediaType, mediaUrl, text }: PostArgs) {
    const { user, isAdmin } = await getKindeUser();

    if (!user || !isAdmin) {
        throw new Error("Unauthorized");
    }

    if (!mediaUrl) {
        throw new Error("Media URL is required");
    }

    const newPost = await prisma.post.create({
        data: {
            text,
            mediaUrl,
            mediaType,
            isPublic,
            userId: user.id,
        },
    });

    return {
        EC: 0,
        DT: {
            message: "Post created successfully",
            post: newPost,
        },
    };
}

export async function getAllProductsAction() {
    const { isAdmin, user } = await getKindeUser();

    if (!user || !isAdmin) {
        throw new Error("Unauthorized");
    }

    const products = await prisma.product.findMany();

    return {
        EC: 0,
        DT: products,
    };
}

export async function getAllPublicProductsAction() {
    const products = await prisma.product.findMany({
        where: {
            isArchived: false,
        },
    });

    return {
        EC: 0,
        DT: products,
    };
}

export async function getProductByIdAction(productId: string) {
    const product = await prisma.product.findUnique({
        where: { id: productId },
    });

    return {
        EC: 0,
        DT: product,
    };
}

type NewProductArgs = {
    name: string;
    image: string;
    price: string;
};
export async function addNewProductToStoreAction({ name, image, price }: NewProductArgs) {
    const { isAdmin, user } = await getKindeUser();

    if (!user || !isAdmin) {
        throw new Error("Unauthorized");
    }

    if (!name || !image || !price) {
        throw new Error("All fields are required");
    }

    const priceInCents = Math.round(parseFloat(price) * 100);

    if (isNaN(priceInCents)) {
        throw new Error("Invalid price");
    }

    const newProduct = await prisma.product.create({
        data: {
            name,
            image,
            price: priceInCents,
        },
    });

    return {
        EC: 0,
        DT: newProduct,
    };
}

export async function toggleProductArchiveAction(productId: string) {
    const { isAdmin, user } = await getKindeUser();

    if (!user || !isAdmin) {
        throw new Error("Unauthorized");
    }

    const product = await prisma.product.findUnique({
        where: { id: productId },
    });

    if (!product) {
        throw new Error("Product not found");
    }

    const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: {
            isArchived: !product.isArchived,
        },
    });

    return {
        EC: 0,
        DT: updatedProduct,
    };
}
