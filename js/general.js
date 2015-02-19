
    function createExpList(){
        getExpGroups(function (expGroups){            
            for(var i=0; i<expGroups.length; i++) {
                (function(i){                                                        
                    var expGroup = expGroups.item(i);                    
                    $('#expList').append('<div data-role="collapsible"><h3>'+ expGroup.expGroupName + '</h3><ul id="list'+expGroup.expGroupNumber+'" data-role="listview"></ul></div>').enhanceWithin();
                    getAllExpFromGroup(expGroup.expGroupNumber, function (res){
                        for(var e=0; e<res.length; e++){                                                                                                    
                            var exp = res.item(e);
                            if(exp.expIsActive == 1){                                                               
                                $('#list'+expGroup.expGroupNumber).append('<li id="expListItem"><a href="#expDetailsPage" data-expGroupNumber="'+expGroup.expGroupNumber+'" data-expNumber="'+exp.expNumber+'" data-transition="slide">'+ expGroup.expGroupNumber + '.' + exp.expNumber + ' ' + exp.expName + '</a></li>').enhanceWithin();                                    
                            } else {                                    
                                $('#list'+expGroup.expGroupNumber).append('<li id="expListItem">'+ expGroup.expGroupNumber + '.' +exp.expNumber + ' ' + exp.expName + '</li>').enhanceWithin();                                    
                            }                                                                                           
                        };$('ul[data-role=listview]').listview('refresh');
                    });
                })(i);
            }
        });
    }
    
    // Change Values on Details Page with Parameters from List Item (Example: data-name)
    $(function setExpToLocalStorage(){
        $('#expList').delegate('li a', 'click', function (){
            localStorage.setItem("expGroupNumber", $(this).jqmData('expgroupnumber'));
            localStorage.setItem("expNumber", $(this).jqmData('expnumber'));         
        });
    });

    // Open QR Code Reader and using callback values by scanning a QR Code Button
    $(document).on('pagecreate', function(e) {        
        $(".headerQrButton").click( function(){                      
            var scanner = cordova.require("cordova/plugin/BarcodeScanner");
            scanner.scan( function (result) {
                alert("Scanner result: \n" +
                "text: " + result.text + "\n" +
                "format: " + result.format + "\n" +
                "cancelled: " + result.cancelled + "\n");
            },function (error) {
                console.log("Scanning failed: ", error);
            });
        });
    });

    
    $(document).on('pagebeforeshow', '#expDetailsPage', function(e) {        
        var expGroupNumber = localStorage.getItem("expGroupNumber");
        var expNumber = localStorage.getItem("expNumber");
        
        getExp(expGroupNumber, expNumber, function(result){                        
            var headline = result.expGroupNumber+"."+result.expNumber;            
            $("#expDetailsHeadline").html(headline);
            $("#expDetailsContent").html(result.expName);
            $(".footerQuizButton").attr("data-expGroupNumber", expGroupNumber);
            $(".footerQuizButton").attr("data-expNumber", expNumber);
        });
    });


    // Show all Contents from LocalStorage on one Page for control
    // Also possibility to add a key:value pair and clear LocalStorage 
    $(document).on('pagecreate', '#localStoragePage', function(e) {        
        var lscontent = "";
        lscontent += "Anzahl der Items: "+localStorage.length+"<br/>";
        for (var i=0; i<localStorage.length; i++){
            lscontent += localStorage.key(i)+" : "+localStorage.getItem(localStorage.key(i))+"<br/>";
        }
        $("#localStorageContent p").html(lscontent);

        $("#delLsButton").click( function(){
            localStorage.clear();
            $("#localStorageContent p").html("");
        });
        $("#addLsButton").click( function(){
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
            localStorage.setItem("key"+text,"value"+text);
            $("#localStorageContent p").append(localStorage.key(localStorage.length-1)+ " : "+localStorage.getItem(localStorage.key(localStorage.length-1))+"<br/>");
        });
    });
    
    $(document).on('pagebeforeshow', '#quizPage', function(e) {        
        var expgroupNumber = localStorage.getItem("expGroupNumber");
        var expNumber = localStorage.getItem("expNumber");
        $("#quizContent").empty();
        getQuizQuestions(expgroupNumber, expNumber, function(questions){
                                
            if(questions.length == 0){
                // TODO: Wird auch aufgerufen, wenn keine Fragen mehr, weil alle beantwortet wurden.
                // In dem Fall, soll jedoch eine Auswertung der beantworteten Fragen angezeigt werden.                
                $("#quizContent").html("Zu diesem Versuch existieren keine Fragen");
            } else {                        
            var rand = Math.floor(Math.random() * (questions.length-1 - 0 + 1)) + 0;            
            var question = questions.item(rand);
            $("#quizContent").append(question.question);
            getQuizAnswers(question.id, function(answers){
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
                $("#quizContent").append('<div data-role="controlgroup"><fieldset id="quizRadioGroup" data-role="controlgroup"></fieldset></div>').enhanceWithin();                
                $.each(answersArr, function(ind, a) {
                    $("#quizRadioGroup").append('<input type="radio" name="quizChoice" id="quizChoice-'+a.id+'" value="'+a.id+'" questionId="'+question.id+'" /><label for="quizChoice-'+a.id+'">'+a.answer+'</label>').enhanceWithin();                    
                });               
                $("#quizContent").append('<a href="#" data-role="button" id="quizCheckButton">Antwort pr&uuml;fen</a>').enhanceWithin();                          
            });     
            }                              
        });
    });
    
    $(document).on("click", "#quizCheckButton", function(){
        
        answerId = $('input[name=quizChoice]:checked', '#quizRadioGroup').val();
        questionId = $('input[name=quizChoice]:checked', '#quizRadioGroup').attr('questionId');
        
        if(answerId){
            setGivenAnswer(questionId, answerId);            
            $("#quizRadioGroup").addClass("ui-disabled");            
            getAnswer(answerId, function(answer){
                //console.log(answer);
                var correct = (answer.answerIsCorrect == 1) ? true : false;
                if(correct){                    
                    var label = $("#quizChoice-"+answer.id).prop("labels");
                    $(label).addClass("rightanswer");
                } else {
                    console.log("Antwort falsch");
                    var label = $("#quizChoice-"+answer.id).prop("labels");
                    $(label).addClass("wronganswer");
                    // TODO: Markiere die gegebene Antwort als falsch und die richtige Antwort als Richtig
                    
                }    
            })
                        
            $("#quizCheckButton").remove();
            $("#quizContent").append('<a href="#quizPage" data-role="button" id="quizNextButton">Weiter</a>').enhanceWithin();            
        } else {
            resetGivenAnswer(localStorage.getItem("expGroupNumber"), localStorage.getItem("expNumber"));
            alert("Bitte wählen Sie eine Antwort aus.");
        }    
    });
    
    $(document).on("click", "#quizNextButton", function(){
        // Neue Quizfrage aufrufen
        console.log("trigger neue quiz Frage");
        //$("body").pagecontainer("change", "#quizPage");
        //$( "#quizPage" ).pagecontainer( "load", {reload : "true"});
        //$('.footerQuizButton').trigger('click');
    }); 
