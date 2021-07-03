"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Mongo = require("mongodb");
const Url = require("url");
// let mongoClient: Mongo.MongoClient;
let collection;
let port = process.env.PORT;
if (port == undefined)
    port = 5005;
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
            let url = Url.parse(_request.url, true);
            _response.write(JSON.stringify(url.query.info));
            console.log("reseved request");
            let myInfo = JSON.stringify(url.query.info);
            let myJSON = JSON.parse(myInfo);
            let myOb = JSON.parse(myJSON);
            let userName = myOb.name;
            console.log(myOb);
            collection.update({ name: userName }, myOb, { upsert: true });
        }
        else if (_request.url.startsWith("/search")) {
            let cursor = collection.find();
            let myData = [];
            await cursor.forEach(function (doc) {
                console.log(doc);
                myData.push(doc);
            });
            let matches = [];
            console.log("myData", myData);
            let myRef = myData[myData.length - 1];
            for (let i = 0; i < myData.length - 1; i++) {
                let counter = 0;
                for (let key in myData[i].songs) {
                    if (myData[i].songs[key] == myRef.songs[key]) {
                        counter++;
                    }
                }
                if (counter > 3) {
                    matches.push(myData[i].name);
                }
            }
            console.log("matches", matches);
            _response.write(JSON.stringify(matches));
        }
    }
    _response.end();
}
//# sourceMappingURL=server.js.map