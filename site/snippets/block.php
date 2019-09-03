<div class="block">

	<div class="block--section block--title">
		<h1 class="align--center"><?= $data->title() ?></h1>
	</div>

	<? foreach($data->children() as $subpage){
	    snippet($subpage->snippet(), ['data' => $subpage]);
	}
	?>
</div>