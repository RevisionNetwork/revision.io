<div class="block--section section--button <?= $data->line()->bool()? 'break': ''; ?><?php if($data->text() != ""): ?>button--text<?php endif ?>">
	<div class="button">
		<a class="" href="<?= $data->content()->url() ?>" target="blank"><h1 class=""><?= $data->buttontext() ?></h1></a>
	</div>
	<?= $data->text()->markdown() ?>
</div>