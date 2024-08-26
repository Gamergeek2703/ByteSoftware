function selected() {
    var btn1 = document.getElementById("button1");
    var btn2 = document.getElementById("button2");
    if(btn1.value=="Select") {
        btn1.value = "Selected";
        btn1.style.backgroundColor = "#F1E579";
        btn2.value = "Select"
        btn2.style.backgroundColor = "#393636";

    } else if (btn2.value=="Select") {
        btn2.value = "Selected";
        btn2.style.backgroundColor = "#F1E579";
        btn1.value = "Select";
        btn1.style.backgroundColor = "#393636";
    }
}