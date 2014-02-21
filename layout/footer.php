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

<!-- End of body html -->
<?php echo $OUTPUT->standard_end_of_body_html() ?>
<!-- End of body html -->

</div><!-- wrapper -->
<!--<?php if (!empty($PAGE->theme->settings->enablejquery)) {?>-->
</div>

<script src="<?php echo $CFG->wwwroot;?>/theme/learningspace/javascript/plugins-ck.js"></script>
<script src="<?php echo $CFG->wwwroot;?>/theme/learningspace/javascript/scripts-ck.js"></script>

<script >
$(document).ready(function() {
$(".aaronclick").click(function() {
$("#section-0 .section-modchooser-link a, #section-0 .section-modchooser-link span").click();
});

});
</script>


<?php }?>

<?php include 'ls-analytics.php'; ?>

</body>
</html>