import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { providers } from "ethers";

async function main() {
  //uniswap router address
  const ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  //dai token address
  const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  //uni token address
  const UNI = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  //dai holder
  const DAIHolder = "0x748dE14197922c4Ae258c7939C7739f3ff1db573";

  const paths = [DAI, "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0", UNI];
  const path2 = ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", DAI];

  const path3 = ["0x748dE14197922c4Ae258c7939C7739f3ff1db573", DAI];
  let time = 1676588399;

  const amountToSwap = await ethers.utils.parseEther("100");
  console.log(amountToSwap);

  const amountToReceive = await ethers.utils.parseEther("100");
  console.log(amountToSwap);

  const Uniswap = await ethers.getContractAt("Iuniswap", ROUTER);

  const helpers = require("@nomicfoundation/hardhat-network-helpers");
  await helpers.impersonateAccount(DAIHolder);
  const impersonatedSigner = await ethers.getSigner(DAIHolder);

  const DaiContract = await ethers.getContractAt("IToken", DAI);

  const UniContract = await ethers.getContractAt("IToken", UNI);

  const holderBalance = await DaiContract.balanceOf(DAIHolder);
  console.log(`Dai balance before ${holderBalance}`);

  await DaiContract.connect(impersonatedSigner).approve(ROUTER, amountToSwap);

  const uniBalance = await UniContract.balanceOf(DAIHolder);
  console.log(`uniBalance ${uniBalance}`);

//   await Uniswap.connect(impersonatedSigner).swapExactTokensForTokens(
//     amountToSwap,
//     0,
//     paths,
//     DAIHolder,
//     time
//   );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});