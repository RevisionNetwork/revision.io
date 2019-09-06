<div class="block--section section--gallery col3 <?= $data->line()->bool()? 'break': ''; ?>">
	
	<?php foreach($data->children() as $subpage){
		snippet($subpage->snippet(), ['data' => $subpage]);
	}?>
		
</div>