import { useState } from "react";
import "./App.css";
import { TokenLaunchpad } from "./components/TokenLaunchpad";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { MintToken } from "./components/MintToken";


function App() {
  const [token, setToken] = useState(null);
  const [mintDone, setMintDone] = useState(false);

  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={[]}>
        <WalletModalProvider>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 20,
            }}
          >
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
          <TokenLaunchpad onTokenCreate={(tokenMint) => {
            setToken(tokenMint);
          }} />
          {token && token.toBase58()}
          {token && <MintToken mintAddress={token} onDone={() => {
            setMintDone(true)
          }}/>}
          {mintDone && "Hello"}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
