<div class="colblock--wrapper block--<?= $data->text() ?>">
	<? foreach($data->children() as $subpage){
	    snippet($subpage->snippet(), ['data' => $subpage]);
	}
	?>
</div>