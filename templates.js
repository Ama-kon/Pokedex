function aboutTemplate(i) {
  return `<h2 id="headline-about" onclick="showAbouts(${i})">About</h2>`;
}

function BaseStatsTemplate(i) {
  return `<h2 id="headline-base-stats" onclick="showBaseStats(${i})">
    Base Stats
   </h2>`;
}

function overviewTemplate(i, arrayOfCurrentPokemon) {
  return `<div id="${i}" class="single-box" onclick="showCurrentPokemon(${i})">
    <h2 class="no-headline-hover">${arrayOfCurrentPokemon[i]["name"]}</h2>
    <img class="img-of-every-pokemon" src="${arrayOfCurrentPokemon[i]["sprites"]["other"]["dream_world"]["front_default"]}" alt="Image of Pokemon">
    <div id="all-abilities${i}" class="abilities-layout"></div>
  </div>
  `;
}

function abilitiesTemplate(answerOfAbility) {
  return `<span class="the-abilities">${answerOfAbility}</span>`;
}
