import express from "express";
import cors from "cors";
import { createToken } from "./solana/createToken"; 
import { PrismaClient } from "@prisma/client";
const PORT = process.env.PORT||3000;

const client= new PrismaClient();

const app= express();
app.use(cors());
app.use(express.json());


app.get("/", (req: express.Request, res: express.Response) => {
    interface ResponseBody {
        msg: string;
    }

    const responseBody: ResponseBody = {
        msg: "App running successfully"
    };

    res.json(responseBody);
});

app.post("/signup",async(req,res)=>{
    const {publicKey}=req.body;
    try{
  const response= await  client.user.create({
        data:{
            publicKey
        },
        select:{
            id:true,
            publicKey:true
        }
    })
    res.status(200).json({
        response,
        msg:"User created Successfully"
    });
    return;
}

catch(err){
    res.status(500).json({
        msg:"Internal server error"
    });
    return;
}
    
    
})

app.post("/create-token", async (req: express.Request, res: express.Response):Promise<void> => {
    try {
        const { publicKey,tokenName } = req.body;
        const mint = await createToken(publicKey);

        if (!mint) {
         res.status(500).json({
                msg: "Internal server error"
            });
            return;
        }


        const user = await client.user.findFirst({
            where: {
                publicKey: publicKey
            },
            select: {
                id: true
            }
        });

        if (!user) {
            res.status(404).json({
                msg: "User not found"
            });
            return;
        }

        await client.mintAccount.create({
            data: {
                mint_address: mint,
                user_id: user.id,
                token_name:tokenName
            }
        });
         res.status(200).json({
            msg: "Token created successfully",
            mint
        });
        return;
    } catch (error) {
    
        res.status(500).json({
            msg: "Internal server error ",
            
        });
        return;
    }
});


app.listen(PORT,()=>{
    console.log("App listening on port "+PORT)
});