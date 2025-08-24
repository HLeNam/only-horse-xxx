import RotatedText from "@/components/decorators/RotatedText";
import UnderlinedText from "@/components/decorators/UnderlinedText";
import Features from "@/components/home/auth-page/Features";
import HeroSection from "@/components/home/auth-page/HeroSection";
import MasonryGrid from "@/components/home/auth-page/MasonryGrid";
import Team from "@/components/home/auth-page/Team";
import Testimonials from "@/components/home/auth-page/Testimonials";
import TodaysHighLight from "@/components/home/auth-page/TodaysHighLight";
import Pricing from "@/components/Pricing";

const AuthPage = () => {
    return (
        <div className="flex flex-col">
            <HeroSection />

            <div className="mb-20 mt-12">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl tracking-tight mt-4 mb-8 font-semibold text-center">
                        Today&apos;s{" "}
                        <UnderlinedText className="underline-offset-8 md:underline-offset-[12px] decoration-wavy">
                            Highlight
                        </UnderlinedText>
                        <span className="text-2xl md:text-4xl ml-1">👇</span>
                    </h2>

                    {/* Featured Posts */}
                    <div className="flex flex-col gap-10 mt-10">
                        <TodaysHighLight />

                        <div className="mt-24">
                            <h2 className="text-2xl md:text-5xl text-center tracking-tight font-bold">
                                Meet the <RotatedText>Stars</RotatedText> of Our Farm
                            </h2>

                            <MasonryGrid />
                        </div>

                        <Features />

                        <Testimonials />

                        <Pricing />

                        <Team />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
