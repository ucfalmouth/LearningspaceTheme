$(document).ready(function() {

  // Login Box Title
  $('.loginbox h2').text('Log In');

  $(".loginbox").find('.forgetpass a').text('Problems logging in?');
  $('#username').attr("placeholder", "Username");
  $('#password').attr("placeholder", "Password");
  
  //--------------------------------------------------------------------------
  // Backstretch
  // ------------------------------------------------------------------------- 
  // Duration is the amount of time in between slides,
  // and fade is value that determines how quickly the next image will fade in
  $('.login-page').backstretch([
      //"http://localhost:8888/learningspace/theme/learningspace/img/tumblr_m8ifzcPZzf1rrwb6to1_500.gif", 
      //"http://learn-dev.falmouth.ac.uk/theme/learningspace/img/rough_wood_boards-wallpaper-1920x1200.jpg", 
      //"http://learn-dev.falmouth.ac.uk/theme/learningspace/img/wave_7-wallpaper-1920x1200.jpg",
      "../theme/learningspace/img/black-chalkboard-background.jpg"
  ], {duration: 5000, fade: 300});

  // -------------------------------------------------------------------------
  // Modal Vimeo Embed Stop on modal Close 
  // -------------------------------------------------------------------------
  if ($('.pagelayout-course').length === 0){
    $(".modal-backdrop, #myModal .close, #myModal .btn").on("click", function() {
            $("#myModal iframe").attr("src", jQuery("#myModal iframe").attr("src"));
    });
  }

  // -------------------------------------------------------------------------
  // Next update countdown 
  // -------------------------------------------------------------------------
  if($("#page-login-index").length != 0) {

          var timeDifference = function() {
              
              // add 3 0's

              var next = 1396429200000;
              

              // Midnight 16th Oct, 2013
              var now = new Date().getTime();

              var prev = 1395843749000;

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

  // -------------------------------------------------------------------------
  // Countdown tooltip 
  // -------------------------------------------------------------------------
  $('#updates-clock-canvas').tooltip({title: $('.timeToGo').html(), animation: 'true'});

  //--------------------------------------------------------------------------
  // Validate
  // ------------------------------------------------------------------------- 

  var pos = $('#username').position();

    // .outerWidth() takes into account border and padding.
  var width = $('#username').outerWidth();

  var staffvalidatewidth = $('#staffvalidate').outerWidth();
  var studentvalidatewidth = $('#studentvalidate').outerWidth();
  
  $("#staffvalidate").css({
        position: "absolute",
        top: pos.top + "px",
        left: (pos.left + width - staffvalidatewidth - 3) + "px"
    });

  $("#studentvalidate").css({
        position: "absolute",
        top: pos.top + "px",
        left: (pos.left + width - studentvalidatewidth - 3) + "px"
    });

  $('#username').on("keyup", function(){
      

    if($(this).val().toLowerCase() == "staff"){
      $('#staffvalidate').fadeIn();
    } else if ($(this).val().toLowerCase() != "staff"){
      $('#staffvalidate').fadeOut();
    }  if($(this).val().toLowerCase() == "student"){
      $('#studentvalidate').fadeIn();
    } else if ($(this).val().toLowerCase() != "student"){
      $('#studentvalidate').fadeOut();
    }
  });

  //--------------------------------------------------------------------------
  // END Doc Ready
  // ------------------------------------------------------------------------- 
});

// Browser update warning
/*var $buoop = {} 
$buoop.ol = window.onload; 
window.onload=function(){ 
  try {if ($buoop.ol) $buoop.ol();}catch (e) {} 
  var e = document.createElement("script"); 
  e.setAttribute("type", "text/javascript"); 
  e.setAttribute("src", "http://browser-update.org/update.js"); 
  document.body.appendChild(e); 
} */
