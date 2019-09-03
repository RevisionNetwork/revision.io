<div class="block--section text--<?= $data->size() ?> <?= $data->line()->bool()? 'break': ''; ?> <?php if($image = $data->image()): ?>section--image<?php endif ?> <?= $data->condense()->bool()? 'section--condense': ''; ?> <?php if($image = $data->image() && $data->text()->isEmpty()): ?>img--single<?php endif ?>">
	<?php if($image = $data->image()): ?>
		<img src="<?= $image->url() ?>" alt="">
	<?php endif ?>
	<?= $data->text()->markdown() ?>
</div>








