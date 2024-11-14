import { useState, useEffect } from "react";

// Notification to alert user that their application was saved or if an error occurred
export default function Notification({ type = "success" }) {
    const [completed, setCompleted] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCompleted(false);
        }, 1500);

        if (!completed) return null;
        // Clear timeout if component unmounts
        return () => clearTimeout(timer);
        
    }, []);


    return (
        <div
            className="absolute top-10 border border-gray-200 bg-white left-1/2 transform -translate-x-1/2 py-1.5 px-7 font-opensans rounded-lg flex items-center justify-center space-x-2"
        >
            {type === "success" ? (
                <>
                    <span className="text-green-600 text-lg">✔</span>
                    <p className="text-black text-sm font-medium">Application Saved!</p>
                </>
            ) : (
                <>
                    <span className="text-red-600 text-lg font-bold">X</span>
                    <p className="text-black text-sm font-medium">Something went wrong!</p>
                </>
            )}
        </div>
    );
}
