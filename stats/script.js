// Start off by grabbing information
(function () {
    GetData(UpdateStats);
})()

// Gets the data from the server
async function GetData(callback) {
    try {
        // Setup request
        const jsonData = { inforequest : "Stats" };
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
            // Last is the percentage as an integer of winning games
            win: 20
        };
        callback(data);
    }
}

// Updates the information displayed in the table and pie chart
function UpdateStats(data) {
    console.log('callback received');
    console.log(data);
    console.log(data.word1.word);
}