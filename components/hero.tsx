import Image from "next/image";
import React from "react";

const Hero: React.FC = () => {
    return (
        <section className="relative flex items-center justify-between bg-accent overflow-hidden">
            {/* Left Section */}
            <div className="px-8 py-16 sm:px-16 md:px-20 lg:px-24 z-10 ml-16 max-w-xl">
                <h1 className="text-4xl font-bold text-secondary sm:text-5xl lg:text-6xl">
                    Lease with Lex
                </h1>
                <p className="mt-4 text-xl text-gray-300 text-muted">
                    A leading provider of personal and business vehicle leasing services in the UK.
                </p>

            </div>

            {/* Right Section - Image */}

            <div className="relative object-cover w-1/2 h-full hidden lg:block">
                <Image src="/images/woman-driving-car-desktop.jpg" width={800} height={100} alt="image" />
            </div>


            {/* Green Shape Overlay */}
            <div className="absolute inset-y-0 left-16 w-1/2 bg-primary skew-x-[-15deg] transform origin-left"></div>
        </section>
    );
};

export default Hero;
