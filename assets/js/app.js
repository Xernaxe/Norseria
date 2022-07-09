'use strict';

// idei: level system( in functie de nivel sa poti face anumite actiuni )   --- PROTOTYPE DONE
// inventory system ( special items (iteme exp, mancare, cufar rune, etc) ) --- WORKING ON IT
// equipment system (armura, pantofi, colier etc...) 						--- PARTIALY DONE
// cufar rune (actiuni basic 5% sansa de a dropa cufar rune)
// sistem rune (tipuri multiple de rune cu bonusuri proprii, poate lvling
// system la rune?, o runa castata sa aibe 70% sansa de success)
// expansion la

// idei far fetched (map system dar progressive, tu trebuie sa construiesti satul si sa-l populezi (ca-n metin2, prima harta sa fie map1 si sa fie progresive))  de ex. sa poti face pescarie?? dar sa trebuiasca sa dai assign unui om sa lucreze acolo

// ----------------------------------------------------
// --------------------SELECTORS ----------------------
// ----------------------------------------------------

// -------- LOGIN
const loginButton = document.querySelector('.loginButton');
const loginSection = document.querySelector('.login');
const nameSelection = document.querySelector('.nameSelection');

// -------- STORYLINE/CHAT
const storyline = document.querySelector('.storyline');

// -------- GAME BUTTONS
const gatherWoodBtn = document.querySelector('.chopwood');
const gatherStoneBtn = document.querySelector('.mineStone');
const axeUpBtn = document.querySelector('.axeUpBtn');


// -------- INV/STATS 
const closeInvBtn = document.querySelector('.closeInvBtn');
const openStats = document.querySelector('.openStats');
const openInventory = document.querySelector('.openInventory');
const closeStatsBtn = document.querySelector('.closeStatsBtn');
const showUpStats = document.querySelector('.statsBox');
const showUpInv = document.querySelector('.invBox');
const statsName = document.querySelector('.name');
const statsHeader = document.querySelector('.statsHeader');

// -------- SUM TEXT
const sumWood = document.querySelector('.woodsum');
const sumStone = document.querySelector('.stonesum');
const axeUpgrade = document.querySelector('.axeUpgrade');
const costWood = document.querySelector('.costWood');
const woodAmmount = document.querySelector('.woodAmmount');
const costHut = document.querySelector('.costHut');
const currExpNr = document.querySelector('.currExpNr');
const reqExpNr = document.querySelector('.reqExpNr');
const currLvl = document.querySelector('.currentLevel');

// -------- HEALTH/STAMINA/HUNGER
const playerHealthAmmount = document.querySelector('.playerHealthAmmount');
const playerStaminaAmmount = document.querySelector('.playerStaminaAmmount');
const playerHungerAmmount = document.querySelector('.playerHungerAmmount');

// -------- NPCS
const player = document.querySelector('.player');
const actionUI = document.querySelector('.actionUI');
const hut = document.querySelector('.hut');
const hutUI = document.querySelector('.hutUI');

// -------- ACTIONS PLAYER
const buildHut = document.querySelector('.buildHut');


// -------- ACTIONS BUILDING
const sleepPower = document.querySelector('.sleep');
const overlayButton = document.querySelector('.overlayButton');
const buildingActionsDiv = document.querySelector('.building-actions');








//----------------------------------------------------
// ---------------------LOGIN-------------------------
// ----------------------------------------------------

loginButton.addEventListener('click', function () {
	if (nameSelection.value == '') {
		nameSelection.classList.add('wrong');
		nameSelection.addEventListener('click', function () {
			nameSelection.classList.remove('wrong');
		});
		loginButton.value = 'Retry';
	} else {
		gameState.player.name = nameSelection.value;
		statsName.innerHTML = gameState.player.name;
		loginSection.classList.add('hidden');
		storyIntro.classList.add('visible');
	}
});

// ----------------------------------------------------
// ----------------DATA AND GAME STATE ----------------
// ----------------------------------------------------

//buildings
let buildings = {
	hall: {
		cost: 75,
	},
};

// AXE
let axe = [
	{
		increment: 1,
		cost: 10,
	},
	{
		increment: 2,
		cost: 75,
	},
	{
		increment: 3,
		cost: 170,
	},
	{
		increment: 4,
		cost: 280,
	},
];



// BUILDINGACTIONS
let sleepAction;
let huntAction;
let buildingActions = [
	(sleepAction = [
		{
			sleepCooldown: 10000,
			sleepCooldownSec: 10,
		},
		{
			sleepCooldown: 8000,
			sleepCooldownSec: 8,
		},
	]),
	(huntAction = [
		{
			// in functie de nivel sa poti
		},
	]),
];

// GAME STATE
let gameState = {
	player: {
		name: ``,
		health: 100,
		maxHealth: 100,
		stamina: 100,
		maxStamina: 100,
		hunger: 100,
		maxHunger: 100,
		wood: 0,
		stone: 0,
		level: 0,
		experience: 0,
	},

	woodEngine: {
		woodIncrement: 1,
		axeLevel: 0,
	},

	stoneEngine: {
		stoneIncrement: 1,
		pickaxeLevel: 0,
	},

	village: {
		buildings: {
			hall: 0,
		},
		persons: 0,
	},


	leveling: [
		{
			requiredExp: 100 // lvl1
		},
		{
			requiredExp: 222 // lvl2
		},
		{
			requiredExp: 387 // lvl3
		},
		{
			requiredExp: 584 // lvl4
		},
		{
			requiredExp: 812 // lvl5
		}
	]

};

// ----------------------------------------------------
// --------------------FUNCTIONS-----------------------
// ----------------------------------------------------

// don`t know yet if it works to be tested more
function checkMaxValue() {
	if (gameState.player.health >= gameState.player.maxHealth) {
		gameState.player.health = gameState.player.maxHealth;
	} else if (gameState.player.stamina >= gameState.player.maxStamina) {
		gameState.player.stamina = gameState.player.maxStamina;
	} else if (gameState.player.hunger >= gameState.player.maxHunger) {
		gameState.player.hunger = gameState.player.maxHunger;
	}
}

function level2Func(){
	let once = true
	if(once){
			godsHand();
			gatherStoneBtn.style.visibility = 'visible';
			stage1();
			hutFunc();
			showFirst(actionUI);
			once = false
	}

}

//increase engines
function increaseWood(amount) {
	gameState.player.wood += amount;
	receiveExp(1)
}

function increaseStone(amount) {
	gameState.player.stone += amount;
	sumStone.innerText = gameState.player.stone;
	receiveExp(2)
}

function addStamina(amount) {
	if (gameState.player.stamina <= gameState.player.maxStamina) {
		gameState.player.stamina += amount;
		checkMaxValue();
		if (gameState.player.stamina <= 30) {
			playerStaminaAmmount.classList.add('low');
		} else {
			playerStaminaAmmount.classList.remove('low');
		}
	}
	if (gameState.player.maxStamina < gameState.player.stamina + amount) {
		amount = gameState.player.maxStamina - gameState.player.stamina;
	}
}

function receiveExp(amount) {
	gameState.player.experience += amount

	
	if (gameState.player.experience >= gameState.leveling[gameState.player.level].requiredExp) {
		gameState.player.level++
		gameState.player.experience = 0;
		let actualLevel = gameState.player.level + 1;
		currLvl.innerText = `Level: ${actualLevel}`
	}
	switch (gameState.player.level + 1) {
		case 2:
			level2Func()
			break;
	
		case 3:
			console.log('lvl 3');
			break;
		
		case 4:
			console.log('lvl4');
			break;
		
		case 4:
			console.log('lvl5');
			break;
	}
	currExpNr.innerText = gameState.player.experience
	reqExpNr.innerText = gameState.leveling[gameState.player.level].requiredExp
	
}


// decrease engines
function health(amount) {
	let intervalHealth = function () {
		gameState.player.health -= amount;
	};
	let interval = setInterval(intervalHealth(), 5000);
	playerHealthAmmount.textContent = `Health: ${gameState.player.health}/${gameState.player.maxHealth}`;
	if (gameState.player.health <= 0) {
		gatherWoodBtn.style.display = 'none';
		axeUpBtn.style.display = 'none';
		gatherStoneBtn.style.display = 'none'
		
		clearInterval(interval);
		storyline.innerHTML = `<p class ="storyText"> You have lost the game </p>`;
	}
}

function hunger(amount) {
	gameState.player.hunger -= amount;
	playerHungerAmmount.textContent = `Hunger: ${gameState.player.hunger.toFixed(
		1
	)}/${gameState.player.maxHunger}`;
	if (gameState.player.hunger <= 0) {
		health(5);
	}
	if (gameState.player.hunger <= 0) {
		gameState.player.hunger = 0;
	}
	if (gameState.player.hunger <= 30) {
		playerHungerAmmount.classList.add('low');
	} else {
		playerHungerAmmount.classList.remove('low');
	}
	checkMaxValue();
}

function stamina(amount) {
	gameState.player.stamina -= amount;
	playerStaminaAmmount.textContent = `Stamina: ${gameState.player.stamina}/${gameState.player.maxStamina}`;
	if (gameState.player.stamina <= 30) {
		playerStaminaAmmount.classList.add('low');
	} else {
		playerStaminaAmmount.classList.remove('low');
	}
	if (gameState.player.stamina <= 50) {
		hunger(0.4);
	}
	if (gameState.player.stamina <= 30) {
		hunger(0.8);
	}
	if (gameState.player.stamina <= 0) {
		gameState.player.stamina = 0;
		playerStaminaAmmount.textContent = `Stamina: ${gameState.player.stamina}/${gameState.player.maxStamina}`;
		setInterval(hunger(2), 5000);
	}

	if (gameState.player.stamina <= 0) {
		gameState.player.stamina = 0;
	}
	checkMaxValue();
}

const autoScroll = function () {
	setTimeout(() => {
		storyline.scrollTop = storyline.scrollHeight;
	}, 100);
};

// global buffs (RUNES SYSTEM ETC)
function godsHand() {
	storyline.innerHTML += `
        <p class="storyText">. </p>
        <p class="storyText">Long days have passed, and finally the Gods have made up their minds to answer ${gameState.player.name}'s call, they gifted him with  The Gods hand: 1 wood/s, 0.5 stone/s…</p>
        <p class="storyText">. </p>
        `;
	autoScroll();
	setInterval(() => {
		gameState.player.wood += 1;
		gameState.player.stone += 0.5;
		sumWood.textContent = `${gameState.player.wood}`;
		sumStone.textContent = `${gameState.player.stone}`;
	}, 1000);
	godsHand = function () {};
}

// Placeholder function
let stage1 = function () {
	player.classList.add('focused');
	if (actionUI.classList.contains('showUI')) {
		player.classList.remove('focused');
	}
	stage1 = function () {};
};

let hutFunc = function () {
	buildHut.classList.toggle('visible');
	buildHut.classList.add('focused');
	hutFunc = function () {};
};

//window manager
function closeWindow(target) {
	if (!target.classList.contains('visible1'))
		target.classList.toggle('visible1');
	else if (target.classList.contains('visible1')) {
		target.classList.toggle('visible1');
	}
}

function showFirst(target) {
	showUpStats.classList.remove('showFirst');
	showUpInv.classList.remove('showFirst');
	hutUI.classList.remove('showFirst');
	actionUI.classList.remove('showFirst');
	target.classList.toggle('showFirst');
}

function removeFocus(target) {
	if (target.classList.contains('focused')) {
		target.classList.remove('focused');
	}
}

// inspired from w3schools https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement(target, div) {
	var pos = [0, 0, 0, 0];
	target.onmousedown = dragMouseDown;

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		pos[2] = e.clientX;
		pos[3] = e.clientY;
		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		pos[0] = pos[2] - e.clientX;
		pos[1] = pos[3] - e.clientY;
		pos[2] = e.clientX;
		pos[3] = e.clientY;
		div.style.top = div.offsetTop - pos[1] + 'px';
		div.style.left = div.offsetLeft - pos[0] + 'px';
	}

	function closeDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;
	}
}
dragElement(document.querySelector('.statsHeader'), showUpStats);
dragElement(document.querySelector('.invHeader'), showUpInv);

// ----------------------------------------------------
// -----------------EVENT LISTENERS -------------------
// ----------------------------------------------------

// Window management listeners
openInventory.addEventListener('click', () => {
	closeWindow(showUpInv);
	removeFocus(openInventory);
	showFirst(showUpInv);
});

closeInvBtn.addEventListener('click', () => {
	closeWindow(showUpInv);
});

openStats.addEventListener('click', () => {
	closeWindow(showUpStats);
	removeFocus(openStats);
	showFirst(showUpStats);
});

closeStatsBtn.addEventListener('click', () => {
	closeWindow(showUpStats);
});

showUpInv.addEventListener('mousedown', function () {
	showFirst(showUpInv);
});

showUpStats.addEventListener('mousedown', function () {
	showFirst(showUpStats);
});

hutUI.addEventListener('mousedown', function () {
	showFirst(hutUI);
});

actionUI.addEventListener('mousedown', function () {
	showFirst(actionUI);
});

// Game mechanics - primal

gatherWoodBtn.addEventListener('click', function () {
	hunger(0.2);
	stamina(1);
	increaseWood(gameState.woodEngine.woodIncrement);
	sumWood.textContent = gameState.player.wood;
	if (gameState.player.wood >= 20) {
		axeUpBtn.style.visibility = 'visible';
	}


});

gatherStoneBtn.addEventListener('click', function () {
	hunger(0.5);
	stamina(2);
	sumStone.textContent = gameState.player.stone;
	increaseStone(gameState.stoneEngine.stoneIncrement);
});

axeUpBtn.addEventListener('click', () => {
	if (gameState.player.wood - axe[gameState.woodEngine.axeLevel].cost <= 0) {
		console.log('not enough wood');
	} else {
		gameState.woodEngine.woodIncrement +=
			axe[gameState.woodEngine.axeLevel].increment;
		gameState.player.wood -= axe[gameState.woodEngine.axeLevel].cost;
		gameState.woodEngine.axeLevel++;

		sumWood.textContent = `Wood: ${gameState.player.wood}`;
		woodAmmount.textContent = `${gameState.woodEngine.woodIncrement}/click`;
		axeUpgrade.textContent = `+${gameState.woodEngine.axeLevel}`;
		costWood.innerHTML = `(${axe[gameState.woodEngine.axeLevel].cost} Wood)`;
	}
});

//NPC`s - BUILDINGS

player.addEventListener('click', function () {
	actionUI.classList.toggle('showUI');
	showFirst(actionUI);
	removeFocus(player);
});

hut.addEventListener('click', function () {
	hutUI.classList.toggle('showUI');
	showFirst(hutUI);
	removeFocus(hut);
});

// ACTIONS
buildHut.addEventListener('click', function () {
	if (gameState.player.wood >= buildings.hall.cost) {
		hut.classList.add('visible');
		gameState.player.wood = gameState.player.wood - buildings.hall.cost;
		sumWood.textContent = `Wood: ${gameState.player.wood}`;
		hut.classList.add('focused');
		buildHut.style.display = 'none';
		if (costHut.classList.contains('low')) {
			costHut.classList.remove('low');
		}
	} else {
		costHut.classList.add('low');
	}
});

// placeholder untill finishing the data base
let sleepCooldown = 10000;
let sleepUsed = false;
let sleepLvl0 = 70;

// SLEEP ACTION TEMPLATE FOR EATING ETC
sleepPower.addEventListener('click', function () {
	removeFocus(sleepPower);

	if (gameState.player.maxStamina < gameState.player.stamina + sleepLvl0) {
		let rest;
		rest = gameState.player.maxStamina - gameState.player.stamina;
		addStamina(rest);
	} else if (
		gameState.player.stamina + sleepLvl0 <=
		gameState.player.maxStamina
	) {
		addStamina(sleepLvl0);
	}

	playerStaminaAmmount.textContent = `Stamina: ${gameState.player.stamina}/${gameState.player.maxStamina}`;
	sleepUsed = true;
	sleepPower.disabled = true;
	gatherWoodBtn.disabled = true;
	axeUpBtn.disabled = true;
	gatherStoneBtn.disabled = true;
	if (sleepUsed) {
		overlayButton.classList.add('animationButton');
		overlayButton.style.animation = `disable ${buildingActions[0][0].sleepCooldownSec}s`;
		setTimeout(() => {
			sleepPower.disabled = false;
			gatherWoodBtn.disabled = false;
			axeUpBtn.disabled = false;
			gatherStoneBtn.disabled = false;
			if (overlayButton.classList.contains('animationButton')) {
				overlayButton.classList.remove('animationButton');
				overlayButton.style.animation = 'none';
			}
		}, sleepCooldown);
	}
});
