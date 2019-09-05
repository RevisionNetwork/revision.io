<div class="block--section section--gallery <?= $data->line()->bool()? 'break': ''; ?>">
	<div class="gallery">
	<? $index = 0; foreach($data->downloads()->toFiles() as $image){
		
	    echo '<img src="' . $image->url() . '" alt="">';
	    
	    $index++;
	}?>
	</div>
	<div class="gallery--next gallery--button"><span>&rarr;</span></div>
	<div class="gallery--prev gallery--button"><span>&larr;</span></div>
</div>