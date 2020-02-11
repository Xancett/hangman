var myWord = getWord();
var myWordDisplayed = document.getElementById('displayedWord');
var myHiddenWord = hideWord(myWord);


// Go through each button and attach a listener
const letters = document.querySelectorAll('button');
letters.forEach(button => {
    button.addEventListener('click', () => {
        // Check if button has already been chosen
        if (button.classList.contains('chosen')) { return; }
        button.classList.add('chosen');
        checkLetter(button.innerHTML.toString().toLowerCase());
        console.debug("Letter sent is: " + button.innerHTML.toString())
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
        console.debug("No");
        console.debug("My word: " + myWord.toString() + " guessed: " + letter.toString());
    }
}

function hideWord(word) {
    let newWord = '';
    for (i = 0; i < word.length; i++) {
        newWord += '_';
    }
    return newWord;
}

// Get a new word
function getWord() {
    return 'Hello';
}