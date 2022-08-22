// Variables
// Answer 

let pokemonEl = document.querySelector(".pokemon_el");
let isBaseStage = false;
let isFirstStage = false;
let isSecondStage = false;
let isLegendaryOrMythical = false; 
let firstType = null;
let hasSecondType = null;
let secondType = null;
let pokemonNumber = null;
let generation = null;
let weight = null;

function guessPokemon(event){
    console.log(event.target.value)
}
// Arrays
/*
* Is First, Second or Third Stage evolution.
* Create an array for all 3 stages which can be looped through.
*/
const baseStage = [
    "bulbasaur", "charmander", "squirtle", "caterpie", "weedle", "pidgey", "rattata", "spearow", "ekans", "pichu", 
    "sandshrew", "nidoran♀", "nidoran♂", "cleffa", "vulpix", "igglybuff", "zubat", "oddish", "paras", "venonat", 
    "diglett", "meowth", "psyduck", "mankey", "growlithe", "poliwag", "abra", "machop", "bellsprout", "tentacool",
    "geodude", "ponyta", "slowpoke", "magnemite", "farfetch'd", "doduo", "seel", "grimer", "shellder", "gastly",
    "onix", "drowzee", "krabby", "voltorb", "exeggcute", "cubone", "tyrogue", "lickitung", "koffing", "rhyhorn",
    "happiny", "tangela", "kangaskhan", "horsea", "goldeen", "staryu", "mime jr.", "scyther", "smoochum", "elekid",
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
    "fomantus", "morelull", "salandit", "stufful", "bounsweet", "comfey", "oranguru", "passimian", "wimpod", "sandygast",
    "pyukumuku", "type: null", "minior", "komala", "turtonator", "togedemaru", "mimikyu", "bruxish", "drampa", "dhelmise",
    "jangmo'o", "tapu koko", "tapu lele", "tapu bulu", "tapu fini", "cosmog", "nihilego", "buzzwole", "pheremosa", "xurkitree",
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
    "hitmontop", "lickilicky", "weezing", "rhydon", "chansey", "tangrowth", "seadra", "seaking", "starmie", "mr. mime",
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
    "magnezone", "gengar", "rhyperior", "blissey", "kingdra", "mr. rime", "electivire", "magmortar", "porygon-z", "dragonite",
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
    "tornadus", "thundurus", "landorus", "type: null", "silvally", "tapu koko", "tapu lele", "tapu bulu", "tapu fini", "nihilego",
    "buzzwole", "pheremosa", "xurkitree", "celesteela", "kartana", "guzzlord", "poipole", "naganadel", "stakataka", "blacephalon",
    "kubfu", "urshifu", "regieleki", "regidrago", "glastrier", "spectrier", "enamorus", "mewtwo", "lugia", "ho-oh", 
    "kyogre", "groudon", "rayquaza", "dialga", "palkia", "giratina", "reshiram", "zekrom", "kyurem", "xerneas", 
    "yveltal", "zygarde", "cosmog", "cosmoem", "solgaleo", "lunala", "necrozma", "zacian", "zamazenta", "eternatus",
    "calyrex", "mew", "celebi", "jirachi", "deoxys", "phione", "manaphy", "darkrai", "shaymin", "arceus", 
    "victini", "keldeo", "meloetta", "genesect", "diancie", "hoopa", "volcanion", "magearna", "marshadow", "zeraora", 
    "meltan", "melmetal", "zarude"
]



// Functions
async function startGame(){
    const pokemon = await fetch(`http://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`);
    const pokemonData = await pokemon.json();
    let id = pokemonData.id
    let name = pokemonData.species.name
    isBaseStage = checkBaseStage(name);
    isFirstStage = checkFirstStage(name);
    isSecondStage = checkSecondStage(name);
    isLegendaryOrMythical = checkLegendaryOrMythical(name);
    firstType = pokemonData.types[0].type.name
    checkGeneration(id);
    checkTyping(pokemonData);
    checkWeight(pokemonData);
    pokemonEl.innerHTML = `
    <img  src="${pokemonData.sprites.front_default}" alt="">`
    console.log(isBaseStage, isFirstStage, isSecondStage, isLegendaryOrMythical, firstType, secondType, generation, weight);
    console.log(weight)
}

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
            return true;
        }
        
    }
    return false
}

/* Game Initialisation
* New Game Button
* Randomly Choose a Pokemon a Pokemon
*/
function newGame(){
    pokemonNumber = Math.floor(Math.random()*906)
    startGame()
}
/*
 * Loading State (rotating pokeball png)
 * Once Pokemon is chosen ball stops rotating and prompted with "WHOS THAT POKEMON?!"
 */


/** Hints (drop down animation of bubbles 1 at a time left to right, background colour is green if parameter of pokemon guessed matches 
 * parameter of pokemon chosen by the system.)
*/

 function checkGeneration(id){
    if (id <= 151){
        generation = 1;
    }
    else if (id <= 251){
        generation = 2;
    }
    else if (id <= 386){
        generation = 3;
    }
    else if (id <= 493){
        generation = 4;
    }
    else if (id <= 649){
        generation = 5;
    }
    else if (id <= 721){ 
        geneartion = 6;
    }
    else if (id <= 809){
        generation = 7;
    }
    else {
        generation = 8;
    }
 }

/*
 * 
 * Typing
 * 
*/
function checkTyping(pokemonData){
    if (pokemonData?.types[1]){
        hasSecondType = true;
        secondType = pokemonData.types[1].type.name;
    }
    else {
        hasSecondType = false;
        secondType = "none"
    }
}

/* 
 * 
 * weight higher or lower
 * 
 **/ 
 
function checkWeight(pokemonData){
    weight = pokemonData.weight/10;
}

/*
 * Create array listing every legendary pokemon and then loop through that array and compare each element to the randomly selected pokemon by the system 
 * if the pokemon exists within the array return true and provide that as a hint
 * Hint is yes/no eg. if player guesses non-legendary but pokemon is a legendary then bubble will have text no (indicating the guess isnt a legendary) with a
 * white background (indicating the answer is a legendary.).
 * 


/** Counters
 * # of GuessesCounter
 *          Cap on # of Guesses before game lost.
 * 
 * WinStreakCounter
 *      Game win => +1 to counter
 *      Game loss => set counter back to 0.
 */

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

startGame()