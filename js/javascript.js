const wordEl = document.getElementById('word');
const wrongLetterEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
// The figure part turns to an array now, will be iterated later when wrong letter keyed.
const figureParts = document.querySelectorAll('.figure-part');

const getTips = document.getElementById('tips'); // **

// Hardcode some words here for guess ....
const words = ['application', 'programming', 'interface', 'wizard', 'python', 'canada'];
const tips = [
    'Something to apply and run',
    'Coding',
    'A panel or application to interactive with',
    'A professional that considered can release a magic',
    'A very popular programming language',
    'The country we live in'
];

// ** randomly pick the word from array
// ** let selectedWord = words[Math.floor(Math.random() * words.length)]

//**
let indexWordTips = Math.floor(Math.random() * words.length);
let selectedWord = words[indexWordTips];
let selectedTips = tips[indexWordTips];

getTips.innerHTML = selectedTips;
//**



// console.log(selectedWord);

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
    // console.log('update wrong');
    // I think: if we need to include tag without arguments, then use ''; else use `` as below
    // Display wrong letters on right side. (Why there is an ',' between each displayed letters?)
    wrongLetterEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong try</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // display the hangman svg by changing the display style.
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    //check if lost
    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost.... 🙄';
        popup.style.display = 'flex';
    }
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

//Restart the game and play again
playAgainBtn.addEventListener('click', () => {
    // Empty the arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);


    //** selectedWord = words[Math.floor(Math.random() * words.length)];

    indexWordTips = Math.floor(Math.random() * words.length)
    selectedWord = words[indexWordTips];
    selectedTips = tips[indexWordTips];
    
    getTips.innerHTML = selectedTips;


    displayWord();

    updateWrongLetterEl();

    popup.style.display = 'none';
});

displayWord();