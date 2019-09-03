<div class="block--section <?= $data->line()->bool()? 'break': ''; ?>">
	
	<? foreach($data->children() as $subpage){
		snippet($subpage->snippet(), ['data' => $subpage]);
	}?>
		
</div>