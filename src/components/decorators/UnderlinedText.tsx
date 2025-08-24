import { cn } from "@/lib/utils";

const UnderlinedText = ({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span
            className={cn(
                "underline underline-offset-4 decoration-dashed decoration-sky-400",
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};

export default UnderlinedText;
