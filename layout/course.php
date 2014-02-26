<?php include 'header.php'; ?>
<?php include 'custom-settings.php'; ?>

<div id="page-wrapper">

<div id="page" class="container-fluid">
<div id="page-content" class="row-fluid">




<?php if ($layout === 'pre-and-post') { ?>
    <div id="region-bs-main-and-pre" class="clearfix">
    <div class="row-fluid">
    <section id="region-main" class="clearfix">
 
<?php } else if ($layout === 'side-post-only') { ?>
    <section id="region-main" class="clearfix">

<?php } else if ($layout === 'side-pre-only') { ?>
    <section id="region-main">
    
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
            <aside id="region-pre" class="span3 block-region region-content">
 <!--<?php echo $PAGE->button; ?>-->

              <div class="block_section_warning  block list_block" role="complementary"><div class="header"><div class="title"><div class="block_action"><img class="block-hider-hide" tabindex="0" alt="Hide Key Information block" title="Hide Key Information block" src="http://localhost:8888/learningspace/theme/image.php?theme=learningspace&amp;component=core&amp;rev=-1&amp;image=t/switch_minus"><img class="block-hider-show" tabindex="0" alt="Show Key Information block" title="Show Key Information block" src="http://localhost:8888/learningspace/theme/image.php?theme=learningspace&amp;component=core&amp;rev=-1&amp;image=t/switch_plus"></div><h2 id="instance-1290-header">Key Information</h2></div></div><div class="content"><i class="fa fa-question-circle"></i></div></div>


    <?php } else if ($layout === 'side-pre-only') { ?>
            <aside id="region-pre" class="span4 block-region region-content">
            <!-- <?php echo $PAGE->button; ?> -->


            <div class="block_section_warning  block list_block" role="complementary" ><div class="header"><div class="title"><div class="block_action"><img class="block-hider-hide" tabindex="0" alt="Hide Key Information block" title="Hide Key Information block" src="http://localhost:8888/learningspace/theme/image.php?theme=learningspace&amp;component=core&amp;rev=-1&amp;image=t/switch_minus"><img class="block-hider-show" tabindex="0" alt="Show Key Information block" title="Show Key Information block" src="http://localhost:8888/learningspace/theme/image.php?theme=learningspace&amp;component=core&amp;rev=-1&amp;image=t/switch_plus"></div><h2 id="instance-1290-header">Key Information</h2></div></div><div class="content"><i class="fa fa-question-circle"></i></div></div>
    <?php } ?>
          <?php
                if (!right_to_left()) {
                    echo $OUTPUT->blocks_for_region('side-pre');
                } else  
            ?>

            
            </aside>
    <?php if ($layout === 'pre-and-post') {
          ?></div></div><?php // Close row-fluid and span9.
   }

    if ($layout === 'side-post-only' OR $layout === 'pre-and-post') { ?>
        <aside id="region-post" class="span4 block-region region-content">
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