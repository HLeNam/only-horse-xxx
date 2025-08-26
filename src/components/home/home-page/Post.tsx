"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Heart, ImageIcon, LockKeyholeIcon, MessageCircle, Trash } from "lucide-react";

import { cn } from "@/lib/utils";
import { type Post, Admin, user } from "@/dummy_data";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostProps {
    post: Post;
    admin: Admin;
    isSubscribed: boolean;
}

const Post = ({ post, admin, isSubscribed }: PostProps) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);

    return (
        <div className="flex flex-col gap-3 p-3 border-t">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={admin.image || `/user-placeholder.png`} />
                        <AvatarFallback>{admin.name.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm md:text-base">{admin.name}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="text-zinc-400 text-xs md:text-sm tracking-tighter">25.08.2025</p>

                    {admin.id === user.id && (
                        <Trash className="size-5 text-muted-foreground hover:text-red-500 cursor-pointer" />
                    )}
                </div>
            </div>

            <p className="text-sm md:text-base">{post.text}</p>

            {(post.isPublic || isSubscribed) && post.mediaUrl && post.mediaType === "image" && (
                <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden">
                    <Image
                        src={post.mediaUrl}
                        alt="Post Image"
                        className="rounded-lg object-cover"
                        fill
                    />
                </div>
            )}

            {(post.isPublic || isSubscribed) && post.mediaUrl && post.mediaType === "image" && null}

            {!isSubscribed && !post.isPublic && (
                <div className="w-full bg-slate-800 relative h-96 rounded-md bg-of flex flex-col justify-center items-center px-5 overflow-hidden">
                    <LockKeyholeIcon className="size-16 text-zinc-400 mb-20 z-0" />

                    <div
                        aria-hidden="true"
                        className="opacity-60 absolute top-0 left-0 w-full h-full bg-stone-800"
                    />

                    <div className="flex flex-col gap-2 z-10 border p-2 border-gray-500 w-full rounded">
                        <div className="flex gap-1 items-center">
                            <ImageIcon className="size-4" />
                            <span className="text-xs">1</span>
                        </div>

                        <Link
                            className={buttonVariants({
                                className: "!rounded-full w-full font-bold text-white",
                            })}
                            href={`/pricing`}
                        >
                            Subscribe to unlock
                        </Link>
                    </div>
                </div>
            )}

            <div className="flex gap-4">
                <div className="flex gap-1 items-center">
                    <Heart
                        className={cn("size-5 cursor-pointer", {
                            "text-red-500 fill-red-500": isLiked,
                        })}
                        onClick={() => setIsLiked(!isLiked)}
                    />
                    <span className="text-xs text-zinc-400 tracking-tighter disable-user-select">
                        55
                    </span>
                </div>

                <div className="flex gap-1 items-center">
                    <MessageCircle className="size-5 cursor-pointer" />
                    <span className="text-xs text-zinc-400 tracking-tighter disable-user-select">
                        11
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Post;
