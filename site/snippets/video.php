<div class="block--section section--video <?= $data->line()->bool()? 'break': ''; ?>">
	<? foreach($data->videos() as $video){
	    echo '<video class="video" src="' . $video->url() . '" alt="" autoplay muted loop></video>';
	}?>
</div>
