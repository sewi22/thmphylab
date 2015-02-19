    
    var db;

    function createDBTables() {
        db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS ExpGroups (id INTEGER PRIMARY KEY AUTOINCREMENT, expGroupNumber INTEGER NOT NULL, expGroupName TEXT NOT NULL)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS Experiments (id INTEGER PRIMARY KEY AUTOINCREMENT, expNumber INTEGER NOT NULL, expName TEXT NOT NULL, expGroupNumber INTEGER NOT NULL, expIsActive INTEGER NOT NULL)');

            tx.executeSql('CREATE TABLE IF NOT EXISTS ExpQuestions (id INTEGER PRIMARY KEY AUTOINCREMENT, expGroupNumber INTEGER NOT NULL, expNumber INTEGER NOT NULL, question TEXT NOT NULL, questionType TEXT NOT NULL, givenAnswer INTEGER)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS ExpAnswers (id INTEGER PRIMARY KEY AUTOINCREMENT, questionId INTEGER NOT NULL, answer TEXT NOT NULL, answerIsCorrect INTEGER NOT NULL, helpText TEXT NOT NULL)');

            //tx.executeSql('CREATE TABLE IF NOT EXISTS ExpTools ()');
            //tx.executeSql('CREATE TABLE IF NOT EXISTS ExpPictures ()');
        });
    }

    function errorCB(err){
        console.log("Folgender DB Fehler ist aufgetreten: "+err.code);
        //alert("Error: "+err.code);
    }

    function fillExpTables(){
        $.ajax({
            url: "http://winterling.net/thmphylab/exp.php",
            jsonp: "callback",
            dataType: "jsonp",
            data: {
                q: "experiments",
                format: "json"
            },
            success: function(result) {
                $.each(result.experiments, function(expGroupId, expGroup) {
                    db.transaction(function(tx){
                        tx.executeSql("SELECT * FROM ExpGroups WHERE expGroupNumber = ? AND expGroupName = ?", [expGroup.expGroupNumber, expGroup.expGroupName], function(tx, res) {
                            if(res.rows.length==0){
                                tx.executeSql("INSERT INTO ExpGroups (expGroupNumber, expGroupName) VALUES (?,?)", [expGroup.expGroupNumber, expGroup.expGroupName], function(tx, res) {
                                }, errorCB);
                            }
                        }, errorCB);
                    });

                    $.each(result.experiments[expGroupId].experiments, function(expId, exp) {
                        db.transaction(function(tx){
                            tx.executeSql("SELECT * FROM Experiments WHERE expNumber = ? AND expName = ?", [exp.expNumber, exp.expName], function(tx, res) {
                                if(res.rows.length==0){
                                    var active = (exp.active == true) ? 1 : 0;
                                    tx.executeSql("INSERT INTO Experiments (expGroupNumber, expNumber, expName, expIsActive) VALUES (?,?,?,?)", [expGroup.expGroupNumber, exp.expNumber, exp.expName, active], function(tx, res) {
                                    }, errorCB);
                                }
                            }, errorCB);
                        });
                    });

                });
                // Aufruf der Funktion zur dynamischen Erstellung der ExpList                
                createExpList();
            },
            error: function(){
                alert('Error on JSON Request');
            }
        });
    }
    
    function fillQuestionTables(){
        $.ajax({
            url: "http://winterling.net/thmphylab/quiz.php",
            jsonp: "callback",
            dataType: "jsonp",
            data: {
                q: "quiz",
                format: "json"
            },
            success: function(result) {
                $.each(result.quiz, function(expId, exp) {
                    // Experimente
                    $.each(exp.questions, function(qId,q){
                        // Fragestellung und Fragetyp
                        db.transaction(function(tx){
                            tx.executeSql("SELECT * FROM ExpQuestions WHERE question = ? AND expGroupNumber = ? AND expNumber = ?", [q.question, exp.expGroupNumber, exp.expNumber], function(tx, res) {                                
                                if(res.rows.length==0){
                                    tx.executeSql("INSERT INTO ExpQuestions (expGroupNumber, expNumber, question, questionType) VALUES (?,?,?,?)", [exp.expGroupNumber, exp.expNumber, q.question, q.questionType], function(tx, res) {
                                        // Rückgabe der ID des neuen Datensatzes
                                        var lastInsertId = res.insertId;
                                        $.each(q.answers, function (aId, a){
                                            tx.executeSql("SELECT * FROM ExpAnswers WHERE answer = ? AND questionId = ?", [a.answer, lastInsertId], function(tx, res) {
                                                if(res.rows.length==0){
                                                    var correct = (a.correct == true) ? 1 : 0;
                                                    tx.executeSql("INSERT INTO ExpAnswers (questionId, answer, answerIsCorrect, helpText) VALUES (?,?,?,?)", [lastInsertId, a.answer, correct, a.helpText], function(tx, res) {
                                                    }, errorCB);
                                                }
                                            }, errorCB);
                                        });
                                    }, errorCB);
                                }
                            }, errorCB);
                        });
                    });
                });                
            },
            error: function(){
                alert('Error on JSON Request');
            }
        });
    }