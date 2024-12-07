"use client"
import React, { useState } from 'react';
import zkeSDK, { ExternalInputInput } from "@zk-email/sdk";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const EmlUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [address, setAddress] = useState<string>('0x0000000000000000000000000000000000000000');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith('.eml')) {
      setFile(selectedFile);
      setUploadStatus('eml filed selected!');
    } else {
      setFile(null);
      setUploadStatus('Please select a valid .eml file');
    }
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('No file selected');
      return;
    }

    try {
      setUploadStatus('Processing file...');

      const fileContent = await file.text();

      const sdk = zkeSDK();

      const blueprintSlug = "0xmihirsahu/proofOfGithubUsernameOwnership@v1";

      const blueprint = await sdk.getBlueprint(blueprintSlug);

      const prover = blueprint.createProver();

      const externalInputs: ExternalInputInput[] = [
        {
          maxLength: 64,
          name: "address",
          value: address,
        },
      ];

      const proof = await prover.generateProof(fileContent, externalInputs);
      const {
        proofData,
        publicData,
        externalInputs: externalInputsData,
        publicOutputs,
      } = proof.getProofData();

      const callData = await proof.createCallData();

      setUploadStatus('Proof generation successful!');

      console.log({
        proofData,
        publicData,
        externalInputsData,
        publicOutputs,
        callData
      });

    } catch (error) {
      console.error('Error processing file:', error);
      setUploadStatus('Error processing file');
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div>
        <label htmlFor="address" className="block mb-2 text-sm font-medium">
          Ethereum Address
        </label>
        <Input
          type="text"
          id="address"
          value={address}
          onChange={handleAddressChange}
          placeholder="Enter Ethereum address"
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="eml-upload" className="block mb-2 text-sm font-medium">
          Upload .eml File
        </label>
        <Input
          type="file"
          id="eml-upload"
          accept=".eml"
          onChange={handleFileChange}
          className="w-full"
        />
      </div>

      {uploadStatus && (
        <div className="text-sm mt-2 text-gray-600">
          {uploadStatus}
        </div>
      )}

      <Button
        onClick={handleUpload}
        disabled={!file}
        className="w-full"
      >
        Generate Proof
      </Button>
    </div>
  );
};

export default EmlUploader;