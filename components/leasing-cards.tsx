import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const LeasingCards: React.FC = () => {
    const cards = [
        {
            image: "https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            title: "Personal leasing",
            description:
                "If you want a vehicle for personal use, learn about how leasing could be right for you. With a choice of thousands of vehicles from all the main manufacturers you could be driving your dream car in no time.",
            linkText: "About personal leasing",
            link: "#",
        },
        {
            image: "https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            title: "Business leasing",
            description:
                "From a small number of business vehicles to a large countrywide fleet we can get your business moving. Our lease options include contract hire, contract purchase or finance lease.",
            linkText: "Leasing for your business",
            link: "#",
        },
        {
            image: "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            title: "Fleet management",
            description:
                "With a range of standard and bespoke products available looking after your fleet operations has never been easier. Just let us know your needs and we can help find the right level of cover for you.",
            linkText: "Our fleet products",
            link: "#",
        },
    ];

    return (
        <div className="bg-white py-8">
            <h2 className="py-16 text-center text-3xl">Our leasing options</h2>
            <div className="container grid grid-cols-1 gap-6 md:grid-cols-3 mx-auto">
                {cards.map((card, index) => (
                    <Card key={index} className="shadow-md">
                        <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-center">{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 text-center">{card.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <a
                                href={card.link}
                                className="text-green-600 font-medium hover:underline"
                            >
                                {card.linkText} &rarr;
                            </a>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default LeasingCards;
