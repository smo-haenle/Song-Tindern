window.addEventListener("load", function (): void {
    console.log("lockedandloaded");

    let index: number = 1;
    const video = document.querySelector("#vidsrc");
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

    document.querySelector("#next")!.addEventListener("click", next)
    document.querySelector("#next2")!.addEventListener("click", next2)
    document.querySelector("#back")!.addEventListener("click", back)
    document.querySelector("#back2")!.addEventListener("click", next)
    document.querySelector("#letsgo")!.addEventListener("click", letsgo);
    document.querySelector("#click")!.addEventListener("click", submitandstart);
    document.querySelector("#like")!.addEventListener("click", counter);
    document.querySelector("#nolike")!.addEventListener("click", counter);


    document.querySelector("#p11")!.addEventListener("click", p1)
    document.querySelector("#p22")!.addEventListener("click", p2)
    document.querySelector("#p33")!.addEventListener("click", p3)
    document.querySelector("#p44")!.addEventListener("click", p4)


    function p1 ():void {
        console.log("pi")
        document.getElementById("p1")!.style.display = "block"
        document.getElementById("p2")!.style.display = "none"
        document.getElementById("p3")!.style.display = "none"
        document.getElementById("p4")!.style.display = "none"
    }

    function p2 ():void {
        document.getElementById("p1")!.style.display = "none"
        document.getElementById("p2")!.style.display = "block"
        document.getElementById("p3")!.style.display = "none"
        document.getElementById("p4")!.style.display = "none"
    }
    function p3 ():void {
        document.getElementById("p1")!.style.display = "none"
        document.getElementById("p2")!.style.display = "none"
        document.getElementById("p3")!.style.display = "block"
        document.getElementById("p4")!.style.display = "none"
    }
    function p4 ():void {
        document.getElementById("p1")!.style.display = "none"
        document.getElementById("p2")!.style.display = "none"
        document.getElementById("p3")!.style.display = "none"
        document.getElementById("p4")!.style.display = "block"
    }



    function back(): void {
        document.getElementById("TdM")!.style.display = "block";
        document.getElementById("overview")!.style.display = "none";
        document.getElementById("start")!.style.display = "none";
        document.getElementById("formsite")!.style.display = "none";
        document.getElementById("swipesite")!.style.display = "none";
        document.getElementById("ende")!.style.display = "none";
  
    }

    function next(): void {
        console.log("overview");
        document.getElementById("TdM")!.style.display = "none";
        document.getElementById("overview")!.style.display = "block";
        document.getElementById("start")!.style.display = "none";
        document.getElementById("formsite")!.style.display = "none";
        document.getElementById("swipesite")!.style.display = "none";
        document.getElementById("ende")!.style.display = "none";
  
    }

    function next2(): void {
        console.log("overview");
        document.getElementById("TdM")!.style.display = "none";
        document.getElementById("overview")!.style.display = "none";
        document.getElementById("start")!.style.display = "block";
        document.getElementById("formsite")!.style.display = "none";
        document.getElementById("swipesite")!.style.display = "none";
        document.getElementById("ende")!.style.display = "none";

    }

    function letsgo(): void {
        console.log("letsgo");
        document.getElementById("TdM")!.style.display = "none";
        document.getElementById("overview")!.style.display = "none";
        document.getElementById("start")!.style.display = "none";
        document.getElementById("formsite")!.style.display = "block";
        document.getElementById("swipesite")!.style.display = "none";
        document.getElementById("ende")!.style.display = "none";
    }

    function ende(): void {
        console.log("letsgo");
        document.getElementById("TdM")!.style.display = "none";
        document.getElementById("overview")!.style.display = "none";
        document.getElementById("start")!.style.display = "none";
        document.getElementById("formsite")!.style.display = "none";
        document.getElementById("swipesite")!.style.display = "none";
        document.getElementById("ende")!.style.display = "block";
    }

    function submitandstart(): void {
      
        if (test.value.length < 3) {
            alert("type your name fr");
        } else {
            document.getElementById("start")!.style.display = "none";
            document.getElementById("formsite")!.style.display = "none";
            document.getElementById("swipesite")!.style.display = "block";
            changevid();
            console.log("submitandstart");
        }
    }
    
    function changevid(): void {
        document.getElementById("vidsrc")!.src = "assets/" + "vid" + index + ".mp4";
        //document.querySelector("video")!.play
        console.log("vid" + index + ".mp4");
    }
    
    function counter(_e: Event): void {
        index += 1;
        console.log(index);
        if (index <= 2) {
            console.log("index <= 2");
            changevid();
        } else{
            video.pause();
            ende()
        }
    }




})