"use client";

export const GetUserProfile = async (_addr: string, readContractData: any) => {
  console.log("wallet address", _addr);
  console.log("function run");

  const resp = await readContractData(process.env.NEXT_PUBLIC_NETWORK!, {
    contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: {
      inputs: [
        {
          internalType: "address",
          name: "_addr",
          type: "address",
        },
      ],
      name: "getUser",
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
          internalType: "struct BuilderDataSupplyMarket.User",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    args: { _addr: _addr },
  });

  console.log("user details", resp);
};