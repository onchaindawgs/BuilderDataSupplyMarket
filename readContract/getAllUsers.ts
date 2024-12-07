"use client";

export const GetAllUsers = async (readContractData: any) => {
  console.log("function run");
  const users = await readContractData("POLYGON_TESTNET_AMOY", {
    contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: {
      inputs: [],
      name: "getAllUsers",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "addr",
              type: "address",
            },
            {
              internalType: "string",
              name: "dataHash",
              type: "string",
            },
          ],
          internalType: "struct BuilderDataSupplyMarket.User[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    args: { },
  });
  console.log("users", users);
  return users;
};
