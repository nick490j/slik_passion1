

document.addEventListener("DOMContentLoaded", start);

const url = "https:///passiongalleri-15c6.restdb.io/rest/slik";

    const options = {
      headers: {
        "x-apikey": "620e27b634fd62156585870c",
      },
    };

    async function hentData() {
      const respons = await fetch(url, options);
      const json = await respons.json();
      vis(json);
    }

    function vis(json) {
      console.log(json);
    }
    const filterknapper = document.querySelectorAll("button");



    function start(){
        filterknapper.forEach(knap =>{
            knap.addEventListener("click", setFilter);
        })
        hentData();
    }

function setFilter(){
        filter = this.dataset.kategori; // Sætter variablen til det der er valgt
        document.querySelector(".valgt").classList.remove("valgt");
        this.classList.add("valgt") 
        vis();
        // document.querySelector("h1").textContent = this.textContent;
    }

     //Globale variabler
     let json;
    let filter = "alle";

function vis() {

//Forbindelse til HTML Elementer
const container = document.querySelector("section");
const temp = document.querySelector("template").content;
const modal = document.querySelector("#modal");

container.textContent = ""; //Ryd container

json.forEach(ret => {
    // console.log("Kategori", ret.kategori);

    if (filter == ret.kategori || filter == "alle") {
                const klon = temp.cloneNode(true);


    klon.querySelector("h3").textContent = ret.navn;
    klon.querySelector(".besk").textContent = ret.kortbeskrivelse;
    klon.querySelector(".pris").textContent = "Pris: " + ret.pris + ",-";
    klon.querySelector("img").src = "galleri/" + ret.billednavn + ".jpg";
    klon.querySelector("article").addEventListener("click",()=>visDetaljer(ret));
    container.appendChild(klon);
    }
})
    
};
   //detaljer i singleview//
function visDetaljer(ret){
            console.log(ret)
            modal.querySelector("h2").textContent = ret.navn;
            modal.querySelector("img").src= "galleri/" + ret.billednavn + ".jpg";
            modal.querySelector(".besk").textContent = ret.langbeskrivelse;
            modal.querySelector(".pris").textContent = "Pris: " + ret.pris + ",-";

            modal.style.display="block";
        }

        modal.addEventListener("click",()=> (modal.style.display="none"));