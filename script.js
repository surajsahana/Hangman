const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const hintText = document.getElementById('hint');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['yugoslavia', 'shoaib akhtar', 'srilanka', 'kane williamson'];
const hint_words = ["European country", "Rawalpindi Express", "1996 Cricket World Cup Winner", "2019 Cricket World Cup MOM"]

let number_random = Math.floor(Math.random() * words.length);

let selectedWord = words[number_random];
let selectedHint = hint_words[number_random];



console.log(selectedHint);

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
	selectedWord = words[number_random];
	selectedHint = hint_words[number_random];
	displayWord();

	updateWrongLettersEl();

	popup.style.display = 'none';
});

displayWord();