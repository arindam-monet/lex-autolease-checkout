'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { mockFormData, sourceOptions, reasonOptions } from "@/lib/mock-data"

export function FeePaymentForm() {
  const [formData, setFormData] = useState(mockFormData)
  const [agreed, setAgreed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) {
      alert("Please accept the terms and conditions")
      return
    }
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#67004D] mb-6">Fee payment</h1>

      <div className="space-y-4">
        <div>
          <Label htmlFor="reference">Reference*</Label>
          <Input
            id="reference"
            defaultValue={formData.reference}
            required
            className="mt-1"
          />
          <p className="text-sm text-gray-500 mt-1">
            Please enter either your policy number OR the company you have applied to, i.e. Legal & General, AIG, Investec
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Select defaultValue={formData.title}>
              <SelectTrigger id="title">
                <SelectValue placeholder="Select title" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mr">Mr</SelectItem>
                <SelectItem value="Mrs">Mrs</SelectItem>
                <SelectItem value="Miss">Miss</SelectItem>
                <SelectItem value="Ms">Ms</SelectItem>
                <SelectItem value="Dr">Dr</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="firstName">First Name*</Label>
            <Input
              id="firstName"
              defaultValue={formData.firstName}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="lastName">Last Name*</Label>
            <Input
              id="lastName"
              defaultValue={formData.lastName}
              required
            />
          </div>
          <div>
            <Label htmlFor="telephone">Telephone Number</Label>
            <Input
              id="telephone"
              type="tel"
              defaultValue={formData.telephone}
            />
          </div>
          <div>
            <Label htmlFor="email">Email Address*</Label>
            <Input
              id="email"
              type="email"
              defaultValue={formData.email}
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="postCode">Post Code*</Label>
            <div className="flex gap-2">
              <Input
                id="postCode"
                defaultValue={formData.postCode}
                required
              />
              <Button type="button" variant="secondary">Find Address</Button>
            </div>
          </div>
          <div>
            <Label htmlFor="addressLine1">Address line 1</Label>
            <Input
              id="addressLine1"
              defaultValue={formData.addressLine1}
            />
          </div>
          <div>
            <Label htmlFor="addressLine2">Address line 2</Label>
            <Input
              id="addressLine2"
              defaultValue={formData.addressLine2}
            />
          </div>
          <div>
            <Label htmlFor="town">Town</Label>
            <Input
              id="town"
              defaultValue={formData.town}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="policiesCount">How many policies have you purchased?*</Label>
            <Select defaultValue={formData.policiesCount}>
              <SelectTrigger id="policiesCount">
                <SelectValue placeholder="Select number" />
              </SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5].map(num => (
                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="discountCode">Discount code</Label>
            <Input
              id="discountCode"
              defaultValue={formData.discountCode}
            />
          </div>

          <div>
            <Label>Fee Due:</Label>
            <p className="text-lg font-bold">£{formData.feeDue}</p>
          </div>

          <div>
            <Label htmlFor="source">Where did you hear about Cavendish Online?</Label>
            <Select defaultValue={formData.source}>
              <SelectTrigger id="source">
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                {sourceOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="reason">What was your reason for purchasing life insurance?</Label>
            <Select defaultValue={formData.reason}>
              <SelectTrigger id="reason">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                {reasonOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#67004D]">
            Client Declaration/Execution Only Statement
          </h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Please accept this confirmation that I have applied for a life Insurance product through Cavendish Online and that I have read and understood your Terms and Conditions.</p>
            <p>I confirm that I have not sought or received any advice from Cavendish Online in relation with this product(s).</p>
            <p>I understand that Cavendish Online charges a one-off fee and will receive no commission for this product(s).</p>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Please tick to confirm you have understood and accepted these statements.
            </label>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#67004D] hover:bg-[#4D0039]"
        disabled={!agreed}
      >
        SUBMIT
      </Button>
    </form>
  )
}

