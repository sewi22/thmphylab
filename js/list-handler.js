
    // Create ExpLists (All and Fav)
    $(document).on('pagecreate', '.expListPage', function(e) {        
        $(".ui-toolbar-back-btn").remove();
        $('.expList').delegate("li a", "click", function (){
            localStorage.setItem("expGroupNumber", $(this).jqmData('expgroupnumber'));
            localStorage.setItem("expNumber", $(this).jqmData('expnumber'));
        });      
    });
    
    // Add Navbar Header to expListAllPage
    $(document).on('pagecreate', '#expListAllPage', function(e) {              
        addExpListHeaderNavbar(e.target.id);
        addExpListContextMenu(e.target.id);
        fillExpListContextMenu();         
    });
    
    // Add Navbar Header to expListFavPage
    $(document).on('pagecreate', '#expListFavPage', function(e) {        
        addExpListHeaderNavbar(e.target.id);
        addExpListContextMenu(e.target.id);
    });

    
    // Swipe on expListAllPage to Left
    $(document).on('swipeleft', '#expListAllPage', function(event) {        
        var next = '#' + $.mobile.activePage.next('[data-role=page]')[0].id;
        if(event.handled !== true){
            $(':mobile-pagecontainer').pagecontainer('change', next, {transition: 'slide', reverse: false});
            event.handled = true;
        }
        return false;        
    });
    
    // Click on Fav Tab
    $(document).on('click', '#expListNavbarItemFav', function(event){        
        if(!$(this).hasClass('ui-state-persist')){
            $(':mobile-pagecontainer').pagecontainer('change', '#expListFavPage', {transition: 'slide', reverse: false});
        }
    });

    
    // Swipe on expListFavPage to Right
    $(document).on('swiperight', '#expListFavPage', function(event) {        
        var prev = '#' + $.mobile.activePage.prev('[data-role=page]')[0].id;
        if(event.handled !== true){
            $(':mobile-pagecontainer').pagecontainer('change', prev, {transition: 'slide', reverse: true});
            event.handled = true;
        }
        return false;
    });

    // Click on All Tab
    $(document).on('click', '#expListNavbarItemAll', function(event){        
        if(!$(this).hasClass('ui-state-persist')){
            $(':mobile-pagecontainer').pagecontainer('change', '#expListAllPage', {transition: 'slide', reverse: true});
        }
    });
    
    
    /*
    $(document).on('pagecreate', '#expListAllPage', function(e) {
        //console.log("onPageCreate #expListAllPage");
    });

    $(document).on('pagecreate', '#expListFavPage', function(e) {
        //console.log("onPageCreate #expListFavPage");
    });

    $(document).on('pagebeforeshow', '#expListAllPage', function(e) {
        //console.log("onPageShow #expListAllPage");
    });

    $(document).on('pagebeforeshow', '#expListFavPage', function(e) {
        //console.log("onPageShow #expListFavPage");
    });
    */