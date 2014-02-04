<?php include 'header.php'; ?>

<div id="page-wrapper">
<div id="page" class="container-fluid">
<div id="page-content" class="row-fluid">

<?php if ($layout === 'pre-and-post') { ?>
    <div id="region-bs-main-and-pre" class="span8">
    <div class="row-fluid">
    <section id="region-main" class="span8 offset-2">
<?php } else if ($layout === 'side-post-only') { ?>
    <section id="region-main" class="span8">
<?php } else if ($layout === 'side-pre-only') { ?>
    <section id="region-main" class="span8 offset-2">
<?php } else if ($layout === 'content-only') { ?>
    <section id="region-main" class="span12">
<?php } ?>
<?php echo $OUTPUT->navbar(); ?>

    
<?php echo $coursecontentheader; ?>
    <?php echo $OUTPUT->main_content() ?>


    <?php echo $coursecontentfooter; ?>
    </section>


    <?php if ($layout !== 'content-only') {
          if ($layout === 'pre-and-post') { ?>
            <aside id="region-pre" class="span4 block-region desktop-first-column region-content">
            <h2 id="search-header">Search</h2>
            <form id="coursesearch3" action="http://localhost:8888/learningspace/course/search.php" method="get"><fieldset class="coursesearchbox invisiblefieldset" id="yui_3_7_3_2_1390593889643_101"><input type="text" id="coursesearchbox" size="30" name="search" value="" placeholder="Search courses"><input type="submit" value="Go"></fieldset></form>
    <?php } else if ($layout === 'side-pre-only') { ?>

            <aside id="region-pre" class="span3 block-region desktop-first-column region-content">
            <h2 id="search-header">Search</h2>
            <form id="coursesearch3" action="http://localhost:8888/learningspace/course/search.php" method="get"><fieldset class="coursesearchbox invisiblefieldset" id="yui_3_7_3_2_1390593889643_101"><input type="text" id="coursesearchbox" size="30" name="search" value="" placeholder="Search courses"><input type="submit" value="Go"></fieldset></form>
    <?php } ?>
          <?php
                if (!right_to_left()) {
                    echo $OUTPUT->blocks_for_region('side-pre');
                } else if ($hassidepost) {
                    echo $OUTPUT->blocks_for_region('side-post');
                }
            ?>
            </aside>

    <?php if ($layout === 'pre-and-post') {
          ?></div></div><?php // Close row-fluid and span9.
   }

    if ($layout === 'side-post-only' OR $layout === 'pre-and-post') { ?>
        <aside id="region-post" class="span3 block-region region-content">
        <?php if (!right_to_left()) {
                  echo $OUTPUT->blocks_for_region('side-post');
              } else {
                  echo $OUTPUT->blocks_for_region('side-pre');
              } ?>
        </aside>
    <?php } ?>
<?php } ?>
</div>
</div>
</div>
<?php include 'footer.php'; ?>
