// Document Ready-----------------------------------------------------------
$(document).ready(function() {
// remove space fron anchors in key information
$(".block_section a").each(function() {
    var $this = $(this);
    $this.html($this.html().replace(/&nbsp;/g, ''));
});

//var noBlockSectionWarning = "<div id=\"inst1290\" class=\"block_section  block list_block\" role=\"complementary\" aria-labelledby=\"instance-1290-header\"><div class=\"header\"><div class=\"title\"><div class=\"block_action\"><img class=\"block-hider-hide\" tabindex=\"0\" alt=\"Hide Key Information block\" title=\"Hide Key Information block\" src=\"http://localhost:8888/learningspace/theme/image.php?theme=learningspace&amp;component=core&amp;rev=-1&amp;image=t/switch_minus\"><img class=\"block-hider-show\" tabindex=\"0\" alt=\"Show Key Information block\" title=\"Show Key Information block\" src=\"http://localhost:8888/learningspace/theme/image.php?theme=learningspace&amp;component=core&amp;rev=-1&amp;image=t/switch_plus\"></div><h2 id=\"instance-1290-header\">Key Information</h2></div></div><div class=\"content\"><p>Hmmm, looks like some important content is missing. Please contact your module tutor.</p></div></div>";


  $("a[rel=popover]").popover({ 
    html : true,
    content: function() {
      return $('#settingsnav').html();
    }
  });

  //Add Hover effect to menus
$('ul.nav li.dropdown').hover(function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).show();
}, function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).hide();
});

$('.dropdown-menu').hover(function(){
  $(this).closest('.dropdown').find('.dropdown-toggle').addClass("dropdown-hover");
}, function(){
  $(this).closest('.dropdown').find('.dropdown-toggle').removeClass("dropdown-hover");
});


$("body").fitVids();

    // Loop through each of the alerts
  $(".content").find(".alert").each(function(){

    
    // Its its a warning, add the warning icon
    if($(this).hasClass("alert-error")){
      var icon = "<i class=\"fa fa-exclamation-circle\"></i> ";
      $(this).prepend(icon);
    }

    // Its its a success, add the calendar icon
    if($(this).hasClass("alert-success")){
      var icon = "<i class=\"fa fa-calendar\"></i> ";
      $(this).prepend(icon);
    }

    // Its its a info, add the speech bubble icon
    if($(this).hasClass("alert-info")){
      var icon = "<i class=\"fa fa-comment\"></i> ";
      $(this).prepend(icon);
    }

  });

  $(".content").find("blockquote").each(function(){
    var icon = "<i class=\"fa fa-quote-left\"></i> ";
      $(this).prepend(icon);
  });


// Quick fix to force next/previous section buttons to click the relative anchor
$('.mdl-bottom .btn').click(function(e) {
  return false; 
  $(this).find('a').click();
  return false;
});






$(".section-navigation.mdl-bottom").find(".mdl-left a").prepend("<i class=\"fa fa-chevron-left\"></i> ");

  $(".section-navigation.mdl-bottom").find(".mdl-left a").prepend("<h2>Previous section:</h2> ");



$(".section-navigation.mdl-bottom").find(".mdl-right a").prepend(" <i class=\"fa fa-chevron-right\"></i>");

$(".section-navigation.mdl-bottom").find(".mdl-right a").prepend(" <h2>Next section:</h2>");


// Section Highlighting

var highlightedIcon = $('<i class="fa highlightedIcon fa-asterisk"></i>');

$('.topics').find('.current').prepend(highlightedIcon);

  

  $('p, span, h1, h2, h3, h4, h5, h6').removeAttr("style");
  


// View all sections -----------------------------------------------------------
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

// append section 1 to module links
if($('.pagelayout-coursecategory').length != 0){
  $("div[role=\"main\"] a").each(function(){
    var link = $(this).attr("href");
    var appendedLink = link + "&section=1";
    $(this).attr("href", appendedLink);
  });
}

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



$(".block_settings .header .title").click(function(){
  $(".block_settings").find(" .content").slideToggle();
});






// Text string hacks ------------------------------------------------------ 

// "Save and return to course now just says save"
if ($('.path-mod-forum').length != 0){
  //alert('we are on the page');
$('.path-mod-forum').find('#id_submitbutton2').val('Create forum');
}



// Editing Sections Title Placeholder text
var placeholder = $('.editing h2.main').text()
                                         .replace('Summary of ','');
$("#id_name").attr("placeholder", placeholder);



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









// -------------------------------------------------------------------------
// Start: Section-0 collapse -------------------------------------------
// -------------------------------------------------------------------------
//if($(".single-section").length != 0) {
//  $('#section-0').addClass('collapsed');

//  $('#section-0').hover(
//       function(){ $(this).removeClass('collapsed').css( 'height', 'auto') },
//       function(){ $(this).addClass('collapsed').css('height', '100px') }
//  );
//}
// -------------------------------------------------------------------------
// End: Section-0 collapse -------------------------------------------
// -------------------------------------------------------------------------

$('#page-course-search #region-main > div > .coursebox:even').addClass('odd');
 



    // Module page, single section
    var singleSection = $('.pagelayout-course .single-section');

      


 
/*$('input').on({
'click': function(){ // clear the placeholder
if( $(this).val() == $(this).attr('placeholder')){ $(this).val(''); }
},
'blur': function(){ // reset the placeholder
if( $(this).val() == ''){ $(this).val($(this).attr('placeholder')); }
}
});*/


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
  //$('#student_context_block').show();
  //$('.block_settings').hide();
  $('.block_settings').find('#usersettings').hide();
  $('#student-email-link').show();
}

else if(currentUserRole == "teacher"){
  $('.block_settings .commands').hide();
  $('#fitem_id_format').hide();
  $('#fitem_id_hiddensections').hide();
  $('#fitem_id_coursedisplay').hide();
  $('#staff-email-link').show();
}

else if(currentUserRole == "admin"){
  $('#toggle-admin-settings').show();
  $('#fitem_id_format').show();
  $('#fitem_id_hiddensections').show();
  $('#fitem_id_coursedisplay').show();
}



// Off canvas memu ---------------------------------------------------------
$('#responsive-menu-button').sidr({
  name: 'sidr-main',
  speed: 200,
  body: '#region-main, .navbar-fixed-top',
  source: '.editbtn, #region-pre, #user-context-menu'
});   

// Stop the link-click jumping the content to top
$('#responsive-menu-button').click(function(event){
  $(".brand").fadeToggle();
  event.preventDefault();
});


if ($('.path-course-view').length != 0){
  if ($('.block_section').length == 0){
    $('.block_section_warning').show();
    $('.sidr-class-block_section_warning ').show();
  }
}

if ($('.path-enrol').length != 0){
    $('.block_section_warning').hide();
    $('.sidr-class-block_section_warning ').hide();
}
  


});


