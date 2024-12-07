"use client";

export const GetUsersCount = async (readContractData: any) => {
  console.log("function run");
  const count = await readContractData("POLYGON_TESTNET_AMOY", {
    contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: {
      inputs: [],
      name: "getUsersCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    args: { }, // Empty array since there are no inputs
  });
  console.log("users count", count);
  return count;
};