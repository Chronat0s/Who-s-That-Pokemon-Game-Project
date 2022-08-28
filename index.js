// Variables
let winStreak = 0;
let guessCount = 0;
let winStreakEl = document.querySelector(".win_streak")
let pokemonEl = document.querySelector(".pokemon_el");
let guessEl = document.querySelector(".guess_el");
let pokemon = [];
const pokemonListEl = document.querySelector("#pokemon_list")
const pokemonInputEl = document.querySelector("#pokemon_input")


pokemonEl.innerHTML = `<div class = "pokemon__image--wrapper">
<img  class = "question-mark__image" src="https://upload.wikimedia.org/wikipedia/commons/5/55/Question_Mark.svg" alt="">
</div>`

async function getPokemon(){
    let api = await fetch("https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=905")
    let apiData = await api.json();
    apiDataArray = apiData.results
    pokemon = apiDataArray.map((x) => x.name)
    pokemon = pokemon.sort();
}


function loadPokemon(data, element){
    if (data){
        element.innerHTML = "";
        let innerElement = "";
        data.forEach((item) => {
            innerElement += `
            <li onclick = "choosePokemon(event)">${item.charAt(0).toUpperCase() + item.slice(1)}</li>`
        })
    element.innerHTML = innerElement;
    }
}

function filterPokemon(data, searchText){
    return data.filter((x) => x.toLowerCase().includes(searchText.toLowerCase()))
}

pokemonInputEl.addEventListener("input", function(){
    const filteredData = filterPokemon(pokemon, pokemonInputEl.value)
    loadPokemon(filteredData, pokemonListEl)
})

function choosePokemon(event){
    pokemonInputEl.value = event.target.innerHTML
}

getPokemon();






// Answer 
let isAnswerBaseStage = false;
let isAnswerFirstStage = false;
let isAnswerSecondStage = false;
let isAnswerLegendaryOrMythical = false; 
let answerFirstType = null;
let answerHasSecondType = null;
let answerSecondType = null;
let answerId = null;
let answerGeneration = null;
let answerWeight = null;
let answerStage = null;
let answerName = null;


// Guess
let isGuessBaseStage = false;
let isGuessFirstStage = false;
let isGuessSecondStage = false;
let isGuessLegendaryOrMythical = false; 
let guessFirstType = null;
let guessHasSecondType = null;
let guessSecondType = null;
let guessId = null;
let guessGeneration = null;
let guessWeight = null;
let guessStage = null;
let guessName = null;

// Hints
let generationEl = document.getElementById("generation_el");
let stageEl = document.getElementById("stage_el");
let dualTypeEl = document.getElementById("dual-type_el");
let type1El = document.getElementById("type1_el");
let type2El = document.getElementById("type2_el");
let legendaryEl = document.getElementById("legendary_el");
let weightEl = document.getElementById("weight_el");


// Arrays
const baseStage = [
    "bulbasaur", "charmander", "squirtle", "caterpie", "weedle", "pidgey", "rattata", "spearow", "ekans", "pichu", 
    "sandshrew", "nidoran♀", "nidoran♂", "cleffa", "vulpix", "igglybuff", "zubat", "oddish", "paras", "venonat", 
    "diglett", "meowth", "psyduck", "mankey", "growlithe", "poliwag", "abra", "machop", "bellsprout", "tentacool",
    "geodude", "ponyta", "slowpoke", "magnemite", "farfetch'd", "doduo", "seel", "grimer", "shellder", "gastly",
    "onix", "drowzee", "krabby", "voltorb", "exeggcute", "cubone", "tyrogue", "lickitung", "koffing", "rhyhorn",
    "happiny", "tangela", "kangaskhan", "horsea", "goldeen", "staryu", "mime-jr.", "scyther", "smoochum", "elekid",
    "magby", "pinsir", "tauros", "magikarp", "lapras", "ditto", "eevee", "porygon", "omanyte", "kabuto", 
    "aerodactyl", "munchlax", "articuno", "zapdos", "moltres", "dratini", "mewtwo", "mew", "chikorita", "cyndaquil",
    "totodile", "sentret", "hoothoot", "ledyba", "spinarak", "chinchou", "togepi", "natu", "mareep", "azurill", 
    "bonsly", "hoppip", "aipom", "sunkern", "yanma", "wooper", "murkrow", "misdreavus", "unown", "wynaut",
    "girafarig", "pineco", "dunsparce", "gligar", "snubbull", "qwilfish", "shuckle", "heracross", "sneasel", "teddiursa",
    "slugma", "swinub", "corsola", "remoraid", "delibird", "mantyke", "skarmory", "houndour", "phanpy", "stantler",
    "smeargle", "miltank", "raikou", "entei", "suicine", "larvitar", "lugia", "ho-oh", "celebi", "treecko", 
    "torchic", "mudkip", "poochyena", "zigzagoon", "wurmple", "lotad", "seedot", "taillow", "wingull", "ralts",
    "surskit", "shroomish", "slakoth", "nincada", "whismur", "makuhita", "nosepass", "skitty", "sableye", "mawile",
    "aron", "meditite", "electrike", "plusle", "minun", "volbeat", "illumise", "budew", "gulpin", "carvanha",
    "wailmer", "numel", "torkoal", "spoink", "spinda", "trapinch", "cacnea", "swablu", "zangoose", "seviper",
    "lunatone", "solrock", "barboach", "corphish", "baltoy", "lileep", "anorith", "feebas", "castform", "kecleon",
    "shuppet", "duskull", "tropius", "chingling", "absol", "snorunt", "spheal", "clamperl", "relicanth", "luvdisc",
    "bagon", "beldum", "regirock", "regice", "registeel", "latias", "latios", "kyogre", "groudon", "rayquaza",
    "jirachi", "deoxys", "turtwig", "chimchar", "piplup", "starly", "bidoof", "kricketot", "shinx", "cranidos",
    "shieldon", "burmy", "combee", "pachirisu", "buizel", "cherubi", "shellos", "drifloon", "buneary", "glameow",
    "stunky", "bronzor", "chatot", "spiritomb", "gible", "riolu", "hippopotas", "skorupi", "croagunk", "carnivine",
    "finneon", "snover", "rotom", "uxie", "mesprit", "azelf", "dialga", "palkia", "heatran", "regigigas",
    "giratina", "cresselia", "phione", "manaphy", "darkrai", "shaymin", "arceus", "victini", "snivy", "tepig",
    "oshawott", "patrat", "lillipup", "purrloin", "pansage", "pansear", "panpour", "munna", "pidove", "blitzle",
    "roggenrola", "woobat", "drilbur", "audino", "timburr", "tympole", "throh", "sawk", "sewaddle", "venipede",
    "cottonee", "petilil", "basculin", "sandile", "darumaka", "maractus", "dwebble", "scraggy", "sigilyph", "yamask",
    "tirtouga", "archen", "trubbish", "zorua", "minccino", "gothita", "solosis", "ducklett", "vanillite", "deerling",
    "emolga", "karrablast", "foongus", "frillish", "alomomola", "joltik", "ferroseed", "klink", "tynamo", "elgyem",
    "litwick", "axew", "cubchoo", "cryogonal", "shelmet", "stunfisk", "mienfoo", "druddigon", "golett", "pawniard",
    "bouffalant", "rufflet", "vullaby", "heatmor", "durant", "deino", "larvesta", "cobalion", "terrakion", "virizion",
    "tornadus", "thundurus", "reshiram", "zekrom", "landorus", "kyurem", "keldeo", "meloetta", "genesect", "chespin",
    "fennekin", "froakie", "bunnelby", "fletchling", "scatterbug", "litleo", "flabébé", "skiddo", "pancham", "furfrou",
    "espurr", "honedge", "spritzee", "swirlix", "inkay", "binacle", "skrelp", "clauncher", "helioptile", "tyrunt",
    "amaura", "hawlucha", "dedenne", "carbink", "goomy", "klefki", "phantump", "pumpkaboo", "bergmite", "noibat",
    "xerneas", "yveltal", "zygarde", "diancie", "hoopa", "volcanion", "rowlet", "litten", "popplio", "pikipek",
    "yungoos", "grubbin", "crabrawler", "oricorio", "cutiefly", "rockruff", "wishiwashi", "mareanie", "mudbray", "dewpider",
    "fomantis", "morelull", "salandit", "stufful", "bounsweet", "comfey", "oranguru", "passimian", "wimpod", "sandygast",
    "pyukumuku", "type-null", "minior", "komala", "turtonator", "togedemaru", "mimikyu", "bruxish", "drampa", "dhelmise",
    "jangmo'o", "tapu-koko", "tapu-lele", "tapu-bulu", "tapu-fini", "cosmog", "nihilego", "buzzwole", "pheremosa", "xurkitree",
    "celesteela", "kartana", "guzzlord", "necrozma", "magearna", "marshadow", "poipole", "stakataka", "blacephalon", "zeraora",
    "meltan", "grookey", "scorbunny", "sobble", "skwovet", "rookidee", "blipbug", "nickit", "gossifleur", "wooloo",
    "chewtle", "yamper", "rolycoly", "applin", "silicobra", "cramorant", "arrokuda", "toxel", "sizzlipede", "clobbopus",
    "sinistea", "hatenna", "impidimp", "milcery", "falinks", "pincurchin", "snom", "stonjourner", "eiscue", "indeedee",
    "morpeko", "cufant", "dracozolt", "arctozolt", "dracovish", "arctovish", "duraludon", "dreepy", "zacian", "zamazenta",
    "eternatus", "kubfu", "zarude", "regieleki", "regidrago", "glastrier", "spectrier", "calyrex", "enamorus"
]

const firstStage = [
    "ivysaur", "charmeleon", "wartortle", "metapod", "kakuna", "pidgeotto", "raticate", "fearow", "arbok", "pikachu",
    "sandslash", "nidorina", "nidorino", "clefairy", "ninetales", "jigglypuff", "golbat", "gloom", "parasect", "venomoth",
    "dugtrio", "persian", "perrserker", "golduck", "primeape", "arcanine", "poliwhirl", "kadabra", "machoke", "weepinbell",
    "tentacruel", "graveler", "rapidash", "slowbro", "slowking", "magneton", "sirfetch'd", "dodrio", "dewgong", "muk",
    "cloyster", "haunter", "steelix", "hypno", "kingler", "electrode", "exeggutor", "marowak", "hitmonlee", "hitmonchan",
    "hitmontop", "lickilicky", "weezing", "rhydon", "chansey", "tangrowth", "seadra", "seaking", "starmie", "mr-mime",
    "scizor", "kleavor", "jynx", "electabuzz", "magmar", "gyarados", "vaporeon", "jolteon", "flareon", "espeon",
    "umbreon", "leafeon", "glaceon", "sylveon", "porygon2", "omastar", "kabutops", "snorlax", "dragonair", "bayleef",
    "quilava", "croconaw", "furret", "noctowl", "ledian", "ariados", "lanturn", "togetic", "xatu", "flaaffy",
    "marill", "sudowoodo", "skiploom", "ambipom", "sunflora", "yanmega", "quagsire", "honchkrow", "masmagius", "wobbuffet",
    "forretress", "gliscor", "granbull", "overqwil", "weavile", "sneasler", "ursaring", "magcargo", "piloswine", "cursola",
    "octillery", "mantine", "houndoom", "donphan", "wyrdeer", "pupitar", "grovyle", "combusken", "marshtomp", "mightyena",
    "linoone", "silcoon", "cascoon", "lombre", "nuzleaf", "swellow", "pelipper", "kirlia", "masquerain", "breloom",
    "vigoroth", "ninjask", "shedinja", "loudred", "hariyama", "probopass", "delcatty", "lairon", "medicham", "manectric",
    "roselia", "swalot", "sharpedo", "wailord", "camerupt", "grumpig", "vibrava", "cacturne", "altaria", "whiscash",
    "crawdaunt", "claydol", "cradily", "armaldo", "milotic", "banette", "dusclops", "chimecho", "glalie", "froslass",
    "sealeo", "huntail", "gorebyss", "shelgon", "metang", "grotle", "monferno", "prinplup", "staravia", "bibarel",
    "kricketune", "luxio", "rampardos", "bastiodon", "wormadam", "mothim", "vespiquen", "floatzel", "cherrim", "gastrodon",
    "drifblim", "lopunny", "purugly", "skuntank", "bronzong", "gabite", "lucario", "hippowdon", "drapion", "toxicroak", 
    "lumineon", "abomasnow", "servine", "pignite", "dewott", "watchog", "herdier", "liepard", "simisage", "simisear",
    "simipour", "musharna", "tranquill", "zebstrika", "boldore", "swoobat", "excadrill", "gurdurr", "palpitoad", "swadloon",
    "whirlipede", "whimsicott", "lilligant", "basculegion", "krokorok", "darmanitan", "crustle", "scrafty", "cofagrigus", "runerigus",
    "carracosta", "archeops", "garbodor", "zoroark", "cinccino", "gothorita", "duosion", "swanna", "vanillish", "sawsbuck",
    "escavalier", "amoonguss", "jellicent", "galvantula", "ferrothorn", "klang", "eelektrik", "beheeyem", "lampent", "fraxure",
    "beartic", "accelgor", "mienshao", "golurk", "bisharp", "braviary", "mandibuzz", "zweilous", "volcarona", "quilladin", 
    "braixen", "frogadier", "diggersby", "fletchinder", "spewpa", "pyroar", "floette", "gogoat", "pangoro", "meowstic",
    "doublade", "aromatisse", "slurpuff", "malamar", "barbaracle", "dragalge", "clawitzer", "heliolisk", "tyrantrum", "aurorus",
    "sliggoo", "trevenant", "gourgeist", "avalugg", "noivern", "dartrix", "torracat", "brionne", "trumbeak", "gumshoos",
    "charjabug", "crabominable", "ribombee", "lycanroc", "toxapex", "mudsdale", "araquanid", "lurantis", "shiinotic", "salazzle",
    "bewear", "steenee", "golisopod", "palossand", "silvally", "hakamo-o", "cosmoem", "naganadel", "melmetal", "thwackey",
    "raboot", "drizzile", "greedent", "corvisquire", "dottler", "thievul", "eldegoss", "dubwool", "drednaw", "boltund",
    "carkol", "flapple", "appletun", "sandaconda", "barraskewda", "toxtricity", "centiscorch", "grapploct", "polteageist", "hattrem", 
    "morgrem", "alcremie", "frosmoth", "copperajah", "drakloak", "urshifu"
]

const secondStage = [
    "venusaur", "charizard", "blastoise", "butterfree", "beedrill", "pidgeot", "raichu", "nidoqueen", "nidoking", "clefable",
    "wigglytuff", "crobat", "vileplume", "bellossom", "poliwrath", "politoed", "alakazam", "machamp", "victreebel", "golem",
    "magnezone", "gengar", "rhyperior", "blissey", "kingdra", "mr-rime", "electivire", "magmortar", "porygon-z", "dragonite",
    "meganium", "typhlosion", "feraligatr", "togekiss", "ampharos", "azumarill", "jumpluff", "ursaluna", "mamoswine", "tyranitar",
    "sceptile", "blaziken", "swampert", "obstagoon", "beautifly", "dustox", "ludicolo", "shiftry", "gardevoir", "gallade",
    "slaking", "exploud", "aggron", "roserade", "flygon", "dusknoir", "walrein", "salamence", "metagross", "torterra",
    "infernape", "empoleon", "staraptor", "luxray", "garchomp", "serperior", "emboar", "samurott", "stoutland", "unfezant",
    "gigalith", "conkeldurr", "seismitoad", "leavanny", "scolipede", "krookodile", "gothitelle", "reuniclus", "vanilluxe", "klinklang", 
    "eelektross", "chandelure", "haxorus", "hydreigon", "chesnaught", "delphox", "greninja", "talonflame", "vivillon", "florges", 
    "aegislash", "goodra", "decidueye", "incineroar", "primarina", "toucannon", "vikavolt", "tsareena", "kommo-o", "solgaleo",
    "lunala", "rillaboom", "cinderace", "inteleon", "corviknight", "orbeetle", "coalossal", "hatterene", "grimmsnarl", "dragapult", 
]

const legendaryOrMythical = [
    "articuno", "zapdos", "moltres", "raikou", "entei", "suicune", "regirock", "regice", "registeel", "latias",
    "latios", "uxie", "mesprit", "azelf", "heatran", "regigigas", "cresselia", "cobalion", "terrakion", "virizion", 
    "tornadus", "thundurus", "landorus", "type-null", "silvally", "tapu-koko", "tapu-lele", "tapu-bulu", "tapu-fini", "nihilego",
    "buzzwole", "pheremosa", "xurkitree", "celesteela", "kartana", "guzzlord", "poipole", "naganadel", "stakataka", "blacephalon",
    "kubfu", "urshifu", "regieleki", "regidrago", "glastrier", "spectrier", "enamorus", "mewtwo", "lugia", "ho-oh", 
    "kyogre", "groudon", "rayquaza", "dialga", "palkia", "giratina", "reshiram", "zekrom", "kyurem", "xerneas", 
    "yveltal", "zygarde", "cosmog", "cosmoem", "solgaleo", "lunala", "necrozma", "zacian", "zamazenta", "eternatus",
    "calyrex", "mew", "celebi", "jirachi", "deoxys", "phione", "manaphy", "darkrai", "shaymin", "arceus", 
    "victini", "keldeo", "meloetta", "genesect", "diancie", "hoopa", "volcanion", "magearna", "marshadow", "zeraora", 
    "meltan", "melmetal", "zarude"
]



// Functions

// Randomly selects a Pokemon from the API as your Answer
async function startGame(){
    winStreakEl.innerHTML = `Win Streak: ${winStreak}`
    let answer = await fetch(`https://pokeapi.co/api/v2/pokemon/${answerId}/`);
    let answerData = await answer.json();
    answerName = answerData.species.name
    isAnswerBaseStage = checkBaseStage(answerName);
    isAnswerFirstStage = checkFirstStage(answerName);
    isAnswerSecondStage = checkSecondStage(answerName);
    isAnswerLegendaryOrMythical = checkLegendaryOrMythical(answerName);
    answerFirstType = checkFirstType(answerData);
    answerSecondType = checkSecondType(answerData);
    answerGeneration = checkGeneration(answerId);
    answerHasSecondType = checkHasSecondType(answerSecondType);
    answerWeight = checkWeight(answerData)
    answerStage = checkAnswerStage()
    console.log("answer");
    console.log(answerName, isAnswerBaseStage, isAnswerFirstStage, isAnswerSecondStage, isAnswerLegendaryOrMythical, answerFirstType, answerSecondType, "Gen: " + answerGeneration, answerWeight + "kg");
}

// Records your Guess
async function guess(event){
    guessCount++
    let guess = await fetch(`https://pokeapi.co/api/v2/pokemon/${(event.target.value).toLowerCase()}/`);
    let guessData = await guess.json();
    guessId = guessData.id;
    guessName = guessData.species.name;
    isGuessBaseStage = checkBaseStage(guessName);
    isGuessFirstStage = checkFirstStage(guessName);
    isGuessSecondStage = checkSecondStage(guessName);
    isGuessLegendaryOrMythical = checkLegendaryOrMythical(guessName);
    guessFirstType = checkFirstType(guessData);
    guessSecondType = checkSecondType(guessData);
    guessGeneration = checkGeneration(guessId);
    guessHasSecondType = checkHasSecondType(guessSecondType);
    guessWeight = checkWeight(guessData);
    guessStage = checkGuessStage();
    if (guessCount != 8 ){
        pokemonEl.innerHTML = `
        <div id = "pokemon_background" class = "pokemon__image--wrapper">
        <img  class = "pokemon__image" src="${guessData.sprites.front_default}" alt="">
        </div>
        <p id = "message_el">You have ${8 - guessCount} Guesses left!</p>`
    }
    else{
        answerNameSlice = answerName.slice(1)
        answerNameFirstLetter = answerName[0].toUpperCase();
        answerName = answerNameFirstLetter + answerNameSlice
        winStreak = 0;
        pokemonEl.innerHTML = `
        <div id = "pokemon_background" class = "pokemon__image--wrapper">
        <img  class = "pokemon__image" src="${guessData.sprites.front_default}" alt="">
        </div>
        <p id = "message_el">Out of guesses, Pokemon was ${answerName}. Try again!</p>`
        
    }
    generationEl.innerHTML = guessGeneration;
    stageEl.innerHTML = guessStage;
    dualTypeEl.innerHTML = guessHasSecondType;
    type1El.innerHTML = guessFirstType;
    type2El.innerHTML = guessSecondType;
    legendaryEl.innerHTML = isGuessLegendaryOrMythical;
    weightEl.innerHTML = guessWeight + "kg";
    compareGuessToAnswer();
}

//Game Initialisation
function newGame(){
    guessCount = 0;
    answerId = Math.floor(Math.random()*906)
    pokemonEl.innerHTML = `<div class = "pokemon__image--wrapper">
    <img  class = "question-mark__image" src="https://upload.wikimedia.org/wikipedia/commons/5/55/Question_Mark.svg" alt="">
    </div>
    <p id = "message_el">You have 8 Guesses Left!</p>`
    startGame()
}

/*
*
*
/** Hint Animation
 * 
 * 
*/

// GENERATION
 function checkGeneration(id){
    if (id <= 151){
        return 1;
    }
    else if (id <= 251){
        return 2;
    }
    else if (id <= 386){
        return 3;
    }
    else if (id <= 493){
        return 4;
    }
    else if (id <= 649){
        return 5;
    }
    else if (id <= 721){ 
        return 6;
    }
    else if (id <= 809){
        return 7;
    }
    else {
        return 8;
    }
 }

// TYPING
function checkFirstType(pokemonData){
    return pokemonData.types[0].type.name.charAt(0).toUpperCase() + pokemonData.types[0].type.name.slice(1);
}

function checkSecondType(pokemonData){
    if (pokemonData?.types[1]){
        return pokemonData.types[1].type.name.charAt(0).toUpperCase() + pokemonData.types[1].type.name.slice(1);
    }
    else {
        return "None"
    }
}

function checkHasSecondType(secondType){
    if(secondType != "None"){
        return "Yes"
    }
    else{
        return "No"
    }
}

// WEIGHT
function checkWeight(pokemonData){
    return pokemonData.weight/10;
}


// Compare Pokemon to Arrays to determine Stage
function checkBaseStage(a){
    for (let i = 0; i < baseStage.length; i++){
        if (a == baseStage[i]){
            return true;
        }
    }
    return false;
}

function checkFirstStage(a){
    for (let i = 0; i < firstStage.length; i++){
        if (a == firstStage[i]){
            return true;
        }
    }
    return false
}

function checkSecondStage(a){
    for (let i = 0; i < secondStage.length; i++){
        if (a == secondStage[i]){
            return true;
        }
    }
    return false
}

function checkLegendaryOrMythical(a){
    for (let i = 0; i < legendaryOrMythical.length; i++){
        if (a == legendaryOrMythical[i]){
            return "Yes";
        }
        
    }
    return "No"
}

// Store Stage in Variable
function checkAnswerStage(pokemon){
    if (isAnswerBaseStage){
        return "Base"
    }
    else if (isAnswerFirstStage){
        return "First"
    }
    else {
        return "Second"
    }
}

function checkGuessStage(pokemon){
    if (isGuessBaseStage){
        return "Base"
    }
    else if (isGuessFirstStage){
        return "First"
    }
    else{
        return "Second"
    }
}

// Compare Guess to Answer
function compareGuessToAnswer(){
    // Compare Generation of Guess and Answer
    if(guessGeneration == answerGeneration){
        generationEl.className += " " + "correct"
        generationEl.classList.remove("incorrect");
        
    }
    else if(guessGeneration > answerGeneration){
        generationEl.innerHTML += "&#8595;";
        generationEl.className += " " + "incorrect";
        generationEl.classList.remove("correct");
    }
    else {
        generationEl.innerHTML += "&#8593;";
        generationEl.className += " " + "incorrect";
        generationEl.classList.remove("correct");
    }
    // Compare Stage of Guess and Answer
    if (guessStage == answerStage){
        stageEl.className += " " + "correct";
        stageEl.classList.remove("incorrect")
    }
    else{
        stageEl.className += " " + "incorrect";
        stageEl.classList.remove("correct")

    }
    // Compare Dual-Type Boolean of Guess and Answer
    if (guessHasSecondType == answerHasSecondType){
        dualTypeEl.className += " " + "correct";
        dualTypeEl.classList.remove("incorrect");
    }
    else {
        dualTypeEl.className += " " + "incorrect";
        dualTypeEl.classList.remove("correct");

    }
    // Compare Type 1 of Guess and Answer
    if (guessFirstType == answerFirstType){
        type1El.className += " " + "correct";
        type1El.classList.remove("incorrect");
    }
    else {
        type1El.className += " " + "incorrect";
        type1El.classList.remove("correct");
    }
    // Compare Type 2 of Guess and Answer
    if (guessSecondType == answerSecondType){
        type2El.className += " " + "correct";
        type2El.classList.remove("incorrect");
    }
    else{
        type2El.className += " " + "incorrect";
        type2El.classList.remove("correct");
    }
    // Compare isLegendaryOrMythical Boolean of Guess and Answer
    if (isGuessLegendaryOrMythical == isAnswerLegendaryOrMythical){
        legendaryEl.className += " " + "correct";
        legendaryEl.classList.remove("incorrect");
    }
    else{
        legendaryEl.className += " " + "incorrect";
        legendaryEl.classList.remove("correct");
    }
    // Compare Weight of Guess and Answer
    if (guessWeight == answerWeight){
        weightEl.className += " " + "correct";
        weightEl.classList.remove("incorrect");
    }
    else if (guessWeight > answerWeight){
        weightEl.innerHTML += "&#8595;";
        weightEl.className += " " + "incorrect";
        weightEl.classList.remove("correct");
    }
    else{
        weightEl.innerHTML += "&#8593;";
        weightEl.className += " " + "incorrect";
        weightEl.classList.remove("correct");
    }
    let pokemonBackgroundEl = document.getElementById("pokemon_background");
        let messageEl = document.getElementById("message_el");
        if (guessName == answerName){
            pokemonBackgroundEl.className += " " + "correct";
            messageEl.innerHTML = "CORRECT!!!"
            guessCount = 0;
            winStreak++
        }
        else{
            pokemonBackgroundEl.className += " " + "incorrect";
    }
}



/** End of Game 
 *  Blacked out Music if game Lost
 *      pop up saying you blacked out (has close button)
 *  Battle Won music of game won
 *      confetti animation
 *  Open Pokeball and display Pokemon Sprite.
 *  Add Pokemon Cries if possible through api
 */

/** Pokemon Background Music
 * Mute Button
 * Volume Adjustment Slider
 */

