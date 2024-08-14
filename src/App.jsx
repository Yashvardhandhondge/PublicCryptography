import React, { useState } from 'react';
import { ethers } from 'ethers';
import { HDNode } from '@ethersproject/hdnode';

const WalletGenerator = () => {
    const [mnemonic, setMnemonic] = useState('');
    const [wallets, setWallets] = useState([]);

    const generateMnemonic = () => {
        try {
            const wallet = ethers.Wallet.createRandom();
            setMnemonic(wallet.mnemonic.phrase);
        } catch (error) {
            console.error('Error generating mnemonic:', error);
        }
    };

    const addWallet = () => {
        if (!mnemonic) {
            alert('Please generate a mnemonic first');
            return;
        }

        try {
            const hdNode = HDNode.fromMnemonic(mnemonic);
            const path = `m/44'/60'/0'/0/${wallets.length}`;
            const derivedNode = hdNode.derivePath(path);
            const wallet = new ethers.Wallet(derivedNode.privateKey);
            setWallets([...wallets, wallet]);
        } catch (error) {
            console.error('Error adding wallet:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Ethereum Wallet Generator</h1>
                <button
                    onClick={generateMnemonic}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4 transition-all"
                >
                    Generate Mnemonic
                </button>

                {mnemonic && (
                    <div className="mb-4">
                        <p className="bg-gray-700 p-3 rounded-md text-center break-all">{mnemonic}</p>
                    </div>
                )}

                <button
                    onClick={addWallet}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mb-6 transition-all"
                >
                    Add Wallet
                </button>

                <div id="walletList">
                    {wallets.map((wallet, index) => (
                        <div
                            key={index}
                            className="bg-gray-700 p-3 mb-3 rounded-md text-center shadow-sm transition-all transform hover:scale-105"
                        >
                            <p>Wallet {index + 1}: <span className="font-mono break-all">{wallet.address}</span></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WalletGenerator;
