let score =JSON.parse(localStorage.getItem('score')) || {wins:0,losses:0,ties:0};
        
        updateScore();
        
         
         function pickComputerMove(){
            let randomNumber = Math.random();
            let computerMove='';
            if(randomNumber > 0 && randomNumber < 1/3){
                computerMove='rock';
            }
            else if(randomNumber >= 1/3 && randomNumber <2/3){
                computerMove='paper';
            }
            else if(randomNumber > 2/3 && randomNumber < 1){
                computerMove='scissor';
            }
            return computerMove;
         }
         

        function playGame(playerMove){
           
            const computerMove = pickComputerMove();
            let result='';
            
            if(playerMove === 'rock'){
                if(computerMove === 'rock'){
                    result= 'It\'s a tie.';
                }
                else if(computerMove === 'paper'){
                    result = 'you lose';
                }
                else if(computerMove ==='scissor'){
                    result= 'You win.';
                }
               
            }
            else if(playerMove === 'paper'){
                    if(computerMove === 'rock'){
                    result= 'You win.';
                }
                else if(computerMove === 'paper'){
                    result = 'It\'s a tie.';
                    }
                else if(computerMove ==='scissor'){
                    result= 'you lose';
                }
                
            }
            else if (playerMove === 'scissor'){
                    if(computerMove === 'rock'){
                    result= 'you lose';
                }
                else if(computerMove === 'paper'){
                    result = 'You win.';
                }
                else if(computerMove ==='scissor'){
                    result= 'It\'s a tie.';
                }
                
            }

            
            if(result === 'You win.'){
                score.wins+=1;
            } else if(result === 'you lose'){
                score.losses+=1;
            }else if(result === 'It\'s a tie.'){
                score.ties+=1;
            }

            updateScore();
            document.querySelector('.js-moves').innerHTML=
                    `Your Move ${playerMove}
                     <img src="images/${playerMove}-emoji.png" class="move-icon">
                     <img src="images/${computerMove}-emoji.png" class="move-icon" >
                     Computer's Move`;

           
            localStorage.setItem('score',JSON.stringify(score));
           
    }

    function updateScore(){
        const buttonElement = document.querySelector('.js-score');
        buttonElement.innerHTML=`Wins : ${score.wins} Losses: ${score.losses}  Ties: ${score.ties}`;
    }

    let isautoPlaying =false;
    let intervalId;
    function autoPlay(){    
        if(!isautoPlaying){
           intervalId= setInterval(function(){
            const playerMove = pickComputerMove();
            playGame(playerMove);
            },1000);
            isautoPlaying =true;
        }
        else{
            clearInterval(intervalId);
            isautoPlaying=false;
        }
        
    }
    document.querySelector('.js-rock-btn')
    .addEventListener('click',()=>{
        playGame('rock');
    }); 
    document.querySelector('.js-paper-btn')
    .addEventListener('click',()=>{
        playGame('paper');
    });
    document.querySelector('.js-scissor-btn')
    .addEventListener('click',()=>{
        playGame('scissor');
    });
    document.querySelector('.js-reset-btn')
    .addEventListener('click',()=>{
        score.wins=0;
        score.losses=0;
        score.ties=0;
        localStorage.removeItem('score');
        updateScore();
        document.querySelector('.js-moves').innerHTML='';
    });
    document.querySelector('.js-autoplay-btn')
    .addEventListener('click',()=>{
        autoPlay();
    });
    document.body.addEventListener('keydown',(event)=>{
        if(event.key ==='r'){
            playGame('rock');
        } else if(event.key ==='p'){
            playGame('paper');
        }else if (event.key === 's'){
            playGame('scissor');
        }
    });