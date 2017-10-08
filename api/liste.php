<?php
  session_start();
  header("content-type: application/json");
  include("../libs/functions.php");

  init_todos();

  // List task
  echo json_encode($_SESSION["todos"]);

?>
