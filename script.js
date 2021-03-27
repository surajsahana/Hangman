const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const hintText = document.getElementById('hint');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['shoaib akhtar', 'srilanka', 'kane williamson', 'sachin tendulkar', 'mark boucher', 'brian lara', 'krunal pandya', 'mumbai indians',
'muttiah muralitharan', 'irfan pathan', 'raj narain', 'anil basu', 'madhya pradesh', 'pawan kumar chamling', 'womesh chandra bonnerjee', 'abdul kalam azad', 'vijaya lakshmi pandit', 'jawaharlal nehru',
'sheikh mujibur rahman', 'krishnamurthy venkata subramanian', 'russia', 'sultanate', 'canada', 'switzerland', 'kazakhstan', 'chile', 'san marino', 'vatican city', 'uruguay', 'belarus', 'djibouti',
'ankhen', 'guddi', 'amjad khan', 'ddlj','pehla nasha', 'sarfarosh', 'phool aur kaante', 'shakti kapoor', 'manoj bajpayee',
'brazil', 'qatar', 'miroslav klose', 'franz beckenbauer', 'shane long',
'wimbledon', 'novak djokovic', 'naomi osaka', 'strawberries', 'match', 'pep guardiola'];
const hint_words = ["Rawalpindi Express", "1996 Cricket World Cup Winner", "2019 Cricket World Cup MOM", "Most Test Centuries",
"Most dismissals by wicketkeeper", "Highest Individual Test Scorer", "Fastest Indian Half Centurian in ODI", "Most IPL Winning Franchise",
"Highest Test Wicket Taker", "Only Indian to take a hat-trick in a Test Match", "Person who had defeated Indira Gandhi in Lok Sabha election 1977",
"Won Lok Sabha election with highest margin of votes", "This state has largest number of seats reverved for ST's in Lok Sabha", "Longest serving Chief Minister in India",
"First President of Indian National Congress", "11th President of India", "First Indain woman President of the UN General Assembly", "Proposed the Preamble before the Drafting Committee of the Constitution",
"Winner of 2020 Gandhi Peace Prize", "Chief Economic Advisor", "World\'s 10 coldest cities are located in this county", "Type of government in Oman", "Second Largest Country (in terms of area)",
"This country is divided into cantons", "Largest landlocked country", "Long, Narrow country", "World\'s oldest republic", "Smallest fully independent nation", "Won Gold Medal in 1924 olympics", "Formerly known as White Russia",
"Formerly known as French Somaliland",
"First Indian Film to be released commercially in Italy", "First film in which Amitabh and Jaya Bachchan worked together", "Played Gabbar Singh", "Longest running film in Indian theatres", "The only film in Bollywood where Aamir Khan & Shah Rukh Khan shared a frame",
"Nawazuddin Siddiqui debut film", "Ajay Devgn debut film", "Bollywood actor who starred in maximum number of movies", "Best Actor (Male) in National Film Awards 2020",
"This country won the most number of Football World Cups", "2022 Fifa World Cup host", "Most goals in Fifa World Cup history", "Won FIFA World cup both as a player and a manager", "Scored Fastest EPL goal",
"This Grand Slam tournament is played on grass court", "2021 Australian Open winner", "2020 US Open winner", "This fruit is traditionally served with cream at Wimbledon", "Game, Set and ?", "Won Champions League in his 1st season as a manager"];

console.log(words.length)
console.log(hint_words.length)

let number_random = Math.floor(Math.random() * words.length);

const quesSeen = [];
while(quesSeen.includes(number_random)) {
	number_random = Math.floor(Math.random() * words.length);
}

quesSeen.push(number_random);
let selectedWord = words[number_random];
let selectedHint = hint_words[number_random];


const correctLetters = [];
const wrongLetters = [];


// show the hidden word
function displayWord() {
	hintText.innerHTML = `${selectedHint}`;
	wordEl.innerHTML = `
		${selectedWord
			.split('')
			.map((letter) => `
				<span class = "
					${letter !== ' ' ? 'letter' : 'empty-space'}
				">
					${correctLetters.includes(letter) ? letter : ''}
				</span>			
			`).join('')
		}
	`;

	const innerWord = wordEl.innerText.replace(/\n/g, '');
	const selectedWordClean = selectedWord.replace(/\s/g, '');

	if(innerWord === selectedWordClean) {
		finalMessage.innerText = 'Congratulations! You Won! 😊';
		popup.style.display = 'flex';
	}
}

//  Update the wrong letter
function updateWrongLettersEl() {
	// Displace wrong letters
	wrongLettersEl.innerHTML = `
		${wrongLetters.length > 0 ? '<p>Wrong<p>' : ''}
		${wrongLetters.map(letter => `<span>${letter}<span>`)}
	`;

	// Display Parts
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		if(index < errors) {
			part.style.display = 'block';
		}else {
			part.style.display = 'none';
		}
	});

	// Check if lost
	if(wrongLetters.length === figureParts.length) {
		finalMessage.innerText = 'Unfortunately, You Lost. 😢';
		popup.style.display = 'flex';
	}
}

// Show Notification
function showNotification() {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}

// Keydown letter press

window.addEventListener('keydown', e => {

	if(e.keyCode >= 65 && e.keyCode <= 90) {

		const letter = e.key;

		if(selectedWord.includes(letter)) {
			if(!correctLetters.includes(letter)) {
				correctLetters.push(letter);

				displayWord();
			}else {
				showNotification();
			}
		}else {
			if(!wrongLetters.includes(letter)) {
				wrongLetters.push(letter);

				updateWrongLettersEl();
			}else {
				showNotification();
			}
		}
	}
});

// Play Again button
playAgainBtn.addEventListener('click', () => {
	correctLetters.splice(0);
	wrongLetters.splice(0);

	number_random = Math.floor(Math.random() * words.length);

	while(quesSeen.includes(number_random)) {
		number_random = Math.floor(Math.random() * words.length);
	}

	if(quesSeen.length > 20){
		quesSeen.shift();
	}

	quesSeen.push(number_random);

	selectedWord = words[number_random];
	selectedHint = hint_words[number_random];
	displayWord();

	updateWrongLettersEl();

	popup.style.display = 'none';
});

displayWord();
