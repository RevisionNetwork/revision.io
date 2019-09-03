<div class="block--section flex col3 <?= $data->line()->bool()? 'break': ''; ?>">
	
	<div class="img--wrapper img--square">
		<img class="img--cover" src="<?= $data->image()->url() ?>" alt="">
		<div class="img--shadow box--shadow"></div>
	</div>

	<div class="text--wrapper">
		<p class="uppercase"><?= $data->name() ?></p>
		<?= $data->text() ?>
	</div>
		
</div>