import { Button } from "@/components/ui/button"
import Image from "next/image"
import LeasingCards from "./leasing-cards"
import Hero from "./hero"

export function Landing() {
    return (
        <div className="">
            <Hero />

            <LeasingCards />

            <section className="bg-secondary px-6 py-12 md:py-16">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="space-y-4 max-w-2xl">
                            <h2 className="text-white text-2xl md:text-3xl font-medium">Need help?</h2>
                            <p className="text-white/90 text-base md:text-lg leading-relaxed">
                                We know our customers sometimes need extra guidance from time to time, so our help centre is here if you
                                need some more information or want to get in touch.
                            </p>
                        </div>
                        <Button
                            variant="secondary"
                            size="lg"
                            className="self-start md:self-center bg-white text-black hover:bg-white/90"
                        >
                            Contact and support
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

