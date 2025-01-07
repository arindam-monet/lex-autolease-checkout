'use client';

import { Footer } from "./layout/footer";
import { Navbar } from "./layout/navbar";

type Props = {
    children: React.ReactNode;
}

const MainLayoutWrapper: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>

    );
};


export default MainLayoutWrapper;