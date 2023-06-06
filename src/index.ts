import express, {Application} from "express";
import bodyParser from "body-parser";
import config from "./config";
import apiV1Router from "./routes/v1";

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.use('/', apiV1Router);

const initApp = async () => {
    app.listen(config.PORT, (): void => {
        console.log(`Connected at ${config.PORT}`);
    })
}

initApp().catch((error) => {
    const message = error instanceof Error ? error.message : "Unknown error."
    console.log(message);
})