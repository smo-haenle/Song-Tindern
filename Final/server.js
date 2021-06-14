"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Mongo = require("mongodb");
const Url = require("url");
// let mongoClient: Mongo.MongoClient;
let collection;
let port = process.env.PORT;
if (port == undefined)
    port = 5002;
let databaseUrl = "mongodb+srv://SimonHaenle:eia2@SoundNBound.t2khf.mongodb.net/test";
startServer(port);
connectToDatabase(databaseUrl);
async function startServer(_port) {
    let server = Http.createServer();
    console.log("Server starting on port:" + _port);
    server.listen(_port);
    server.addListener("request", handleRequest);
}
async function connectToDatabase(_url) {
    let options = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();
    collection = mongoClient.db("SoundNBound").collection("Data");
    console.log("Database connection ", collection != undefined);
}
async function handleRequest(_request, _response) {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    if (_request.url) {
        // /save --> store Picture wird ausgeführt da es sich um den save query handelt
        if (_request.url.startsWith("/save")) {
            // save url query params
            let url = Url.parse(_request.url, true);
            // storePicture(url.query);
            _response.write(JSON.stringify(url.query.info));
            console.log("reseved request");
            let myInfo = JSON.stringify(url.query.info);
            let myJSON = JSON.parse(myInfo);
            let myOb = JSON.parse(myJSON);
            let userName = myOb.name;
            console.log(myOb);
            collection.update({ name: userName }, myOb, { upsert: true });
            // /load --> store Picture wird ausgeführt da es sich um den load query handelt
        }
        else if (_request.url.startsWith("/load")) {
            // load picture from url name
            let url = Url.parse(_request.url, true);
            let picture = await loadPicture(url.query.name);
            _response.write(JSON.stringify(picture));
        }
    }
    _response.end();
}
//canvasdata= url query
function storePicture(canvasData) {
    //erstellt neuen eintrag bzw überschreibt den alten mit gleichem namen
    collection.update({ name: canvasData.name }, canvasData, { upsert: true });
    //collection (mogodb) wird aktualisiert
}
async function loadPicture(name) {
    return await collection.findOne({
        name: name
    });
}
//# sourceMappingURL=server.js.map