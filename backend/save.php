<?php
	include_once('includes/db.php');
	$coll = $db->markers;

	$obj = $_POST; // Solo por demostración. Nunca en producción
	$obj['pos']['lat'] = (float) $obj['pos']['lat'];
	$obj['pos']['lng'] = (float) $obj['pos']['lng'];
	$obj['regdate'] = new MongoDate();

	if (isset($obj['when'])) {
		$obj['when'] = new MongoDate(strtotime($obj['when']));
	}
	if (isset($obj['price'])) {
		$obj['price'] = number_format($obj['price'], 2);
	}

	try {
		$coll->save($obj);
		print json_encode(array('ok'=>1));
	} catch (Exception $e) {
		print json_encode(array('ok'=>0, 'error'=>$e->getMessage()));
	}
?>