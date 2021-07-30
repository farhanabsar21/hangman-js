const wordsEL = document.getElementById("word")
const wrongLettersEl = document.getElementById("wrong-letters")
const playAgainBtn = document.getElementById("play-again")
const popup = document.getElementById("popup-container")
const notification = document.getElementById("notification-container")
const finalMessage = document.getElementById("final-message")
const figureParts = document.querySelectorAll(".figure-part")

// random word array
const words = ["application", "programming", "interface", "wizard"]
let randomWords = words[Math.floor(Math.random() * words.length)]

const correctLettersCollection = [];
const wrongLettersCollection = [];

// show hidden word
const displayWord = () => {
    wordsEL.innerHTML = `
        ${randomWords.split("").map(letter => 
            `<span class="letter">${correctLettersCollection.includes(letter) ? letter : ""}</span>`    
        ).join("")}
    `;
    // now we are getting innerText of wordEl line by line 
    // but we want to build them side by side
    
    const innerWord = wordsEL.innerText.replace(/\n/g, "")
    if(innerWord === randomWords){
        finalMessage.innerText = "Congrats! you have won!"
        popup.style.display = "flex"
    }
}

// update wrong letters 
const updateWrongLettersEl = () => {

    // display wrong letters
    wrongLettersEl.innerHTML = `
        ${wrongLettersCollection.length > 0 ? '<p>Wrong</p>' : ""}
        ${wrongLettersCollection.map(letter => `<span>${letter}</span>`)}
    `
    // display the hangman
    figureParts.forEach((part, index) => {
        const error = wrongLettersCollection.length;
        // we need to fill up the svg till iterating the index
        if(index < error){
            part.style.display = "block"
        }else{
            part.style.display = "none"
        }
    })

    // display you are lost
    if(wrongLettersCollection.length === figureParts.length){
        finalMessage.innerText = "Ah, you are lost"
        popup.style.display = "flex"
    }
}

// show notification 
const showNotification = () => {
    notification.classList.add("show")
    // now we need to clear the notification after 2 sec
    setTimeout(() => {
        notification.classList.remove("show")
    }, 2000);
}

// window keydown object
window.addEventListener("keydown", e => {
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const pressLetter = e.key;
        // pushing correct letter to correct
        if(randomWords.includes(pressLetter)){
            // we check if pressletter is in correct letter array
            if(!correctLettersCollection.includes(pressLetter)){
                correctLettersCollection.push(pressLetter)
                // then update the display word every time we press
                displayWord()
            }
            else{
                showNotification()
            }
        }
        // pushing wrong letter to wrong
        else{
            if(!wrongLettersCollection.includes(pressLetter)){
                wrongLettersCollection.push(pressLetter)
                updateWrongLettersEl()
            }else{
                showNotification()
            }
        }
    }
})

// play again 
playAgainBtn.addEventListener("click", ()=>{
    // empty arrays
    correctLettersCollection.splice(0)
    wrongLettersCollection.splice(0)

    randomWords = words[Math.floor(Math.random() * words.length)]
    // update display
    displayWord()
    updateWrongLettersEl()
    popup.style.display = "none"
})

displayWord()