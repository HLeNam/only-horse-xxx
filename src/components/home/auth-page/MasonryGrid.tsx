"use client";

import Image from "next/image";
import { MouseEvent, useState } from "react";

const MasonryGrid = () => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const handleMouseMove = (
        event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
        index: number
    ) => {
        if (hoverIndex === index) {
            const rect = (event.target as HTMLDivElement).getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            setMousePosition({ x, y });
        }
    };

    return (
        <div className="p-5 sm:p-8">
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 [&>div:not(:first-child)]:mt-8">
                {Array.from({ length: 15 }).map((_, index) => {
                    return (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-md"
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(null)}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                        >
                            <Image
                                src={`/featured/featured${index + 1}.jpg`}
                                className="cursor-pointer hover:scale-150 transition-transform duration-500 ease-in-out"
                                style={{
                                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                                }}
                                alt={`Featured Horse ${index + 1}`}
                                width={500}
                                height={500}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MasonryGrid;
