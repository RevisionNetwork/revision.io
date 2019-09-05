<div class="block--section section--video <?= $data->line()->bool()? 'break': ''; ?>">
	<? 	if($data->files()->count() > 0){
			foreach($data->videos() as $video){
			    echo '<video class="video" src="' . $video->url() . '" alt="" autoplay muted loop></video>';
			}
		} else {
			echo $data->text()->kirbytext();
		}
	?>
</div>
