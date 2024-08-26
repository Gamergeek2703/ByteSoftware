function selected() {
    var btn1 = document.getElementById("subSelect");
    var btn2 = document.getElementById("comSelect");
    if(btn1.innerHTML=="Select") {
        btn1.innerHTML = "Selected";
        btn1.style.backgroundColor = "#F1E579";
        btn2.innerHTML = "Select"
        btn2.style.backgroundColor = "#393636";

    } else if (btn2.innerHTML=="Select") {
        btn2.innerHTML = "Selected";
        btn2.style.backgroundColor = "#F1E579";
        btn1.innerHTML = "Select";
        btn1.style.backgroundColor = "#393636";
    }
    
}