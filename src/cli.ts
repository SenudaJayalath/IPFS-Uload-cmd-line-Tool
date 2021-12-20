#!/usr/bin/env node
import Web3 from 'web3'
import dotenv from "dotenv";
import ABI from "./abis/Store.json"
import { readFileSync,existsSync } from 'fs';
const IPFS =require('ipfs-api')
dotenv.config()
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const ipfs =new IPFS({host:'ipfs.infura.io',port:5001,protocol:'https'})

const STORE_ADDRESS=process.env.STORE_ADDRESS              //Get Smart Contract address

function main(argv:any){
    async function sendIPFS(id:number,fileName:string){
        let accounts = await web3.eth.getAccounts()   // Get account address from Ganache
        if (isNaN(id)){
            console.log("invalid account number")
            return
        }
        let account=accounts[id] //t selected account address
        if(!existsSync(fileName)) {
            console.log("File not found");
            return
          }
        const file = readFileSync(fileName, 'utf-8'); //Read file   
        let buffer= Buffer.from(file)
        await ipfs.add(buffer,async(err:any,ipfsHash:string)=>{ //Send file to IPFS
            if (!err){
                const contract = new web3.eth.Contract(ABI.abi,STORE_ADDRESS);
                const receipt = await contract.methods.storeCID(ipfsHash[0].hash).send({from:account, gas: 6721975, gasPrice: '30000000'}) //store cid in smart contracts
                console.log(receipt.events.itemSaved.returnValues.id)
            }else{
                console.log(err)
            }
        })
    }
    if (argv[0] == "--account" && argv[2] == "--filePath" ){
        sendIPFS(+argv[1],argv[3])
    }else {
        console.log("Invalid Input: Enter Account Number")
    }
}
main(process.argv.slice(2))