<div class="block--section section--profile text--small <?= $data->line()->bool()? 'break': ''; ?>">

	<?php if($image = $data->image()): ?>
		<img class="img--profile" src="<?= $image->url() ?>" alt="">
	<?php endif ?>

	<div class="profile--text">
		<h4><?= $data->name() ?></h4>
		<?= $data->desc()->markdown() ?>
	</div>

</div>