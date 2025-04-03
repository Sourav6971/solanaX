import { clusterApiUrl, Connection,Keypair,PublicKey } from "@solana/web3.js"


export const createToken=async()=>{
    try{
        const connection= new Connection(clusterApiUrl("devnet"),"confirmed");

    }
    catch(err){
        console.error(err);
    }

}