import UnderlinedText from "@/components/decorators/UnderlinedText";
import Post from "@/components/home/home-page/Post";
import PostSkeleton from "@/components/skeletons/PostSkeleton";
import { admin, posts, user } from "@/dummy_data";

const Posts = () => {
    const isLoading = false;

    return (
        <div>
            {isLoading ? (
                <div className="mt-10 px-3 flex flex-col gap-10">
                    {Array.from({ length: 3 }).map((_, index) => {
                        return <PostSkeleton key={index} />;
                    })}
                </div>
            ) : posts.length === 0 ? (
                <div className="mt-10 px-3">
                    <div className="flex flex-col items-center space-y-3 w-full md:w-3/4 mx-auto">
                        <p className="text-xl font-semibold">
                            No Posts <UnderlinedText>Yet</UnderlinedText>
                        </p>

                        <p className="text-center">
                            stay tuned for more posts from{" "}
                            <span className="text-primary font-semibold text-xl">OnlyHorse.</span>{" "}
                            You can subscribe to access exclusive content when it&apos;s available.
                        </p>
                    </div>
                </div>
            ) : (
                posts.map((post) => {
                    return (
                        <Post
                            key={post.id}
                            post={post}
                            admin={admin}
                            isSubscribed={user.isSubscribed}
                        />
                    );
                })
            )}
        </div>
    );
};

export default Posts;
