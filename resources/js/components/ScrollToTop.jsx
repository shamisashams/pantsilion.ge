import React, { useEffect } from "react";
//import { useLocation } from "react-router";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

const ScrollToTop = (props) => {
    const { pathname } = usePage().props;
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    Inertia.on("success", (event) => {
        window.scrollTo(0, 0);
    });

    return <>{props.children}</>;
};

export default ScrollToTop;
