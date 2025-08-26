"use client";

import { toggleProductArchiveAction } from "@/app/secret-dashboard/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ZoomedImage from "@/components/ZoomedImage";
import { Product } from "@/dummy_data";
import { centsToDollars, cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface ProductCardProps {
    product: Product;
    adminView?: boolean;
}

const ProductCard = ({ product, adminView = false }: ProductCardProps) => {
    const queryClient = useQueryClient();

    const { mutate: toggleArchive, isPending } = useMutation({
        mutationKey: ["toggleArchive", product.id],
        mutationFn: async () => await toggleProductArchiveAction(product.id),
        onSuccess: () => {
            toast.success("Success", {
                description: `Product has been ${product.isArchived ? "unarchived" : "archived"}.`,
            });
            queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
        },
        onError: (error) => {
            toast.error("Error", {
                description: error.message,
            });
        },
    });

    return (
        <Card className="flex flex-col gap-0">
            <CardHeader className="px-2 flex items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{product.name}</CardTitle>
                <div>
                    <DollarSign className="inline size-4 text-muted-foreground" />
                    <span className="text-sm">{centsToDollars(product.price)}</span>
                </div>
            </CardHeader>

            <CardContent className="flex flex-col flex-1 gap-10">
                <ZoomedImage imgSrc={product.image} />
                <div className="flex justify-center mt-auto">
                    {adminView ? (
                        <Button
                            className="w-full !text-white"
                            variant={"outline"}
                            onClick={() => toggleArchive()}
                            disabled={isPending}
                        >
                            {product.isArchived ? "Unarchive" : "Archive"}
                        </Button>
                    ) : (
                        <Link
                            href={`/merch/${product.id}`}
                            className={cn("w-full !text-white", buttonVariants())}
                        >
                            Buy
                        </Link>
                    )}
                </div>
            </CardContent>

            <CardFooter className="mt-5">
                {adminView ? (
                    <span
                        className={cn("text-sm font-medium", {
                            "text-red-500": product.isArchived,
                            "text-green-500": !product.isArchived,
                        })}
                    >
                        {product.isArchived ? "Archived" : "Live"}
                    </span>
                ) : (
                    <span className="text-sm font-medium text-green-500">In Stock</span>
                )}
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
