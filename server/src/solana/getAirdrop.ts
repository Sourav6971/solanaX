import { Connection,PublicKey,LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js"


export const getAirdrop=async(userKey:string,amount:number)=>{


const connection= new Connection(clusterApiUrl("devnet"),"confirmed");
const publicKey= new PublicKey(userKey);
const airdropSignature= await connection.requestAirdrop(publicKey,amount*LAMPORTS_PER_SOL);
await connection.confirmTransaction(airdropSignature,"confirmed");
console.log("successfully airdrop");


}

