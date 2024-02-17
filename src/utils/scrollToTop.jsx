import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {


        if (pathname.includes('/chat')) {
            // setTimeout(() => {
            //     window.scrollTo(0, document.body.scrollHeight);
            // }, 100);
            // window.scrollTo(0, document.body.scrollHeight)


        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return null;
}
