"use client"
import React, { useState } from 'react';
import zkeSDK, { ExternalInputInput } from "@zk-email/sdk";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EmlUploaderProps {
    address: string;
    onVerificationSuccess: () => void;
}

export const EmlUploader: React.FC<EmlUploaderProps> = ({ address, onVerificationSuccess }) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [isVerifying, setIsVerifying] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && selectedFile.name.endsWith('.eml')) {
            setFile(selectedFile);
            setUploadStatus('Email file selected');
        } else {
            setFile(null);
            setUploadStatus('Please select a valid .eml file');
        }
    };

    const handleVerify = async () => {
        if (!file) {
            setUploadStatus('No file selected');
            return;
        }

        try {
            setIsVerifying(true);
            setUploadStatus('Verifying ownership...');

            const fileContent = await file.text();
            const sdk = zkeSDK();
            const blueprintSlug = "0xmihirsahu/proofOfGithubUsernameOwnership@v1";
            const blueprint = await sdk.getBlueprint(blueprintSlug);
            const prover = blueprint.createProver();

            const externalInputs: ExternalInputInput[] = [{
                maxLength: 64,
                name: "address",
                value: address,
            }];

            const proof = await prover.generateProof(fileContent, externalInputs);
            const proofData = proof.getProofData();

            setUploadStatus('Verification successful!');
            onVerificationSuccess();

        } catch (error) {
            console.error('Verification error:', error);
            setUploadStatus('Verification failed. Please try again.');
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <div className="space-y-2">
            <Input
                type="file"
                accept=".eml"
                onChange={handleFileChange}
                className="w-full"
            />
            {uploadStatus && (
                <p className="text-sm text-muted-foreground">{uploadStatus}</p>
            )}
            <Button
                onClick={handleVerify}
                disabled={!file || isVerifying}
                className="w-full"
            >
                {isVerifying ? 'Verifying...' : 'Verify GitHub Ownership'}
            </Button>
        </div>
    );
};