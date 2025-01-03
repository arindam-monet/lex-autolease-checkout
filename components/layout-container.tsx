'use client';
import { PaymentProvider } from "./providers/payment-provider";

type Props = {
    children: React.ReactNode;
};

const LayoutContainer: React.FC<Props> = ({ children }) => {
    return (
        <PaymentProvider>
            {children}
        </PaymentProvider>

    );
}

export default LayoutContainer;