const button = ['green', 'red','yellow','blue'],
      pattern = [], //Store game pattern as color name
      userPattern = []; //Store user pattern as color name
var level = 0;
//------------------------------------------------------
function Main(){
    $(document).on('keypress', enterGame); //enterGame, no (), meaning we are reffering to a function, not calling it. Preventing the function executed before event occurs. 
    
    $('.btn').on('click', function(){       
        let lastChosenColor = $(this).attr("id");
        animateClick(lastChosenColor);
        playSoundFlash(lastChosenColor);
        if(level!==0){
            userPattern.push(lastChosenColor);
            if(checkAnswer()){
                userPattern.length===pattern.length?
                    setTimeout(nextSequence,1000):
                    console.log("checked");
            }else{
                gameOver();   
            } 
        }
    })
}

//Functions--------------------------------------------
function gameOver(){
    $('body').addClass('game-over');
    setTimeout(function(){$('body').removeClass('game-over');},200)
    $('#level-title').text('GAME OVER');
    $('#level-title').after('<h2 id="lose">Highest level:'+level+'<br>Try again? Press Enter</h2>');
    playSoundFlash('wrong');

    level = 0;
    while(userPattern.length > 0){userPattern.pop();}
    while(pattern.length > 0){pattern.pop();}
}
function nextSequence(){
    var randomColor = button[Math.floor(Math.random()*4)];
    pattern.push(randomColor);
    playSoundFlash(randomColor);
    level++;
    $('#level-title').text('level '+level);
    while(userPattern.length > 0){
        userPattern.pop();
    }
}
function checkAnswer(){
    console.log("Final Ans: "+ pattern + " Current Ans: " + userPattern);
    let currentColorIndex = userPattern.length-1;
    if(pattern[currentColorIndex]===userPattern[currentColorIndex]){
        return true;
    }else{
        return false;
    }
}
function playSoundFlash(colorName){
    var audio = new Audio("./sounds/"+colorName+".mp3");
    audio.play();
    if(colorName!=='wrong'){$('#'+colorName).fadeOut(100).fadeIn(100);}
}
function animateClick(color){
    $('#'+color).addClass('pressed');
    setTimeout(function(){ $('#'+color).removeClass('pressed'); }, 100);
}
var enterGame = function (e){
    if(e.key === 'Enter'){
        $('#lose').remove();
        setTimeout(nextSequence(),1000);
    }else{
        console.log("Press Enter please!");
    }
}
//Run game code-----------------------------------------
Main();