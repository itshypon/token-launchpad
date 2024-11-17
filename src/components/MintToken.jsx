import {
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";

// eslint-disable-next-line react/prop-types
export function MintToken({ mintAddress, onDone }) {
  const wallet = useWallet();
  const { connection } = useConnection();

  async function mint() {
    const associatedToken = getAssociatedTokenAddressSync(
      mintAddress,
      wallet.publicKey,
      false,
      TOKEN_PROGRAM_ID
    );

    console.log(associatedToken);

    const transaction = new Transaction().add(
      createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        associatedToken,
        wallet.publicKey,
        mintAddress,
        TOKEN_PROGRAM_ID
      )
    );

    await wallet.sendTransaction(transaction, connection);

    const mintTransaction = new Transaction().add(
      createMintToInstruction(
        mintAddress,
        associatedToken,
        wallet.publicKey,
        1000000000,
        [],
        TOKEN_PROGRAM_ID
      )
    );

    await wallet.sendTransaction(mintTransaction, connection);
    // eslint-disable-next-line react/prop-types
    console.log(`Minting done for ${mintAddress.toBase58()}`);
    onDone();
  }

  return (
    <>
      {/* <input type="text"></input> */}
      <button onClick={mint} placeholder="Mint 1000 tokens">Mint tokens</button>
    </>
  );
}
