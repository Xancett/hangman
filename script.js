var wordIndex;

// Initialize everything
function Initialize() {
    // Give all buttons the functions needed
    const letters = document.querySelectorAll('button');
    letters.forEach(button => {
        button.addEventListener('click', () => {
            // Check if button has been chosen
            if (button.classList.contains('chosen')) { return; }
            // Add the classlist
            button.classList.add('chosen');
            // Check the letter
            CheckLeter(button.innerHTML.toString());
        })
    })
    // Reset word index
    wordIndex = -1;
    // Reset the displayed word
    myWordDisplayed.innerHTML = '';
    // call function to get a new word and display it
    GetNewWord();
}

// Get a new word
async function GetNewWord() {
    // Setup request
    const jsonData = { inforequest : "GetNewWord" };
    const information = {
        method : 'POST',
        headers : { 'Content-Type': 'application/json' },
        body : JSON.stringify(jsonData)
    };
    // Send out information
    const response = await fetch('/hangmanapi', information);
    // Wait for the response
    const data = await response.json();
    // Setup word to display
    DisplayWord(data.length);
    // Save index
    wordIndex = data.index;
}

// Display the word with the given length
function DisplayWord(wordLength) {
    let myWord = '';
    // Loop through
    for (i = 1; i < wordLength; i++) {
        myWord += '_ ';
    }
    // One last one without the additional space at the end
    myWord += '_';
    // Set the html doc to reflect the string
    document.getElementById('displayedWord').innerHTML = myWord;
}

// Check the letter with the given letter
async function CheckLetter(letter) {
    // Setup request
    const jsonData = { inforequest : "CheckLetter", letter: letter, index: wordIndex };
    const information = {
        method : 'POST',
        headers : { 'Content-Type': 'application/json' },
        body : JSON.stringify(jsonData)
    };
    const response = await fetch('/hangmanapi', information);
    const data = await response.json();
    // Parse out the data
    if (data.array.length == 0) {
        // We did not find a letter in the word
        UpdateImage();
    } else {
        // Update the word with that letter
    }
    // Check if we have lost the game or not

}

// Updates the image for hangman
function UpdateImage() {
    // Get the current turn number by the image itself
    let turnNumber = 0; // Assume 0 as default
    turnNumber = parseInt(document.getElementById('hangman').src.split("images/")[1].charAt(0));
    // Update the number and then update the image
    document.getElementById('hangman').src = "images/" + (turnNumber + 1).toString() + ".svg";
}





/*
var myWord = getWord();
var myWordDisplayed = document.getElementById('displayedWord');
var hangmanImage = document.getElementById('hangman');
var myHiddenWord = hideWord(myWord);
var turnNumber = 1; // Starts at 1, ends at 7

// Go through each button and attach a listener
const letters = document.querySelectorAll('button');
letters.forEach(button => {
    button.addEventListener('click', () => {
        // Check if the game is over
        if (myHiddenWord == myWord) { return; }
        // Check if button has already been chosen
        if (button.classList.contains('chosen')) { return; }
        button.classList.add('chosen');
        checkLetter(button.innerHTML.toString().toLowerCase());
    })
})

// Word is the word to guess with _ in place if a letter is not guessed
function wordDisplay(word) {
    // Give displayWord the first letter
    let displayWord = word[0].toString();
    // Loop through each letter
    for (i = 1; i < word.length; i++) {
        // Add a space where we want
        if (word[i] == '_' || word[i - 1] == '_') {
            displayWord += ' ';
        }
        displayWord += word[i].toString();
    }
    // Return the word
    return displayWord;
}

// Check if letter is in the word
function checkLetter(letter) {
    if (myWord.toLowerCase().indexOf(letter) != -1) {
        let tempWord = '';
        for (i = 0; i < myWord.length; i++) {
            if (myWord[i].toLowerCase() == letter) {
                tempWord += myWord[i].toString();
            } else {
                tempWord += myHiddenWord[i].toString();
            }
        }
        // Replace the word
        myHiddenWord = tempWord.toString();
        myWordDisplayed.innerHTML = wordDisplay(myHiddenWord);
    } else {
        turnNumber++;
        updateImage();
        // Check if the game is over
        if (turnNumber > 6) {
            myHiddenWord = myWord;
            myWordDisplayed.innerHTML = myWord;
        }
    }
}

function hideWord(word) {
    let newWord = '';
    for (i = 0; i < word.length; i++) {
        newWord += '_';
    }
    return newWord;
}

function updateImage() {
    hangmanImage.src = "images/" + turnNumber.toString() + ".svg";
}

// Get a new word
function getWord() {
    return 'Hello';
}
*/