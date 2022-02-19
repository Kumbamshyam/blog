let publishBtn = document.getElementById('publishBtn');

publishBtn.addEventListener('click', () => {

    let imgtag = []
    let pElement = []
    let fileinput = document.getElementsByTagName("input");
    console.log(fileinput)
    pElement = document.getElementsByTagName('p')
    console.log(typeof (pElement))

    let m = pElement.toString()
    console.log(m)

    // imgtag = pElement.getElementsByTagName("img")
    // console.log(imgtag)

    for (let i = 0; i < pElement.length; i++) {

        imgtag = pElement[i].getElementsByTagName("img")

        if (m.includes(imgtag)) {
            console.log("this is condition")
            myfun(imgtag)

        }

    }

})

let myfun = (e) => {

    for (let i = 0; i < e.length; i++) {

        e[i].setAttribute("name", "images");
        e[i].setAttribute("type", "file");

    }

}
