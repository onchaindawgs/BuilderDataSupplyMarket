"use client";

export const GetSelectedUsers = async (_usersAddresses: string[], readContractData: any) => {
  console.log("users addresses", _usersAddresses);
  console.log("function run");
  
  const users = await readContractData("POLYGON_TESTNET_AMOY", {
    contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: {
      inputs: [
        {
          internalType: "address[]",
          name: "_usersAddresses",
          type: "address[]",
        },
      ],
      name: "getSelectedUsers",
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
    args: {_usersAddresses},
  });

  console.log("selected users", users);
  return users;
}; 