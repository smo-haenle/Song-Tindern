window.addEventListener("load", function(): void {
    console.log("lockedandloaded");

    //let form: HTMLFormElement = document.querySelector("#myform");
    let index: number = 1;


    //SCREENS
    function letsgo(): void {
        console.log("letsgo");
        document.getElementById("start")!.style.display = "none";
        document.getElementById("formsite")!.style.display = "block";
        document.getElementById("swipesite")!.style.display = "none";
        document.getElementById("matches")!.style.display = "none";
    }

    document.querySelector("#letsgo")!.addEventListener("click", letsgo);

    function submitandstart(): void {
        console.log("submitandstart");
        document.getElementById("start")!.style.display = "none";
        document.getElementById("formsite")!.style.display = "none";
        document.getElementById("swipesite")!.style.display = "block";
        document.getElementById("matches")!.style.display = "none";
        changevid();
    }

    document.querySelector("#click")!.addEventListener("click", submitandstart);
    document.querySelector("#submitbutton")!.addEventListener("click", submitandstart);

    function matches(): void {
        document.getElementById("start")!.style.display = "none";
        document.getElementById("formsite")!.style.display = "none";
        document.getElementById("swipesite")!.style.display = "none";
        document.getElementById("matches")!.style.display = "block";

    }



    //VIDEO
    function changevid(): void {
        document.getElementById("vidsrc")!.src = "vid" + index + ".mp4";
        //document.querySelector("video")!.play
        console.log("vid" + index + ".mp4");
    }
   

    //COUNTER
    function counter (): void {
        console.log("counter");
        index += 1;
        console.log(index);
        if (index <= 5) {
            console.log("index <= 5");
            changevid();
        }
        else {
            console.log("stooooop");
            matches();
        }
    }

    document.querySelector("#like")!.addEventListener("click", counter);
    document.querySelector("#nolike")!.addEventListener("click", counter);

   


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
