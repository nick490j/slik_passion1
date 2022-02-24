//Globale variabler
let json;
let filter = "alle";
let kurvAntal = 0;
const filterknapper = document.querySelectorAll(".sort button");

//kør js når DOM er loaded
document.addEventListener("DOMContentLoaded", start);

//fetch database
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

//start funktion
function start() {
  filterknapper.forEach(knap => {
    knap.addEventListener("click", setFilter); //klik på knap
  })
  hentData();
}

//filter funktion
function setFilter() {
  filter = this.dataset.kategori; //sætter variablen til det der er valgt
  document.querySelector(".valgt").classList.remove("valgt"); //fjerner tidligere valgte knap
  this.classList.add("valgt") //styler valgt knap
  vis();
}

function vis() {

  //forbindelse til HTML Elementer
  const container = document.querySelector("#shop_items");
  const temp = document.querySelector("template").content;
  const modal = document.querySelector("#modal");

  container.textContent = ""; //ryd container

  json.forEach(slik => {
    if (filter == slik.Kategori || filter == "alle") { //tjekker filter match
      const klon = temp.cloneNode(true);

      //indhold manipulation
      klon.querySelector("h3").textContent = slik.Navn;
      klon.querySelector(".besk").innerHTML = `${slik.Beskrivelse}<br><span class="greyed_out">Læs mere</span>`;
      klon.querySelector(".pris").textContent = `Pris: ${slik.Pris}/kg,-`;
      klon.querySelector("img").src = `galleri/${slik.Billede}`;
      klon.querySelector(".greyed_out").addEventListener("click", () => visDetaljer(slik));
      klon.querySelector(".product_img").addEventListener("click", () => visDetaljer(slik));
      klon.querySelector(".buy").addEventListener("click", () => updateKurv());
      container.appendChild(klon);
    }
  })
};

const kurv = document.querySelector(".circle")
function updateKurv() {
  kurvAntal++
  kurv.textContent = kurvAntal
  kurv.style.display = "flex"
}

document.querySelector(".fa-shopping-basket").addEventListener("click", tømKurv)

function tømKurv() {
  kurvAntal = 0;
  kurv.style.display = "none"
}

//detaljer i singleview//
function visDetaljer(slik) {
  console.log(slik)

  //indhold manipulation
  modal.querySelector("h2").textContent = slik.Navn;
  modal.querySelector("img").src = `galleri/${slik.Billede}`;
  modal.querySelector(".besk").textContent = slik.Beskrivelse;
  modal.querySelector(".pris").textContent = `Pris: ${slik.Pris},-`;
  modal.style.display = "block";
}

modal.addEventListener("click", () => (modal.style.display = "none")); //skjul modal efter klik

//styling af navbar ved scroll
document.addEventListener("scroll", navStyle)
function navStyle() {
  if (window.scrollY > 0) {
    document.querySelector("nav").classList.add("scrolled")
  } else {
    document.querySelector("nav").classList.remove("scrolled")
  }
}