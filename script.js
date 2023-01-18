/**
 * SANA-ARVAIN 
 * learning javascript, yeah!
 * (C) Mikko Oikarinen 2023
 * Use it if you want license
 */

/*
 * TODO
 * - Game lose modal - OK
 * - Animations for boxes
 * - imporove styling
 * - improve won game modal
 * - copyright/sources 
 * - possible re-factoring
*/

// SET UP THE START

// get the Buttons
const btnCloseModInfo = document.getElementById('modInfoClose');
const btnOpenInfo = document.querySelector('.faq');
const btnPress = document.querySelectorAll('.letter');
const btnCloseModShort = document.getElementById('modShortClose');
const btnCloseModNotword = document.getElementById('modNotwordClose');
const btnCloseModCorrect = document.getElementById('modCorrectClose');
const btnCloseModLose= document.getElementById('modLoseClose');
const btnNewGame = document.getElementById('new-game');
const alphabets = [
    "A","B","C","D","E","F","G",
    "H", "I", "J", "K", "L", "M", "N",
    "O", "P", "Q", "R", "S", "T", "U",
    "W", "V", "X", "Y", "Z", "Å", "Ä", "Ö"
]

let index, line, lock, guessArr, randomNum, word;


// INIT THE VARIABLES
function init() {
    
    index = 0;
    line = 0;
    lock = false;
    guessArr =[];

    // get the random word
    randomNum = Math.trunc( Math.random() * words.length) + 1;
    word = words[randomNum].split("");

    // DEBUG WORD
    //word = ["K","A","A","T","O"];
    // This is random word
    // console.log(word);
}

init();

// 
// HELPER FUNCTIONS

// check if class exists in "keyboard" 
// add class if not
// otherwise ignore
hasClass = function( strLetter , strClass ) {

    // if btn allready correct - then DO NOTHING
    if( !document.getElementById(`btn${strLetter}`).classList.contains('correct') ) {
        
        // NEAR class need to remove if we are about to add 'correct' class
        if(document.getElementById(`btn${strLetter}`).classList.contains('near') && strClass == 'correct' ){
            document.getElementById(`btn${strLetter}`).classList.remove('near');
        }
        if( !document.getElementById(`btn${strLetter}`).classList.contains(strClass)) {
            document.getElementById(`btn${strLetter}`).classList.add(strClass);
        }
    }


}

toggleModal = function( modalName ) {
    document.getElementById(modalName).classList.toggle('hidden');
    document.querySelector('.overlay').classList.toggle('hidden');
}

// MODAL INFO
btnCloseModInfo.addEventListener('click', function() {
    document.getElementById('modInfo').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
});

btnOpenInfo.addEventListener('click', function() {
    document.getElementById('modInfo').classList.remove('hidden');
    document.querySelector('.overlay').classList.remove('hidden');
});

// MODAL - word is too short
closeModalShort = function() {
    document.getElementById('modShort').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
}

btnCloseModShort.addEventListener('click', closeModalShort );

// MODAL - guess is not a real word
closeModalNotword = function() {
    document.getElementById('modNotword').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
}

btnCloseModNotword.addEventListener('click', closeModalNotword );

// MODAL - game loss
closeModalLose = function() {
    document.getElementById('modLose').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
    document.getElementById('new--game').classList.remove('hidden');
}

btnCloseModLose.addEventListener('click', closeModalLose);

// MODAL - word is correct
closeModalCorrect = function() {
    document.getElementById('modCorrect').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
    document.getElementById('new--game').classList.remove('hidden');
}

btnCloseModCorrect.addEventListener('click', closeModalCorrect );

removeClass = function( classID, classToRemove ) {
    if( document.getElementById(classID).classList.contains(classToRemove)) {
        document.getElementById( classID ).classList.remove(classToRemove);
    }
}

resetGame = function() {
    document.getElementById('new--game').classList.add('hidden');

    // CLEAR ALL THE FORMATS AND ANSWERS 
    // iterate lines
    for( let i = 0; i < 6; i++ ) {
        // iterate row
        for(let x = 0; x < 5; x++ ) {
            console.log(`l${i}--${x}`);
            // CLEAR THE CLASSES
            removeClass( `l${i}--${x}` , 'correct');
            removeClass( `l${i}--${x}` , 'near');
            removeClass( `l${i}--${x}` , 'wrong');
            // CLEAR THE CONTENT
            document.getElementById(`l${i}--${x}`).innerHTML = '';
        }
    }

    // CLEAR THE KEYBOARD
    for( let y = 0; y < alphabets.length; y++ ) {
        console.log(`btn${alphabets[y]}`);
        removeClass(`btn${alphabets[y]}`, 'correct' );
        removeClass(`btn${alphabets[y]}`, 'near' );
        removeClass(`btn${alphabets[y]}`, 'wrong' );
    }

    init();
}

btnNewGame.addEventListener('click', resetGame );

/*
    CHECK THE VALUES
*/
const checkValues = function( valuesArr ) {
    
    //console.log( '1. ' + valuesArr);
    let allCorrect = 0;
    let helperArray = [];
    let letter;

     // Count each letter
    const counts = word.reduce((acc, curr) => (acc[curr] = (acc[curr] || 0) + 1, acc), {});

    // CHECK THE CORRECT VALUES
    for( let i = 0; i < valuesArr.length; i++ ) {
        if( valuesArr[i] === word[i] )
        {
            // mark guess and btn green
            document.getElementById(`l${line}--${i}`).classList.add('correct');
            hasClass(valuesArr[i], 'correct');
            allCorrect++;
            
            // reduce letter count
            counts[valuesArr[i]]--;

            // change value OK - ie. no need action in near & wrong loop...
            valuesArr[i] = 'OK';
            
        }  else {

            // add remaining value to helper array
            helperArray.push(valuesArr[i]);
        }
    }
  
    
    // If all correct this can be skipped
    if( allCorrect < 5 ) {
    
        //
        // CHECK NEAR AND WRONG ONES
        for( let x = 0; x < valuesArr.length; x++ ) {
            
            letter = valuesArr[x];
            
            // if letter allready correct and used
            // skip and go to next
            if( letter != 'OK' ) {
                
                console.log(letter);

                        // if not correct, but letter is in word
                if ( helperArray.includes(letter) ) {
            
                    if(counts[letter] > 0 ) {
                        //console.log(x, letter)
                        document.getElementById(`l${line}--${x}`).classList.add('near');
                        hasClass(letter, 'near');
                        counts[letter]--;
                    } else {
                        document.getElementById(`l${line}--${x}`).classList.add('wrong');
                        hasClass(letter, 'wrong');
                    }
        
        
                // letter is wrong and not in the word
                } else {
                    document.getElementById(`l${line}--${x}`).classList.add('wrong');
                    hasClass(letter, 'wrong');
                }
            }
        }
    }

    //console.log(counts);
    return allCorrect == 5 ? true : false;
}


/*
    KEYBOARD LISTENER
*/

// generate functionality for each keypress
for( let i = 0; i < btnPress.length; i++ ) {

    
    // click listeners
    btnPress[i].addEventListener('click' , function() {
       
        if( !lock ) {
            // get the letter
            const letter = btnPress[i].innerHTML;
            
            // if DELETE button has pressed
            // clear up last letter + reduce the index
            if( btnPress[i].id == 'btnDel') {
                
                if(index > 0 ) {
                    index--;
                    document.getElementById(`l${line}--${index}`).innerHTML = '';
                }
                
            //
            // if ENTER button has pressed
            } else if (btnPress[i].id == 'btnEnter' ) {
                
                // check if all letter filled up
                // some letters still missing..
                if( index < 4 ) {
                    
                    toggleModal('modShort');
                
                //
                // All the letters filled up
                } else {
  
                    //
                    // Check if we have a correct word
                    let wordString = guessArr.join('');
            
                    if(words.includes(wordString)) 
                    {
                        correctWord = checkValues(guessArr);
                        // set the next line + rest the index
                        if(correctWord ) {
                
                            lock = true;
                            let msg = '';

                            // get the correct msg
                            switch(line) {
                                case 0:
                                    msg = 'ensimmäisellä';
                                    break;
                                case 1:
                                    msg = 'toisella';
                                    break;
                                case 2:
                                    msg = 'kolmannella';
                                    break;
                                case 3:
                                    msg = 'neljännellä';
                                    break;
                                case 4:
                                    msg = 'viidennellä';
                                    break;
                                case 5:
                                    msg = 'kuudennella';
                                    break;
                            }   

                            document.getElementById(`count`).innerHTML = msg;
                            toggleModal('modCorrect');
                        
                        // NOT a correct word
                        } else {

                            // check if we are in final row
                            if( line == 5 ) {
                                lock = true;
                                toggleModal('modLose');
                            
                            // Not final row
                            } else {
                                line++;
                                index = 0;      
                            }
                        }

                    // It's not a real word
                    } else {
                        toggleModal('modNotword');
                    }
                }
            
            //
            // if Any of Letter buttons pressed
            } else {

                // check if still letter left 
                // or if all filled - then do nothing
                if( index < 5 ) {
                    guessArr[index] = letter;
                    document.getElementById(`l${line}--${index}`).innerHTML = letter;
                    index++;
                }
            }
        }
    });

}