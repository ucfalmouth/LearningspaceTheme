<?php include 'header.php'; ?>

<div id="page-wrapper">
<div id="page" class="container-fluid">
<div id="page-content" class="row-fluid">

<!--<?php
global $COURSE; 
global $DB;   //makes sure the database is available
$category = $DB->get_record('course_categories',array('id'=>$COURSE->category));    //gets the database record from the course_categories table for the active course
$cats=explode("/",$category->path);    // splits the category path into an array so that each level in the categories is a different level in the array
$depth=1;    // what depth of sub-category you want to display: Note this may need some error trapping to ensure there are that many levels of subcategories for the course - or setting a default value if not
$categorydepth = $DB->get_record("course_categories", array("id" => $cats[$depth]) );    //gets the database record for the course_category with the id number set by $depth position in the array of the category path for the active path
$categoryname = $categorydepth->name;    //sets a variable name for the set depth of subcategory ready to be displayed as required
echo $categoryname;
?>-->

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


    
<?php echo $coursecontentheader; ?>
    <?php echo $OUTPUT->main_content() ?>


    <?php echo $coursecontentfooter; ?>
    </section>


    <?php if ($layout !== 'content-only') {
          if ($layout === 'pre-and-post') { ?>
            <aside id="region-pre" class="span4 block-region desktop-first-column region-content">
            <h2 id="search-header">Search</h2>
            <form id="coursesearch3" action="<?php echo $CFG->wwwroot ?>/course/search.php" method="get"><fieldset class="coursesearchbox invisiblefieldset"><input type="text" id="coursesearchbox" size="30" name="search" value="" placeholder="Search modules..."><input type="submit" value="Go"></fieldset></form>
    <?php } else if ($layout === 'side-pre-only') { ?>
            <aside id="region-pre" class="span3 block-region desktop-first-column region-content">
            <h2 id="search-header">Search</h2>
            <form id="coursesearch3" action="<?php echo $CFG->wwwroot ?>/course/search.php" method="get"><fieldset class="coursesearchbox invisiblefieldset"><input type="text" id="coursesearchbox" size="30" name="search" value="" placeholder="Search modules..."><input type="submit" value="Go"></fieldset></form>
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
