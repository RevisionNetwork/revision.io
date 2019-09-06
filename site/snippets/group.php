<div class="block--section <?= $data->line()->bool()? 'break': ''; ?>">
	
	<?php foreach($data->children() as $subpage){
		snippet($subpage->snippet(), ['data' => $subpage]);
	}?>
		
</div>