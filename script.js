let currentPokemon;
let pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
let loadedPokemon = 1;
let type = [];
let ability = [];
let stats = [];
let arrayOfCurrentPokemon = [];

function init() {
  loadPokemon();
  closePokemonCard();
  showAllPokemon();
}

async function loadPokemon() {
  let url = pokeAPI + loadedPokemon;
  let response = await fetch(url);
  currentPokemon = await response.json();
}

function renderPokemonInfo(i) {
  let currentPokemon = arrayOfCurrentPokemon[i];
  document.getElementById("pokemonName").innerHTML = currentPokemon["name"];
  document.getElementById("pokemonNumber").innerHTML = `#` + (i + 1);
  let image = document.getElementById("current-pokemon-image");
  image.src =
    currentPokemon["sprites"]["other"]["dream_world"]["front_default"];
  createAboutAndBaseFunction(i);
}

function createAboutAndBaseFunction(i) {
  document.getElementById(
    "about"
  ).innerHTML = `<h2 id="headline-about" onclick="showAbouts(${i})">About</h2>`;
  document.getElementById(
    "BaseStats"
  ).innerHTML = `<h2 id="headline-base-stats" onclick="showBaseStats(${i})">
 Base Stats
</h2>`;
}

// About:

function showAbouts(i) {
  let currentPokemon = arrayOfCurrentPokemon[i];
  clearInformationsContainer();
  renderAbouts(currentPokemon);
  let about = document.getElementById("abouts");
  let aboutAnswers = document.getElementById("answers-about");
  let headline = document.getElementById("headline-about");
  about.classList.remove("d-none");
  aboutAnswers.classList.remove("d-none");
  headline.classList.add("active");
}

function renderAbouts(currentPokemon) {
  renderSpecies(currentPokemon);
  renderHeight(currentPokemon);
  renderAbilities(currentPokemon);
}

function renderSpecies(currentPokemon) {
  let types = currentPokemon["types"];
  type.push(types);
  let answerOfSpecies = document.getElementById("species");
  answerOfSpecies.innerHTML = "";
  for (let i = 0; i < type[0].length; i++) {
    let species = types[i]["type"]["name"];
    answerOfSpecies.innerHTML += `<span>${species}</span>`;
  }
}

function renderHeight(currentPokemon) {
  let weight = currentPokemon["weight"];
  let formattedWeight = (weight / 10).toFixed(1);
  document.getElementById("weight").innerHTML = formattedWeight + " KG";
}

function renderAbilities(currentPokemon) {
  let abilities = currentPokemon["abilities"];
  ability.push(abilities);
  let answer = document.getElementById("abilities");
  answer.innerHTML = "";
  for (let i = 0; i < abilities.length; i++) {
    let answerOfAbility = abilities[i]["ability"]["name"];
    answer.innerHTML += `<span>${answerOfAbility}</span>`;
  }
}

// Base Stats:

function showBaseStats(i) {
  let currentPokemon = arrayOfCurrentPokemon[i];
  clearInformationsContainer();
  renderBaseStats(currentPokemon);
  let baseStats = document.getElementById("base-stats");
  let baseStatsAnswers = document.getElementById("answers-base-stats");
  let headline = document.getElementById("headline-base-stats");
  baseStats.classList.remove("d-none");
  baseStatsAnswers.classList.remove("d-none");
  headline.classList.add("active");
}

function clearInformationsContainer() {
  let ids = [
    "abouts",
    "answers-about",
    "fakts",
    "base-stats",
    "answers-base-stats",
    "evolution-container",
  ];
  for (let id of ids) {
    let element = document.getElementById(id);

    if (element) {
      element.classList.add("d-none");
    }
  }
  let headlineIds = [
    "headline-about",
    "headline-base-stats",
    "headline-evolution",
    "headline-moves",
  ];
  for (let id of headlineIds) {
    let headline = document.getElementById(id);
    if (headline) {
      headline.classList.remove("active");
    }
  }
}

function renderBaseStats(currentPokemon) {
  let baseStats = currentPokemon["stats"];
  stats.push(baseStats);
  renderHP(baseStats[0]);
  renderAttack(baseStats[1]);
  renderDefense(baseStats[2]);
  renderSpAtk(baseStats[3]);
  renderSpDef(baseStats[4]);
  renderSpeed(baseStats[5]);
  renderProgressBar(baseStats);
}

function renderHP(stats) {
  let hpStats = stats["base_stat"];
  let hp = document.getElementById("hp");
  hp.innerHTML = "";
  hp.innerHTML += hpStats;
}

function renderAttack(stats) {
  let attackStats = stats["base_stat"];
  let attack = document.getElementById("attack");
  attack.innerHTML = "";
  attack.innerHTML += attackStats;
}

function renderDefense(stats) {
  let defenseStats = stats["base_stat"];
  let defense = document.getElementById("defense");
  defense.innerHTML = "";
  defense.innerHTML += defenseStats;
}

function renderSpAtk(stats) {
  let spAtkStats = stats["base_stat"];
  let spAtk = document.getElementById("sp-atk");
  spAtk.innerHTML = "";
  spAtk.innerHTML += spAtkStats;
}

function renderSpDef(stats) {
  let spDefStats = stats["base_stat"];
  let spDef = document.getElementById("sp-def");
  spDef.innerHTML = "";
  spDef.innerHTML += spDefStats;
}

function renderSpeed(stats) {
  let speedStats = stats["base_stat"];
  let speed = document.getElementById("speed");
  speed.innerHTML = "";
  speed.innerHTML += speedStats;
}

function renderProgressBar(baseStats) {
  function getProgressBarClass(value) {
    return value >= 50 ? "bg-success" : "bg-danger";
  }

  function createProgressBar(value) {
    let valueBaseStat = value["base_stat"];
    let progressBarClass = getProgressBarClass(valueBaseStat);
    return `<div class="progress" role="progressbar" aria-label="Success example" style="height: 10px" aria-valuenow="${valueBaseStat}" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar ${progressBarClass}" style="width: ${valueBaseStat}%"></div>
            </div>`;
  }
  let progressBars = [
    document.getElementById("progress-bar-0"),
    document.getElementById("progress-bar-1"),
    document.getElementById("progress-bar-2"),
    document.getElementById("progress-bar-3"),
    document.getElementById("progress-bar-4"),
    document.getElementById("progress-bar-5"),
  ];
  for (let i = 0; i < progressBars.length; i++) {
    let progressBar = createProgressBar(baseStats[i]);
    progressBars[i].innerHTML = "";
    progressBars[i].innerHTML = progressBar;
  }
}

function closePokemonCard() {
  document.getElementById("single-pokemon-card").classList.add("d-none");
  document.getElementById("show-all-pokemon").classList.remove("d-none");
  document.getElementById("load-more-button").classList.remove("d-none");
  type.splice(0);
}

async function showAllPokemon() {
  for (let i = 0; i <= 30; i++) {
    let url = pokeAPI + (loadedPokemon + i);
    let response = await fetch(url);
    currentPokemon = await response.json();
    arrayOfCurrentPokemon.push(currentPokemon);
    createPokemonCard(i);
  }
}

function createPokemonCard(i) {
  let overview = document.getElementById("show-all-pokemon");
  overview.innerHTML += `<div id="${i}" class="single-box" onclick="showCurrentPokemon(${i})">
    <h2>${arrayOfCurrentPokemon[i]["name"]}</h2>
    <img class="img-of-every-pokemon" src="${arrayOfCurrentPokemon[i]["sprites"]["other"]["dream_world"]["front_default"]}" alt="Image of Pokemon">
  </div>`;
  createCardsBackgoundcolor(i);
}

function createCardsBackgoundcolor(i) {
  let speciesColor = arrayOfCurrentPokemon[i]["types"][0]["type"]["name"];
  if (speciesColor == `grass`) {
    document.getElementById(`${i}`).classList.add("color-light-green");
  }
  if (speciesColor == `fire`) {
    document.getElementById(`${i}`).classList.add("color-red");
  }
  if (speciesColor == `water`) {
    document.getElementById(`${i}`).classList.add("color-blue");
  }
  if (speciesColor == `bug`) {
    document.getElementById(`${i}`).classList.add("color-sand");
  }
  if (speciesColor == `electric`) {
    document.getElementById(`${i}`).classList.add("color-yellow");
  }
  if (
    speciesColor == `poison` ||
    speciesColor == `dragon` ||
    speciesColor == `ghost`
  ) {
    document.getElementById(`${i}`).classList.add("color-purple");
  }

  if (speciesColor == `fairy`) {
    document.getElementById(`${i}`).classList.add("color-pink");
  }
  if (speciesColor == `normal` || speciesColor == `ice`) {
    document.getElementById(`${i}`).classList.add("color-light-grey");
  }
  if (speciesColor == `ground`) {
    document.getElementById(`${i}`).classList.add("color-brown");
  }

  if (speciesColor == `fighting`) {
    document.getElementById(`${i}`).classList.add("color-orange");
  }

  if (speciesColor == `psychic` || speciesColor == `dark`) {
    document.getElementById(`${i}`).classList.add("color-black");
  }

  if (speciesColor == `rock` || speciesColor == `steel`) {
    document.getElementById(`${i}`).classList.add("color-grey");
  }
}

async function showMorePokemon() {
  let actualNumber = arrayOfCurrentPokemon.length;
  let numberOfMore = actualNumber / 2 + actualNumber;
  for (let i = actualNumber; i < numberOfMore; i++) {
    let url = pokeAPI + (loadedPokemon + i);
    let response = await fetch(url);
    currentPokemon = await response.json();
    arrayOfCurrentPokemon.push(currentPokemon);
    createPokemonCard(i);
  }
}

function showCurrentPokemon(i) {
  let overview = document.getElementById("show-all-pokemon");
  overview.classList.add("d-none");
  document.getElementById("single-pokemon-card").classList.remove("d-none");
  document.getElementById("load-more-button").classList.add("d-none");
  renderPokemonInfo(i);
  showAbouts(i);
}
