'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Github, Linkedin } from 'lucide-react'

const steps = ['Connect Wallet', 'LinkedIn', 'GitHub', 'Additional Info']

export default function Onboarding() {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({
        wallet: '',
        linkedin: '',
        github: '',
        name: '',
        email: '',
    })

    const handleNext = () => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }

    const handlePrevious = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        // Here you would typically send the data to your backend
    }

    return (
        <div className="container mx-auto max-w-2xl p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Onboarding</CardTitle>
                    <CardDescription>Connect your accounts and provide additional information</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <div className="flex justify-between mb-2">
                            {steps.map((step, index) => (
                                <div
                                    key={step}
                                    className={`text-sm font-medium ${index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                                        }`}
                                >
                                    {step}
                                </div>
                            ))}
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                            <div
                                className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
                                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {currentStep === 0 && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="wallet">Wallet Address</Label>
                                    <Input
                                        id="wallet"
                                        name="wallet"
                                        placeholder="Enter your wallet address"
                                        value={formData.wallet}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        )}
                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <Button className="w-full" variant="outline">
                                    <Linkedin className="mr-2 h-4 w-4" />
                                    Connect LinkedIn
                                </Button>
                            </div>
                        )}
                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <Button className="w-full" variant="outline">
                                    <Github className="mr-2 h-4 w-4" />
                                    Connect GitHub
                                </Button>
                            </div>
                        )}
                        {currentStep === 3 && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        )}
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={handlePrevious} disabled={currentStep === 0}>
                        Previous
                    </Button>
                    {currentStep < steps.length - 1 ? (
                        <Button onClick={handleNext}>Next</Button>
                    ) : (
                        <Button type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}

