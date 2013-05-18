<?php
	include_once('includes/db.php');
	$coll = $db->markers;

	if (isset($_GET['id'])) {
		$id = array('_id' => new MongoId( $_GET['id'] ));
		$r = $coll->findOne($id);
		if (is_null($r)) { $r = array(); }
	} else {
		$rs = $coll->find(array(), array('type'=>1, 'pos'=>1));
		$r = array();
		foreach($rs as $obj) {
			$r[] = $obj;
		}
	}

	header("Content-type: application/json; charset=utf-8");
	print json_encode($r);
?>