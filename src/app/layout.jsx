import React from "react";
import { Footer } from "@layout";

export const Layout = ({ children, footerFlag = true, }) => {
    return (
        <section className='main-content'>
            {children}
            {footerFlag && <Footer />}
        </section>
    );
};

