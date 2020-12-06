const wordEl = document.getElementById('word');
const wrongLetterEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard', 'python', 'canada'];

// randomly pick the word from array
let selectedWord = words[Math.floor(Math.random() * words.length)]

//console.log(selectedWord);

const correctLetters = [];
const wrongLetters = [];

//show the hidden word
function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(letter => `
        <span class = "letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `).join('')}
    `;
}

displayWord()