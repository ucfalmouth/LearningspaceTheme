<h3><a id="display-instant-feedback-form" href="#">Problems with this page?</a></h3>

<!-- To copy the form HTML, start here -->

            <div id="instant-feedback-form" class="quform-outer quform-theme-light-light section-contact__form">
            <h1>Help us improve Learning Space</h1>
                <form class="quform" action="<?php echo $CFG->wwwroot;?>/theme/learningspace/layout/quform/process.php" method="post" enctype="multipart/form-data" onclick="">
                    <div class="quform-inner">
                            <div class="quform-elements">
                                <!-- Begin 2 column Group -->
                                
                                <?php $current_page = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"; ?>
                                
                                  <div class="quform-element quform-element-textarea quform-huge">
                            <div class="quform-spacer">
                                <div class="quform-input">
                                <input id="form-currentpage" type="hidden" name="form-currentpage" value="<?php echo $current_page; ?>">
                                </div>
                            </div>
                        </div>


                                <div class="quform-element quform-element-textarea quform-huge">
                            <div class="quform-spacer">
                                <div class="quform-input">
                                <input id="form-firstname" type="hidden" name="form-firstname" value="<?php echo $USER->firstname; ?>">
                                </div>
                            </div>
                        </div>

                                <div class="quform-element quform-element-textarea quform-huge">
                            <div class="quform-spacer">
                                <div class="quform-input">
                                <input id="form-lastname" type="hidden" name="form-lastname" value="<?php echo $USER->lastname; ?>">
                                </div>
                            </div>
                        </div>

                                <div class="quform-element quform-element-textarea quform-huge">
                            <div class="quform-spacer">
                                <div class="quform-input">
                                <input id="form-username" type="hidden" name="form-username" value="<?php echo $USER->username; ?>">
                                </div>
                            </div>
                        </div>

                                <div class="quform-element quform-element-textarea quform-huge">
                            <div class="quform-spacer">
                                <div class="quform-input">
                                <input type="hidden" id="form-email" name="form-email" value="<?php echo $USER->email; ?>">
                                </div>
                            </div>
                        </div>

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


                        <!-- Begin Textarea element -->
                        <div class="quform-element quform-element-textarea quform-huge">
                            <div class="quform-spacer">
                                <div class="quform-input">
                                    <input type="checkbox" name="form-allow-reply" id="form-allow-reply" value="I don't mind being contacted"> Tick this to be contacted us once we have resolved the issue. This helps us make the Learning Space better. We will only ever contact you with regard to this partcular issue. We will never, ever spam you.<br>
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