"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { MouseEvent, useState } from "react";

interface ZoomedImageProps extends React.HTMLAttributes<HTMLDivElement> {
    imgSrc: string;
}

const ZoomedImage = ({ className, imgSrc }: ZoomedImageProps) => {
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const handleMouseMove = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        const rect = (event.target as HTMLDivElement).getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
    };

    return (
        <div
            className={cn("w-full relative overflow-hidden h-96", className)}
            onMouseMove={handleMouseMove}
        >
            <Image
                src={imgSrc}
                fill
                alt="Product image"
                style={{
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                }}
                className="transition-transform duration-500 ease-in-out transform hover:scale-[2.5] cursor-pointer rounded-md"
            />
        </div>
    );
};

export default ZoomedImage;
