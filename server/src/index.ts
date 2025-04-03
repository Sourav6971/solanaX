import express from "express";

const app= express();



app.get("/", (req: express.Request, res: express.Response): void => {
    interface ResponseBody {
        msg: string;
    }

    const responseBody: ResponseBody = {
        msg: "App running successfully"
    };

    res.json(responseBody);
});

app.listen(3000);