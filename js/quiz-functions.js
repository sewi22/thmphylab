
    // Create QuizPage before show
    $(document).on('pagebeforeshow', '#quizPage', function(e) {
        var expGroupNumber = localStorage.getItem("expGroupNumber");
        var expNumber = localStorage.getItem("expNumber");                
        $("#quizContent").empty();
        getQuizQuestions(expGroupNumber, expNumber, function(questions){

            if(questions.length == 0){
                // Alle Fragen wurden beantwortet, Erstellen einer Quiz Auswertung
                                                
                getAllQuestionsForExp(expGroupNumber, expNumber, function(allQ){

                    if(allQ.length == 0){
                        // Es existieren keine Fragen zu diesem Experiment
                        $("#quizContent").html("Zu diesem Versuch existieren keine Fragen");
                    } else {
                        // Erstellung der Fragen-Auswertung zu diesem Experiment 
                        countQ = allQ.length; // Anzahl aller Fragen zu diesem Experiment                        

                        $("#quizContent").append('Sie haben <span id="quizPercent"></span>% der Fragen richtig beantwortet');
                        $("#quizContent").append('<ul data-role="listview" id="quizResultList" data-inset="true"></ul>');
                        $("#quizContent").append('<a href="#" data-role="button" id="quizResetButton">Antworten l&ouml;schen</a>').enhanceWithin();

                        for(var i=0; i<countQ; i++){
                            $("#quizResultList").append('<li id="quizResultListItem-'+allQ.item(i).id+'"><h2>'+allQ.item(i).question+'</h2></li>');
                            
                            qId = allQ.item(i).id;
                            
                            getQuestionsAnswers(qId, function(qa){                                
                                countA = qa.length;                                
                                qId = qa.questionId;
                                
                                rightAnswers = [];
                                rightAnswerIds = [];
                                givenAnswers = [];
                                givenAnswerIds = [];                                
                                
                                for(var ind=0; ind<countA; ind++){
                                    ans = qa.item(ind);                                                                                                        
                                    
                                    if(ans.questionType == "mc"){
                                                
                                        if(ans.answerIsCorrect == 1){
                                            rightAnswerIds.push(ans.id);
                                            rightAnswers.push(ans.answer);    
                                        }
                                                                            
                                        if(ind == 0){
                                            var givenAnswerIds = ans.givenAnswerId.split(',');
                                            for(var i=0; i<givenAnswerIds.length;i++) givenAnswerIds[i] = parseInt(givenAnswerIds[i], 10);
                                        }
                                        
                                        if(givenAnswerIds.indexOf(ans.id) != -1){                                            
                                            givenAnswers.push(ans.answer);
                                        }
                                                                                                               
                                        if(ind == countA-1){                                            
                                            if($(givenAnswerIds).not(rightAnswerIds).length === 0 && $(rightAnswerIds).not(givenAnswerIds).length === 0){
                                                // Both Arrays are the same                                                                                                    
                                                allA = rightAnswers.join(", ");
                                                $("#quizResultListItem-"+ans.questionId).append('<p class="givenAnswer" data-answer="'+ans.id+'"><strong>Antworten: '+allA+'</strong></p>');
                                                $("#quizResultListItem-"+ans.questionId).addClass('rightanswer');
                                            } else {
                                                // Arrays are different                                                    
                                                allGA = givenAnswers.join(", ");
                                                $("#quizResultListItem-"+ans.questionId).append('<p class="givenAnswer" data-answer="'+ans.id+'"><strong>Gegebene Antworten: '+allGA+'</strong></p>');
                                                allRA = rightAnswers.join(", ");
                                                $("#quizResultListItem-"+ans.questionId).append('<p class="correctAnswer" data-answer="'+ans.id+'"><strong>Richtige Antworten: '+allRA+'</strong></p>');
                                                $("#quizResultListItem-"+ans.questionId).addClass('wronganswer');
                                            }                                                                                                                                                                                                                                     
                                        }                                        

                                    } else if (ans.questionType == "text") {

                                        rightAnswers.push(ans.answer);
                                        
                                        if(ind == countA-1){                                            
                                            var a = 0;
                                            while (a < rightAnswers.length){
                                                
                                                var cmp1 = rightAnswers[a].toLowerCase().replace(/[\!|\?|\-|\_|\<|\>|\#|\+|\*|\=|\/|\&|\%|\$|\§|\s]+/g, '');
                                                var cmp2 = ans.givenAnswerText.toLowerCase().replace(/[\!|\?|\-|\_|\<|\>|\#|\+|\*|\=|\/|\&|\%|\$|\§|\s]+/g, '');
                                                
                                                if(cmp1 == cmp2){                                                    
                                                    $("#quizResultListItem-"+ans.questionId).append('<p class="givenAnswer" data-answer="'+ans.id+'"><strong>Antwort: '+ans.givenAnswerText+'</strong></p>');
                                                    $("#quizResultListItem-"+ans.questionId).addClass('rightanswer');
                                                } else if (a  == rightAnswers.length-1) {
                                                    $("#quizResultListItem-"+ans.questionId).append('<p class="givenAnswer" data-answer="'+ans.id+'"><strong>Gegebene Antwort: '+ans.givenAnswerText+'</strong></p>');
                                                    $("#quizResultListItem-"+ans.questionId).append('<p class="correctAnswer" data-answer="'+ans.id+'"><strong>Richtige Antwort: '+rightAnswers[0]+'</strong></p>');
                                                    $("#quizResultListItem-"+ans.questionId).addClass('wronganswer');
                                                }                                                                                                
                                                a++;
                                            }                                           
                                        }                                                         

                                    } else if (ans.questionType == "number") {                                                                                
                                        var max = ans.answerNumber + ans.plus;
                                        var min = ans.answerNumber - ans.minus;                                        
                                        
                                        if(ans.givenAnswerNumber >= min && ans.givenAnswerNumber <= max){                                                                                        
                                            $("#quizResultListItem-"+ans.questionId).append('<p class="givenAnswer" data-answer="'+ans.id+'"><strong>Antwort: '+ans.givenAnswerNumber+'</strong></p>');    
                                            $("#quizResultListItem-"+ans.questionId).addClass('rightanswer');
                                        } else {                                            
                                            $("#quizResultListItem-"+ans.questionId).append('<p class="givenAnswer" data-answer="'+ans.id+'"><strong>Gegebene Antwort: '+ans.givenAnswerNumber+'</strong></p>');
                                            $("#quizResultListItem-"+ans.questionId).append('<p class="correctAnswer" data-answer="'+ans.id+'"><strong>Richtige Antwort: '+ans.answerNumber+'</strong></p>');
                                            $("#quizResultListItem-"+ans.questionId).addClass('wronganswer');
                                        }
                                        
                                    } else {
                                        alert("Unbekannter Quiztyp!");
                                        console.log("Unbekannter Quiztyp!");
                                    }                                                                            
                                }                                                                                                
                            });                                                                                  
                        }
                    }
                });
                
            } else {
                // Anzeigen einer Frage
                var rand = Math.floor(Math.random() * (questions.length-1 - 0 + 1)) + 0;
                var question = questions.item(rand);

                $("#quizContent").append(question.question);

                if (question.questionType == "mc") {
                    // Darstellung einer MC Frage

                    getQuestionsAnswers(question.id, function(answers){
                        answersArr = [];

                        for(var a=0; a<answers.length; a++){
                            answersArr[a] = new Array();
                            answersArr[a].id = answers.item(a).id;
                            answersArr[a].answer = answers.item(a).answer;
                            answersArr[a].correct = answers.item(a).answerIsCorrect;
                            answersArr[a].help = answers.item(a).helpText;
                            answersArr[a].questionId = answers.item(a).questionId;
                        }

                        answersArr = shuffle(answersArr);
                        $("#quizContent").append('<div data-role="controlgroup"><fieldset id="quizCheckboxGroup" data-role="controlgroup"></fieldset></div>');

                        $.each(answersArr, function(i, a) {
                            $("#quizCheckboxGroup").append('<input type="checkbox" name="quizCheckbox" id="quizCheckbox-'+a.id+'" value="'+a.id+'" questionId="'+question.id+'" /><label for="quizCheckbox-'+a.id+'">'+a.answer+'</label>').enhanceWithin();
                        });

                        $("#quizContent").append('<a href="#" data-role="button" data-questiontype="mc" id="quizCheckButton">Antwort pr&uuml;fen</a>').enhanceWithin();
                    });
                } else if (question.questionType == "text") {
                    // Darstellung einer Freitext Frage
                    $("#quizContent").append('<input type="text" value="" id="quizInputText" questionId="'+question.id+'">').enhanceWithin();
                    $("#quizContent").append('<a href="#" data-role="button" data-questiontype="text" id="quizCheckButton">Antwort pr&uuml;fen</a>').enhanceWithin();
                } else if (question.questionType == "number") {
                    // Darstellung einer Number Frage
                    $("#quizContent").append('<input type="number" value="" id="quizInputNumber" questionId="'+question.id+'">').enhanceWithin();
                    $("#quizContent").append('<a href="#" data-role="button" data-questiontype="number" id="quizCheckButton">Antwort pr&uuml;fen</a>').enhanceWithin();
                } else {
                    alert("Unbekannter Quiztyp!");
                    console.log("Unbekannter Quiztyp!");
                }
            }
        });        
    });       
    
    
    /* 
    $(document).on('pageload', '#quizPage', function(e) {
        console.log($("#quizResultList"));
        console.log("Anzahl richtige Antworten: "+$(".rightanswer").length);
        console.log($("#quizResultList").length);
    });
    */

    // Auswertung einer Frage bei Click n quizCheckButton
    $(document).on("click", "#quizCheckButton", function(){

        var quiztype = $("#quizCheckButton").attr("data-questiontype");

        if (quiztype == "mc") {

            // TODO: Auswertung der MC Fragen
            var answerIds = [];
            var questionId = $('input[name=quizCheckbox]:checked', '#quizCheckboxGroup').attr('questionId');

            $("input:checkbox[name=quizCheckbox]:checked").each(function() {
                answerIds.push($(this).val());
            });

            if(answerIds.length != 0) {

                setGivenAnswerMc(questionId, answerIds.join(","));
                $("#quizCheckboxGroup").addClass("ui-disabled");

                getQuestionsAnswers(questionId, function(answers){

                    for(var i=0; i<answers.length; i++){
                        if(answerIds.indexOf(answers.item(i).id.toString()) != -1){
                            if(answers.item(i).answerIsCorrect == 1){
                                // Richtige Antwort, die ausgewählt wurde
                                var label = $('#quizCheckbox-'+answers.item(i).id).prop('labels');
                                $(label).addClass('rightanswer');
                            } else {
                                // Falsche Antwort, die ausgewählt wurde
                                var label = $('#quizCheckbox-'+answers.item(i).id).prop('labels');
                                $(label).addClass('wronganswer');
                            }
                        } else {
                            if(answers.item(i).answerIsCorrect == 1){
                                // Richtige Antwort, die nicht ausgewählt wurde
                                var label = $('#quizCheckbox-'+answers.item(i).id).prop('labels');
                                $(label).addClass('otheranswer');
                            } else {
                                // Falsche Antwort, die nicht ausgewählt wurde
                                //var label = $('#quizCheckbox-'+answers.item(i).id).prop('labels');
                                //$(label).addClass('rightanswer');
                            }
                        }
                    }
                });

                $("#quizCheckButton").remove();
                $("#quizContent").append('<a href="#quizPage" data-role="button" id="quizNextButton">Weiter</a>').enhanceWithin();

            } else {
                // TODO: anderen Dialog nutzen, kein Alert
                alert("Bitte wählen Sie eine Antwort aus.");
                //resetGivenAnswer(localStorage.getItem("expGroupNumber"), localStorage.getItem("expNumber"));
            }

        } else if (quiztype == "text") {

            var answer = $("#quizInputText").val();
            var questionId = $('#quizInputText').attr('questionId');

            if (answer != "") {
                setGivenAnswerText(questionId, answer);
                $("#quizInputText").addClass("ui-disabled");

                getQuestionsAnswers(questionId, function(answers){
                    var a = 0;
                    while(a<answers.length){
                        var cmp1 = answers.item(a).answer.toLowerCase().replace(/[\!|\?|\-|\_|\<|\>|\#|\+|\*|\=|\/|\&|\%|\$|\§|\s]+/g, '');
                        var cmp2 = answer.toLowerCase().replace(/[\!|\?|\-|\_|\<|\>|\#|\+|\*|\=|\/|\&|\%|\$|\§|\s]+/g, '');
                        if(cmp1 == cmp2){
                            $("#quizInputText").addClass("rightanswer");
                            break;
                        } else {
                            if(a == answers.length-1){
                                $("#quizInputText").addClass("wronganswer");
                            }
                        }
                        a++;
                    }
                });

                $("#quizCheckButton").remove();
                $("#quizContent").append('<a href="#quizPage" data-role="button" id="quizNextButton">Weiter</a>').enhanceWithin();

            }  else {
                // TODO: anderen Dialog nutzen, kein Alert
                alert("Bitte wählen Sie eine Antwort aus.");
                //resetGivenAnswer(localStorage.getItem("expGroupNumber"), localStorage.getItem("expNumber"));
            }

        } else if (quiztype == "number") {

            var answer = $("#quizInputNumber").val();
            var questionId = $('#quizInputNumber').attr('questionId');

            if (answer != "") {

                setGivenAnswerNumber(questionId, answer);
                $("#quizInputNumber").addClass("ui-disabled");

                getQuestionsAnswers(questionId, function(answers){

                    var max = answers.item(0).answerNumber + answers.item(0).plus;
                    var min = answers.item(0).answerNumber - answers.item(0).minus;

                    if(answer >= min && answer <= max){
                        $("#quizInputNumber").addClass("rightanswer");
                    } else {
                        $("#quizInputNumber").addClass("wronganswer");
                    }

                });

                $("#quizCheckButton").remove();
                $("#quizContent").append('<a href="#quizPage" data-role="button" id="quizNextButton">Weiter</a>').enhanceWithin();

            }  else {
                // TODO: anderen Dialog nutzen, kein Alert
                alert("Bitte wählen Sie eine Antwort aus.");
                //resetGivenAnswer(localStorage.getItem("expGroupNumber"), localStorage.getItem("expNumber"));
            }

        } else {
            alert("Unbekannter Quiztyp!");
            console.log("Unbekannter Quiztyp!");
        }
    });


    // Click on quizNextButton
    $(document).on("click", "#quizNextButton", function(){
        $('#quizPage').trigger('pagebeforeshow');
    });

    // Reset der beantworteten Fragen in der DB
    $(document).on("click", "#quizResetButton", function(){

        // TODO: Confirm Dialog ändern. Bisheriger Dialog ruft jedoch mehrfach den Trigger "pagebeforeshow" auf.
        var r = confirm("Quiz zurücksetzen?");
        if (r == true) {
            resetGivenAnswer(localStorage.getItem("expGroupNumber"), localStorage.getItem("expNumber"));
            $('#quizPage').trigger('pagebeforeshow');
        }
        /*
        createConfirmDialog("Möchten Sie Ihr Ergebnis zurücksetzen?", "", "Ja", "Nein", function() {
            resetGivenAnswer(localStorage.getItem("expGroupNumber"), localStorage.getItem("expNumber"));
            $('#quizPage').trigger('pagebeforeshow');
        });
        */
    });
    