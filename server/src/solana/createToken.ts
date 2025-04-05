import { clusterApiUrl, Connection,Keypair,PublicKey } from "@solana/web3.js"
import { getOrCreateAssociatedTokenAccount,mintTo,createMint} from "@solana/spl-token";
import "dotenv/config"
import bs58 from "bs58"


const adminSecret= bs58.decode(process.env.SECRET_KEY ?? "");
const adminWallet= Keypair.fromSecretKey(adminSecret);


export const createToken=async(userPublicKey:string,)=>{
 
        const connection= new Connection(clusterApiUrl("devnet"),"confirmed");
        const mintAuthority= new PublicKey(userPublicKey);
        const mint= await createMint(
            connection,
            adminWallet,
            mintAuthority,
            null,
            9
        );
        const mintAddress= mint.toBase58();
        return(mintAddress);
    }
  



