          
    $(document).ready(function() {        
        db = window.openDatabase("ThmPhyLabDb", "", "DB for THM-PhyLab App", 1024*1024);
        createDBTables();
        fillExpTables();
        fillQuestionTables();            
    });


    // Decisison if going back in history or exiting app by clicking the "Back Button"
    $(document).on("click", "backbutton", function(e){
        if($.mobile.activePage.is('#expListPage')){
            navigator.app.exitApp();
        } else {
            navigator.app.backHistory()
        }
    }, false);
    

    // Open QR Code Reader and using callback values by scanning a QR Code Button
    //$(document).on('pagecreate', function(e) {
     //$(".headerQrButton").click( function(){
    $(document).on("click", ".headerQrButton", function(){
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


/*******************************************************************************************************************************************************/
    
    // StartPage
    $(document).on("pagebeforecreate", "#startPage", function(e){
        $("#startContent").html("<p>THM PhyLab</p><img src='css/images/start-loader.gif'/>");
    });
    
    
    
    // ExpList
    $(document).on('pagecreate', '#expListPage', function(e) {
        $(".ui-toolbar-back-btn").remove();
        $('#expList').delegate("li a", "click", function (){
            localStorage.setItem("expGroupNumber", $(this).jqmData('expgroupnumber'));
            localStorage.setItem("expNumber", $(this).jqmData('expnumber'));
        });
    });
        
    $(document).on('pagebeforeshow', '#expListPage', function(e) {
        
    });

    
    
    // DetailsPage
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



    // LocalStoragePage
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
    
    
    
    // QuizPage
    $(document).on('pagebeforeshow', '#quizPage', function(e) {        
        var expGroupNumber = localStorage.getItem("expGroupNumber");
        var expNumber = localStorage.getItem("expNumber");
        $("#quizContent").empty();
        getQuizQuestions(expGroupNumber, expNumber, function(questions){
                                
            if(questions.length == 0){                
                countQuizQuestions(expGroupNumber, expNumber, function(count){                    
                    if(count == 0){
                        $("#quizContent").html("Zu diesem Versuch existieren keine Fragen");        
                    } else {
                        // Hier die Auswertung zu beantworteten Fragen erstellen
                        
                        
                    }                    
                });                
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


/*****************************************************************************************************************************************************/
    //Button Click Event Handler
    
    $(document).on("click", "#quizCheckButton", function(){      
        answerId = $('input[name=quizChoice]:checked', '#quizRadioGroup').val();
        questionId = $('input[name=quizChoice]:checked', '#quizRadioGroup').attr('questionId');
        
        if(answerId){
            setGivenAnswer(questionId, answerId);            
            $("#quizRadioGroup").addClass("ui-disabled");            
            getAnswer(answerId, function(answer){                
                var correct = (answer.answerIsCorrect == 1) ? true : false;
                if(correct){                    
                    var label = $("#quizChoice-"+answer.id).prop("labels");
                    $(label).addClass("rightanswer");
                } else {                    
                    var label = $("#quizChoice-"+answer.id).prop("labels");
                    $(label).addClass("wronganswer");
                    getQuizAnswers(questionId, function(answer){
                        for(var a=0; a<answer.length; a++){                                                       
                            if(answer.item(a).answerIsCorrect){
                                var label = $("#quizChoice-"+answer.item(a).id).prop("labels");
                                $(label).addClass("rightanswer");
                            }
                        }                                                                                                                                                      
                    });
                }    
            });
                        
            $("#quizCheckButton").remove();
            $("#quizContent").append('<a href="#quizPage" data-role="button" id="quizNextButton">Weiter</a>').enhanceWithin();            
        } else {
            // TODO: Reset ist nur gesetzt, um die DB nicht immer l�schen zu m�ssen, so lange keine Auswertung usw. eingebaut ist
            resetGivenAnswer(localStorage.getItem("expGroupNumber"), localStorage.getItem("expNumber"));
            alert("Bitte w�hlen Sie eine Antwort aus.");
        }    
    });
    
    $(document).on("click", "#quizNextButton", function(){            
        $('#quizPage').trigger('pagebeforeshow');
    }); 
