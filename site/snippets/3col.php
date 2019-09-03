<div class="block--section section--gallery col3 <?= $data->line()->bool()? 'break': ''; ?>">
	
	<? foreach($data->children() as $subpage){
		snippet($subpage->snippet(), ['data' => $subpage]);
	}?>
		
</div>