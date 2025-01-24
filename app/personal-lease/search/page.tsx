"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car } from "lucide-react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"


interface SearchResult {
    make: string
    model: string
    year: number
    price: number
    fuelType: string
    transmission: string
    bodyType: string
    doors: number
    engineSize: number
}

export default function VehicleSearchForm() {
    const [showResults, setShowResults] = useState(false)
    const [isOpen, setIsOpen] = useState(true)
    const [formData, setFormData] = useState({
        make: "All Makes",
        bodyType: {
            saloon: false,
            hatchback: true,
            estate: false,
            mpv: false,
            coupe: false,
            convertible: false,
            van: false,
        },
        fuelType: {
            petrol: true,
            diesel: false,
            hybrid: false,
            electric: false,
        },
        transmission: "automatic",
        doors: "any",
        engineSizeMin: "1000",
        engineSizeMax: "2000",
    })

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setShowResults(true)
        setIsOpen(false)
    }

    const router = useRouter();


    return (
        <div className="max-w-4xl mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Personal Contract Hire Quote</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-6">
                        For personal customers Lex Autolease Limited has appointed a panel of two specialist brokers. The panel
                        includes Intelligent Car Leasing Limited for petrol, diesel and hybrid vehicles and Fleetdrive Management
                        Limited trading as DriveElectric for electric vehicles.
                    </p>

                    <form onSubmit={handleSearch} className="space-y-6">
                        <Select defaultValue={formData.make}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select make" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All Makes">All Makes</SelectItem>
                                <SelectItem value="audi">Audi</SelectItem>
                                <SelectItem value="bmw">BMW</SelectItem>
                                <SelectItem value="mercedes">Mercedes</SelectItem>
                                <SelectItem value="volkswagen">Volkswagen</SelectItem>
                            </SelectContent>
                        </Select>

                        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                            <CollapsibleTrigger className="flex w-full items-center justify-between">
                                <h3 className="text-lg font-semibold">Refine Search Criteria</h3>
                                {isOpen ? (
                                    <ChevronUp className="h-4 w-4" />
                                ) : (
                                    <ChevronDown className="h-4 w-4" />
                                )}
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-4 mt-4">
                                <div className="space-y-4">


                                    <div className="space-y-2">
                                        <Label>Body Type</Label>
                                        <div className="grid grid-cols-4 gap-4">
                                            {Object.entries(formData.bodyType).map(([key, value]) => (
                                                <div key={key} className="flex items-center space-x-2">
                                                    <Checkbox id={key} checked={value} />
                                                    <Label htmlFor={key} className="capitalize">
                                                        {key}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Fuel Type</Label>
                                        <div className="grid grid-cols-4 gap-4">
                                            {Object.entries(formData.fuelType).map(([key, value]) => (
                                                <div key={key} className="flex items-center space-x-2">
                                                    <Checkbox id={`fuel-${key}`} checked={value} />
                                                    <Label htmlFor={`fuel-${key}`} className="capitalize">
                                                        {key}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Transmission</Label>
                                        <RadioGroup defaultValue={formData.transmission} className="flex gap-4">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="manual" id="manual" />
                                                <Label htmlFor="manual">Manual</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="automatic" id="automatic" />
                                                <Label htmlFor="automatic">Automatic</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Number of Doors</Label>
                                        <div className="flex gap-2">
                                            {["any", "2", "3", "4", "5"].map((door) => (
                                                <Button
                                                    key={door}
                                                    type="button"
                                                    variant={formData.doors === door ? "default" : "outline"}
                                                    className="w-12"
                                                >
                                                    {door.toUpperCase()}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Engine Size (CC)</Label>
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <Input type="number" placeholder="Min" defaultValue={formData.engineSizeMin} />
                                            </div>
                                            <div className="flex-1">
                                                <Input type="number" placeholder="Max" defaultValue={formData.engineSizeMax} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>



                        <Button type="submit" className="w-full">
                            Search
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {showResults && (
                <Card className="mt-6 cursor-pointer" onClick={() =>
                    router.push('/personal-lease/vehicle-details')
                }>
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-48 h-48 object-cover">
                                <Image src={'/images/audi.jpeg'} alt="Audi A1" width={200} height={200} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold">Audi</h3>
                                <p>A1 SPORTBACK 25 TFSI Black Edition 5dr S Tronic</p>
                                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                    <div>Body Type: Hatchback</div>
                                    <div>Fuel: Petrol</div>
                                    <div>Transmission: Automatic</div>
                                    <div>Engine: 1500cc</div>
                                    <div>Doors: 5</div>
                                </div>
                                <div className="mt-4">
                                    <span className="text-2xl font-bold">£ 480</span>
                                    <span className="text-muted-foreground">/month</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

