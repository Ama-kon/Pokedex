let currentPokemon;
let startIndex = 0;
let endIndex = 10;
let pokeAPI = "https://pokeapi.co/api/v2/pokemon/";
let type = [];
let ability = [];
let stats = [];
let scrollPosition;
let arrayOfAllAPIs = [];
let arrayOfAllPokemon = [];

function showHideOverlay() {
  let overlay = document.getElementById("loadingOverlay");
  if (overlay.classList.contains("d-none")) {
    overlay.classList.remove("d-none");
  } else {
    overlay.classList.add("d-none");
  }
}

async function init() {
  await getAllPokemonAPIs();
  await loadBatchOfPokemonAPIs();
  closePokemonCard();
  showAllPokemon();
}

async function getAllPokemonAPIs() {
  showHideOverlay();
  let url = `https://pokeapi.co/api/v2/pokemon/?limit=1400&offset=0`;
  let response = await fetch(url);
  thisPokemon = await response.json();
  results = thisPokemon.results;
  arrayOfAllAPIs.push(...results);
  showHideOverlay();
}

async function loadBatchOfPokemonAPIs() {
  showHideOverlay();
  let oneBatch = arrayOfAllAPIs.slice(startIndex, endIndex);
  for (let i = 0; i < oneBatch.length; i++) {
    let block = oneBatch[i];
    let url = block["url"];
    let response = await fetch(url);
    thisPokemon = await response.json();
    arrayOfAllPokemon.push(thisPokemon);
  }
  showHideOverlay();
}

async function showMorePokemon() {
  let inputField = document.getElementById("input-pokemon");
  inputField.value = "";
  startIndex = arrayOfAllPokemon.length;
  endIndex = endIndex * 2;
  await loadBatchOfPokemonAPIs();
  showAllPokemon();
}

function renderPokemonInfo(i) {
  let currentPokemon = arrayOfAllPokemon[i];
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

// // About:
function showAbouts(i) {
  let currentPokemon = arrayOfAllPokemon[i];
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
  let currentPokemon = arrayOfAllPokemon[i];
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

function renderStat(id, stats) {
  let statValue = stats["base_stat"];
  let baseStat = document.getElementById(id);
  baseStat.innerHTML = statValue;
}

function renderBaseStats(currentPokemon) {
  let baseStats = currentPokemon["stats"];
  stats.push(baseStats);
  renderStat("hp", baseStats[0]);
  renderStat("attack", baseStats[1]);
  renderStat("defense", baseStats[2]);
  renderStat("sp-atk", baseStats[3]);
  renderStat("sp-def", baseStats[4]);
  renderStat("speed", baseStats[5]);
  renderProgressBar(baseStats);
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

function showAllPokemon() {
  let overview = document.getElementById("show-all-pokemon");
  overview.innerHTML = "";
  for (let i = 0; i < arrayOfAllPokemon.length; i++) {
    createPokemonCard(i);
  }
}

function createPokemonCard(i) {
  showHideOverlay();
  let overview = document.getElementById("show-all-pokemon");
  ability.splice(0);
  let abilities = arrayOfAllPokemon[i]["abilities"];
  ability.push(abilities);
  overview.innerHTML += overviewTemplate(i);
  let allAbilities = document.getElementById(`all-abilities${i}`);
  allAbilities.innerHTML = "";
  for (let j = 0; j < abilities.length; j++) {
    let answerOfAbility = abilities[j]["ability"]["name"];
    allAbilities.innerHTML += abilitiesTemplate(answerOfAbility);
  }
  showHideOverlay();
  createCardsBackgoundcolor(i);
  document.getElementById("load-more-button").classList.remove("d-none");
}

function createCardsBackgoundcolor(i) {
  let speciesColor = arrayOfAllPokemon[i]["types"][0]["type"]["name"];
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

function searchForPokemon() {
  let inputField = document.getElementById("input-pokemon");
  let formattedValue = inputField.value.trim().toLowerCase();
  closePokemonCard();
  matches = arrayOfAllPokemon.filter((pokemon) => {
    return pokemon.name.includes(formattedValue);
  });
  console.log("matches");
  let overview = document.getElementById("show-all-pokemon");
  overview.innerHTML = "";
  matches.forEach(async (match) => {
    let index = match.id - 1;
    createPokemonCard(index);
  });
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
  if (wantedPokemonNumber > arrayOfAllPokemon.length - 1) {
    await showMorePokemon();
  }
  loadPreviousOrNext(wantedPokemonNumber);
}

function loadPreviousOrNext(wantedPokemonIndex) {
  closePokemonCard();
  showCurrentPokemon(wantedPokemonIndex);
}

function findActualPokemon() {
  let stringOfPokemonId = document.getElementById("pokemonNumber").innerHTML;
  let numberOnly = +stringOfPokemonId.replace(/\D/g, "");
  let indexOfWantedPokemon = numberOnly - 1;
  return indexOfWantedPokemon;
}
