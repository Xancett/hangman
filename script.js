var wordIndex;

// Start off the game
(function () {
    Initialize();
})()

// Initialize everything
function Initialize() {
    // Give all buttons the functions needed
    const letters = document.querySelectorAll('#letterbutton');
    letters.forEach(button => {
        // Show button
        button.hidden = false;
        // Remove chosen attribute if there is one
        if (button.classList.contains('chosen')) { 
            button.classList.remove('chosen'); 
        }
        button.addEventListener('click', () => {
            // Check if button has been chosen
            if (button.classList.contains('chosen')) { return; }
            // Add the classlist
            button.classList.add('chosen');
            // Check the letter
            CheckLetter(button.innerHTML.toString());
        })
    })
    // Enable restart and stats buttons
    const endGame = document.querySelectorAll('#endgamebutton');
    endGame.forEach(button => {
        button.hidden = true;
    })
    // Reset the image for hangman
    ResetHangman();
    // Reset word index
    wordIndex = -1;
    // Reset the displayed word
    document.getElementById('displayedWord').innerHTML = '';
    // call function to get a new word and display it
    GetNewWord();
}

// Get a new word
async function GetNewWord() {
    try {
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
    } catch (error) {
        console.log(error);
        // Set debugmode
        wordIndex = -1;
        DisplayWord(5);
    }
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
    try{
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
        if (Object.values(JSON.parse(data.array)).length == 0) {
            // We did not find a letter in the word
            UpdateImage();
        } else {
            // Update the word with that letter
            UpdateWord(data.array, letter);
        }
    } catch (error) {
        console.log(error);
        // Set debugmode
        let debugWord = 'apple';
        if (debugWord.toLowerCase().indexOf(letter.toLowerCase()) == -1){
            // Didn't find it
            UpdateImage();
            console.log(letter);
        } else {
            // Build array to send
            let arrLetters = [];
            for (i = 0; i < debugWord.length; i++) {
                if (debugWord[i].toLowerCase() == letter.toLowerCase()) {
                    arrLetters.push(i);
                }
            }
            // Update word with that letter
            UpdateWord(JSON.stringify('array: ' + arrLetters), letter);
        }
    }
}

// Updates the image for hangman
function UpdateImage() {
    // Get the current turn number by the image itself
    let turnNumber = 0; // Assume 0 as default
    turnNumber = parseInt(document.getElementById('hangman').src.split("images/")[1].charAt(0));
    // Update the number and then update the image
    document.getElementById('hangman').src = "images/" + (turnNumber + 1).toString() + ".svg";
    // Check if we have reached gameover
    if (turnNumber >= 6) {
        GameOver();
    }
}

// Resets the hangman image back to the first one
function ResetHangman() {
    document.getElementById('hangman').src = "images/1.svg";
}

// Updates the word using the indexes in the array and the letter
function UpdateWord(array, letter) {
    // Get word without spaces
    let myWord = document.getElementById('displayedWord').innerHTML.split(" ");
    let displayedWord = '';
    for (i = 0; i < myWord.length; i++) {
        if (Object.values(JSON.parse(array)).includes(i.toString())) {
            displayedWord += letter + ' ';
        } else {
            displayedWord += myWord[i] + ' ';
        }
    }
    // Trim off the last space
    displayedWord = displayedWord.substr(0, displayedWord.length - 1);
    // Push word back into the html
    document.getElementById('displayedWord').innerHTML = displayedWord;
    // Check if we have won the game
    if (!displayedWord.includes('_')) {
        GameOver();
    }
}


// Called when the game is completed
function GameOver() {
    // Disable all buttons
    const letters = document.querySelectorAll('button');
    letters.forEach(button => {
        button.hidden = true;
    })
    // Enable restart and stats buttons
    const endGame = document.querySelectorAll('#endgamebutton');
    endGame.forEach(button => {
        button.hidden = false;
        if (button.getAttribute('data-value') == "restart") {
            button.addEventListener('click', () => {
                Initialize();
            })
        } else {
            button.addEventListener('click', () => {
                window.location.href = window.location.href + 'stats/';
            })
        }
    })
    // Check if won, then send data to server
    EndGame();
}

// Called when the game is over and the word is checked
async function EndGame() {
    try {
        // Setup request
        const jsonData = { inforequest : "CheckWord", word : document.getElementById('displayedWord').innerHTML.replace(/\s+/g, ''), index : wordIndex};
        const information = {
            method : 'POST',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify(jsonData)
        };
        // Send out information
        const response = await fetch('/hangmanapi', information);
        // Wait for the response
        const data = await response.json();
        // Check if success
        if (data.info == 'Failure') {
            // Get and display the word
            document.getElementById('displayedWord').innerHTML = data.word.toUpperCase();
        } else {
            console.log('Word guess was a success');
        }
    } catch (error) {
        console.log(error);
        // Set debugmode
        document.getElementById('displayedWord').innerHTML = 'apple'.toUpperCase();
    }
}