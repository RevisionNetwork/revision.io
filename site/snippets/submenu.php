<nav class="submenu open hide">
	<span class="submenu--selected"><?= $data->children()->first()->title() ?></span>
	<div class="submenu--list">
		<?php
		$index = 1;
		foreach ($data->children()->listed() as $subpage): ?>
		<span <?php if($index == 1){ echo 'class="selected"'; } ?>><?= $index . '&emsp;' . $subpage->title() ?></span>
		<?php $index++ ?>
		<?php endforeach ?>
	</div>
</nav>