<div class="block--section section--gallery <?= $data->line()->bool()? 'break': ''; ?>">
	<div class="gallery">
	<? $index = 0; foreach($data->images() as $image){
		
	    echo '<img src="' . $image->url() . '" alt="">';
	    
	    $index++;
	}?>
	</div>
</div>