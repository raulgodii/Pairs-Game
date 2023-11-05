window.onload = () => {
    const startButton = document.getElementById("startButton");
    const resetButton = document.getElementById("reset");

    // Array with cards
    const cardsArrayDefault = createCards();

    // Start 'Click'
    startButton.addEventListener('click', (e)=>{startGame(e, cardsArrayDefault, resetButton)});
}


// Create and return the array with Cards
function createCards(){
    let arr = [];
    
    for(let i=1; i<6; i++){
        arr.push(i+"A");
        arr.push(i+"B");
    }

    return arr;
}

// Starts the Game, making a random desk of cards visible, and invisible the button 'Start'
function startGame(e, cardsArrayDefault, resetButton){
    
    e.target.style.display = "none";
    let cardsArrayRandom = shuffleArray(cardsArrayDefault);
    const attempts = document.getElementById("attempts");
    resetButton.style.display = "none";
    cont = 7;

    // Create list of all the div of cards and make them visible
    const game = document.getElementById("game");
    game.style.display = "block";
    const cardList = game.querySelectorAll("img");
    let cardsFlip = [];
    let pairs = [];

    resetButton.addEventListener('click', (e) => {
        cardList.forEach(img => {
            img.src = "img/0.png";
        });
        return startGame(e, cardsArrayDefault, resetButton)
    });

    // Create event for each card of the list
    cardList.forEach(img => {
        img.addEventListener('click', (e)=>{

            // Block the cards that are pairs
            if (pairs.includes(e.target.id)){
                return;
            }

            // Block when there are two cards flip
            if(cardsFlip.length==2){
                return;
            }

            // 
            if(cardsFlip.includes(e.target.id) && cardsFlip.length==2){
                return;
            }
            
            flipCard(e.target.id, cardsArrayRandom, pairs);
            cardsFlip.push(e.target.id);

            if(cardsFlip.length == 2){

                if(cardsFlip[0]==cardsFlip[1]){
                    cardsFlip = [];
                    return;
                }

                if(checkPair(cardsFlip, cardsArrayRandom)){
                    pairs.push(cardsFlip[0]);
                    pairs.push(cardsFlip[1]);
                }else{
                    cont--;
                }

                setTimeout(() => {
                    if(cardsFlip[0]!=cardsFlip[1]){
                        flipCard(cardsFlip[0], cardsArrayRandom, pairs);
                        flipCard(cardsFlip[1], cardsArrayRandom, pairs);
                    }
                    attempts.innerHTML = "You have: " + cont + " attempts"
                    
                    if(cont == 0){
                        game.style.display = "none";
                        //finishGame();
                    }
                    if(pairs.length==10){
                        game.style.display = "none";
                        resetButton.style.display = "inline";
                    }
                    cardsFlip = [];
                }, 2000);
            }
        });
    });
}

// Shuffle and return and array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Flip the card
function flipCard(id, cardsArrayRandom, pairs){
    if(!pairs.includes(id)){
        card = document.getElementById(id);
        if(card.src.includes("img/0.png")){
            card.src = "img/" + cardsArrayRandom[card.id] + ".png";
        } 
        else{
            card.src = "img/0.png";
        }
    }
}

// Check if the two cards of the array that are flip are a pair
function checkPair(cardsFlip, cardsArrayRandom){
    let numberCard = [];

    cardsFlip.forEach(element => {
        numberCard.push(cardsArrayRandom[element].split('')[0]);
    });
    
    if(numberCard[0] === numberCard[1]) return true;
    else return false;
}