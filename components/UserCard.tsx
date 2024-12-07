import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserCardProps {
    name: string;
    bio: string;
    aiReview: string;
    compatibilityScore: number;
    devScore: number;
}

export function UserCard({ name, bio, aiReview, compatibilityScore, devScore }: UserCardProps) {
    return (
        <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="w-16 h-16">
                    <AvatarImage src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${name}`} />
                    <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-2xl font-bold">{name}</h3>
                    <p className="text-sm text-muted-foreground">{bio}</p>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <p className="text-sm">{aiReview}</p>
                    <div className="flex justify-between">
                        <Badge variant="secondary">Compatibility: {compatibilityScore}%</Badge>
                        <Badge variant="secondary">Dev Score: {devScore}/100</Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

