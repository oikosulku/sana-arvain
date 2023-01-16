/**
 * SANA-ARVAIN 
 * learning javascript, yeah!
 */

/**
 * TODO
 * - style the keyboard bss the answers
 * - check the logic of words
 * - 
 */

// SET UP THE START

// get the Buttons
const btnPress = document.querySelectorAll('.letter');
let index = 0;
let line = 0
let lock = false;
const guessArr =[];
const word = ['M','I','K','K','O'];


// define current guess

// 
// HELPER FUNCTIONS
hasClass = function( strLetter , strClass ) {
    if( !document.getElementById(`btn${strLetter}`).classList.contains(strClass)) {
        document.getElementById(`btn${strLetter}`).classList.add(strClass);
    }
}

function hasClass(element, className) {
    
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}

/*
    CHECK THE VALUES
*/
const checkValues = function( valuesArr ) {
    
    //console.log( '1. ' + valuesArr);
    let allCorrect = 0;
    let letter;
   
    for( let x = 0; x < valuesArr.length; x++ ) {
        
        //console.log( '2. ' + valuesArr );
        letter = valuesArr[x];
        console.log(letter);
        //if letter is correct
        if( valuesArr[x] === word[x] )
        {
            document.getElementById(`l${line}--${x}`).classList.add('correct');
            hasClass(letter, 'correct');
            allCorrect++;
        // if not correct, but letter is in word
        } else if ( word.includes(valuesArr[x]) ) {

           document.getElementById(`l${line}--${x}`).classList.add('near');
           hasClass(letter, 'near');
        
        // letter is wrong and not in the word
        } else {
            document.getElementById(`l${line}--${x}`).classList.add('wrong');
            hasClass(letter, 'wrong');
        }
    }
    console.log(allCorrect);
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
                index--;
                document.getElementById(`l${line}--${index}`).innerHTML = '';

            // if ENTER button has pressed
            } else if (btnPress[i].id == 'btnEnter' ) {
                
                if( index < 4 ) {
                    alert('Täytä kaikki kirjaimet');
                } else {
                    //console.log('0.' + guessArr);
                    correctWord = checkValues(guessArr);
                    // set the next line + rest the index
                    if(checkValues(guessArr) ) {
                        alert('Kaikki oikein');
                        lock = true;
                    } else {
                        if( line == 5 ) {
                            lock = true;
                            alert('Ohi on.');
                        } else {
                            line++;
                            index = 0;
                        }
                    }

                }
            
            // Else it is letter
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