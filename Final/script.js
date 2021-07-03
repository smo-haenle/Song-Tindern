"use strict";
window.addEventListener("load", function () {
    console.log("lockedandloaded");
    //let form: HTMLFormElement = document.querySelector("#myform");
    let index = 1;
    let url = " http://localhost:5005";
    let test = document.querySelector("#fname");
    let info = {
        name: "",
        spiritanimals: "",
        favband: "",
        "songs": {
            "vid1": "nice",
            "vid2": "nice",
            "vid3": "nice",
            "vid4": "nice",
            "vid5": "nice"
        }
    };
    document.querySelector("#letsgo").addEventListener("click", letsgo);
    document.querySelector("#click").addEventListener("click", submitandstart);
    document.querySelector("#like").addEventListener("click", counter);
    document.querySelector("#nolike").addEventListener("click", counter);
    //SCREENS
    function letsgo() {
        console.log("letsgo");
        document.getElementById("start").style.display = "none";
        document.getElementById("formsite").style.display = "block";
        document.getElementById("swipesite").style.display = "none";
        document.getElementById("matches").style.display = "none";
    }
    function submitandstart() {
        if (test.value.length < 3) {
            alert("type your name fr");
        }
        else {
            document.getElementById("start").style.display = "none";
            document.getElementById("formsite").style.display = "none";
            document.getElementById("swipesite").style.display = "block";
            document.getElementById("matches").style.display = "none";
            changevid();
            submitData();
            console.log("submitandstart");
        }
    }
    function submitData() {
        let nameInput = document.querySelector("#fname").value;
        let animalInput = document.querySelector("#fanimal").value;
        let bandInput = document.querySelector("#fband").value;
        info.name = nameInput;
        info.spiritanimals = animalInput;
        info.favband = bandInput;
        console.log(info.name, info.spiritanimals, info.favband);
    }
    function matches() {
        document.getElementById("start").style.display = "none";
        document.getElementById("formsite").style.display = "none";
        document.getElementById("swipesite").style.display = "none";
        document.getElementById("matches").style.display = "block";
    }
    //VIDEO
    function changevid() {
        document.getElementById("vidsrc").src = "assets/" + "vid" + index + ".mp4";
        //document.querySelector("video")!.play
        console.log("vid" + index + ".mp4");
    }
    //COUNTER
    function counter(_e) {
        let vid = "vid" + index.toString;
        if (_e.target.id == "like") {
            console.log(vid);
            info.songs["vid" + index] = "nice";
        }
        else if (_e.target.id == "nolike") {
            console.log(vid);
            info.songs["vid" + index] = "whack";
        }
        index += 1;
        console.log(index);
        if (index <= 5) {
            console.log("index <= 5");
            changevid();
        }
        else {
            console.log("stooooop");
            sendToServer();
            getDataAndCompare();
            matches();
        }
    }
    async function sendToServer() {
        let stringy = JSON.stringify(info);
        let infoOb = {
            info: stringy
        };
        let query = new URLSearchParams(infoOb);
        let response = await fetch(url + "/save?" + query.toString());
        let responseJSON = await response.json();
        console.log(await responseJSON);
    }
    async function getDataAndCompare() {
        let searchOb = {
            search: "search"
        };
        let query = new URLSearchParams(searchOb);
        let response = await fetch(url + "/search?" + query.toString());
        let matches = await response.json();
        let matchP = document.createElement("li");
        console.log("matches", matches);
        //return responseJSON;
        for (let i = 0; i < matches.length; i++) {
            let matchList = document.getElementById("matches");
            let matchP = document.createElement("p");
            matchP.innerHTML = matches[i];
            matchList.appendChild(matchP);
        }
    }
    /* form!.onsubmit = () => {
         let formData: FormData = new FormData(form);
 
         const text: string = formData.get("textInput") as string;
         console.log(text);
         return false;
 };
 */
});
//Submitbutton funktioniert nicht als normaler Button
//video wird nicht abgespielt
//# sourceMappingURL=script.js.map