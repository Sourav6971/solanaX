import { clusterApiUrl, Connection,PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export const getOwnedTokens=async(userPublicKey:string)=>{
    const connection= new Connection(clusterApiUrl("devnet"),"confirmed");
    const ownerPublicKey= new PublicKey(userPublicKey);
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        ownerPublicKey,
        { programId: TOKEN_PROGRAM_ID }
    );


    const associatedAccounts = tokenAccounts.value.map(account => ({
        mint: account.account.data.parsed.info.mint,  
        tokenAccount: account.pubkey.toBase58(),  
        balance: account.account.data.parsed.info.tokenAmount.uiAmount 
    }));

    console.log("Associated Token Accounts:", associatedAccounts);
    return associatedAccounts;
}

getOwnedTokens("6JzdQ19rK9Z86L9zd2Vk6QStwjZEcnnTUUcHpzNAz8Sf");