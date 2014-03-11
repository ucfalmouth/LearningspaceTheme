<h3><a href="#">Problems with this page?</a></h3>
<!-- To copy the form HTML, start here -->

            <div class="quform-outer quform-theme-light-light section-contact__form">
            <h1>Help us improve Learning Space</h1>
                <form class="quform" action="<?php echo $CFG->wwwroot;?>/theme/learningspace/layout/quform/process.php" method="post" enctype="multipart/form-data" onclick="">
                    <div class="quform-inner">
                            <div class="quform-elements">
                                <!-- Begin 2 column Group -->


                        <!-- Begin Textarea element -->
                        <div class="quform-element quform-element-textarea quform-huge">
                            <div class="quform-spacer">
                                <div class="quform-input">
                                    <textarea id="form-task" name="form-task"  placeholder="What were you doing?" style="height: 130px;"></textarea>
                                </div>
                            </div>
                        </div>
                        <!-- End Textarea element -->

                        <!-- Begin Textarea element -->
                        <div class="quform-element quform-element-textarea quform-huge">
                            <div class="quform-spacer">
                                <div class="quform-input">
                                    <textarea id="form-problem" name="form-problem"  placeholder="What went wrong?" style="height: 130px;"></textarea>
                                </div>
                            </div>
                        </div>
                        <!-- End Textarea element -->



                        <!-- Begin Submit button -->
                        <div class="quform-submit">
                            <div class="quform-submit-inner">
                                <button type="submit" class="btn btn-primary" value="Send"><span>Send</span></button>
                            </div>
                            <div class="quform-loading-wrap"><span class="quform-loading"></span></div>
                        </div>
                        <!-- End Submit button -->
                        </div>
                    </div>
                </form>
            </div>