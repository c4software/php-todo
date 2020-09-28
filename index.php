<?php
  error_reporting(0);
  session_start();

  // Include stuff
  include("libs/lib_tpl.php");
  include("libs/functions.php");

  // Init the todo structure to always have at least a empty list
  init_todos();

  // Template object.
  $t = new Template();

  // Set the main template
  $t->set_file("tpl","templates/main.html");

  // Inject the todo variables to iterate
  $t->set_var("todos", $_SESSION["todos"]);

  // Parse and display the todos « app »
  $t->pparse("tpl");
?>
