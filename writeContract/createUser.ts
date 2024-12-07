"use client";

export const CreateUser = async (_dataHash: string, writeContractData: any) => {
  console.log("data hash", _dataHash);
  console.log("function run");
  
  const resp = await writeContractData("POLYGON_TESTNET_AMOY", {
    contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: {
      inputs: [
        {
          internalType: "string",
          name: "_dataHash",
          type: "string",
        },
      ],
      name: "createUser",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    args: {_dataHash}, // Pass dataHash as an array element since it's a single parameter
  });

  console.log("transaction response", resp);
  return resp;
}; 
