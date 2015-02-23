    
    function addExpListContextMenu(page){        
        $('#'+page+' [data-role="header"]').append('<a id="expListContextMenuButton" data-role="button" data-icon="bars" class="ui-btn-right" style="margin-top:-5px;" href="#myPanel">Menü</a>').trigger("create");
    }
    
    function fillExpListContextMenu(){
        var links = "";

        links += '<a href="#" id="contextMenuBack" data-theme="a" data-role="button">zurück</a>';
        links += '<a href="#" data-role="button">als Favorit</a>';
        links += '<a href="#localStoragePage" data-role="button">LocalStorage</a>';
        links += '<a href="#" data-role="button">QR Reader</a>';
        links += '<a href="#" data-role="button">Impressum</a>';


        $('#expListContextMenuControlgroup').controlgroup("container").append(links);
        $('#expListContextMenuControlgroup').enhanceWithin().controlgroup('refresh');    
    }
    
    
    function addExpDetailsContextMenu(page){
        //$('#'+page+' [data-role="header"]').append('<a id="expDetailsContextMenuButton" data-role="button" data-icon="bars" class="ui-btn-right" style="margin-top:-5px;" href="#myPanel">Menü</a>').trigger("create");
    }
    
    function fillExpDetailsContextMenu(){

    }
    
    function addExpFooterNavbar(page){
        var navbar, navbarId, footerId, addClassAll, addClassFav = "";
        if (page == "expDetailsPage"){       
            navbarId = "#expDetailsNavbar"; footerId = "#expDetailsFooter";
            classDetails = ' class="ui-btn-active ui-state-persist"';
            classQuiz = '';        
        } else if (page == "quizPage"){        
            navbarId = "#expQuizNavbar"; footerId = "#expQuizFooter";
            classDetails = '';
            classQuiz = ' class="ui-btn-active ui-state-persist"';        
        }
        var myNavbar = $('<div id="'+navbarId+'" class="footerNavbar" data-role="navbar" data-iconpos="bottom"><ul><li><a id="footerNavbarItemDetails" href="#expDetailsPage" data-theme="b" data-icon="grid"'+classDetails+'>Details</a></li><li><a id="footerNavbarItemQuiz" href="#quizPage" data-theme="b" data-icon="star"'+classQuiz+'>Quiz</a></li></ul></div>').appendTo(footerId);               
        $(footerId).append(navbar).trigger('create');
    }