import {create} from 'zustand'

interface Account{
    balance:string,
    publicKey:string
}


export const useAccount= create((set)=>({
    account:{publicKey:"",balance:""},
    setAccount: (account:Account)=>{set({account})}
}))

