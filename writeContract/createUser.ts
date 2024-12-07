"use client";
import { ethers } from "ethers";
import { abi } from "@/BDSM_ABI.json";
export const CreateUser = async (
  userAddress: string,
  _dataHash: string,
  executeRawTransaction: any
) => {
  console.log("data hash", _dataHash);
  console.log("function run");
  const iface = new ethers.Interface(abi);
  const dataHash = iface.encodeFunctionData("createUser", [_dataHash]);
  
  const networkName = "POLYGON_TESTNET_AMOY";

  const transactionData = {
    from: userAddress,
    to: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    data: dataHash, // Optional transaction data
    //   value: "0xYourValue", // Optional value in wei
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
  //   const resp = await writeContractData("POLYGON_TESTNET_AMOY", {
  //     contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  //     abi: {
  //       inputs: [
  //         {
  //           internalType: "string",
  //           name: "_dataHash",
  //           type: "string",
  //         },
  //       ],
  //       name: "createUser",
  //       outputs: [],
  //       stateMutability: "nonpayable",
  //       type: "function",
  //     },
  //     args: {_dataHash}, // Pass dataHash as an array element since it's a single parameter
  //   });

//   console.log("transaction response", resp);
//   return resp;
};
