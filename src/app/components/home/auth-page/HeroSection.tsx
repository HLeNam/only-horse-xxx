import AuthButtons from "@/app/components/home/auth-page/AuthButtons";
import Image from "next/image";

const HeroSection = () => {
    return (
        <div className="flex h-screen w-full">
            <div className="flex-1 flex overflow-hidden bg-[#00b0f0a6] relative justify-center items-center z-10 bg-noise">
                <Image
                    src="/of-logo.svg"
                    alt="OnlyHorse Logo"
                    width={150}
                    height={150}
                    priority
                    className="absolute w-full aspect-square -left-1/4 opacity-15 -bottom-52 lg:scale-150 xl:scale-105 scale-[2] disable-user-select"
                />
                <div className="flex flex-col gap-2 px-4 xl:ml-40 text-center md:text-start font-semibold">
                    <Image
                        src={"/onlyhorse.png"}
                        alt="OnlyHorse Logo"
                        width={769}
                        height={182}
                        className="mt-20 w-[420px] z-0 disable-user-select"
                    />

                    <h1 className="text-2xl md:text-3xl text-balance">
                        Hey! It&apos;s{" "}
                        <span className="bg-stone-800 px-2 font-bold text-white">NOT</span> what it
                        looks like.
                    </h1>
                    <p className="text-2xl md:text-3xl mb-32 leading-snug text-balance">
                        Built for{" "}
                        <span className="bg-sky-500 font-bold px-2 text-white">HORSES</span> NOT{" "}
                        <span className="bg-red-500 px-2 font-bold text-white">OTHERS</span>
                    </p>

                    <AuthButtons />
                </div>
            </div>

            <div className="flex-1 relative overflow-hidden justify-center items-center hidden md:flex">
                <Image
                    src={"/horse-1.png"}
                    alt="Horse 1"
                    fill
                    // sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
                    className="object-cover opacity-90 disable-user-select"
                    priority
                />
            </div>
        </div>
    );
};

export default HeroSection;
