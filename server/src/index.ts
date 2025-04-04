import express from "express";
import cors from "cors";

const app= express();
app.use(cors());
app.use(express.json());
import { createToken } from "./solana/createToken"; 



app.get("/", ( res:express.Response)=> {
    interface ResponseBody {
        msg: string;
    }

    const responseBody: ResponseBody = {
        msg: "App running successfully"
    };

    res.json(responseBody);
});
app.post("/create-token", async (req: express.Request, res: express.Response):Promise<void> => {
    try {
        const { publicKey } = req.body;
        const mint = await createToken(publicKey);

        if (!mint) {
         res.status(500).json({
                msg: "Internal server error"
            });
            return;
        }

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

app.listen(3000,()=>{
    console.log("App listening on port 3000")
});