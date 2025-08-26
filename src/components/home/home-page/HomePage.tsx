import BaseLayout from "@/components/BaseLayout";
import Posts from "@/components/home/home-page/Posts";
import UserProfile from "@/components/home/home-page/UserProfile";

const HomePage = () => {
    return (
        <BaseLayout>
            <UserProfile />
            <Posts />
        </BaseLayout>
    );
};

export default HomePage;
