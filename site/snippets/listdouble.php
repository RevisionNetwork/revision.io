<div class="block--section <?= $data->line()->bool()? 'break': ''; ?>">
	<div class="list--wrapper">
		<div class="list--left list box--shadow">
			<?= $data->textleft() ?>
		</div>
		<div class="list--right list box--shadow">
			<?= $data->textright() ?>
		</div>
	</div>
</div>