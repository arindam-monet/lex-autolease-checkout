import { FeePaymentForm } from "@/components/fee-payment/fee-payment-form";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-white">
        <FeePaymentForm />
      </main>
      <Footer />
    </div>
  )
}

