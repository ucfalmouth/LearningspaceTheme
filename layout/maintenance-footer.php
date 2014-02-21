<?php echo $OUTPUT->standard_end_of_body_html() ?>


</div><!-- wrapper -->






<!--<?php if (!empty($PAGE->theme->settings->enablejquery)) {?>-->
</div>

<!-- standard-footer-html -->
<?php echo $OUTPUT->standard_footer_html(); ?>
<!-- standard-footer-html -->
<script src="<?php echo $CFG->wwwroot;?>/theme/learningspace/javascript/login-plugins-ck.js"></script>
<script src="<?php echo $CFG->wwwroot;?>/theme/learningspace/javascript/login-scripts-ck.js"></script>

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