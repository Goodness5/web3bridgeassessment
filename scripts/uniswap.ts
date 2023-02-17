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
  let time = 1976588399;

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
  await UniContract.connect(impersonatedSigner).approve(ROUTER, amountToSwap);

  const uniBalance = await UniContract.balanceOf(DAIHolder);
  console.log(`uniBalance ${uniBalance}`);

  const amountAdesired = await ethers.utils.parseEther("0.1");
  console.log(amountAdesired);

  const amountAMin = await ethers.utils.parseEther("0.01");
  console.log(amountAMin);


  const amountBdesired = await ethers.utils.parseEther("0.1");
  console.log(amountBdesired);

  const amountBMin = await ethers.utils.parseEther("0.01");
  console.log(amountBMin);

  await DaiContract.connect(impersonatedSigner).approve(ROUTER, amountAdesired);
  await UniContract.connect(impersonatedSigner).approve(ROUTER, amountBdesired);
 const addLiquidity = await Uniswap.connect(impersonatedSigner).addLiquidity(
    DAI,
    UNI,
    amountAdesired,
    amountBdesired,
    amountAMin,
    amountBMin,
    DAIHolder,
    time
  );
  const result = (await addLiquidity.wait()).logs.lastIndexOf;
  console.log(addLiquidity);
  console.log(result);




  
  const amounttokendesired = await ethers.utils.parseEther("10");
  console.log(amounttokendesired)
  const amounttokenmin = await ethers.utils.parseEther("0");
  console.log(amounttokendesired)
  const amountethmin = await ethers.utils.parseEther("0");
  console.log(amountethmin)
  await DaiContract.connect(impersonatedSigner).approve(ROUTER, amounttokendesired);
  await UniContract.connect(impersonatedSigner).approve(ROUTER, amounttokendesired);
  // await UniContract.connect(impersonatedSigner).approve(ROUTER, amounttokenmin);
  // await DaiContract.connect(impersonatedSigner).approve(ROUTER, amounttokenmin);

  const addLiquidityETH = await Uniswap.connect(impersonatedSigner).addLiquidityETH(
    UNI,
    amounttokendesired,
    0,
    0,
    DAIHolder,
    time
  );
  console.log(addLiquidityETH);
  // const liqamountAMin = BigNumber.from(100000000000000000);
  // console.log(liqamountAMin);
  // const liqamountBMin = await ethers.utils.parseEther("0.1");
  // console.log(liqamountBMin);

  // const liquidity = await ethers.utils.parseEther("1");
  // await UniContract.connect(impersonatedSigner).approve(ROUTER, liquidity);
  

  // const removeLiquidity = await Uniswap.connect(impersonatedSigner).removeLiquidity(
  //   DAI,
  //   UNI,
  //   liquidity,
  //   liqamountAMin,
  //   liqamountBMin,
  //   DAI,
  //   time
  // );
  // console.log(removeLiquidity);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});