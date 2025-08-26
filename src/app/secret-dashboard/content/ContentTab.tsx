"use client";

import UnderlinedText from "@/components/decorators/UnderlinedText";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { TriangleAlert } from "lucide-react";
import { CldUploadWidget, CldVideoPlayer, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

const ContentTab = () => {
    const [text, setText] = useState("");
    const [mediaType, setMediaType] = useState<"image" | "video">("video");
    const [isPublic, setIsPublic] = useState(false);
    const [mediaUrl, setMediaUrl] = useState("");

    return (
        <>
            <p className="text-3xl my-5 font-bold text-center uppercase">
                <UnderlinedText className="decoration-wavy">Share</UnderlinedText> Post
            </p>

            <form>
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">New Posts</CardTitle>
                        <CardDescription>
                            Share your exclusive content with your audience. Select only one
                            video/image at a time.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                placeholder="Share today's exclusive"
                                required
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>

                        <Label>Media Type</Label>
                        <RadioGroup
                            defaultValue="video"
                            value={mediaType}
                            onValueChange={(value: "image" | "video") => setMediaType(value)}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="video" id="video" />
                                <Label htmlFor="video">Video</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="image" id="image" />
                                <Label htmlFor="image">Image</Label>
                            </div>
                        </RadioGroup>

                        <CldUploadWidget
                            signatureEndpoint="/api/sign-cloudinary-params"
                            onSuccess={(result, { widget }) => {
                                setMediaUrl((result.info as CloudinaryUploadWidgetInfo).secure_url);
                                // console.log(
                                //     "🚀 ~ (result.info as CloudinaryUploadWidgetInfo).secure_url:",
                                //     (result.info as CloudinaryUploadWidgetInfo).secure_url
                                // );
                                widget.close();
                            }}
                        >
                            {({ open }) => {
                                return (
                                    <Button
                                        onClick={() => open()}
                                        variant={"outline"}
                                        type="button"
                                    >
                                        Upload an Image
                                    </Button>
                                );
                            }}
                        </CldUploadWidget>

                        {mediaUrl && mediaType === "image" && (
                            <div className="flex justify-center relative w-full h-96">
                                <Image
                                    src={mediaUrl}
                                    alt="Uploaded Image"
                                    fill
                                    className="object-contain rounded-md"
                                />
                            </div>
                        )}

                        {mediaUrl && mediaType === "video" && (
                            <div className="w-full mx-auto">
                                <CldVideoPlayer
                                    width={960}
                                    height={540}
                                    className="rounded-md"
                                    src={mediaUrl}
                                />
                            </div>
                        )}

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="public"
                                checked={isPublic}
                                onCheckedChange={(e) => setIsPublic(e as boolean)}
                            />

                            <Label
                                htmlFor="public"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Mark as public
                            </Label>
                        </div>

                        <Alert variant={"default"} className="text-yellow-400">
                            <TriangleAlert className="size-4 !text-yellow-400" />
                            <AlertTitle>Waring</AlertTitle>
                            <AlertDescription>
                                Public posts will be visible to all users.
                            </AlertDescription>
                        </Alert>
                    </CardContent>

                    <CardFooter>
                        <Button className="w-full !text-white" type="submit">
                            Create Post
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </>
    );
};

export default ContentTab;
