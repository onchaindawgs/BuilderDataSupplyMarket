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

export const Home = () => {
    const { isLoggedIn, getWallets, readContractData } = useOkto() as OktoContextType;

    const [walletAddr, setWalletAddr] = useState<string>("");
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        wallet: "",
        linkedin: "",
        github: "",
        name: "",
        email: "",
    });

    const steps = ["Connect Wallet", "LinkedIn", "GitHub", "Additional Info"];

    useEffect(() => {
        const fetchWalletAddress = async () => {
            console.log("fwtching wallet")
            try {
                console.log("try")
                const wallets = await getWallets();
                console.log("all wallets", wallets)
                setWalletAddr(wallets?.wallets?.[0]?.address || "");
            } catch (error) {
                console.error("Failed to fetch wallet address:", error);
            }
        };
        fetchWalletAddress();
    }, [getWallets]);

    const isStepValid = () => {
        switch (currentStep) {
            case 0:
                return formData.wallet.trim() !== "";
            case 1:
                return formData.linkedin.trim() !== "";
            case 2:
                return formData.github.trim() !== "";
            case 3:
                return formData.name.trim() !== "" && formData.email.trim() !== "";
            default:
                return false;
        }
    };

    const handleNext = () => {
        if (isStepValid()) {
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
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
                await new Promise((resolve) => setTimeout(resolve, 2000));
                console.log("Profile created:", formData);
                alert("Hacker Profile Created Successfully!");
            } catch (error) {
                console.error("Profile creation failed", error);
                alert("Failed to create profile");
            } finally {
                setLoading(false);
            }
        }
    };

    const connectLinkedIn = () => {
        setFormData((prev) => ({ ...prev, linkedin: "Connected" }));
    };

    const connectGitHub = () => {
        setFormData((prev) => ({ ...prev, github: "Connected" }));
    };

    return (
        <div className="h-[100vh] rounded-md bg-neutral-900 flex flex-col items-center justify-center relative w-full">
            <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-6xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
                <span>Builder Data</span>
                <span className="text-white text-lg font-thin">x</span>
                <span>Supply Model</span>
            </h2>
            <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                onClick={() => GetUserProfile(walletAddr, readContractData)}
                className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            >
                <span>Get Profile</span>
            </HoverBorderGradient>
            <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                onClick={() => GetAllUsers(readContractData)}
                className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            >
                <span>Get All Users</span>
            </HoverBorderGradient>
            <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                onClick={() => GetUsersCount(readContractData)}
                className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            >
                <span>Get Users count</span>
            </HoverBorderGradient>

            {isLoggedIn && (
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
                                            <Label htmlFor="wallet">Wallet Address</Label>
                                            <Input
                                                id="wallet"
                                                name="wallet"
                                                placeholder="Enter your wallet address"
                                                value={formData.wallet}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                )}

                                {currentStep === 1 && (
                                    <div className="space-y-4">
                                        <Button
                                            className="w-full"
                                            variant="outline"
                                            onClick={connectLinkedIn}
                                        >
                                            <Linkedin className="mr-2 h-4 w-4" />
                                            {formData.linkedin ? "LinkedIn Connected" : "Connect LinkedIn"}
                                        </Button>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="space-y-4">
                                        <Button
                                            className="w-full"
                                            variant="outline"
                                            onClick={connectGitHub}
                                        >
                                            <Github className="mr-2 h-4 w-4" />
                                            {formData.github ? "GitHub Connected" : "Connect GitHub"}
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
                                    <Button onClick={handlePrevious}>Previous</Button>
                                )}
                                {currentStep < steps.length - 1 ? (
                                    <Button
                                        onClick={handleNext}
                                        disabled={!isStepValid()}
                                    >
                                        Next
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
