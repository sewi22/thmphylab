    
    /*********************************************
     **                                         **
     **  GET Functions for Data from DB Tables  **
     **                                         **
     *********************************************/

    // GET all ExpGroups
    function getExpGroups(callBack){        
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM ExpGroups", [], function(tx, res) {                
                result = res.rows;
                callBack(result);
            }, errorCB);
        });
    }
    
    // GET all Exp from specified ExpGroup
    function getAllExpFromGroup(expGroupNumber, callBack){        
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM Experiments WHERE expGroupNumber = ?", [expGroupNumber], function(tx, res) {                
                result = res.rows;
                callBack(result);
            }, errorCB);
        });
    }
    
    // GET specified Exp
    function getExp(expGroupNumber, expNumber, callBack){
        //var result = [];
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM Experiments WHERE expNumber = ? AND expGroupNumber = ?", [expNumber, expGroupNumber], function(tx, res) {
                result = res.rows.item(0);
                callBack(result);              
            }, errorCB);
        });                   
    }
    
    /*    
    function getQuestion(answerId){
        var result = [];
        db.transaction(function(tx){
            tx.executeSql("SELECT questionId FROM ExpAnswers WHERE id = ? LIMIT 1", [answerId], function(tx, res) {
                result = res.rows.item(0);
                callBack(res);
            }, errorCB);
        });    
    }
    */
    
    // GET all Questions from specified exp, that are not answered yet
    function getQuizQuestions(expGroupNumber, expNumber, callBack){        
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM ExpQuestions WHERE expGroupNumber = ?  AND expNumber = ? AND givenAnswerId IS NULL AND givenAnswerText IS NULL AND givenAnswerNumber IS NULL", [expGroupNumber, expNumber], function(tx, res){                
                result = res.rows;
                callBack(result);
            }, errorCB);            
        });
    }
    
    // COUNT all Questions for specified exp
    function getAllQuestionsForExp(expGroupNumber, expNumber, callBack){
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM ExpQuestions WHERE expGroupNumber = ?  AND expNumber = ?", [expGroupNumber, expNumber], function(tx, res){
                result = res.rows;
                callBack(result);
            }, errorCB);
        });
    }
    
    // GET all Answers to a specified Question
    function getQuestionsAnswers(questionId, callBack){        
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM ExpQuestions As q, ExpAnswers AS a WHERE a.questionId = ? AND q.id = a.questionId", [questionId], function(tx, res){
                result = res.rows;
                callBack(result);
            }, errorCB);
        });
    }
    

    // GET specified Answer 
    function getAnswer(answerId, callBack){
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM ExpAnswers WHERE id = ?", [answerId], function(tx, res){
                result = res.rows.item(0);
                callBack(result);    
            }, errorCB);            
        });
    }
    
    // GET correct Answer for specified Question
    /*
    function getCorrectAnswer(questionId, callBack){
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM ExpAnswers WHERE questionId = ? AND answerIsCorrect = ?", [questionId, 1], function(tx, res){
                result = res.rows.item(0);
                callBack(result);
            }, errorCB);
        });
    }
    */
    
    // GET correct Answer for specified Question
    /*
    function getQuizResultAnswers(questionId, answerId, callBack){
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM ExpAnswers WHERE (questionId = ? AND answerIsCorrect = ?) OR (id = ?)", [questionId, 1, answerId], function(tx, res){
                result = res.rows;
                callBack(result);
            }, errorCB);
        });
    }
    */
    
    
    // GET Value if Experiment is marked as Favorite
    function getExpIsFav(expGroupNumber, expNumber, callBack){
        db.transaction(function(tx){
            tx.executeSql("SELECT expIsFav FROM Experiments WHERE expGroupNumber = ? AND expNumber = ?", [expGroupNumber, expNumber], function(tx, res){
                result = res.rows.item(0);
                callBack(result);
            }, errorCB);
        });    
    }
    
    function getFavExp(callBack){
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM Experiments WHERE expIsFav = ?", [1], function(tx, res){
                result = res.rows;
                callBack(result);
            }, errorCB);
        });    
    }

/**********************************************************************************************************************************************************/
/**********************************************************************************************************************************************************/

    /********************************************
     **                                        **
     **  SET Functions for Changing DB Tables  **
     **                                        **
     ********************************************/

    // SET Question AS answered with given Answer 
    function setGivenAnswerMc(questionId, answerId, callBack){
        db.transaction(function(tx){
            tx.executeSql("UPDATE ExpQuestions SET givenAnswerId = ? WHERE id = ?", [answerId, questionId], function(tx, res){               
            }, errorCB); 
        });
    }
    
    function setGivenAnswerText(questionId, answer, callBack){
        db.transaction(function(tx){
            tx.executeSql("UPDATE ExpQuestions SET givenAnswerText = ? WHERE id = ?", [answer, questionId], function(tx, res){
            }, errorCB);
        });
    }
    
    function setGivenAnswerNumber(questionId, answer, callBack){
        db.transaction(function(tx){
            tx.executeSql("UPDATE ExpQuestions SET givenAnswerNumber = ? WHERE id = ?", [answer, questionId], function(tx, res){
            }, errorCB);
        });
    }
    
    // SET all Questions for specified EXP AS not answered
    function resetGivenAnswer(expGroupNumber, expNumber, callBack){
        db.transaction(function(tx){
            tx.executeSql("UPDATE ExpQuestions SET givenAnswerId = NULL, givenAnswerText = NULL, givenAnswerNumber = NULL WHERE expGroupNumber = ? AND expNumber = ?", [expGroupNumber, expNumber], function(tx, res){                
            }, errorCB);
        });
    }
    
    // SET all Questions for specified EXP AS not answered
    function setExpIsFav(expIsFav, expGroupNumber, expNumber, callBack){
        db.transaction(function(tx){
            tx.executeSql("UPDATE Experiments SET expIsFav = ? WHERE expGroupNumber = ? AND expNumber = ?", [expIsFav, expGroupNumber, expNumber], function(tx, res){
            }, errorCB);
        });
    }      

/**********************************************************************************************************************************************************/
/**********************************************************************************************************************************************************/