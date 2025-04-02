import "./Token.css";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

export async function createToken(wallet: PublicKey): Promise<PublicKey> {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Generate a new keypair for the mint authority
    const mintAuthority = Keypair.generate();
    console.log("Mint Authority:", mintAuthority.publicKey.toBase58());

    // Create a new token
    const mint = await createMint(
      connection,
      mintAuthority,
      mintAuthority.publicKey, // Mint authority
      null, // Freeze authority (optional)
      9 // Decimals (e.g., 9 for 1 token = 1,000,000,000 units)
    );

    console.log("Token Created: ", mint.toBase58());
    return mint;
  } catch (error) {
    console.error("Token creation failed:", error);
    throw error;
  }
}
