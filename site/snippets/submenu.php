<nav class="submenu open hide">
	<span class="submenu--selected"><?= $data->children()->first()->title() ?></span>
	<ol class="submenu--list">
		<?php
		$index = 1;
		foreach ($data->children()->listed() as $subpage): ?>
		<li <?php if($index == 1){ echo 'class="selected"'; } ?>><?= $subpage->title() ?></li>
		<?php $index++ ?>
		<?php endforeach ?>
	</ol>
</nav>