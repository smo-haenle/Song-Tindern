window.addEventListener("load", function (): void {
    console.log("lockedandloaded");

    //let form: HTMLFormElement = document.querySelector("#myform");
    let index: number = 1;
    let url: string = "https://sound-bound.herokuapp.com/";
    let test: any = document.querySelector("#fname");
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
    let info: infos = {
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


    document.querySelector("#letsgo")!.addEventListener("click", letsgo);
    document.querySelector("#click")!.addEventListener("click", submitandstart);
    document.querySelector("#like")!.addEventListener("click", counter);
    document.querySelector("#nolike")!.addEventListener("click", counter);


    function letsgo(): void {
        console.log("letsgo");
        document.getElementById("start")!.style.display = "none";
        document.getElementById("formsite")!.style.display = "block";
        document.getElementById("swipesite")!.style.display = "none";
        document.getElementById("matches")!.style.display = "none";
    }

    function submitandstart(): void {

        if (test.value.length < 3) {
            alert("type your name fr");
        } else {
            document.getElementById("start")!.style.display = "none";
            document.getElementById("formsite")!.style.display = "none";
            document.getElementById("swipesite")!.style.display = "block";
            document.getElementById("matches")!.style.display = "none";
            changevid();
            submitData();
        }
    }

    function submitData(): void {
        let nameInput: string = document.querySelector("#fname")!.value;
        let animalInput: string = document.querySelector("#fanimal")!.value;
        let bandInput: string = document.querySelector("#fband")!.value;
        info.name = nameInput;
        info.spiritanimals = animalInput;
        info.favband = bandInput;
        console.log(info.name, info.spiritanimals, info.favband);
    }




    function matches(): void {
        document.getElementById("start")!.style.display = "none";
        document.getElementById("formsite")!.style.display = "none";
        document.getElementById("swipesite")!.style.display = "none";
        document.getElementById("matches")!.style.display = "block";
    }



    //VIDEO
    function changevid(): void {
        document.getElementById("vidsrc")!.src = "assets/" + "vid" + index + ".mp4";
        //document.querySelector("video")!.play
        console.log("vid" + index + ".mp4");
    }


    //COUNTER
    function counter(_e: Event): void {
        let vid: string = "vid" + index.toString;
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
            changevid();
        }
        else {
            document.getElementById("vidsrc")!.src = "";
            sendToServer();
            getDataAndCompare();
            matches();

        }
    }

    async function sendToServer(): Promise<void> {
        let stringy: string = JSON.stringify(info);
        let infoOb: any = {
            info: stringy
        };
        let query: URLSearchParams = new URLSearchParams(<any>infoOb);
        let response: Response = await fetch(url + "/save?" + query.toString());
        let responseJSON: any = await response.json();
        console.log(await responseJSON);
    }


    async function getDataAndCompare(): Promise<void> {
        let searchOb: any = {
            search: "search"
        };
        let query: URLSearchParams = new URLSearchParams(<any>searchOb);
        let response: Response = await fetch(url + "/search?" + query.toString());
        let matches: string[] = await response.json();
        console.log("matches", matches);
        //return responseJSON;
        
       
        for (let i: number = 0; i < matches.length; i++) {
            let matchList: HTMLElement = document.getElementById("matches")!;
            let matchP: HTMLElement = document.createElement("p");
            matchP.innerHTML = matches[i];

            matchList.appendChild(matchP);
        }
    }
});



