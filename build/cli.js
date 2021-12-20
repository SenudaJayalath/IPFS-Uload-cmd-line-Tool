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
const fs_1 = require("fs");
function main(argv) {
    function sendIPFS(id, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            let accounts = yield web3.eth.getAccounts();
            if (isNaN(id)) {
                console.log("err");
                return;
            }
            let account = accounts[id];
            if (!(0, fs_1.existsSync)(fileName)) {
                console.log("File not found");
                return;
            }
            const file = (0, fs_1.readFileSync)(fileName, 'utf-8');
            let buffer = Buffer.from(file);
            yield ipfs.add(buffer, (err, ipfsHash) => __awaiter(this, void 0, void 0, function* () {
                if (!err) {
                    const contract = new web3.eth.Contract(Store_json_1.default.abi, STORE_ADDRESS);
                    const receipt = yield contract.methods.storeCID(ipfsHash[0].hash).send({ from: account, gas: 6721975, gasPrice: '30000000' });
                    console.log(receipt.events.itemSaved.returnValues.id);
                }
                else {
                    console.log(err);
                }
            }));
        });
    }
    if (argv[0] == "--account" && argv[2] == "--filePath") {
        sendIPFS(+argv[1], argv[3]);
    }
    else {
        console.log("Invalid Input: Enter Account Number");
    }
}
main(process.argv.slice(2));
