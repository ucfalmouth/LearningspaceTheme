/*$(window).load(function(){
  NProgress.done();
});

NProgress.start();
NProgress.configure({ ease: 'ease', speed: 500 });*/

// remove space fron anchors in key information
$(".block_section a").each(function() {
    var $this = $(this);
    $this.html($this.html().replace(/&nbsp;/g, ''));
});

  $("a[rel=popover]").popover({ 
    html : true,
    content: function() {
      return $('#settingsnav').html();
    }
  });




// Document Ready-----------------------------------------------------------
$(document).ready(function() {
  document.createElement('header');
  document.createElement('nav');
  document.createElement('section');
  document.createElement('article');
  document.createElement('aside');
  document.createElement('footer');
  document.createElement('i');

if($('.path-mod').length != 0 || $('.path-question').length != 0 || $('.path-blocks').length != 0){
  // back to module button
  $('.breadcrumb li').each(function() {
    var url = $(this).find('a').attr('href');

    if (url.indexOf("category") >= 0){
      
      return true;
      
    }

  if (url.indexOf("course") >= 0){
    //$('#back-to-module').attr('href', url);
    $('div[role=main]').prepend("<a href=\"" + url + "\" id=\"back-to-module\" class=\"btn\"><i class=\"fa fa-arrow-circle-left\"></i> Back to module</a>");
    return false;
  }

  });
}

var test = 'http://google.com';
//$('#region-main').prepend("<a href=\"" + test + "\">Back to module</a>");

// Editing on buttons

var editOnHref = $('.block_settings a[href$="edit=on"]').attr('href');
$('a.turn-edit-on').attr('href', editOnHref);

var editOffHref = $('.block_settings a[href$="edit=off"]').attr('href');
$('a.turn-edit-off').attr('href', editOffHref);

// question bank button
var questionBankHref = $('#settingsnav').find('a[href*="question"]').attr('href');
$('#user_context_block').find('.question-bank-button').attr('href', questionBankHref);


// question bank button
var swicthroletostudentHref = $('#settingsnav').find('a[href*="switchrole=5"]').attr('href');
$('#user_context_block').find('.switch-to-student-button').attr('href', swicthroletostudentHref);

// question bank button
var subscribedUsers = $('#settingsnav').find('a[href*="enrol/users.php?id="]').attr('href');
$('#user_context_block').find('.subscribed-users').attr('href', subscribedUsers);


// question bank button
var enrolmentMethods = $('#settingsnav').find('a[href*="enrol/index.php?id="]').attr('href');
$('#user_context_block').find('.enrolment-methods').attr('href', enrolmentMethods);


// question bank button
var userGroups = $('#settingsnav').find('a[href*="group/instances.php?id="]').attr('href');
$('#user_context_block').find('.enrolment-methods').attr('href', userGroups);



// USER ROLES
var currentUserRole = $('#userrole').data( "role" );

if(currentUserRole == "student"){
  $('#student_context_block').show();
  $('.block_settings').hide();
}

else if(currentUserRole == "teacher"){
  $('.block_settings .commands').hide();
}

else if(currentUserRole == "admin"){
  $('#toggle-admin-settings').show();
}


$(".block_settings .header .title").click(function(){
  $(".block_settings").find(" .content").slideToggle();
});







 

// Hide / show editing on buttons

/*if ($('body.editing').length != 0){
  $('a.turn-edit-off').show();
  $('a.turn-edit-on').hide();
}*/

// Section Highlighting

var highlightedIcon = $('<i class="fa highlightedIcon fa-asterisk"></i>');

$('.topics').find('.current').prepend(highlightedIcon);


// Text string hacks ------------------------------------------------------ 

// "Save and return to course now just says save"
if ($('.path-mod-forum').length != 0){
  //alert('we are on the page');
$('.path-mod-forum').find('#id_submitbutton2').val('Create forum');
}

// Login Box Title
$('#.loginbox h2').text('Log In');

// Editing Sections Title Placeholder text
var placeholder = $('.editing h2.main').text()
                                         .replace('Summary of ','');
$("#id_name").attr("placeholder", placeholder);

// Backstretch ------------------------------------------------------------- 
// Duration is the amount of time in between slides,
// and fade is value that determines how quickly the next image will fade in
$('.login-page').backstretch([
    //"http://localhost:8888/learningspace/theme/learningspace/img/tumblr_m8ifzcPZzf1rrwb6to1_500.gif", 
    "http://learn-dev.falmouth.ac.uk/theme/learningspace/img/rough_wood_boards-wallpaper-1920x1200.jpg", 
    "http://learn-dev.falmouth.ac.uk/theme/learningspace/img/wave_7-wallpaper-1920x1200.jpg",
    "http://learn-dev.falmouth.ac.uk/theme/learningspace/img/wet_maple_leaf_close_up-wallpaper-1920x1200.jpg"
], {duration: 5000, fade: 750});

// Intro.JS Overlays -------------------------------------------------------
// http://usablica.github.io/intro.js/ 
var orientationOverlays = function(){

  // My courses link in navbar
  var myCourses = $('.navbar-fixed-top').find('.menu-item-my-courses');

  // Resources link in navbar
  var resources = $('.navbar-fixed-top').find('.menu-item-resources');

  // The breadcrumb
  var breadcrumb = $('#page-header').find('.breadcrumb');

  // User context menu
  var userMenu = $('.navbar-fixed-top').find('.nav.pull-right');

  // The list/menu of sections in a module
  var sectionMenu = $('#region-pre').find('.block_course_menu');

  // The nav buttons for the module
  var moduleNav = $('#region-pre').find('.block_html');

  // Next and previous sections
  var sectionNav = $('#region-main').find('.section-navigation.mdl-bottom');

  // The main content
  var moduleContent = $('#region-main').find('.course-content');

  // Add the data attributes needed by Intro.JS
  myCourses.attr("step", 1);
  myCourses.attr("intro", "My Courses will take you to a list of all the modules you have subscribed to.");

  resources.attr("step", 2);
  resources.attr("intro", "Quick links to services available to support your learning.");

  userMenu.attr("step", 3);
  userMenu.attr("intro", "My menu is where you can edit your Profile, get Help with the Learning Space and Log out.");

  breadcrumb.attr("step", 4);
  breadcrumb.attr("intro", "The Breadcrumb is to let you know where you are. All breadcrumb items are links.");

  sectionMenu.attr("step", 5);
  sectionMenu.attr("intro", "The Section menu will take you straight to a relevant topic or week in the current module. It can also show you all sections on one page.");

  moduleContent.attr("step", 6);
  moduleContent.attr("intro", "This is where your Learning Material will appear."); 

  sectionNav.attr("step", 7);
  sectionNav.attr("intro", "Click these to navigate through your Learning."); 

  moduleNav.attr("step", 8);
  moduleNav.attr("intro", "These contextual links are relevant to the current page. e.g. taking you from a module to the relevant course or to other modules on that course."); 

  // Load the Intro.JS Script
  $.getScript( "../theme/learningspace/javascript/intro.js", function( data, textStatus, jqxhr ) {
    //console.log( data ); // Data returned
    console.log( textStatus ); // Success
    console.log( jqxhr.status ); // 200
    console.log( "Load was performed." );
  });

};

// If we are on the orientation page, run the orientation overlay
if ($("body").hasClass("course-661")) {
  orientationOverlays();

  $("body").on("click", ".btn", function(){ 
    //alert("triggered the event");
    introJs().start();
  });
}

// "About this module" Dropdown ----------------------------------------------
// This uses block_section to render section0 as a block.
// We then grab the rendered section, and add it to a dynamically created 
// dropdown. The dropdown itself is added via an HTML block. Further 
// instrustions on doing that here: https://gist.github.com/aaronmarruk/6606770
var dd = $("<ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu\"></ul>");

// Grab the module dropdown div (as per: https://gist.github.com/aaronmarruk/6606770), 
// append the dropdown
$('.module-dropdown').append(dd);

// Grab the hidden block section block, get the HTML from inside
var blockSection = $(".topics > #section-0 > .content > ul.section").html();

// Grab the edit menu button
var blockSectionEdit = $('<a href="#" class="blockSectionEdit">Add a menu item</a>');

$('.module-dropdown').on('click', '.blockSectionEdit', function() {
  $( "#section-0 .section-modchooser-text" ).trigger( "click" );
});

// Add the dropdown                
$('.module-dropdown').find(".dropdown-menu")
                     .append(blockSection);

// If is editing, add the edit button    
if ( $( "body" ).hasClass( "editing" ) ) {          
  $('.module-dropdown').find(".dropdown-menu")
                       .append(blockSectionEdit);
}

// Linking from module list page to single section -------------------------
/*$('.path-course.pagelayout-coursecategory #region-main .courseboxes>ul>li').each(function(){
  var btnViewModule = $('<a href=\"\"></a>');
  btnViewModule.html('View this module <i class=\"fa fa-arrow-circle-right icon-right\"></i>');
  var btnViewModuleHref = $(this).find('.name')
                                              .find('a')
                                              .attr('href')+"&section=1";

  $(this).find('.name')
                      .find('a')
                      .attr('href',  btnViewModuleHref);

  btnViewModule.attr('href', btnViewModuleHref);

  $(this).append(btnViewModule);
});

$('.path-course.pagelayout-standard #region-main .coursebox').each(function(){
  var btnViewModule = $('<a href=\"\"></a>');
  btnViewModule.html('View this module <i class=\"fa fa-arrow-circle-right icon-right\"></i>');
  var btnViewModuleHref = $(this).find('.name')
                                              .find('a')
                                              .attr('href')+"&section=1";

  $(this).find('.name')
                      .find('a')
                      .attr('href',  btnViewModuleHref);

  btnViewModule.attr('href', btnViewModuleHref);

  $(this).append(btnViewModule);
});*/

// Breadcrumb Hackery -------------------------------------------------------
// Breadcrumb
var breadcrumb = $('.breadcrumb');

// Second to last breadcrumb item. i.e. The current page's parent.  
var pageParent = breadcrumb.find('li')
                                     .last()
                                     .prev()
                                     .find('a');

var pageGrandParent = breadcrumb.find('li')
                                     .last()
                                     .prev()
                                     .prev()
                                     

                                     .find('a');

// check if the parent was found and assign href if it was
if (pageParent.length){
  pageParent = pageParent.attr('href');
} else {
  // grab the grand parent instead
  pageParent = breadcrumb.find('li')
                                     .last()
                                     .prev()
                                     .prev()
                                     .find('a')
                                     .attr('href');
} 

// check if the parent was found and assign href if it was
if (pageGrandParent.length){
  pageGrandParent = pageGrandParent.attr('href');
} else {
  // grab the grand parent instead
  pageGrandParent = breadcrumb.find('li')
                                     .last()
                                     .prev()
                                     .prev()
                                     .find('a')
                                     .attr('href');
}                                

// "Back to module button" -------------------------------------------------  
if ($('#page-mod-quiz-view').length != 0){
$('.pagelayout-incourse').find('.back-to-mod')
                         .attr('href', pageGrandParent);
}else{
$('.pagelayout-incourse').find('.back-to-mod')
                         .attr('href', pageParent);
}


// Append links with "&section=1" ------------------------------------------   
$('.unlist').find('.name > a').each(function(){
  var url = $(this).attr('href') + '&section=1';
  $(this).attr('href', url);
});

// Turn It In Tooltips -----------------------------------------------------
$('#id_dtstart_day').tooltip({title: 'Day', animation: 'true'});
$('#id_dtstart_month').tooltip({title: 'Month', animation: 'true'});
$('#id_dtstart_year').tooltip({title: 'Year', animation: 'true'});
$('#id_dtstart_hour').tooltip({title: 'Hour', animation: 'true'});
$('#id_dtstart_minute').tooltip({title: 'Minute', animation: 'true'});
$('#id_dtdue_day').tooltip({title: 'Day', animation: 'true'});
$('#id_dtdue_month').tooltip({title: 'Month', animation: 'true'});
$('#id_dtdue_year').tooltip({title: 'Year', animation: 'true'});
$('#id_dtdue_hour').tooltip({title: 'Hour', animation: 'true'});
$('#id_dtdue_minute').tooltip({title: 'Minute', animation: 'true'});
$('#id_dtpost_day').tooltip({title: 'Day', animation: 'true'});
$('#id_dtpost_month').tooltip({title: 'Month', animation: 'true'});
$('#id_dtpost_year').tooltip({title: 'Year', animation: 'true'});
$('#id_dtpost_hour').tooltip({title: 'Hour', animation: 'true'});
$('#id_dtpost_minute').tooltip({title: 'Minute', animation: 'true'});


// User Profile Tooltip ----------------------------------------------------   
$('.user_profile_pic').tooltip();

// Zebra Stripe Tables -----------------------------------------------------
$(".pagelayout-admin tr:odd").addClass("odd");


// Toggle settings block
if ($('.pagelayout-course').length == 0){
  $("footer").on("click", "#toggle-admin-settings", function(e){
    e.preventDefault();
    $("#region-pre").slideToggle();
  });
} 

if ($('.pagelayout-course').length != 0){
  $("footer").on("click", "#toggle-admin-settings", function(e){
    e.preventDefault();
    $(".block_settings").toggle();
  });
}



// Toggle full screen ------------------------------------------------------
var toggleFS = "<span class=\"toggle\"><i class=\"fa fa-fullscreen pull-right\"></i></span>";
    
$('.pagelayout-admin .breadcrumb').append(toggleFS);
$('.pagelayout-standard .breadcrumb').append(toggleFS);
$('.pagelayout-report .breadcrumb').append(toggleFS);
$('.pagelayout-base .breadcrumb').append(toggleFS);
$('.pagelayout-incourse .breadcrumb').append(toggleFS);

$('.breadcrumb').on("click", '.toggle', function(){
  $('#wrapper .container-fluid').toggleClass('wide');
});


// Pull blog post, display in tooltip on LS Front Page ---------------------
// If on login page
if($("#page-login-index").length != 0) {    

  // Load the Tumblr API
  $.getScript( "http://teamet.tumblr.com/api/read/json", function( data, textStatus, jqxhr ) {
    //console.log( data ); // Data returned
    console.log( "Tumblr API Loaded OK: "+textStatus ); // Success
    console.log( jqxhr.status ); // 200
    console.log( "Load was performed." );

    // function that gets the latest 
    // "Open Design" blog post from the ET Tumblr account
    (function(){
    // Get the number of posts
    var numberOfPosts = tumblr_api_read['posts'].length;

      // Loop through the posts
      for (var i = 0; i < numberOfPosts; i++){

          // Get the current post
          var post = tumblr_api_read['posts'][i];

          // Get the tags for the current post
          var tags = post['tags'];

          // If the tags contains "Open Design"
          // Return from the function if "Open design is found"
          if (tags.indexOf("Open Design") > -1){

              // Get the current post title
              var postTitle = post["link-text"];

              // Get the current post content
              var postContent = post["link-description"];

              var stripContent = postContent.replace(/<(?:.|\n)*?>/gm, '');

              popoverContent = stripContent.substring(0,120);

              popoverContent += "... ";

              popoverContent += '<br /><a href=http://teamet.tumblr.com/tagged/Open-Design>Read More</a>';

              console.log(popoverContent);

              var node = '<span id="LSUpdateDisplaysInfo" class="btn pull-left btn-success" rel="popover" data-content="'+popoverContent+'" data-original-title="'+postTitle+'">What\'s Changing?</span>'
             
              $( "#LSUpdateDisplaysInfoPlaceholder" ).replaceWith(node);

              $("#LSUpdateDisplaysInfo").popover({placement: "top", html: true, trigger: "click"});
              
              return;
          }
      }
    })();
  });
}


// Countdown until next update ---------------------------------------------
if($("#page-login-index").length != 0) {

        var timeDifference = function() {
            
            // add 3 0's

            // Today 15:19
            var next = 1392909800000;

            // Midnight 16th Oct, 2013
            var now = new Date().getTime();

            var prev = 1381307383000;

              var msPerMinute = 60 * 1000;
              var msPerHour = msPerMinute * 60;
              var msPerDay = msPerHour * 24;
              var msPerMonth = msPerDay * 30;
              var msPerYear = msPerDay * 365;
              
              var difference =  now - next;
              difference = Math.abs(difference);

              var howLong = "";
              
              if (difference < msPerMinute) {
                   timeToGo = Math.round(difference/1000) + ' seconds until the next update';  
              }
              
              else if (difference < msPerHour) {
                   timeToGo = Math.round(difference/msPerMinute) + ' minutes until the next update';   
              }
              
              else if (difference < msPerDay ) {
                   timeToGo = Math.round(difference/msPerHour ) + ' hours until the next update';  
              }

              else if (difference < msPerMonth) {
                   timeToGo = Math.round(difference/msPerDay) + ' days until the next update';  
              }
              
              else if (difference < msPerYear) {
                   timeToGo = Math.round(difference/msPerMonth) + ' months until the next update';  
              }
              
              else {
                   timeToGo = Math.round(difference/msPerYear ) + ' years until the next update'; 
              }

              $('#LSUpdateDisplays').append('<p class="timeToGo">'+timeToGo+'</p>');


              var amount = (now - prev) / (next - prev) * 100;
              console.log(amount);

              var archtype = Raphael("updates-clock-canvas", 30, 30);
              archtype.customAttributes.arc = function (xloc, yloc, value, total, R) {
              var alpha = 360 / total * value,
                a = (90 - alpha) * Math.PI / 180,
                x = xloc + R * Math.cos(a),
                y = yloc - R * Math.sin(a),
                path;
            if (total == value) {
                path = [
                    ["M", xloc, yloc - R],
                    ["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
                ];
            } else {
                path = [
                    ["M", xloc, yloc - R],
                    ["A", R, R, 0, +(alpha > 180), 1, x, y]
                ];
            }
            return {
                path: path
            };
        };

        //make an arc at 50,50 with a radius of 30 that grows from 0 to 40 of 100 with a bounce
        var my_arc = archtype.path().attr({
            "stroke": "#b7beb6",
            "stroke-width": 7,
            arc: [15, 15, 0, 100, 10]
        });

        my_arc.animate({
        arc: [15, 15, amount, 100, 10]
        }, 1500, "bounce");

    }();
}

// LS Updates Tooltips -----------------------------------------------------  
$('#updates-clock-canvas').tooltip({title: $('.timeToGo').html(), animation: 'true'});

// Off canvas memu ---------------------------------------------------------
$('#responsive-menu-button').sidr({
  name: 'sidr-main',
  speed: 200,
  body: '#region-main, .navbar-fixed-top',
  source: '#region-pre, #user-context-menu'
});   

// Stop the link-click jumping the content to top
$('#responsive-menu-button').click(function(event){
$(".icon-reorder").toggle();
$(".icon-remove-circle").toggle();
$(".brand").fadeToggle();
event.preventDefault();
});

// -------------------------------------------------------------------------
// START: Modal Vimeo Embed Stop on modal Close ----------------------------
// -------------------------------------------------------------------------
if ($('.pagelayout-course').length == 0){
  $(".modal-backdrop, #myModal .close, #myModal .btn").live("click", function() {
          $("#myModal iframe").attr("src", jQuery("#myModal iframe").attr("src"));
  });
}
// -------------------------------------------------------------------------
// END: Modal Vimeo Embed Stop on modal Close ------------------------------
// -------------------------------------------------------------------------


// -------------------------------------------------------------------------
// START: Contact Form Validaton -------------------------------------------
// -------------------------------------------------------------------------
if($("#page-login-index").length != 0) {
  var emailIsValid = false;
  var firstNameIsValid = false;
  var lastNameIsValid = false;

  function isValidEmailAddress(emailAddress) {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      console.log(emailAddress);
      console.log(pattern.test(emailAddress));
      return pattern.test(emailAddress);
  };

  $("#input-email").on("keyup", function(){
    var emailaddress = $(this).val();
    if( !isValidEmailAddress(emailaddress)){ 
      emailIsValid = false;
      console.log("It's not valid");
      validateForm();
      $(this).closest('.control-group').removeClass('success');
      $(this).closest('.controls').find('.icon-ok').hide(); 

    } else if( isValidEmailAddress(emailaddress)){
      console.log("It's valid, hooray!");
      emailIsValid = true; 
      $(this).closest('.controls').find('.icon-ok').show();
      $(this).closest('.control-group').addClass('success');
      $(this).closest('.control-group').removeClass('error');
      $(this).closest('.controls').find('.icon-remove').hide();
      $(this).closest('.controls').find('.help-block').hide();
      validateForm();
    }
  });

  $("#form-first-name").on("keyup", function(){
    var firstName = $(this).val();
    
    if( firstName != ''){ 

      firstNameIsValid = true;

      $(this).closest('.controls').find('.icon-ok').show();
      $(this).closest('.control-group').addClass('success');
      $(this).closest('.control-group').removeClass('error');
      $(this).closest('.controls').find('.icon-remove').hide();
      $(this).closest('.controls').find('.help-block').hide();

    } else if ( firstName == ''){

      firstNameIsValid = false;
      $(this).closest('.control-group').removeClass('success');
      $(this).closest('.controls').find('.icon-ok').hide(); 
      
    }
    validateForm(); 
  });

  $("#form-last-name").on("keyup", function(){
    var lastName = $(this).val();
    if( lastName != ''){ 

      lastNameIsValid = true;

      $(this).closest('.controls').find('.icon-ok').show();
      $(this).closest('.control-group').addClass('success');
      $(this).closest('.control-group').removeClass('error');
      $(this).closest('.controls').find('.icon-remove').hide();
      $(this).closest('.controls').find('.help-block').hide();


    } else if ( lastName == ''){ 

      lastNameIsValid = false;
      $(this).closest('.control-group').removeClass('success');
      $(this).closest('.controls').find('.icon-ok').hide(); 


    }
    validateForm();
  });

  var validateForm = function(){
    if (emailIsValid && firstNameIsValid && lastNameIsValid == true){
      console.log("It's a valid form!");
      $('#emailformsubmitplaceholder').hide();
      $('#emailformsubmit').show();
    } else if (emailIsValid || firstNameIsValid || lastNameIsValid == false){
      $('#emailformsubmitplaceholder').show();
      $('#emailformsubmit').hide();
    }
  }

  $('#emailformsubmitplaceholder').click(function(){
    console.log("it was clicked");
    validateForm();
    if(firstNameIsValid == false){
      $('#form-first-name').closest('.controls').find('.help-block').show();
      $('#form-first-name').closest('.controls').find('.icon-remove').show();
    }
    if(lastNameIsValid == false){
      $('#form-last-name').closest('.controls').find('.help-block').show();
      $('#form-last-name').closest('.controls').find('.icon-remove').show();
    }
    if(emailIsValid == false){
      $(this).closest('.control-group').removeClass('success');
      $('#input-email').closest('.controls').find('.help-block').show();
      $('#input-email').closest('.controls').find('.icon-remove').show();
    }
    
  });

  $('#contactform').submit(function(e){
    e.preventDefault();
    
    var values = $(this).serialize();

   /* Send the data using post and put the results in a div */
    $.ajax({
        url: "http://learn-dev.falmouth.ac.uk/login/send_form_email.php",
        type: "post",
        data: values,
        success: function(){
             $('#emailformsubmit').hide();
            //$("#result").html('Submitted successfully');
            $( '#contactform .modal-body' ).animate({
              
              
              left: "1000px",
              opacity: 0.0
              

            }, 400, "swing" );

            //$("#result").html('Submitted successfully');
            $( '.thankyou' ).animate({
              
              
              left: "0px",
              opacity: 1.0,
              

            }, 400, "swing" );
        },
        error:function(){
            alert("Hmmm, something went wrong...");
            //$("#result").html('There is error while submit');
        }
    });
      
      
      
  });
}
// -------------------------------------------------------------------------
// END: Contact Form Validaton -------------------------------------------
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
// Start: Section-0 collapse -------------------------------------------
// -------------------------------------------------------------------------
if($(".single-section").length != 0) {
  $('#section-0').addClass('collapsed');

  $('#section-0').hover(
       function(){ $(this).removeClass('collapsed').css( 'height', 'auto') },
       function(){ $(this).addClass('collapsed').css('height', '100px') }
  );
}
// -------------------------------------------------------------------------
// End: Section-0 collapse -------------------------------------------
// -------------------------------------------------------------------------

$('#page-course-search #region-main > div > .coursebox:even').addClass('odd');
 

// validate signup form on keyup and submit
  /*$("#contactform").validate({
    rules: {
      first_name: "required",
      last_name: "required",
      email: {
        required: true,
        email: true
      },
    },
    messages: {
      first_name: "Please enter your firstname",
      last_name: "Please enter your lastname",


      email: "Please enter a valid email address"
    },
    highlight: function(element) {
    $(element).closest('.control-group').removeClass('success').addClass('error');
    },
    success: function(element) {
      element
      .text('OK!').addClass('valid')
      .closest('.control-group').removeClass('error').addClass('success');
    }
  });*/

    // Grab the edit menu button
    //var blockSectionEdit = $(".block_section").find(".btn-block");

    // Module page, single section
    var singleSection = $('.pagelayout-course .single-section');

    

    //var breadcrumbLast = breadcrumb.find('li').last();

    //alert(blockSection);

  //  $(".module-documents").append(blockSection);
//NProgress.set(0.4);
    //breadcrumbLast.addClass("breadcrumb-current-location");

    /*if (blockSection != null) {

    // if on course single view
    /*if ( singleSection.length != 0) {

      // Find the second to last item in the breadcrumb
      // and find the .divider within.
      // Add hacky-hider
      breadcrumbSecondLast.find(".divider")
                        .hide();
      
      // Find the third to last item in the breadcrumb
      // and find the .divider within.
      // Add hacky-hider
      breadcrumbSecondLast.prev()
                        .find(".divider")
                        .hide();

                      

      // Find the second to last item in the breadcrumb
      // and find the .divider within.
      // Add Breadcrumb-current-location class
      breadcrumbSecondLast.addClass("breadcrumb-current-location").append(dd);

      // Find and hide the last item in the breadcrumb               
      breadcrumb.find('li')      
                      .last()
                      .hide();

      

      

      // Add the drop-down icon to the breadcrumb
      breadcrumbSecondLast.find("a")
                    .addClass("dropdown-toggle");
                  

               
                  
      breadcrumbSecondLast.find("a")
                .append(chevron)
                      .attr("data-toggle", "dropdown");     

        }*/

    // if on course list view
    /*else if ( singleSection.length == 0 && $('.pagelayout-course').length == 1 ) {

      // Find the last item in the breadcrumb
      // and find the .divider within.
      // Hide
      breadcrumb.find('li')      
                      .last()
                      .prev()
                      .find(".divider")
                      .hide();


      // Find the last item in the breadcrumb
      // Add Breadcrumb-current-location class
      breadcrumb.find('li')      
                      .last()
                      .addClass("breadcrumb-current-location").append(dd);


                      $('.breadcrumb').find('li')
              .last()
   
                    .find("a").append(chevron)
                    .attr("data-toggle", "dropdown"); 

    } else {
      breadcrumb.find('li')      
                      .last()
                      .addClass("breadcrumb-current-location");
    }

}*/
// End if blockSection != null

//  if (blockSection == null) {

//  breadcrumb.find('li')      
        //              .last()
      //                .addClass("breadcrumb-current-location");

    //          $('.breadcrumb a').find('li>a').bind('click',function(e){
  //    e.preventDefault();
         
//});   
                     
//}


// Login Placeholder text
// only necessary for browsers that don't support the placeholder attribute
$('#username').attr('placeholder', 'Username');
$('#password').attr('placeholder', 'Password');


  
  /*$('input[type=text]').blur(function() {
    if ($(this).val() == '') {
      $(this).val($(this).attr('defaultValue'));
    } 
  });*/

 
$('input').on({
'click': function(){ // clear the placeholder
if( $(this).val() == $(this).attr('placeholder')){ $(this).val(''); }
},
'blur': function(){ // reset the placeholder
if( $(this).val() == ''){ $(this).val($(this).attr('placeholder')); }
}
});



if($('.section-navigation.header.headingblock>a.mdl-right').length != 0){
var showAll = $('.section-navigation.header.headingblock>a.mdl-right');
var theShowAllHref = $('.section-navigation.header.headingblock>a.mdl-right').attr('href');
showAll.text('View all sections');

} else { showAll = "";  }


if (showAll.length != 0) {

var theShowAll = $("<a href=\"" + theShowAllHref + "\" class=\"mdl-right\">View all sections</a>");
$('.sidr-class-block_navigation').append(theShowAll);
  $('.block_course_menu .block_tree').append(showAll);
  
} else if (showAll.length == 0) {

  var bodyID = document.body.id;
  $('.sidr-class-block_navigation').append("<a href=\"#\" class=\"show-all-active\">View all sections<a/>");
  if(bodyID != "page-mod-page-view"){
  $('.block_course_menu .block_tree').append("<a href=\"#\" class=\"show-all-active\">View all sections<a/>");
  
}else{
  
}
}



//$("#dr-menu>.menu").html(blockSection);

// Get dropdown menu links
var dropLink = $('.dropdown-menu').find('a');

//NProgress.set(0.7);

  // For each dropLink
  $( dropLink ).each(function() {
  // If dropdown menu link is div, remove the div
if ( $(this).parent().is("div")  ) {
    $(this).unwrap();
  }
});

  // Loop through each of the alerts
  $(".content").find(".alert").each(function(){

    
    // Its its a warning, add the warning icon
    if($(this).hasClass("alert-error")){
      var icon = "<i class=\"icon-exclamation-sign\"></i> ";
      $(this).prepend(icon);
    }

    // Its its a success, add the calendar icon
    if($(this).hasClass("alert-success")){
      var icon = "<i class=\"icon-calendar\"></i> ";
      $(this).prepend(icon);
    }

    // Its its a info, add the speech bubble icon
    if($(this).hasClass("alert-info")){
      var icon = "<i class=\"icon-comment\"></i> ";
      $(this).prepend(icon);
    }

  });

  $(".content").find("blockquote").each(function(){
    var icon = "<i class=\"icon-quote-left\"></i> ";
      $(this).prepend(icon);
  });



$(".section-navigation.mdl-bottom").find(".mdl-left").prepend("<i class=\"icon-chevron-left\"></i> ");

  $(".section-navigation.mdl-bottom").find(".mdl-left").prepend("<h2>Previous section:</h2> ");



$(".section-navigation.mdl-bottom").find(".mdl-right").append(" <i class=\"icon-chevron-right\"></i>");

$(".section-navigation.mdl-bottom").find(".mdl-right").prepend(" <h2>Next section:</h2>");

//NProgress.set(0.9);


  $('p, span, h1, h2, h3, h4, h5, h6').removeAttr("style");
  
  


    // On DOM Ready, show the breadcrumb
    //$(".breadcrumb").show();

    // On DOM Ready, show the breadcrumb
    //$("body").show();


//$.get('http://localhost:8888/moodle24/moodle', function(data) {
//$('#page-content').html(data);
 // console.log('Load was performed.');
//});

//$('#page-content').load("http://localhost:8888/moodle24/moodle #region-main", function() {
  // stuff to do when content is ready
 // alert('it loaded');
// });

//var parCat = breadcrumb.find('li').last().prev().find('a').attr('href');
//alert(parCat);
//$('#other-mods').attr('href',parCat);

//alert(parCat);

//window.print();

});

