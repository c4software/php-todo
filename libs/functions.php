<?php

/*
 * Init the todos array in session
 */
function init_todos(){
  if(!is_array($_SESSION["todos"])){
    $_SESSION["todos"] = array();
  }
}
?>
