


// Go through each button and attach a listener
const letters = document.querySelectorAll('button');
letters.forEach(button => {
    button.addEventListener('click', () => {
        // Check if button has already been chosen
        if (button.classList.contains('chosen')) { return; }
        button.classList.add('chosen');
        console.debug("Letter sent is: " + button.innerHTML.toString())
    })
})
