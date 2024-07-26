import { createPublicClient, createWalletClient, custom, http } from "viem";
import {abi} from "../constant/abi";
import { mainnet } from "viem/chains";

export const signMessage = async (
  web3: any,
  message: string,
  account: string
) => {
  const sig = await web3.eth.personal.sign(message, account, "");
  console.log("sig:", sig);
  const address = await web3.eth.personal.ecRecover(message, sig);
  console.log('recover address', address)
};

export const signTypeData = async (web3: any, account: string) => {
  const params = {
    typedData: {
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        Person: [
          { name: "name", type: "string" },
          { name: "wallets", type: "address[]" },
        ],
        Mail: [
          { name: "from", type: "Person" },
          { name: "to", type: "Person[]" },
          { name: "contents", type: "string" },
        ],
        Group: [
          { name: "name", type: "string" },
          { name: "members", type: "Person[]" },
        ],
      },
      domain: {
        name: "Ether Mail",
        version: "1",
        chainId: Number("0x1"),
        verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
      },
      primaryType: "Mail",
      message: {
        from: {
          name: "Cow",
          wallets: [
            "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
            "0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF",
          ],
        },
        to: [
          {
            name: "Bob",
            wallets: [
              "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
              "0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57",
              "0xB0B0b0b0b0b0B000000000000000000000000000",
            ],
          },
        ],
        contents: "Hello, Bob!",
      },
    },
  };
  const sig = await web3.eth.signTypedData(account, params);
  console.log("sig:", sig);
};

export const sendTx = async (
  web3: any,
  account: string,
  to: string,
  value: string
) => {
  const chainId = await web3.eth.getChainId();
  console.log('chainId: ', Number(chainId))
  const resp = await web3.eth.sendTransaction({
    from: '0xB86aA614EDc512f4e3147779f964d420b43E44b4',
    to: "0xB86aA614EDc512f4e3147779f964d420b43E44b4",
    value: web3.utils.toWei(value, "ether"),
  });
  console.log("resp:", resp);
};

export const sendErc20 = async (web3: any) => {
  const from = "0xB86aA614EDc512f4e3147779f964d420b43E44b4";
  const to = "0xB86aA614EDc512f4e3147779f964d420b43E44b4";
  const amount = "0.01";
  const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

  try {
    const contract = new web3.eth.Contract(abi, contractAddress);
    const value = web3.utils.toWei(amount, 6);
    const resp = await contract.methods.transfer(to, value).send({
      from: from,
    });
    console.log("resp:", resp);

    // const publicClient = createPublicClient({
    //   chain: mainnet,
    //   transport: http('https://mainnet.infura.io/v3/e42637ee1f664cad93e70bbf62196769'),
    // });
    // const gas: any = await publicClient.estimateGas({
    //   data : "0xa9059cbb000000000000000000000000b86aa614edc512f4e3147779f964d420b43e44b40000000000000000000000000000000000000000000000000000000000002710",
    //   account : "0xB86aA614EDc512f4e3147779f964d420b43E44b4",
    //   // maxFeePerGas : BigInt("0x154e2340b2"),
    //   // maxPriorityFeePerGas : BigInt("0x9502f900"),
    //   to : "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    //   value: BigInt(0)
    // });
    // console.log('gas:', gas)
  } catch (e) {
    console.log(e);
  }
};

export const switchChain = async (provider: any) => {
  provider.on('networkChanged', (chainId: any) => {
    console.log('event chainId:', chainId)
  })
  const client = createWalletClient({
    transport: custom(provider),
  });
  let chainId = await client.getChainId();
  console.log("chainId before:", chainId);
  client.switchChain({ id: 56 });
  chainId = await client.getChainId();
  console.log("chainId after:", chainId);
};

export const getAddresses = async (provider: any, sdk: any) => {
  const client = createWalletClient({
    transport: custom(provider),
  });
  const [address] = await client.requestAddresses();
  // const [address] = await client.getAddresses()
  console.log("address:", address);

  const dt = sdk.getDefaultTokens()
  console.log('dt:', dt)
};
