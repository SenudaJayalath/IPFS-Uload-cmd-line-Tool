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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// import yargs from 'yargs';
// import { hideBin } from 'yargs/helpers';
//import * as IPFS from 'ipfs-api'
var Store_json_1 = require("./abis/Store.json");
var IPFS = require('ipfs-api');
var web3_1 = require("web3");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var web3 = new web3_1["default"](new web3_1["default"].providers.HttpProvider('http://localhost:7545'));
var ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
var STORE_ADDRESS = process.env.STORE_ADDRESS;
function main(argv) {
    function sendIPFS() {
        return __awaiter(this, void 0, void 0, function () {
            var buffer;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buffer = Buffer.from([8, 6, 4, 7, 3]);
                        //const file = readFileSync('./build/filename.txt', 'utf-8');
                        //let buffer= Buffer.from(file)
                        return [4 /*yield*/, ipfs.add(buffer, function (err, ipfsHash) { return __awaiter(_this, void 0, void 0, function () {
                                var accounts, contract, receipt;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!!err) return [3 /*break*/, 3];
                                            console.log(ipfsHash);
                                            return [4 /*yield*/, web3.eth.getAccounts()];
                                        case 1:
                                            accounts = _a.sent();
                                            contract = new web3.eth.Contract(Store_json_1["default"].abi, STORE_ADDRESS);
                                            return [4 /*yield*/, contract.methods.storeCID("sasdad").send({ from: accounts[0] })];
                                        case 2:
                                            receipt = _a.sent();
                                            console.log(receipt.events.itemSaved.returnValues);
                                            return [3 /*break*/, 4];
                                        case 3:
                                            console.log(err);
                                            _a.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); })
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
                        ];
                    case 1:
                        //const file = readFileSync('./build/filename.txt', 'utf-8');
                        //let buffer= Buffer.from(file)
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    if (argv[0] == "--test") {
        sendIPFS();
    }
}
main(process.argv.slice(2));
