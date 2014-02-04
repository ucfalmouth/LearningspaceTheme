<!DOCTYPE html>
<html lang="en" ng-app="Changelog">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="">
<meta name="author" content="">
<title>Learningspace – Course Finder</title>
<!-- Bootstrap core CSS -->
<link href="../../dist/css/bootstrap.css" rel="stylesheet">
<link href="http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet">
    <script type="text/javascript" src="//use.typekit.net/ull6bqj.js"></script>
<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
<link href="../../../css/navbar-static-top.css" rel="stylesheet">
<!-- Custom styles for this template -->
<!-- Learning Space Styles -->
<link href="../../../style/learningspace-sass.css" rel="stylesheet">
<!--[if lt IE 9]>
<script src="../../dist/js/html5shiv.js"></script>
<![endif]-->
<style type="text/css">
  #region-main{
    width: 100%;
    padding: 18px 20px;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    margin-bottom: 20px;
    background: #fff;
     border: solid 1px #d5d7d8;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    margin-top: 40px;
  }
  table{
    font-family: "proxima-nova", "freight-sans-pro", "Helvetica Neue", "helvetica", "arial", sans-serif;
    font-size: 14px;
  }



</style>

<body>

  <header role="banner" class="navbar navbar-fixed-top">
      <nav role="navigation" class="navbar-inner navbar-inverse">
        <div class="container-fluid">
          <a class="brand" href="/">Learning Space<?php //echo $SITE->shortname; ?></a>
        </div>
    </nav>
  </header>

  <div id="page" class="container-fluid" ng-controller="ChangelogController">
    <section id="region-main">
    <h1>Changelog</h1>
      <table class="table table-striped table-bordered">
        <tr ng-repeat="entry in entries">
          <td><strong>{{entry["gsx$date"]["$t"]}}</strong></td>
          <td>{{entry["gsx$changes"]["$t"]}}</td>
          <td><a ng-href={{entry["gsx$blogpost"]["$t"]}}>About</a> | <a href="https://github.com/ucfalmouth/issues/pulse/monthly#issues">(Details)</a></td>
        </tr>
      </table>
    </section>
  </div>

<!-- Core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="angular.min.js"></script>
<script src="controllers.js"></script>
</body>
</html>
