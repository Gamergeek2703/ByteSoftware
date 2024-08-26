const selectBtn = document.querySelector(".btn"),
     items = document.querySelectorAll(".item");

selectBtn.addEventListener("click", () => {
    selectBtn.classList.toggle("open");
})

items.forEach(items => {
    items.addEventListener("click", () => {
        items.classList.toggle("checked");

        let checked = document.querySelectorAll(".checked"),
            btnText = document.querySelector(".btnText");

            if (checked && checked.length > 0){
                btnText.innerText = `${checked.length} Selected`;
            }else {
                btnText.innerText = "Services you provide"
            }
    });
})