

document.addEventListener("DOMContentLoaded", start);

const url = "https:///passiongalleri-15c6.restdb.io/rest/slik";

const options = {
  headers: {
    "x-apikey": "620e27b634fd62156585870c",
  },
};

async function hentData() {
  const respons = await fetch(url, options);
  json = await respons.json();
  vis(json);
  console.log(json);
}

const filterknapper = document.querySelectorAll("button");



function start() {
  filterknapper.forEach(knap => {
    knap.addEventListener("click", setFilter);
  })
  hentData();
}

function setFilter() {
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
  const container = document.querySelector("#shop_items");
  const temp = document.querySelector("template").content;
  const modal = document.querySelector("#modal");

  container.textContent = ""; //Ryd container

  json.forEach(slik => {
    // console.log("Kategori", ret.kategori);

    if (filter == slik.Kategori || filter == "alle") {
      const klon = temp.cloneNode(true);


      klon.querySelector("h3").textContent = slik.Navn;
      klon.querySelector(".besk").textContent = slik.Beskrivelse;
      klon.querySelector(".pris").textContent = `Pris: ${slik.Pris}/kg,-`;
      klon.querySelector("img").src = `galleri/${slik.Billede}`;
      klon.querySelector("article").addEventListener("click", () => visDetaljer(slik));
      container.appendChild(klon);
    }
  })

};
//detaljer i singleview//
function visDetaljer(slik) {
  console.log(slik)
  modal.querySelector("h2").textContent = slik.Navn;
  modal.querySelector("img").src = `galleri/${slik.Billede}`;
  modal.querySelector(".besk").textContent = slik.Beskrivelse;
  modal.querySelector(".pris").textContent = `Pris: ${slik.Pris},-`;

  modal.style.display = "block";
}

modal.addEventListener("click", () => (modal.style.display = "none"));

document.addEventListener("scroll", navStyle)
function navStyle() {
  if (window.scrollY > 0) {
    document.querySelector("nav").classList.add("scrolled")
  } else {
    document.querySelector("nav").classList.remove("scrolled")
  }
}