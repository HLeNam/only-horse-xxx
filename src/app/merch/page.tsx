import { getAllProductsAction } from "@/app/secret-dashboard/actions";
import BaseLayout from "@/components/BaseLayout";
import UnderlinedText from "@/components/decorators/UnderlinedText";
import ProductCard from "@/components/ProductCard";

const MerchPage = async () => {
    const { DT: products } = await getAllProductsAction();

    return (
        <BaseLayout renderRightPanel={false}>
            <div className="px-3 md:px-10 mt-10">
                <h1 className="text-3xl text-center my-5 font-bold tracking-tight">
                    Our <UnderlinedText className="decoration-wavy">Products</UnderlinedText>
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

export default MerchPage;
