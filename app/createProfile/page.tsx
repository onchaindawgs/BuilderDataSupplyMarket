'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const steps = ['Connect Okto', 'Connect LinkedIn', 'Connect GitHub', 'Generate Persona', 'Create Profile']

export default function ProfileCreation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [persona, setPersona] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [bio, setBio] = useState<string | null>('')

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleConnect = async (service: string) => {
    // TODO: Implement actual connection logic for each service
    console.log(`Connecting to ${service}...`)
    await new Promise(resolve => setTimeout(resolve, 1000))
    nextStep()
  }

  const handleGeneratePersona = async () => {
    // TODO: Implement actual persona generation logic
    console.log('Generating persona...')
    await new Promise(resolve => setTimeout(resolve, 2000))
    const generatedPersona = "Experienced full-stack developer with a focus on React and Node.js. Passionate about open-source contributions and building scalable web applications."
    setPersona(generatedPersona)
    setBio(generatedPersona)
    nextStep()
  }

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement profile creation logic here
    console.log('Creating profile...', { name, bio })
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Profile created successfully!')
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center">
            <p className="mb-4">Connect your Okto wallet to get started.</p>
            <Button onClick={() => handleConnect('Okto')}>Connect Okto Wallet</Button>
          </div>
        )
      case 1:
        return (
          <div className="text-center">
            <p className="mb-4">Connect your LinkedIn account to import professional information.</p>
            <Button onClick={() => handleConnect('LinkedIn')}>Connect LinkedIn</Button>
          </div>
        )
      case 2:
        return (
          <div className="text-center">
            <p className="mb-4">Connect your GitHub account to import your development activity.</p>
            <Button onClick={() => handleConnect('GitHub')}>Connect GitHub</Button>
          </div>
        )
      case 3:
        return (
          <div className="text-center">
            <p className="mb-4">Generate your persona based on your connected accounts.</p>
            <Button onClick={handleGeneratePersona} className="mb-4">Generate Persona</Button>
            {persona && (
              <div>
                <h3 className="font-semibold mb-2">Your Generated Persona:</h3>
                <p className="bg-gray-100 p-4 rounded">{persona}</p>
              </div>
            )}
          </div>
        )
      case 4:
        return (
          <form onSubmit={handleCreateProfile}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio || ''}
                  onChange={(e : any) => setBio(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">Create Profile</Button>
            </div>
          </form>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={(currentStep / (steps.length - 1)) * 100} className="mb-4" />
        <div className="mb-4">
          <h2 className="text-lg font-semibold">{steps[currentStep]}</h2>
        </div>
        {renderStep()}
        <div className="flex justify-between mt-6">
          <Button onClick={prevStep} disabled={currentStep === 0}>Previous</Button>
          <Button onClick={nextStep} disabled={currentStep === steps.length - 1}>Next</Button>
        </div>
      </CardContent>
    </Card>
  )
}

