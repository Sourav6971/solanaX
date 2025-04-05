import {create} from 'zustand'

export interface Account{
    balance:string,
    publicKey:string
}
export interface StateType{
    account:Account,
    setAccount:(state:Account)=>void;
}


export const useAccount= create((set)=>({
    account:{publicKey:"",balance:""},
    setAccount: (account:Account)=>{set({account})}
}))

