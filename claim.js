import Web3 from 'web3';
import { abi } from './abi.js';
import { mnemonic } from './private.js'
import consoleStamp from 'console-stamp';
import * as dotenv from 'dotenv';
dotenv.config();
consoleStamp(console, { format: ':date(HH:MM:ss)' });

const w3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC));
const distributor = new w3.eth.Contract(abi, '0x67a24CE4321aB3aF51c2D0a4801c3E111D88C9d9');

const arr = [];

while (true) {
    for (let i = 0; i < mnemonic.length; i++) {
        if (!arr.includes(i)) {
            try {
                const wallet  = w3.eth.accounts.privateKeyToAccount(mnemonic[i]).address;
                const data = await distributor.methods.claim();
            
                const tx = {
                    'from': wallet,
                    'gas': await data.estimateGas({ from: wallet }) * 2,
                    'maxFeePerGas': w3.utils.toWei(process.env.GAS_PRICE, 'Gwei'),
                    'maxPriorityFeePerGas': w3.utils.toWei(process.env.PRIORITY_GAS_PRICE, 'Gwei'),
                    'chainId': await w3.eth.getChainId(),
                    'to': '0x67a24CE4321aB3aF51c2D0a4801c3E111D88C9d9',
                    'nonce': await w3.eth.getTransactionCount(wallet),
                    'value': null,
                    'data': data.encodeABI()
                };
            
                const signedTx = await w3.eth.accounts.signTransaction(tx, mnemonic[i]);
                await w3.eth.sendSignedTransaction(signedTx.rawTransaction, async(error, hash) => {
                    if (!error) {
                        console.log(`Wallet: ${wallet}: https://arbiscan.io/tx/${hash}`);
                        arr.push(i);
                    } else {
                        console.log(`Error Tx: ${error}`);
                    }
                });
            } catch (err) {
                console.log('!!! ' + err);
            }
        } else {
            console.log(`Wallet ${i+1} Already Claim`);
        }
    }
}