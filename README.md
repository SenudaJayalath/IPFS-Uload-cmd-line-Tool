# IPFS-Upload-cmd-line-Tool
This is a typescript based command line tool which will take a local file on your computer, upload it to IPFS and store the cid in Ethereum
# Table of contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [How to install and run this tool](#how-to)
4. [Desired Output](#output)
5. [ Possible Error Messages ](#errors)

## Introduction <a name="introduction"></a>

### What this tool does?

This is a command line tool which is used to upload your local files on the computer to IPFS. It then stores the received cid (content identifier) on the Ethereum blockchain (local blockchain-Ganache). A special feature of this application is that it can choose from which of the 10 sample wallet addresses provided from Ganache to be used to store the cid on the blockchain.

## Prerequisites <a name="prerequisites"></a>
These are some of the libraries, applications and languages that should be supported to run this tool. If you don't have these installed please install them,
- Ganache
  - Gananche is used to run a local blockchain in your computer. For more information and for installtion tips visit [here.](https://trufflesuite.com/ganache/)
- Node
  - For installation guide visit [here.](https://nodejs.org/en/)
- Truffle suite
  - This is the framework used to write smart contracts and also run them. For a full installation guide visit [here.](https://trufflesuite.com/) 
- Solidity (v0.8.0)
  - This application specifically uses solidity v 0.8.0. Therefore it is essential to have solidity compilers supporting this specific version.

## How to install and run this tool <a name="how-to"></a>

- Clone this repo to a local folder.
- In the terminal / command line enter `cd IPFS-Uload-cmd-line-Tool`
- Enter  `npm i`
    - This will install all the necessary packages that are on the package.json.
- Next you need to migrate the smart contracts to your local blockchain.
    - Start your local Ganache server. Then start a new workspace and link your truffle.config file with Ganache. For more info check [this.](https://trufflesuite.com/docs/ganache/truffle-projects/linking-a-truffle-project.html#:~:text=To%20link%20a%20project%2C%20enter,click%20the%20button%20ADD%20PROJECT%20.)
    - Move to the contracts folder by `cd contracts`
    - Compile the smart contracts with the command `truffle compile`
    - Now move the smart contract to the blockchain by entering `truffle migrate --reset`. Check your console log and you will see the address of the Store.sol smart contract.
    - Create a .env file at the root directory and paste the smart contract address as shown below (use the address that is seen on your console) <br />
       `STORE_ADDRESS = "0xa29a7885f4hB6a4F42D43ndsD4554F"`
- Navigate back to the root directory with `cd ..`
- Run the application with the below code snippet <br /> `node ./build/cli.js --account <number> --filePath <file-path>`
    - Here  `<number>` represents a valid integer from 0 to 9.
    - `<file-path>` represents a valid path to a file.

## Desired Output <a name="output"></a>
A string as shown below will appear on the console.
>The file with ID 26 has been saved

## Possible Error Messages <a name="errors"></a>
- >Invalid Input
    - The input is not valid. It should be of the form `node ./build/cli.js --account <number> --filePath <file-path>`
 - >Invalid Account Number
    - The `<number>` passed should be an integer in the range 0-9. With this parameter you can choose which account address will be used to store the cid in the blockchain.
 - >File Not Found
    - The `<file-path>` passed should point to a valid file on your computer. Eg: C:\Users\Desktop\abc.txt



















