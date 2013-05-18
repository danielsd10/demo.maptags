<?php
	include_once('includes/db.php');
	$coll = $db->markers;

	$rs = $coll->find();

	header("Content-type: application/json; charset=utf-8");
	$r = array();
	foreach($rs as $obj) {
		$r[] = $obj;
	}
	print json_encode($r);
	//echo(json_encode(iterator_to_array($rs)));
?>