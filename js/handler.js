          
    $(document).ready(function() {        
        db = window.openDatabase("ThmPhyLabDb", "", "DB for THM-PhyLab App", 1024*1024);
        createDBTables();
        fillExpTables();
        fillQuestionTables();            
    });


    // Decision if going back in history or exiting app by clicking the "Back Button"
    $(document).on("click", "backbutton", function(e){
        if($.mobile.activePage.is('#expListPage')){
            navigator.app.exitApp();
        } else {
            navigator.app.backHistory()
        }
    }, false);
    

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
    
    // StartPage
    $(document).on("pagebeforecreate", "#startPage", function(e){
        $("#startContent").html("<p>THM PhyLab</p><img src='css/images/start-loader.gif'/>");
    });
    
    
    
    // ExpList
    $(document).on('pagecreate', '.expListPage', function(e) {
        $(".ui-toolbar-back-btn").remove();
        $('.expList').delegate("li a", "click", function (){
            localStorage.setItem("expGroupNumber", $(this).jqmData('expgroupnumber'));
            localStorage.setItem("expNumber", $(this).jqmData('expnumber'));
        });
    });
    
    
    $(document).on( "swipeleft", "#expListAllPage", function(event) {
        console.log("Swipe Right auf ListAll");
        $.mobile.changePage("#expListFavPage", "fade");
    });
    
    $(document).on( "swiperight", "#expListFavPage", function(event) {
        console.log("Swipe Left auf ListFav");
        $.mobile.changePage("#expListAllPage", "fade");
    });    
    
        
    $(document).on('pagecreate', '#expListAllPage', function(e) {
        
    });
    
    $(document).on('pagecreate', '#expListFavPage', function(e) {

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
        