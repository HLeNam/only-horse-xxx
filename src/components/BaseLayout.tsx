import Sidebar from "@/components/Sidebar";
import SuggestedProducts from "@/components/SuggestedProducts";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

interface BaseLayoutProps {
    renderRightPanel?: boolean;
    children: React.ReactNode;
}

const BaseLayout = async ({ children, renderRightPanel = true }: BaseLayoutProps) => {
    const { isAuthenticated } = getKindeServerSession();

    if (!(await isAuthenticated())) {
        return redirect("/");
    }

    return (
        <div className="flex max-w-2xl lg:max-w-7xl mx-auto relative">
            <Sidebar />
            <div className="w-full lg:w-3/5 flex flex-col border-r">{children}</div>
            {renderRightPanel && <SuggestedProducts />}
        </div>
    );
};

export default BaseLayout;
