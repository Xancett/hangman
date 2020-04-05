// Start off by grabbing information
(function () {
    // Pause the circle animation
    document.getElementById('circle').classList.toggle('paused');
    // Get the stats updated
    GetData(UpdateStats);
})()

// Gets the data from the server
async function GetData(callback) {
    try {
        // Setup request
        const jsonData = { inforequest : "CheckStats" };
        const information = {
            method : 'POST',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify(jsonData)
        };
        // Send out information
        const response = await fetch('/hangmanapi', information);
        // Wait for the response
        const data = await response.json();
        callback(data);
        document.getElementById('circle').classList.toggle('paused');
    } catch (error) {
        // Setup fake data
        const data = { 
            // First 3 words are the ones with the most wins
            word1: { 'word': 'hungry', 'win': 5, 'lose': 2},
            word2: { 'word': 'for', 'win': 6, 'lose': 1},
            word3: { 'word': 'apples', 'win': 7, 'lose': 0},
            // Next 3 words are the ones with the most losses
            word4: { 'word': 'lame', 'win': 2, 'lose': 7},
            word5: { 'word': 'job', 'win': 1, 'lose': 6},
            word6: { 'word': 'Jerry', 'win': 1, 'lose': 5},
            // Last is the number of wins and losses
            Wins: 20,
            Losses: 50
        };
        callback(data);
        document.getElementById('circle').classList.toggle('paused');
    }
    
}

// Updates the information displayed in the table and pie chart
function UpdateStats(data) {
    // Loop through the keys of the dataset
    for (i = 1; i < 7; i++) {
        let element = (i < 4 ? 'Easyword' : 'Hardword') + i.toString();
        // Loop through the values of each key of the key in the dataset
        for (j = 0; j < 3; j++) {
            if (data[Object.keys(data)[i - 1]][Object.keys(data[Object.keys(data)[i - 1]])[j]] == "undefined") {
                document.getElementById(element).getElementsByTagName('td')[j].innerHTML = "";
            } else {
                document.getElementById(element).getElementsByTagName('td')[j].innerHTML = data[Object.keys(data)[i - 1]][Object.keys(data[Object.keys(data)[i - 1]])[j]];
            }
        }
    }
    // Set the win percentage
    let winPercent = (data.total_wins / (data.total_wins + data.total_losses)) * 100;
    winPercent = parseInt(winPercent.toString());
    document.getElementById('winpercent').innerHTML = "Win percentage: " + winPercent + "%";
    // Send that percentage to css to draw the pie accordingly
    document.documentElement.style.setProperty('--fill-percent', winPercent);
}