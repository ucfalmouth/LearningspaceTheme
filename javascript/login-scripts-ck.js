$(document).ready(function(){$(".loginbox h2").text("Log In");$(".loginbox").find(".forgetpass a").text("Problems logging in?");$("#username").attr("placeholder","Username");$("#password").attr("placeholder","Password");$(".pagelayout-course").length===0&&$(".modal-backdrop, #myModal .close, #myModal .btn").on("click",function(){$("#myModal iframe").attr("src",jQuery("#myModal iframe").attr("src"))});if($("#page-login-index").length!=0)var e=function(){var e=13964292e5,t=(new Date).getTime(),n=1395843749e3,r=6e4,i=r*60,s=i*24,o=s*30,u=s*365,a=t-e;a=Math.abs(a);var f="";a<r?timeToGo=Math.round(a/1e3)+" seconds until the next update":a<i?timeToGo=Math.round(a/r)+" minutes until the next update":a<s?timeToGo=Math.round(a/i)+" hours until the next update":a<o?timeToGo=Math.round(a/s)+" days until the next update":a<u?timeToGo=Math.round(a/o)+" months until the next update":timeToGo=Math.round(a/u)+" years until the next update";$("#LSUpdateDisplays").append('<p class="timeToGo">'+timeToGo+"</p>");var l=(t-n)/(e-n)*100,c=Raphael("updates-clock-canvas",30,30);c.customAttributes.arc=function(e,t,n,r,i){var s=360/r*n,o=(90-s)*Math.PI/180,u=e+i*Math.cos(o),a=t-i*Math.sin(o),f;r==n?f=[["M",e,t-i],["A",i,i,0,1,1,e-.01,t-i]]:f=[["M",e,t-i],["A",i,i,0,+(s>180),1,u,a]];return{path:f}};var h=c.path().attr({stroke:"#b7beb6","stroke-width":7,arc:[15,15,0,100,10]});h.animate({arc:[15,15,l,100,10]},1500,"bounce")}();$("#updates-clock-canvas").tooltip({title:$(".timeToGo").html(),animation:"true"});var t=$("#username").position(),n=$("#username").outerWidth(),r=$("#staffvalidate").outerWidth(),i=$("#studentvalidate").outerWidth();$("#staffvalidate").css({position:"absolute",top:t.top+"px",left:t.left+n-r-3+"px"});$("#studentvalidate").css({position:"absolute",top:t.top+"px",left:t.left+n-i-3+"px"});$("#username").on("keyup",function(){$(this).val().toLowerCase()=="staff"?$("#staffvalidate").fadeIn():$(this).val().toLowerCase()!="staff"&&$("#staffvalidate").fadeOut();$(this).val().toLowerCase()=="student"?$("#studentvalidate").fadeIn():$(this).val().toLowerCase()!="student"&&$("#studentvalidate").fadeOut()})});