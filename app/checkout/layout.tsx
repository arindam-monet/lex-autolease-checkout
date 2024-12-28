

type Props = {
    children: React.ReactNode;
}

export default function CheckoutLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-gray-100 relative">
            <main className="container mx-auto py-4">
                {children}
            </main>
        </div>
    );
}