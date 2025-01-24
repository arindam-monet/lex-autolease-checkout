"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function VehicleDetails() {
    const router = useRouter();
    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                    <Image
                        src="/images/audi.jpeg"
                        alt="Audi A1 Sportback"
                        width={600}
                        height={400}
                        className="rounded-lg object-cover"
                        priority
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                        Vehicle pictures are generic model images (and may include non-standard options) sourced from What Car? for
                        illustration purposes only.
                    </p>

                    <Card className="mt-4">
                        <CardContent className="p-4">
                            <div className="grid gap-2">
                                <div className="flex justify-between">
                                    <span>CO₂ emission:</span>
                                    <span>130 g/km</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>RDE Certification:</span>
                                    <span>RDE 2</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Annual mileage:</span>
                                    <span>40000 miles total</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-2">AUDI</h1>
                    <h2 className="text-xl mb-4">A1 SPORTBACK 25 TFSI Black Edition 5dr S Tronic 25</h2>

                    <div className="mb-6">
                        <p className="text-2xl font-bold text-primary">£480 per month (incl VAT) without maintenance</p>
                        <p className="text-sm text-muted-foreground">
                            Initial Rental: £1498.10 (incl VAT) followed by 47 monthly rentals
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                            Other terms, durations and contract mileages are available.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <Label>Contract Duration</Label>
                            <Select defaultValue="48">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select duration" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="48">48 Months</SelectItem>
                                    <SelectItem value="36">36 Months</SelectItem>
                                    <SelectItem value="24">24 Months</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Annual Mileage</Label>
                            <Input type="number" defaultValue="10000" />
                            <p className="text-sm text-muted-foreground mt-1">miles</p>
                        </div>

                        <div>
                            <Label>Initial Rental</Label>
                            <Select defaultValue="3">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select initial rental" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="3">3 Months</SelectItem>
                                    <SelectItem value="6">6 Months</SelectItem>
                                    <SelectItem value="9">9 Months</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-muted/20 p-4 rounded-lg mb-8 text-sm">
                <p>ADDING OR REMOVING OPTIONAL EXTRAS? IF YES, PLEASE READ THIS IMPORTANT INFORMATION:</p>
                <p className="mt-2">
                    Following the introduction of WLTP, adding or removing optional extras (e.g. different wheels, sun roof, tow
                    bar, spoiler etc) could likely impact the vehicles specified weight/aero dynamics resulting in a change to the
                    vehicles CO₂ value. This could have the effect of increasing the monthly cost from those originally quoted to
                    you by manufacturer. Legislation requires the manufacturer to notify you of any revised CO₂ figures from April
                    2020 onwards that have been altered from the standard specification. If you decide to alter the specification
                    in this way, you can check with the manufacturer in advance for an indication of how it might impact the CO₂.
                    If you have any queries concerning the revised quote, please contact us to discuss this further.
                </p>
            </div>

            <Accordion type="single" collapsible className="mb-4">
                <AccordionItem value="exterior">
                    <AccordionTrigger>Exterior Colour (0 Selected)</AccordionTrigger>
                    <AccordionContent>
                        <RadioGroup defaultValue="none" className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="silver" id="silver" />
                                <Label htmlFor="silver">Additional Metallic - Dew silver - Free</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="grey" id="grey" />
                                <Label htmlFor="grey">Metallic - Chronos grey - £575</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="green" id="green" />
                                <Label htmlFor="green">Metallic - District green - £575</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="white" id="white" />
                                <Label htmlFor="white">Metallic - Glacier white - £575</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="blue" id="blue" />
                                <Label htmlFor="blue">Metallic - Navarra blue - £575</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="red" id="red" />
                                <Label htmlFor="red">Metallic - Progressive red - £575</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="grey-pearl" id="grey-pearl" />
                                <Label htmlFor="grey-pearl">Pearl - Arrow Grey - £575</Label>
                            </div>
                        </RadioGroup>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="interior">
                    <AccordionTrigger>Interior Trim (0 Selected)</AccordionTrigger>
                    <AccordionContent>
                        <RadioGroup defaultValue="none" className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="dinamica" id="dinamica" />
                                <Label htmlFor="dinamica">
                                    Frequency microfibre dinamica/leatherette - Black with silver contrast stitching with embossed S logo
                                    + front sport seats - £600
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cloth" id="cloth" />
                                <Label htmlFor="cloth">
                                    Pulse cloth/leatherette - Black with silver contrast stitching with embossed S logo + front sport
                                    seats - Free
                                </Label>
                            </div>
                        </RadioGroup>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="manufacturer">
                    <AccordionTrigger>Manufacturer Options (0 Selected)</AccordionTrigger>
                    <AccordionContent>
                        <p>No manufacturer options available</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
                <Accordion type="single" collapsible>
                    <AccordionItem value="safety">
                        <AccordionTrigger>Safety</AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Anti-lock Braking System (ABS)</li>
                                <li>Electronic Stability Control (ESC)</li>
                                <li>Multiple airbags</li>
                                <li>ISOFIX child seat mounting points</li>
                                <li>Tire pressure monitoring system</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="interior">
                        <AccordionTrigger>Interior</AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Automatic climate control</li>
                                <li>Height-adjustable front seats</li>
                                <li>Split-folding rear seats</li>
                                <li>Leather-wrapped steering wheel</li>
                                <li>Ambient lighting package</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                    <AccordionItem value="entertainment">
                        <AccordionTrigger>Entertainment</AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc list-inside space-y-2">
                                <li>10.1-inch touchscreen display</li>
                                <li>Audi Smartphone Interface</li>
                                <li>Bluetooth connectivity</li>
                                <li>DAB digital radio</li>
                                <li>USB ports</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="security">
                        <AccordionTrigger>Security</AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Remote central locking</li>
                                <li>Thatcham category 1 alarm</li>
                                <li>Immobilizer</li>
                                <li>Locking wheel bolts</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="other">
                        <AccordionTrigger>Other</AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Start-stop system</li>
                                <li>Drive select</li>
                                <li>Progressive steering</li>
                                <li>Hill hold assist</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <Card className="mb-8">
                <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <h3 className="text-xl font-bold">WhatCar? Review</h3>
                    </div>
                    <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4].map((star) => (
                            <Star key={star} className="w-5 h-5 fill-primary" />
                        ))}
                        <Star className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    </div>
                    <p className="mb-4">
                        The A1 is a fine car – it's great to drive, comfortable to sit in and is available with lots of big car
                        options. However, if you can live without a posh badge, the Peugeot 208 and VW Polo offer slightly more for
                        less.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-bold mb-2">For:</h4>
                            <p>Smooth ride and tidy handling, Relatively quiet at higher speeds, Very slow depreciation</p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-2">Against:</h4>
                            <p>
                                Cheaper trims not well equipped, Mini feels much plusher inside, Peugeot 208 offers more for less money
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardContent className="p-6 space-y-4">
                    <h3 className="font-bold">Important Information</h3>
                    <div className="space-y-2 text-sm">
                        <p>
                            Contract Hire provided by Lex Autolease Limited. Registered in England & Wales No. 1090741. Registered
                            Office: 25 Gresham Street, London, EC2V 7HN.
                        </p>
                        <p>
                            Subject to status. Must be 18 and over. Prices correct at date of publication (24/01/2025). These offers
                            are subject to availability. If the vehicle exceeds the contract mileage, an excess mileage charge will
                            apply. You will not own the vehicle and it should be returned to us in a condition that reflects "fair
                            wear and tear" guidelines, otherwise charges may apply.
                        </p>
                        <p>
                            Maintenance includes routine servicing, tyres, replacement parts and repairs due to fair wear and tear.
                            Repairs or replacements from accidental/malicious damage and damage caused by driver misuse/abuse are
                            excluded. The vehicle must be serviced in accordance with manufacturer's guidelines and by an approved
                            service dealer.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-bold">If you have chosen a pre-registered car:</h4>
                        <p>
                            A pre-registered car has already been registered with the DVLA, is usually already in stock and it will
                            have been given a number plate.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p>The following apply if you choose to take a pre-registered car through us:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>The remaining manufacturer warranty will be passed to you</li>
                            <li>
                                The warranty may expire before your contract ends depending on the term you have chosen. Refer to the
                                manufacturer handbook for details of what is covered in your warranty
                            </li>
                            <li>An annual MOT is required 3 years from the date the car was first registered</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            <div className="text-center">
                <Button size="lg" className="w-full md:w-auto px-8 text-xl" onClick={
                    () => router.push('/checkout')
                }>
                    Submit
                </Button>
            </div>
        </div>
    )
}

