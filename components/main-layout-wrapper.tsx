'use client';

import { Footer } from "./layout/footer";
import { Navbar } from "./layout/navbar";
import { usePathname } from "next/navigation";
import { PaymentProvider } from "./providers/payment-provider";

type Props = {
    children: React.ReactNode;
}

const MainLayoutWrapper: React.FC<Props> = ({ children }) => {
    const pathname = usePathname();

    return (
        <PaymentProvider>
            <Navbar />
            {children}
            {pathname === '/' && <Footer />}
        </PaymentProvider>
    );
};

export default MainLayoutWrapper;