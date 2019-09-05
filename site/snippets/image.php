<div class="block--section text--<?= $data->size() ?> <?= $data->line()->bool()? 'break': ''; ?> <?php if($image = $data->image()): ?>section--image<?php endif ?>">
	<?= $data->text()->markdown() ?>
	<?php if($image = $data->downloads()->toFile()): ?>
		<img class="img--hover" src="<?= $image->url() ?>" alt="">
	<?php endif ?>
</div>