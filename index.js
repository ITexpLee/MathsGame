//If playing or not Boolean
var playing = false; //Can be 0
var action;
var score;
var correctAnswer;
var correctPosition;
var timeRemaining;

//If we click on start/reset Button
    $(document).ready(function(){
        $('#startreset').click(function () {
            //If we are playing Reload the page
                if(playing == true){
                    //this is used to reload a page
                    location.reload();
                }
                else{
                    //Change the boolean to yes
                        playing = true;
                    //Set score to 0
                        score = 0;
                        $('#score').text(score);
                    //Show countdown Box
                        showElement(timeremaining);
                    //Change the button text to Reset
                        $('#startreset').html('Reset Game');
                    //Reduce time by 1 sec
                        timeRemaining = 60;
                        startCountdown();
                    //Generate Q and A
                        generateQA();
                }         

            })
            
        //After clicking on an Answer Box
          for(i=1; i<5; i++){
                $('#box'+i).click(function(){
                //Check if playing
                    if(playing==true){
                        //If yes
                        if(correctAnswer == $(this).html()){
                            console.log('Box value' + this.innerHTML);
                            console.log('position: '+ correctPosition);
                            console.log('strlength: '+this.innerHTML.length);
                            //Correct Answer
                            //Inc score by 1
                                score++;
                                $('#score').html(score);
                            //Show correct
                                showElement(correct);
                                hideElement(wrong);
                            //set timeout to hide the correct    
                                setTimeout( () => {hideElement(correct)}, 1000);   
                            //Generate new Q & A 
                                generateQA();
                            }
                            else{
                                console.log('Box value' + this.innerHTML);
                            console.log('position:'+ correctPosition);
                            console.log('strlength: '+this.innerHTML.length);
                                console.log(typeof(this.innerHTML));
                                //show wrong Answer
                                    showElement(wrong);
                                    hideElement(correct);
                                //set timeout to hide the wrong
                                    setTimeout( () => {hideElement(wrong)}, 1000);
                            }
                        }
                        
                })
        }
    })


            

//Functions
    //Start countdown function
    function startCountdown(){
        action = setInterval(function () {
            timeRemaining -= 1;
            $('#timeremainingvalue').html('<b>'+ timeRemaining +'</b>');        
            if(timeRemaining == 0){
                //game over 
                stopCountdown();
                var result = $('#score').html();
                window.alert('Thanks for Playing :) \r\n Your Score:' + result);
                playing = false;
                    hideElement(timeremaining);
                    hideElement(correct);
                    hideElement(wrong);
                $('#startreset').html('Start');
            }
        }, 1000)
    }

    //Stop countdown function
    function stopCountdown(){
        clearInterval(action);
    }

    //show function
    function showElement(ID){
        $(ID).show();
    }

    //hide function
    function hideElement(ID){
        $(ID).hide();
    }

//Generate new Questions and Answers

    function generateQA(){
        //Math.round is used to convert to int from float.
            var x = 1 + Math.floor(9 * Math.random());       
            var y = 1 + Math.floor(9 * Math.random());
            var correctAnswer = x*y;
        //show this on question div
            $('#question').html(x + 'x' + y);
        //Choose a random position to store the Answer
            correctPosition = 1 + Math.floor(Math.random() * 4);
            console.log('Correct position: ' + correctPosition);
        //Insert or fill the box with correct Answer
            var boxArray = [1,2,3,4]; 
            $('#box'+correctPosition).html(correctAnswer);
            var z = $('#box'+correctPosition).html();
            console.log('correct answer: '+ z);
            console.log('str-length: '+z.length);
            console.log(typeof(z));
        //Find the remaining Boxes
            var remainingBox = boxArray.filter(position => position != correctPosition);
            console.log(remainingBox);
            var answers = [correctAnswer];
        //Insert or fill Remaining box with wrong Answer    
            remainingBox.forEach(element => {
                var wrongAnswer;
                do{
                    wrongAnswer = (1 + Math.floor(9 * Math.random())) * (1 + Math.floor(9 * Math.random()));      
                }while(answers.indexOf(wrongAnswer) > -1)
                $('#box'+element).html(wrongAnswer);
                console.log($('#box'+element).html());
                answers.push(wrongAnswer);
                console.log('Answer seq:'+answers);
            });            
    }
