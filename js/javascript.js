const wordEl = document.getElementById('word');
const wrongLetterEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

//Hardcode some words here for guess ....
const words = ['application', 'programming', 'interface', 'wizard', 'python', 'canada'];

// randomly pick the word from array
let selectedWord = words[Math.floor(Math.random() * words.length)]

//    console.log(selectedWord);

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
    const innerWord = wordEl.innerText.replace(/\n/g, '');
    //console.log(wordEl.innerText, innerWord);
    if(innerWord === selectedWord) {
        finalMessage.innerText = 'Great! You won! 😀';
        popup.style.display = 'flex';
    }
}

//update the wrong letters
function updateWrongLetterEl() {
    console.log('update wrong');
}

//show notification
function showNotificaiton() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000)
}

//keydown letter press
window.addEventListener('keydown', e => {
    if((e.key >= 'a' && e.key <= 'z') || (e.key >= 'A' && e.key <= 'Z')) {
        const letter = e.key;
        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                
                displayWord();
            } else {
                showNotificaiton();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLetterEl();
            }else {
                showNotificaiton();
            }
        }
    } 
});

displayWord();