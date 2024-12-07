"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MatchesContainer } from "@/components/MatchesContainer";

// Simulated function to get matches (replace this with your actual API call)
const getMatchesFromAPI = async () => {
    // Simulating API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [
        {
            id: "1",
            name: "Alice Johnson",
            bio: "Full-stack developer with a passion for AI",
            aiReview: "Excellent problem-solving skills and strong coding abilities.",
            compatibilityScore: 95,
            devScore: 92,
        },
        {
            id: "2",
            name: "Bob Smith",
            bio: "Frontend specialist focusing on React and Vue",
            aiReview: "Creative designer with a keen eye for user experience.",
            compatibilityScore: 88,
            devScore: 85,
        },
        {
            id: "3",
            name: "Charlie Brown",
            bio: "Backend guru with expertise in Node.js and Python",
            aiReview: "Excellent at optimizing database queries and API performance.",
            compatibilityScore: 92,
            devScore: 94,
        },
    ];
};

export default function Home() {
    const [matches, setMatches] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetMatches = async () => {
        setIsLoading(true);
        try {
            const newMatches = await getMatchesFromAPI();
            setMatches(newMatches);
        } catch (error) {
            console.error("Error fetching matches:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Developer Matches</h1>
            {matches.length === 0 ? (
                <div className="text-center">
                    <p className="text-xl mb-4">No matches to show</p>
                    <Button onClick={handleGetMatches} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Get Matches"}
                    </Button>
                </div>
            ) : (
                <MatchesContainer matches={matches} />
            )}
        </div>
    );
}

