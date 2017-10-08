<?php
session_start();
header("content-type: application/json");
include("../libs/functions.php");
init_todos();

/**
 * Add a new item in the todolist
 */

// Add to history if texte present in the post
 if($_POST["texte"] != ""){
    $todo = array("id" => uniqid(), "texte" => $_POST["texte"], "date" => time(), "termine" => false);
    $_SESSION["todos"][$todo["id"]] = $todo;
    echo json_encode(array("success" => true));
}else{
    echo json_encode(array("success" => false));
}
