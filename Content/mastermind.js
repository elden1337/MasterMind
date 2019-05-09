var answer = [];
var guessArray = [];
var attempt = 1;

$(document).ready(function () {
    CreateAnswer();
    
    $(".draggable").draggable({ snap: ".guess", snapMode: "inner" });
    
    $('.draggable').on('dragstart', function (evt) {
        if (!$(this).data('isMoved')) {
            var color = $(this).data('name');
            console.log(color);
            //$(this).unwrap();
            $('.choice--group').append('<div class="choice round ' + color + ' draggable" data-name="' + color + '"></div>');
        }

        $(this).data('isMoved', true);
    });

    $(".guess").droppable({
        drop: function (event, ui) {
            var item = ui.draggable;
            $(this).data('choice', item.attr('data-name'));
            console.log($(this).data());
            $(this).data('isSet', true);

            ShowGuessCommit();
        }
    });
});

function CreateAnswer() {
    var numberToColor = {
        1: "red",
        2: "green",
        3: "black",
        4: "white",
        5: "yellow",
        6: "blue"
    };

    for (var i = 0; i < 4; i++) {
        answer.push(numberToColor[makeRandom()]);
    };

    function makeRandom() {
        return Math.floor(Math.random() * 6 + 1);
    };

    $('div.guess.round', $('.answer')).each(function (index) {
        $(this).css("background-color", answer[index]);
    })
}

function ShowGuessCommit() {
    var check = 0;

    $('div.guess.round', $('#attempt_guessgroup_' + attempt)).each(function () {
        if ($(this).data('isSet')) {
            check++;
        }
    })
    if (check == 4) {
        $(function () {
            $('#attempt_submit_' + attempt).show();
        })
        console.log('show submit');

        $("#attempt_submit_" + attempt).click(function () {
            $('div.guess.round', $('#attempt_guessgroup_' + attempt)).each(function () {
                guessArray.push($(this).data('choice'));
            })

            $('#attempt_submit_' + attempt).hide();

            Guess(guessArray);
        });
    }
}

function Guess(guessArray) {
    var whites = 0;
    var blacks = 0;
    var whiteCheck = [];

    for (var i = 0; i < guessArray.length; i++) {
        if (answer[i] === guessArray[i]) {
            blacks++;
        }
        else {
            whiteCheck.push(i);
        }
    }

    for (var i = 0; i < guessArray.length; i++) {
        if (answer.includes(guessArray[i]) && whiteCheck.includes(answer.indexOf(guessArray[i]))) {
            whites++;
            whiteCheck.pop(i);
        }
    }

    console.log("guessarray: " + guessArray);
    
    $('div.hint.round', $('#row__attempt_' + attempt)).each(function () {
        if (blacks > 0) {
            $(this).css("background-color", "black");
            blacks--;
        }
        else if (whites > 0) {
            $(this).css("background-color", "white");
            whites--;
        }
    });

    if (blacks == 4) {
        //win!
    }
    else if (attempt == 9) {
        //game over
    }
         
    attempt++;
    guessArray = [];
    console.log('next attempt is: ' + attempt);
}

