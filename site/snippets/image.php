<div class="block--section text--<?= $data->size() ?> <?= $data->line()->bool()? 'break': ''; ?>">
	<?= $data->text()->markdown() ?>
	<?php if($image = $data->image()): ?>
		<img class="img--hover" src="<?= $image->url() ?>" alt="">
	<?php endif ?>
</div>