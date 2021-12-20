#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import yargs from 'yargs';
// import { hideBin } from 'yargs/helpers';
//import * as IPFS from 'ipfs-api'
const Store_json_1 = __importDefault(require("./abis/Store.json"));
const IPFS = require('ipfs-api');
const web3_1 = __importDefault(require("web3"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var web3 = new web3_1.default(new web3_1.default.providers.HttpProvider('http://localhost:7545'));
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
const STORE_ADDRESS = process.env.STORE_ADDRESS;
function main(argv) {
    function sendIPFS() {
        return __awaiter(this, void 0, void 0, function* () {
            const buffer = Buffer.from([8, 6, 4, 7, 3]);
            //const file = readFileSync('./build/filename.txt', 'utf-8');
            //let buffer= Buffer.from(file)
            yield ipfs.add(buffer, (err, ipfsHash) => __awaiter(this, void 0, void 0, function* () {
                if (!err) {
                    console.log(ipfsHash[0].hash);
                    let accounts = yield web3.eth.getAccounts();
                    const contract = new web3.eth.Contract(Store_json_1.default.abi, STORE_ADDRESS);
                    const receipt = yield contract.methods.storeCID("sasdad").send({ from: accounts[0] });
                    console.log(receipt.events.itemSaved.returnValues);
                }
                else {
                    console.log(err);
                }
            }));
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
        });
    }
    if (argv[0] == "--test") {
        sendIPFS();
    }
}
main(process.argv.slice(2));
