// Document Ready-----------------------------------------------------------
$(document).ready(function(){$(".block_section a").each(function(){var e=$(this);e.html(e.html().replace(/&nbsp;/g,""))});$("a[rel=popover]").popover({html:!0,content:function(){return $("#settingsnav").html()}});$("ul.nav li.dropdown").hover(function(){$(this).find(".dropdown-menu").stop(!0,!0).delay(200).show()},function(){$(this).find(".dropdown-menu").stop(!0,!0).delay(200).hide()});$(".dropdown-menu").hover(function(){$(this).closest(".dropdown").find(".dropdown-toggle").addClass("dropdown-hover")},function(){$(this).closest(".dropdown").find(".dropdown-toggle").removeClass("dropdown-hover")});$("body").fitVids();$(".content").find(".alert").each(function(){if($(this).hasClass("alert-error")){var e='<i class="fa fa-exclamation-circle"></i> ';$(this).prepend(e)}if($(this).hasClass("alert-success")){var e='<i class="fa fa-calendar"></i> ';$(this).prepend(e)}if($(this).hasClass("alert-info")){var e='<i class="fa fa-comment"></i> ';$(this).prepend(e)}});$(".content").find("blockquote").each(function(){var e='<i class="fa fa-quote-left"></i> ';$(this).prepend(e)});$(".mdl-bottom .btn").click(function(e){return!1});$(".section-navigation.mdl-bottom").find(".mdl-left a").prepend('<i class="fa fa-chevron-left"></i> ');$(".section-navigation.mdl-bottom").find(".mdl-left a").prepend("<h2>Previous section:</h2> ");$(".section-navigation.mdl-bottom").find(".mdl-right a").prepend(' <i class="fa fa-chevron-right"></i>');$(".section-navigation.mdl-bottom").find(".mdl-right a").prepend(" <h2>Next section:</h2>");var e=$('<i class="fa highlightedIcon fa-asterisk"></i>');$(".topics").find(".current").prepend(e);$("p, span, h1, h2, h3, h4, h5, h6").removeAttr("style");if($(".section-navigation.header.headingblock>a.mdl-right").length!=0){var t=$(".section-navigation.header.headingblock>a.mdl-right"),n=$(".section-navigation.header.headingblock>a.mdl-right").attr("href");t.text("View all sections")}else t="";if(t.length!=0){var r=$('<a href="'+n+'" class="mdl-right">View all sections</a>');$(".sidr-class-block_navigation").append(r);$(".block_course_menu .block_tree").append(t)}else if(t.length==0){var i=document.body.id;$(".sidr-class-block_navigation").append('<a href="#" class="show-all-active">View all sections<a/>');i!="page-mod-page-view"&&$(".block_course_menu .block_tree").append('<a href="#" class="show-all-active">View all sections<a/>')}$(".pagelayout-coursecategory").length!=0&&$('div[role="main"] a').each(function(){var e=$(this).attr("href"),t=e+"&section=1";$(this).attr("href",t)});document.createElement("header");document.createElement("nav");document.createElement("section");document.createElement("article");document.createElement("aside");document.createElement("footer");document.createElement("i");($(".path-mod").length!=0||$(".path-question").length!=0||$(".path-blocks").length!=0)&&$(".breadcrumb li").each(function(){var e=$(this).find("a").attr("href");if(e.indexOf("category")>=0)return!0;if(e.indexOf("course")>=0){$("div[role=main]").prepend('<a href="'+e+'" id="back-to-module" class="btn"><i class="fa fa-arrow-circle-left"></i> Back to module</a>');return!1}});var s="http://google.com";$(".block_settings .header .title").click(function(){$(".block_settings").find(" .content").slideToggle()});$(".path-mod-forum").length!=0&&$(".path-mod-forum").find("#id_submitbutton2").val("Create forum");var o=$(".editing h2.main").text().replace("Summary of ","");$("#id_name").attr("placeholder",o);var u=$(".breadcrumb"),a=u.find("li").last().prev().find("a"),f=u.find("li").last().prev().prev().find("a");a.length?a=a.attr("href"):a=u.find("li").last().prev().prev().find("a").attr("href");f.length?f=f.attr("href"):f=u.find("li").last().prev().prev().find("a").attr("href");$(".unlist").find(".name > a").each(function(){var e=$(this).attr("href")+"&section=1";$(this).attr("href",e)});$("#id_dtstart_day").tooltip({title:"Day",animation:"true"});$("#id_dtstart_month").tooltip({title:"Month",animation:"true"});$("#id_dtstart_year").tooltip({title:"Year",animation:"true"});$("#id_dtstart_hour").tooltip({title:"Hour",animation:"true"});$("#id_dtstart_minute").tooltip({title:"Minute",animation:"true"});$("#id_dtdue_day").tooltip({title:"Day",animation:"true"});$("#id_dtdue_month").tooltip({title:"Month",animation:"true"});$("#id_dtdue_year").tooltip({title:"Year",animation:"true"});$("#id_dtdue_hour").tooltip({title:"Hour",animation:"true"});$("#id_dtdue_minute").tooltip({title:"Minute",animation:"true"});$("#id_dtpost_day").tooltip({title:"Day",animation:"true"});$("#id_dtpost_month").tooltip({title:"Month",animation:"true"});$("#id_dtpost_year").tooltip({title:"Year",animation:"true"});$("#id_dtpost_hour").tooltip({title:"Hour",animation:"true"});$("#id_dtpost_minute").tooltip({title:"Minute",animation:"true"});$(".user_profile_pic").tooltip();$(".pagelayout-admin tr:odd").addClass("odd");$(".pagelayout-course").length==0&&$("footer").on("click","#toggle-admin-settings",function(e){e.preventDefault();$("#region-pre").slideToggle()});$(".pagelayout-course").length!=0&&$("footer").on("click","#toggle-admin-settings",function(e){e.preventDefault();$(".block_settings").toggle()});var l='<span class="toggle"><i class="fa fa-fullscreen pull-right"></i></span>';$(".pagelayout-admin .breadcrumb").append(l);$(".pagelayout-standard .breadcrumb").append(l);$(".pagelayout-report .breadcrumb").append(l);$(".pagelayout-base .breadcrumb").append(l);$(".pagelayout-incourse .breadcrumb").append(l);$(".breadcrumb").on("click",".toggle",function(){$("#wrapper .container-fluid").toggleClass("wide")});$("#page-course-search #region-main > div > .coursebox:even").addClass("odd");var c=$(".pagelayout-course .single-section"),h=$('.block_settings a[href$="edit=on"]').attr("href");$("a.turn-edit-on").attr("href",h);var p=$('.block_settings a[href$="edit=off"]').attr("href");$("a.turn-edit-off").attr("href",p);var d=$("#settingsnav").find('a[href*="question"]').attr("href");$("#user_context_block").find(".question-bank-button").attr("href",d);var v=$("#settingsnav").find('a[href*="switchrole=5"]').attr("href");$("#user_context_block").find(".switch-to-student-button").attr("href",v);var m=$("#settingsnav").find('a[href*="enrol/users.php?id="]').attr("href");$("#user_context_block").find(".subscribed-users").attr("href",m);var g=$("#settingsnav").find('a[href*="enrol/index.php?id="]').attr("href");$("#user_context_block").find(".enrolment-methods").attr("href",g);var y=$("#settingsnav").find('a[href*="group/instances.php?id="]').attr("href");$("#user_context_block").find(".enrolment-methods").attr("href",y);var b=$("#userrole").data("role");if(b=="student"){$(".block_settings").find("#usersettings").hide();$("#student-email-link").show()}else if(b=="teacher"){$(".block_settings .commands").hide();$("#fitem_id_format").hide();$("#fitem_id_hiddensections").hide();$("#fitem_id_coursedisplay").hide();$("#staff-email-link").show()}else if(b=="admin"){$("#toggle-admin-settings").show();$("#fitem_id_format").show();$("#fitem_id_hiddensections").show();$("#fitem_id_coursedisplay").show()}$("#responsive-menu-button").sidr({name:"sidr-main",speed:200,body:"#region-main, .navbar-fixed-top",source:".editbtn, #region-pre, #user-context-menu"});$("#responsive-menu-button").click(function(e){$(".brand").fadeToggle();e.preventDefault()});if($(".path-course-view").length!=0&&$(".block_section").length==0){$(".block_section_warning").show();$(".sidr-class-block_section_warning ").show()}if($(".path-enrol").length!=0){$(".block_section_warning").hide();$(".sidr-class-block_section_warning ").hide()}});