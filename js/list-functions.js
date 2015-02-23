
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
                                $('#list'+expGroup.expGroupNumber).append('<li><a href="#expDetailsPage" data-expGroupNumber="'+expGroup.expGroupNumber+'" data-expNumber="'+exp.expNumber+'" data-transition="flip">'+ expGroup.expGroupNumber + '.' + exp.expNumber + ' ' + exp.expName + '</a></li>');                                                                                                
                            } else {                                    
                                $('#list'+expGroup.expGroupNumber).append('<li>'+ expGroup.expGroupNumber + '.' +exp.expNumber + ' ' + exp.expName + '</li>');                                                                                                                                
                            }                                                                                           
                        };
                        if(i == expGroups.length-1){
                            $('ul[data-role=listview]').listview('refresh');                            
                            $(':mobile-pagecontainer').pagecontainer('change', '#expListAllPage', {transition: 'fade'});                                
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
                    $('#expListFav').append('<li><a href="#expDetailsPage" data-expGroupNumber="'+exp.expGroupNumber+'" data-expNumber="'+exp.expNumber+'" data-transition="flip">'+ exp.expGroupNumber + '.' + exp.expNumber + ' ' + exp.expName + '</a></li>');
                } else {
                    $('#expListFav').append('<li>'+ exp.expGroupNumber + '.' +exp.expNumber + ' ' + exp.expName + '</li>');
                }
            };
            if(e == res.length-1){
                $('ul[data-role=listview]').listview('refresh');                
            }
            if(res.length == 0){
                $('#expListFav').append('Es wurden noch keine Versuche als Favorit gespeichert.');
                $('ul[data-role=listview]').listview('refresh');                
            }
        });                         
    }
    
    // Add a NavBar to header in ExpLists
    function addExpListHeaderNavbar(page){                       
        var navbar, navbarId, headerId, addClassAll, addClassFav = "";
        if (page == "expListAllPage"){
            navbarId = "#expListAllNavbar";headerId = "#expListAllHeader";addClassAll = 'class="ui-btn-active ui-state-persist"'; addClassFav = '';
        } else if (page == "expListFavPage"){
            navbarId = "#expListFavNavbar";headerId = "#expListFavHeader";addClassAll = ''; addClassFav = 'class="ui-btn-active ui-state-persist"';
        }
        var myNavbar = $('<div id="'+navbarId+'" class="expListNavbar" data-role="navbar"><ul><li><a id="expListNavbarItemAll" href="#expListAllPage" '+addClassAll+' data-theme="a">Alle</a></li><li><a id="expListNavbarItemFav" href="#expListFavPage" '+addClassFav+' data-theme="a">Favoriten</a></li></ul></div>').appendTo(headerId);       
        $(headerId).append(navbar).trigger('create');        
    }    
      