import * as Http from "http";
import * as Mongo from "mongodb";
import { memoryUsage } from "process";
import * as Url from "url";



// let mongoClient: Mongo.MongoClient;
let collection: Mongo.Collection;

let port: number | string | undefined = process.env.PORT;
if (port == undefined)
    port = 5002;

let databaseUrl: string = "mongodb+srv://SimonHaenle:eia2@SoundNBound.t2khf.mongodb.net/test";

startServer(port);
connectToDatabase(databaseUrl);

async function startServer(_port: number | string): Promise<void> {
    let server: Http.Server = Http.createServer();
    console.log("Server starting on port:" + _port);

    server.listen(_port);
    server.addListener("request", handleRequest);
}

async function connectToDatabase(_url: string): Promise<void> {
    let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();

    collection = mongoClient.db("SoundNBound").collection("Data");
    console.log("Database connection ", collection != undefined);
}

async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");

    if (_request.url) {
        // /save --> store Picture wird ausgeführt da es sich um den save query handelt
        
        if (_request.url.startsWith("/save")) {

            // save url query params
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            // storePicture(url.query);
            _response.write(JSON.stringify(url.query.info));
            console.log("reseved request");
            let myInfo: any = JSON.stringify(url.query.info);

            interface songs {
                vid1: string;
                vid2: string;
                vid3: string;
                vid4: string;
                vid5: string;
            }
        
            interface infos {
                name: string;
                spiritanimals: string;
                favband: string;
                songs: songs;
        
            }
            let myJSON: any = JSON.parse(myInfo);
            let myOb: any = JSON.parse(myJSON);
            let userName: string = myOb.name;
            console.log(myOb);

            collection.update({ name: userName }, myOb, { upsert: true });

            // /load --> store Picture wird ausgeführt da es sich um den load query handelt
        } else if (_request.url.startsWith("/load")) {

            // load picture from url name
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let picture: any = await loadPicture(url.query.name);

            _response.write(JSON.stringify(picture));

        }

    }

    _response.end();
}
//canvasdata= url query
function storePicture(canvasData: any): void {
    //erstellt neuen eintrag bzw überschreibt den alten mit gleichem namen
    collection.update({ name: canvasData.name }, canvasData, { upsert: true });
    //collection (mogodb) wird aktualisiert
}

async function loadPicture(name: any): Promise<any> {
    return await collection.findOne({
        name: name

    });
}

