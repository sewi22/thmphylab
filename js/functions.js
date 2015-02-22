
    function createExpListAll(){    
        getExpGroups(function (expGroups){            
            for(var i=0; i<expGroups.length; i++) {
                (function(i){                                                        
                    var expGroup = expGroups.item(i);                    
                    $('#expListAll').append('<div data-role="collapsible"><h3>'+ expGroup.expGroupName + '</h3><ul id="list'+expGroup.expGroupNumber+'" class="expList" data-role="listview"></ul></div>').enhanceWithin();
                    getAllExpFromGroup(expGroup.expGroupNumber, function (res){
                        for(var e=0; e<res.length; e++){                                                                                                    
                            var exp = res.item(e);
                            if(exp.expIsActive == 1){                                                               
                                $('#list'+expGroup.expGroupNumber).append('<li><a href="#expDetailsPage" data-expGroupNumber="'+expGroup.expGroupNumber+'" data-expNumber="'+exp.expNumber+'" data-transition="slide">'+ expGroup.expGroupNumber + '.' + exp.expNumber + ' ' + exp.expName + '</a></li>');                                                                                                
                            } else {                                    
                                $('#list'+expGroup.expGroupNumber).append('<li>'+ expGroup.expGroupNumber + '.' +exp.expNumber + ' ' + exp.expName + '</li>');                                                                                                                                
                            }                                                                                           
                        };
                        if(i == expGroups.length-1){
                            $('ul[data-role=listview]').listview('refresh');
                            $.mobile.changePage("#expListAllPage", "fade");                                
                        }                                                
                    });
                })(i);                        
            }             
        });        
    }
    
    function createExpListFav(){
        getFavExp(function (res){
            for(var e=0; e<res.length; e++){
                var exp = res.item(e);
                if(exp.expIsActive == 1){
                    $('#expListFav').append('<li><a href="#expDetailsPage" data-expGroupNumber="'+exp.expGroupNumber+'" data-expNumber="'+exp.expNumber+'" data-transition="slide">'+ exp.expGroupNumber + '.' + exp.expNumber + ' ' + exp.expName + '</a></li>');
                } else {
                    $('#list'+expGroup.expGroupNumber).append('<li>'+ expGroup.expGroupNumber + '.' +exp.expNumber + ' ' + exp.expName + '</li>');
                }
            };
            if(e == res.length-1){
                $('ul[data-role=listview]').listview('refresh');
                //$.mobile.changePage("#expListPage", "fade");
            }
        });    
                        
    }
    
    /*
    function createConfirmDialog(header, description, yes, no, callback) {
        $("#sure .sure-1").text(header);
        $("#sure .sure-2").text(description);
        $("#sure .sure-no").text(no);
        $("#sure .sure-do").text(yes).on("click.sure", function() {
            callback();
            $(this).off("click.sure");
        });
        $.mobile.changePage("#sure");
    }
    */    