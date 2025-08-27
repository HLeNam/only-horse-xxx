import ProductCheckout from "@/app/merch/[id]/ProductCheckout";
import { getAllPublicProductsAction, getProductByIdAction } from "@/app/secret-dashboard/actions";
import BaseLayout from "@/components/BaseLayout";
import UnderlinedText from "@/components/decorators/UnderlinedText";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";

interface MerchDetailPageProps {
    params: Promise<{ id: string }>;
}

const MerchDetailPage = async ({ params }: MerchDetailPageProps) => {
    const { id } = await params;

    const currentProduct = (await getProductByIdAction(id)).DT;

    const products = (await getAllPublicProductsAction()).DT.filter(
        (product) => product.id !== currentProduct?.id
    );

    if (!currentProduct || currentProduct.isArchived) {
        return notFound();
    }

    return (
        <BaseLayout renderRightPanel={false}>
            <div className="px-3 md:px-7 my-20">
                <ProductCheckout product={currentProduct} />

                <h1 className="text-3xl text-center mt-20 mb-10 font-bold tracking-tight">
                    More product from{" "}
                    <UnderlinedText className="decoration-wavy underline-offset-8">
                        OnlyHorses
                    </UnderlinedText>
                </h1>

                <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                    {products.map((product) => {
                        return <ProductCard key={product.id} product={product} />;
                    })}
                </div>
            </div>
        </BaseLayout>
    );
};

export default MerchDetailPage;
