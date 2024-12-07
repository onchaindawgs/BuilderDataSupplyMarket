"use client";
import { ethers } from "ethers";
import { abi } from "@/BDSM_ABI.json";

export const CreateMatch = async (
  userAddress: string,
  _dataHash: string,
  executeRawTransaction: any
) => {
  const iface = new ethers.Interface(abi);
  const dataHash = iface.encodeFunctionData("createMatch", [_dataHash]);
  
  const networkName = "POLYGON_TESTNET_AMOY";

  const transactionData = {
    from: userAddress,
    to: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    data: dataHash,
  };

  executeRawTransaction({
    network_name: networkName,
    transaction: transactionData,
  })
    .then((result: any) => {
      console.log("Transaction submitted", result);
    })
    .catch((error: any) => {
      console.log("Transaction error", error);
    });
}; 