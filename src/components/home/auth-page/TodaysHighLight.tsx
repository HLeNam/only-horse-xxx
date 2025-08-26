"use client";

import { CldVideoPlayer } from "next-cloudinary";

const TodaysHighLight = () => {
    return (
        <div className="w-full md:w-3/4 mx-auto">
            <CldVideoPlayer
                width={960}
                height={540}
                className="rounded-md"
                src="highlighted-vid_b0jbei"
            />
        </div>
    );
};

export default TodaysHighLight;
