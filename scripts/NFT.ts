import { ethers } from "hardhat";

async function main() {
    const nftContract = await ethers.getContractFactory("NFT");

    const [owner, addr1, addr2] = await ethers.getSigners();
    console.log(owner.address);

    const deployedNFTContract = await nftContract.deploy();

    const IPFS = "QmWcoS3oz61dCqCCHFM2Xve37fQ713HMbipgR4dJtkaBns";

    await deployedNFTContract.deployed();

    console.log("NFT Contract Address:", deployedNFTContract.address);

    const create = await deployedNFTContract.safeMint(owner.address, IPFS);
    console.log(create);
}




main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});