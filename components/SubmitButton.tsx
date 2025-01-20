import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export const SubmitButton = ({isSubmitting}: {isSubmitting: boolean}) => {
    return (
        <Button type="submit" className="w-full relative font-semibold" disabled={isSubmitting}>
            <span className={`${isSubmitting ? 'text-transparent' : ""}`}>Submit</span>
            {isSubmitting && (
                <span className="absolute flex items-center justify-center w-full h-full text-gray-400">
                    <LoaderCircle className="animate-spin" />
                </span>
            )}
        </Button>
    )
}