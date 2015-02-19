
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
                                $('#list'+expGroup.expGroupNumber).append('<li id="expListItem"><a href="#expDetailsPage" data-expGroupNumber="'+expGroup.expGroupNumber+'" data-expNumber="'+exp.expNumber+'" data-transition="slide">'+ expGroup.expGroupNumber + '.' + exp.expNumber + ' ' + exp.expName + '</a></li>');                                                                                                
                            } else {                                    
                                $('#list'+expGroup.expGroupNumber).append('<li id="expListItem">'+ expGroup.expGroupNumber + '.' +exp.expNumber + ' ' + exp.expName + '</li>');                                                                                                                                
                            }                                                                                           
                        };
                        if(i == expGroups.length-1){
                            $('ul[data-role=listview]').listview('refresh');
                            $.mobile.changePage("#expListPage", "fade");
                            //console.log("EXP List wurde erstellt");    
                        }                                                
                    });
                })(i);                        
            }             
        });        
    }
