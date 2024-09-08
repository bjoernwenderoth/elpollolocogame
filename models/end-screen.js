   function checkEndScreen() {

    endScreenInterval = setInterval(() => {
      
        if (world.gameEnd && world.gameLost) {
            document.getElementById('endScreen').classList.remove('d-none');
            document.getElementById('gameOver').classList.remove('d-none');
            document.getElementById('endButtons').classList.remove('d-none');
            document.getElementById('endButtons').classList.add('d-flex');
            document.getElementById('playButtons').classList.add('d-none');
            clearInterval(endScreenInterval);
        }
        if (world.gameEnd && !world.gameLost) {
            document.getElementById('endScreen').classList.remove('d-none');
            document.getElementById('youWin').classList.remove('d-none');
            document.getElementById('endButtons').classList.remove('d-none');
            document.getElementById('endButtons').classList.add('d-flex');
            document.getElementById('playButtons').classList.add('d-none');
            document.getElementById('collectedCoins').innerHTML = `
            <img src="img/img/8_coin/coin_endscreen.png" alt="coin">
            <h4>
            ${world.character.coin} von 10 
            </h4>
            `
            clearInterval(endScreenInterval);
        }
    }, 100);
}