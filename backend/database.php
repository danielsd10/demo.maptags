<?php
	// Utilizar clase MongoClient en lugar de Mongo si se trabaja con la versión 1.3.x del driver de MongoDB
	$mongo = new MongoClient("mongodb://localhost:27017");

	$db = $mongo->selectDB("maptags");
	$coll = $db->sample;

	$rs = $coll->find();

	header("Content-type: text/plain; charset=utf-8");
	foreach ($rs as $obj) {
		print_r($obj);
		echo("\n");
	}
?>