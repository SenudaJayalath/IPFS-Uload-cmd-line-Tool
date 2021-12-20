#!/usr/bin/env node

// import yargs from 'yargs';
// import { hideBin } from 'yargs/helpers';
//import * as IPFS from 'ipfs-api'
import ABI from "./abis/Store.json"
const IPFS =require('ipfs-api')
import Web3 from 'web3'
import dotenv from "dotenv";
dotenv.config()
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

const ipfs =new IPFS({host:'ipfs.infura.io',port:5001,protocol:'https'})
const STORE_ADDRESS=process.env.STORE_ADDRESS
import { readFileSync } from 'fs';

function main(argv:any){
    async function sendIPFS(){
        const buffer =Buffer.from([8,6,4,7,3]);
        //const file = readFileSync('./build/filename.txt', 'utf-8');
        //let buffer= Buffer.from(file)
        await ipfs.add(buffer,async(err:any,ipfsHash:string)=>{
            if (!err){
                let accounts = await web3.eth.getAccounts()
                const contract = new web3.eth.Contract(ABI.abi,STORE_ADDRESS);
                const receipt = await contract.methods.storeCID(ipfsHash[0].hash).send({from:accounts[0]})
                console.log(receipt.events.itemSaved.returnValues)
            }else{
                console.log(err)
            }
        })
        //const contractJson = JSON.stringify(ABI.abi);
        //web3.eth.getAccounts().then(console.log)
    //     const contract = new web3.eth.Contract(ABI.abi,STORE_ADDRESS);
    //     const id = await contract.methods.newItemId().call()
    //     console.log(id)
    // //     const contract = new web3.eth.Contract(ABI.abi,STORE_ADDRESS);
    // const receipt = await contract.methods.storeCID("sasdad").send({from:'0x924Af19A16Ca4dEeb2329F90fdbe8871cDD31508'})
    // //     // console.log(await receipt.call({from:'0x924Af19A16Ca4dEeb2329F90fdbe8871cDD31508'}))
    //     console.log(receipt.events.itemSaved.returnValues)
    //     // web3.eth.getAccounts().then(console.log)
    }
    if (argv[0] == "--test"){
        sendIPFS()
     }
}
main(process.argv.slice(2))