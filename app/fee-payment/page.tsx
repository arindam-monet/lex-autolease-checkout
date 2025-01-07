import { FeePaymentForm } from "@/components/fee-payment/fee-payment-form";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-white">
        <FeePaymentForm />
      </main>
    </div>
  )
}

