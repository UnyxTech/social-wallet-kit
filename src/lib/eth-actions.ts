import { createWalletClient, custom } from "viem";
import abi from "human-standard-token-abi";

export const signMessage = async (
  web3: any,
  message: string,
  account: string
) => {
  const sig = await web3.eth.personal.sign(message, account, "");
  console.log("sig:", sig);
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
  const resp = await web3.eth.sendTransaction({
    from: "0xB86aA614EDc512f4e3147779f964d420b43E44b4",
    to: "0xB86aA614EDc512f4e3147779f964d420b43E44b4",
    value: web3.utils.toWei(value, "ether"),
  });
  console.log("resp:", resp);
};

const getRawTx = ({ nonce, gasPrice, gasLimit, to, chainId, amount }: any) => {
  return {
    nonce: "0x" + nonce.toString(16),
    gasPrice: "0x" + parseInt(gasPrice.toString()).toString(16),
    gasLimit: "0x" + parseInt(gasLimit.toString()).toString(16),
    to,
    chainId: parseInt(chainId),
    value: "0x" + amount.toString(16),
  };
};
export const sendErc20 = async (web3: any) => {
  const from = "0xB86aA614EDc512f4e3147779f964d420b43E44b4";
  const to = "0xB86aA614EDc512f4e3147779f964d420b43E44b4";
  const amount = "0.01";
  const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

  try {
    const contract = new web3.eth.Contract(abi, contractAddress);
    const value = web3.utils.toWei(amount, "ether");
    const resp = await contract.methods.transfer(to, value).send({
      from: from,
    });
    console.log("resp:", resp);
  } catch (e) {
    console.log(e);
  }
};

export const switchChain = async (provider: any) => {
  const client = createWalletClient({
    transport: custom(provider),
  });
  let chainId = await client.getChainId();
  console.log("chainId before:", chainId);
  client.switchChain({ id: 56 });
  chainId = await client.getChainId();
  console.log("chainId after:", chainId);
};

export const getAddresses = async (provider: any) => {
  const client = createWalletClient({
    transport: custom(provider),
  });
  const [address] = await client.requestAddresses();
  // const [address] = await client.getAddresses()
  console.log("address:", address);
};
