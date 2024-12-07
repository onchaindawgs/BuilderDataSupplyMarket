"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Linkedin } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/over-border-gradient";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { OktoContextType, useOkto } from "okto-sdk-react";
import { GetUserProfile } from "@/readContract/getUserProfile";
import { GetAllUsers } from "@/readContract/getAllUsers";
import { GetUsersCount } from "@/readContract/getUsersCount";
import fetchLinkedin from "@/utils/fetchLinkedin";
import fetchGithub from "@/utils/fetchGithub";
import { EmlUploader } from "@/components/EmlUploader";

export const Home = () => {
    const { isLoggedIn, getWallets, readContractData, executeRawTransaction } = useOkto() as OktoContextType;

    const [walletAddr, setWalletAddr] = useState<string>("");
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [linkedinData, setLinkedinData] = useState<any>(null);
    const [githubData, setGithubData] = useState<any>(null);
    const [formData, setFormData] = useState({
        linkedinUsername: "",
        githubUsername: "",
        name: "",
        email: "",
    });
    
    const [userProfileError, setUserProfileError] = useState(false); // State to track errors

    const steps = ["LinkedIn", "GitHub", "Additional Info"];

    const [processing, setProcessing] = useState({
        linkedin: false,
        github: false,
    });

    useEffect(() => {
        if (isLoggedIn) {
            const getUser = async () => {
                try {
                    const _user = await GetUserProfile(walletAddr, readContractData);
                    // If successful, hide the create profile dialog
                    setUserProfileError(false);
                } catch (error) {
                    // If error, show the create profile dialog
                    setUserProfileError(true);
                }
            };

            getUser();
        }
    }, [isLoggedIn, walletAddr]);

    useEffect(() => {
        const fetchWalletAddress = async () => {
            try {
                const wallets = await getWallets();
                setWalletAddr(wallets?.wallets?.[1]?.address || "");
            } catch (error) {
                console.error("Failed to fetch wallet address:", error);
            }
        };
        fetchWalletAddress();
    }, [getWallets]);

    const isStepValid = () => {
        switch (currentStep) {
            case 0:
                return formData.linkedinUsername.trim() !== "";
            case 1:
                return formData.githubUsername.trim() !== "";
            case 2:
                return formData.name.trim() !== "" && formData.email.trim() !== "";
            default:
                return false;
        }
    };

    const handleNext = async () => {
        if (isStepValid()) {
            setLoading(true);
            try {
                if (currentStep === 0) {
                    const linkedInResponse = await fetchLinkedin(formData.linkedinUsername);
                    setLinkedinData(linkedInResponse);
                    if (!linkedInResponse) {
                        alert("Failed to process LinkedIn profile");
                        return;
                    }
                } else if (currentStep === 1) {
                    const githubResponse = await fetchGithub(formData.githubUsername);
                    setGithubData(githubResponse);
                    if (!githubResponse) {
                        alert("Failed to process GitHub profile");
                        return;
                    }
                }
                setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
            } catch (error) {
                console.error("Error processing profile:", error);
                alert("Failed to process profile. Please try again.");
            } finally {
                setLoading(false);
            }
        } else {
            alert(`Please complete the ${steps[currentStep]} step`);
        }
    };

    const handlePrevious = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (currentStep === steps.length - 1 && isStepValid()) {
            setLoading(true);
            try {
                // Now we can use both linkedinData and githubData here
                const finalProfile = {
                    ...formData,
                    linkedinProfile: linkedinData,
                    githubProfile: githubData
                };
                console.log("Creating final profile with:", finalProfile);
                // TODO: Send finalProfile to your backend/contract
                alert("Hacker Profile Created Successfully!");
            } catch (error) {
                console.error("Profile creation failed", error);
                alert("Failed to create profile");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="h-[100vh] rounded-md bg-neutral-900 flex flex-col items-center justify-center relative w-full">
            <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-6xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
                <span>Builder Data</span>
                {/* <span className="text-white text-lg font-thin">x</span> */}
                <span>Supply Market</span>
            </h2>

            {isLoggedIn && userProfileError && (
                <Dialog>
                    <DialogTrigger>
                        <div className="m-10 flex justify-center text-center">
                            <HoverBorderGradient
                                containerClassName="rounded-full"
                                as="div"
                                className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                            >
                                <span>Create Profile</span>
                            </HoverBorderGradient>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create Builder Profile</DialogTitle>
                            <DialogDescription>
                                Fill out your details to generate a developer score
                            </DialogDescription>
                        </DialogHeader>
                        <Card>
                            <CardHeader>
                                <CardTitle>Onboarding</CardTitle>
                                <CardDescription>
                                    Connect your accounts and provide additional information
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    <div className="flex justify-between mb-2">
                                        {steps.map((step, index) => (
                                            <div
                                                key={step}
                                                className={`text-sm font-medium ${index <= currentStep
                                                    ? "text-primary"
                                                    : "text-muted-foreground"
                                                    }`}
                                            >
                                                {step}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full bg-secondary h-2 rounded-full">
                                        <div
                                            className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
                                            style={{
                                                width: `${((currentStep + 1) / steps.length) * 100}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                {currentStep === 0 && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="linkedinUsername">LinkedIn Username</Label>
                                            <Input
                                                id="linkedinUsername"
                                                name="linkedinUsername"
                                                placeholder="johndoe"
                                                value={formData.linkedinUsername}
                                                onChange={handleInputChange}
                                                disabled={processing.linkedin}
                                            />
                                        </div>
                                    </div>
                                )}

                                {currentStep === 1 && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="githubUsername">GitHub Username</Label>
                                            <Input
                                                id="githubUsername"
                                                name="githubUsername"
                                                placeholder="johndoe"
                                                value={formData.githubUsername}
                                                onChange={handleInputChange}
                                                disabled={processing.github}
                                            />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label>Verify GitHub Ownership</Label>
                                            <EmlUploader 
                                                address={walletAddr} 
                                                onVerificationSuccess={() => {
                                                    // Handle successful verification
                                                    setProcessing(prev => ({ ...prev, github: true }));
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder="Enter your full name"
                                                value={formData.name}
                                                onChange={handleInputChange}
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
                                            />
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                {currentStep > 0 && (
                                    <Button onClick={handlePrevious} disabled={loading}>Previous</Button>
                                )}
                                {currentStep < steps.length - 1 ? (
                                    <Button
                                        onClick={handleNext}
                                        disabled={loading || !isStepValid() || processing.linkedin || processing.github}
                                    >
                                        {loading ? "Processing..." : "Next"}
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={loading || !isStepValid()}
                                    >
                                        {loading ? "Creating..." : "Create Profile"}
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    </DialogContent>
                </Dialog>
            )}

            <ShootingStars />
            <StarsBackground />
        </div>
    );
};

export default Home;


