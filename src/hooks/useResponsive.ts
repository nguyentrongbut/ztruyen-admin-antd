import { useState, useEffect } from "react";

interface Breakpoints {
    width: number;
    isSm: boolean;
    isMd: boolean;
    isLg: boolean;
    isXl: boolean;
    is2xl: boolean;
}

const useResponsive = (): Breakpoints => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return {
        width,
        isSm: width >= 640,
        isMd: width >= 768,
        isLg: width >= 1024,
        isXl: width >= 1280,
        is2xl: width >= 1536,
    };
};

export default useResponsive;
