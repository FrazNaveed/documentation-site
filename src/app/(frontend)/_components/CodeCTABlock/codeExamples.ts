export default [
  {
    language: 'On-Chain',
    languageId: 'solidity',
    code:
`import "@flarenetwork/flare-periphery-contracts/flare/ContractRegistry.sol";
import "@flarenetwork/flare-periphery-contracts/flare/FtsoV2Interface.sol";

contract FtsoV2Consumer {
    FtsoV2Interface internal ftsoV2;

    constructor() {
        ftsoV2 = ContractRegistry.getFtsoV2();
    }

    function getFlrUsdPrice() external returns
        (uint256 value, int8 decimals, uint64 timestamp) {
        return ftsoV2.getFeedById(0x01464c522f55534400000000000000000000000000);
    }
}`,
  },
  {
    language: 'Javascript',
    languageId: 'js',
    code:
`import { Web3 } from "web3";

export async function main() {
  const w3 = new Web3(RPC_URL);
  const ftsov2 = new w3.eth.Contract(JSON.parse(ABI), FTSOV2_ADDRESS);

  const res = await ftsov2.methods
    .getFeedById("0x01464c522f55534400000000000000000000000000")
    .call();

  console.log(
    "Value: %s, Decimals: %s, Timestamp: %s", res["0"], res["1"], res["2"],
  );
}`,
  },
  {
    language: 'Python',
    languageId: 'py',
    code:
`import asyncio
from web3 import AsyncHTTPProvider, AsyncWeb3


async def main() -> None:
    w3 = AsyncWeb3(AsyncHTTPProvider(RPC_URL))
    ftsov2 = w3.eth.contract(address=FTSOV2_ADDRESS, abi=ABI)

    res = await ftsov2.functions.getFeedById(
        "0x01464c522f55534400000000000000000000000000"
    ).call()

    print(f"Value: {res[0]}, Decimals: {res[1]}, Timestamp {res[2]}")`,
  },
  {
    language: 'Rust',
    languageId: 'rs',
    code:
`use alloy::{providers::ProviderBuilder, sol};
use eyre::Result;

sol!(
    FtsoV2,
    "abi/FtsoV2.json"
);

#[tokio::main]
async fn main() -> Result<()> {
    let provider = ProviderBuilder::new().on_http(RPC_URL);
    let ftsov2 = FtsoV2::new(FTSOV2_ADDRESS, provider);

    let FtsoV2::getFeedByIdReturn { _0, _1, _2 } = ftsov2
        .getFeedById("0x01464c522f55534400000000000000000000000000")
        .call()
        .await?;

    println!("Value:{}, Decimals:{}, Timestamp{}", _0, _1, _2);
    Ok(())
}`,
  },
  {
    language: 'Go',
    languageId: 'go',
    code:
`package main

import (
  "context"
  "fmt"
  "github.com/ethereum/go-ethereum/accounts/abi/bind"
  "github.com/ethereum/go-ethereum/ethclient"
)

func FtsoV2Consumer() {
  client, _ := ethclient.Dial(RPC_URL)
  ftsov2, _ := NewFtsoV2(FTSOV2_ADDRESS, client)
  var res []interface{}
  opts := &bind.CallOpts{Context: context.Background()}

  ftsov2.FtsoV2Caller.contract.Call(
    opts, &res, "getFeedById", "0x01464c522f55534400000000000000000000000000"
  )

  fmt.Println("Value: %i, Decimals: %i, Timestamp: %i", res[0], res[1], res[2])
}`,
  },
]
