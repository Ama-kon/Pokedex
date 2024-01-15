let currentPokemon;
let pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
let loadedPokemon = 1;
let type = [];
let ability = [];
let stats = [];
let arrayOfCurrentPokemon = [];
let scrollPosition;
let searchedPokemon = [];

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
  let PokemonId = currentPokemon["id"];
  if (PokemonId == 1) {
    document.getElementById("arrow-previous").classList.add("d-none");
  } else {
    document.getElementById("arrow-previous").classList.remove("d-none");
  }
  document.getElementById("pokemonName").innerHTML = currentPokemon["name"];
  document.getElementById("pokemonNumber").innerHTML = `#` + PokemonId;
  let image = document.getElementById("current-pokemon-image");
  image.src =
    currentPokemon["sprites"]["other"]["dream_world"]["front_default"];
  createAboutAndBaseFunction(i);
}

function createAboutAndBaseFunction(i) {
  document.getElementById("about").innerHTML = aboutTemplate(i);
  document.getElementById("BaseStats").innerHTML = BaseStatsTemplate(i);
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
  window.scrollTo(0, scrollPosition);
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
  ability.splice(0);
  let abilities = arrayOfCurrentPokemon[i]["abilities"];
  ability.push(abilities);

  overview.innerHTML += overviewTemplate(i, arrayOfCurrentPokemon);
  let allAbilities = document.getElementById(`all-abilities${i}`);
  for (let j = 0; j < abilities.length; j++) {
    let answerOfAbility = abilities[j]["ability"]["name"];
    allAbilities.innerHTML += abilitiesTemplate(answerOfAbility);
  }
  createCardsBackgoundcolor(i);
}

function createCardsBackgoundcolor(i) {
  let speciesColor = arrayOfCurrentPokemon[i]["types"][0]["type"]["name"];
  let pokemonCard = document.getElementById(`${i}`);
  let pokedexElement = document.getElementById("pokedex");
  removeBackground();
  if (speciesColor == `grass`) {
    pokemonCard.classList.add("color-light-green") ||
      pokedexElement.classList.add("color-light-green");
  } else if (speciesColor == `fire`) {
    pokemonCard.classList.add("color-red") ||
      pokedexElement.classList.add("color-red");
  } else if (speciesColor == `water`) {
    pokemonCard.classList.add("color-blue") ||
      pokedexElement.classList.add("color-blue");
  } else if (speciesColor == `bug`) {
    pokemonCard.classList.add("color-sand") ||
      pokedexElement.classList.add("color-sand");
  } else if (speciesColor == `electric`) {
    pokemonCard.classList.add("color-yellow") ||
      pokedexElement.classList.add("color-yellow");
  } else if (
    speciesColor == `poison` ||
    speciesColor == `dragon` ||
    speciesColor == `ghost`
  ) {
    pokemonCard.classList.add("color-purple") ||
      pokedexElement.classList.add("color-purple");
  } else if (speciesColor == `fairy`) {
    pokemonCard.classList.add("color-pink") ||
      pokedexElement.classList.add("color-pink");
  } else if (speciesColor == `normal` || speciesColor == `ice`) {
    pokemonCard.classList.add("color-light-grey") ||
      pokedexElement.classList.add("color-light-grey");
  } else if (speciesColor == `ground`) {
    pokemonCard.classList.add("color-brown") ||
      pokedexElement.classList.add("color-brown");
  } else if (speciesColor == `fighting`) {
    pokemonCard.classList.add("color-orange") ||
      pokedexElement.classList.add("color-orange");
  } else if (speciesColor == `psychic` || speciesColor == `dark`) {
    pokemonCard.classList.add("color-black") ||
      pokedexElement.classList.add("color-black");
  } else if (speciesColor == `rock` || speciesColor == `steel`) {
    pokemonCard.classList.add("color-grey") ||
      pokedexElement.classList.add("color-grey");
  }
}

function removeBackground() {
  let pokedexElement = document.getElementById("pokedex");
  pokedexElement.classList.remove(
    "color-light-green",
    "color-red",
    "color-blue",
    "color-sand",
    "color-yellow",
    "color-purple",
    "color-pink",
    "color-light-grey",
    "color-brown",
    "color-orange",
    "color-black",
    "color-grey"
  );
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
  scrollPosition = window.scrollY;
  let overview = document.getElementById("show-all-pokemon");
  overview.classList.add("d-none");
  document.getElementById("single-pokemon-card").classList.remove("d-none");
  document.getElementById("load-more-button").classList.add("d-none");

  renderPokemonInfo(i);
  showAbouts(i);
  createCardsBackgoundcolor(i);
}

async function searchForPokemon() {
  searchedPokemon.splice(0);
  let inputField = document.getElementById("input-pokemon");
  let value = inputField.value;
  let formattedValue = value.toLowerCase();
  let url = pokeAPI + formattedValue;
  let response = await fetch(url);
  currentPokemon = await response.json();
  closePokemonCard();
  arrayOfCurrentPokemon.push(currentPokemon);
  let index = arrayOfCurrentPokemon.indexOf(currentPokemon);
  let overview = document.getElementById("show-all-pokemon");
  document.getElementById("load-more-button").classList.add("d-none");
  overview.innerHTML = "";
  createPokemonCard(index);
  inputField.value = "";
}

function handleKeyPress(enter) {
  if (enter.keyCode === 13) {
    searchForPokemon();
  }
}

function stopSearching() {
  arrayOfCurrentPokemon.splice(-1, 1);
}

function showPreviousPokemon() {
  showWantedPokemon(-1);
}

function showNextPokemon() {
  showWantedPokemon(1);
}

async function showWantedPokemon(oneMoreOrLess) {
  currentPokemon = 0;
  numberOfActual = findActualPokemon();
  let wantedPokemonNumber = numberOfActual + oneMoreOrLess;
  let url = pokeAPI + wantedPokemonNumber;
  let response = await fetch(url);
  let wantedPokemon = await response.json();
  arrayOfCurrentPokemon.push(wantedPokemon);

  let wantedPokemonIndex = arrayOfCurrentPokemon.indexOf(wantedPokemon);
  loadPreviousOrNext(wantedPokemonIndex);
}

function loadPreviousOrNext(wantedPokemonIndex) {
  closePokemonCard();
  createPokemonCard(wantedPokemonIndex);
  showCurrentPokemon(wantedPokemonIndex);
}

function findActualPokemon() {
  let stringOfPokemonId = document.getElementById("pokemonNumber").innerHTML;
  let numberOnly = +stringOfPokemonId.replace(/\D/g, "");
  return numberOnly;
}
