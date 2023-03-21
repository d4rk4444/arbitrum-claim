import Web3 from 'web3';
import { abi } from './abi.js';
import { mnemonic } from './private.js'
import { exchange } from './exchange.js'
import consoleStamp from 'console-stamp';
import * as dotenv from 'dotenv';
dotenv.config();
consoleStamp(console, { format: ':date(HH:MM:ss)' });

const w3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC));
const token = new w3.eth.Contract(abi, '0x912CE59144191C1204E64559FE8253a0e49E6548');

while (true) {
    for (let i = 0; i < mnemonic.length; i++) {
        const wallet  = w3.eth.accounts.privateKeyToAccount(mnemonic[i]).address;
        const balance = await token.methods.balanceOf(wallet).call();

        if (balance > 0) {
            const data = await token.methods.transfer(
                exchange[i],
                balance
            );
        
            const tx = {
                'from': wallet,
                'gas': process.env.GAS_LIMIT,
                'maxFeePerGas': w3.utils.toWei(process.env.GAS_PRICE, 'Gwei'),
                'maxPriorityFeePerGas': w3.utils.toWei(process.env.PRIORITY_GAS_PRICE, 'Gwei'),
                'chainId': await w3.eth.getChainId(),
                'to': '0x912CE59144191C1204E64559FE8253a0e49E6548',
                'nonce': await w3.eth.getTransactionCount(wallet),
                'value': null,
                'data': data.encodeABI()
            };
        
            try {
                const signedTx = await w3.eth.accounts.signTransaction(tx, mnemonic[i]);
                await w3.eth.sendSignedTransaction(signedTx.rawTransaction, async(error, hash) => {
                    if (!error) {
                        console.log(`Wallet ${wallet}: https://arbiscan.io/tx/${hash}`);
                    } else {
                        console.log(`Error Tx: ${error}`);
                    }
                });
            } catch (err) {
                throw new Error(err);
            }
        } else {
            console.log(`Wallet ${i+1} balance = 0 ARB`);
        }
    }
}