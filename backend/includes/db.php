<?php
	// Utilizar clase MongoClient en lugar de Mongo si se trabaja con la versión 1.3.x del driver de MongoDB
	$mongo = new MongoClient("mongodb://localhost:27017");

	$db = $mongo->selectDB("maptags");
?>