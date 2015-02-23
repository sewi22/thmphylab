    
    // Init on start of application. Starts DB and creates the ExpLists      
    $(document).ready(function() {        
        db = window.openDatabase("ThmPhyLabDb", "", "DB for THM-PhyLab App", 1024*1024);
        createDBTables();
        fillExpTables();
        fillQuestionTables();                    
    });


    $(function () {
        $("[data-role=panel]").enhanceWithin().panel();
    });

    // Decision if going back in history or exiting app by clicking the "Back Button"
    $(document).on("click", "backbutton", function(e){
        if($.mobile.activePage.is('#expListPage')){
            navigator.app.exitApp();
        } else {
            navigator.app.backHistory()
        }
    }, false);
    
    
    $(document).on("click", "#expListContextMenuButton", function(event) {      
        if( $(".ui-panel").hasClass("ui-panel-open") == true ){            
            $("#expListContextMenu").panel("close");
        }else{            
            $("#expListContextMenu").panel("open");            
        }                
    });
    
    $(document).on("click", "#contextMenuBack", function(event) {                        
        if( $(".ui-panel").hasClass("ui-panel-open") == true ){
            $("#expListContextMenu").panel("close");
        }else{
            $("#expListContextMenu").panel("open");
        }
    });          
    
    
    // Mark actual Exp as Favorite
    $(document).on("click", ".headerFavButton", function(){                
        // Experimente als Favorit markieren und Button entsprechend darstellen (Theme)
        expGroupNumber = localStorage.getItem("expGroupNumber");
        expNumber = localStorage.getItem("expNumber");
        
        getExpIsFav(expGroupNumber, expNumber, function(result){            
            var expIsFav = (result.expIsFav == 0) ? 1 : 0;            
            setExpIsFav(expIsFav, expGroupNumber, expNumber, function(){});
            expIsFav = (expIsFav == 0) ? false : true;            
            //$(".headerFavButton").addClass('ui-state-focus');
            //$(".headerFavButton").addClass('ui-state-active');
            //$(".headerFavButton").addClass('ui-state-hover');
            
        });        
        
    });

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
    
    // Create the StartPage Content
    $(document).on("pagebeforecreate", "#startPage", function(e){
        $("#startContent").html("<p>THM PhyLab</p><img src='css/images/start-loader.gif'/>");
    });
      
        
    // DetailsPage
    $(document).on('pagebeforeshow', '#expDetailsPage', function(e) {    
        var expGroupNumber = localStorage.getItem("expGroupNumber");
        var expNumber = localStorage.getItem("expNumber");
        
        getExp(expGroupNumber, expNumber, function(result){                        
            //var headline = result.expGroupNumber+"."+result.expNumber;            
            //$("#expDetailsHeadline").html(headline);
            $("#expDetailsContent").html(result.expName);
            //$(".footerQuizButton").attr("data-expGroupNumber", expGroupNumber);
            //$(".footerQuizButton").attr("data-expNumber", expNumber);
        });    
    });
    
    $(document).on('pagecreate', '#expDetailsPage', function(e) {        
        addExpFooterNavbar(e.target.id);
    });

    $(document).on('pagecreate', '#quizPage', function(e) {        
        addExpFooterNavbar(e.target.id);
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
    
    
    // Swipe on detailsPage to Left
    $(document).on('swipeleft', '#expDetailsPage', function(event) {
        var next = '#' + $.mobile.activePage.next('[data-role=page]')[0].id;
        if(event.handled !== true){
            $(':mobile-pagecontainer').pagecontainer('change', next, {transition: 'slide', reverse: false});
            event.handled = true;
        }
        return false;
    });

    // Swipe on expListFavPage to Right
    $(document).on('swiperight', '#quizPage', function(event) {
                
        var prev = '#' + $.mobile.activePage.prev('[data-role=page]')[0].id;                
        if(event.handled !== true){
            $(':mobile-pagecontainer').pagecontainer('change', prev, {transition: 'slide', reverse: true});
            event.handled = true;
        }
        return false;
    });
    
    // Click on Quiz Tab
    $(document).on('click', '#footerNavbarItemQuiz', function(event){
        if(!$(this).hasClass('ui-state-persist')){
            $(':mobile-pagecontainer').pagecontainer('change', '#quizPage', {transition: 'slide', reverse: false});
        }
    });
    
    // Click on Details Tab
    $(document).on('click', '#footerNavbarItemDetails', function(event){
        if(!$(this).hasClass('ui-state-persist')){
            $(':mobile-pagecontainer').pagecontainer('change', '#expDetailsPage', {transition: 'slide', reverse: true});
        }
    });
        