<footer id="footer">
    <div class="container-fluid">
        <?php echo $OUTPUT->standard_footer_html(); ?>
        <div class="row-fluid page-footer">
            <ul class="unstyled">
                <li><a href="http://studentmail.falmouth.ac.uk/">Student Email</a></li>
                <li><a href="http://mailspace.falmouth.ac.uk/">Staff Email</a></li>
                <li><a href="http://www.falmouth.ac.uk/term-dates-201314">Term Dates</a></li>
                <li><a href="http://et.falmouth.ac.uk">Help</a></li>
                <li><a href="http://et.falmouth.ac.uk">Educational Technology</a></li>
                
            </ul>

        </div>
        <span id="credits">
            <small>Learning Space. Lovingly created by <a href="">Educational Technology</a></small>
        </span>
        <a id="fal-logo" href="http://falmouth.ac.uk/"></a>
    </div>
</footer>

<?php echo $OUTPUT->standard_end_of_body_html() ?>

</div><!-- wrapper -->
<!--<?php if (!empty($PAGE->theme->settings->enablejquery)) {?>-->
</div>

<script src="<?php echo $CFG->wwwroot;?>/theme/learningspace/javascript/jquery.sidr.min.js"></script>
<script src="<?php echo $CFG->wwwroot;?>/theme/learningspace/javascript/backstretch.js"></script>
<script src="<?php echo $CFG->wwwroot;?>/theme/learningspace/javascript/placeholder.js"></script>
<script src="<?php echo $CFG->wwwroot;?>/theme/bootstrap/javascript/bootstrap.min.js"></script>
<script src="<?php echo $CFG->wwwroot;?>/theme/learningspace/javascript/inboxtable.js"></script>
<script src="<?php echo $CFG->wwwroot;?>/theme/learningspace/javascript/datatables.min.js"></script>
<script src="<?php echo $CFG->wwwroot;?>/theme/learningspace/javascript/datatables.plugins.js"></script>
<!--<script type="text/javascript" src="http://fitvidsjs.com/js/jquery.fitvids.js"></script>-->


<script >
$(document).ready(function() {
$(".aaronclick").click(function() {
$("#section-0 .section-modchooser-link a, #section-0 .section-modchooser-link span").click();
});
//$("body").fitVids();
});
</script>

<script>$(document).ready(function(){$('.work-here').popover();});</script>

<!-- Outdated browser warning message -->
<script type="text/javascript"> 
var $buoop = {} 
$buoop.ol = window.onload; 
window.onload=function(){ 
try {if ($buoop.ol) $buoop.ol();}catch (e) {} 
var e = document.createElement("script"); 
e.setAttribute("type", "text/javascript"); 
e.setAttribute("src", "http://browser-update.org/update.js"); 
document.body.appendChild(e); 
} 
</script> 

<?php }?>

<?php include 'ls-analytics.php'; ?>

</body>
</html>