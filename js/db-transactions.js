    
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
            tx.executeSql("SELECT * FROM ExpQuestions WHERE expGroupNumber = ?  AND expNumber = ? AND givenAnswer IS NULL", [expGroupNumber, expNumber], function(tx, res){                
                result = res.rows;
                callBack(result);
            }, errorCB);            
        });
    }
    
    // GET all Answers to a specified Question
    function getQuizAnswers(questionId, callBack){        
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM ExpAnswers WHERE questionId = ?", [questionId], function(tx, res){
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

/**********************************************************************************************************************************************************/
/**********************************************************************************************************************************************************/

    /********************************************
     **                                        **
     **  SET Functions for Changing DB Tables  **
     **                                        **
     ********************************************/

    // SET Question AS answered with given Answer 
    function setGivenAnswer(questionId, answerId, callBack){
        db.transaction(function(tx){
            tx.executeSql("UPDATE ExpQuestions SET givenAnswer = ? WHERE id = ?", [answerId, questionId], function(tx, res){               
            }, errorCB); 
        });
    }
    
    // SET all Questions for specified EXP AS not answered
    function resetGivenAnswer(expGroupNumber, expNumber, callBack){
        db.transaction(function(tx){
            tx.executeSql("UPDATE ExpQuestions SET givenAnswer = NULL WHERE expGroupNumber = ? AND expNumber = ?", [expGroupNumber, expNumber], function(tx, res){                
            }, errorCB);
        });
    }      

/**********************************************************************************************************************************************************/
/**********************************************************************************************************************************************************/