import React from "react";
import { UserCard } from "./UserCard";

interface Match {
    id: string;
    name: string;
    bio: string;
    aiReview: string;
    compatibilityScore: number;
    devScore: number;
}

interface MatchesContainerProps {
    matches: Match[];
}

export function MatchesContainer({ matches }: MatchesContainerProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
                <UserCard key={match.id} {...match} />
            ))}
        </div>
    );
}

