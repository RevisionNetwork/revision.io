<div class="block--section text--small <?= $data->line()->bool()? 'break': ''; ?>">
	<div class="quote--marker">◯</div>
	<div class="quote--wrapper">
		<?= $data->quotetext()->markdown() ?>
		<div class="quote--credit"><?= $data->credittext()->markdown() ?></div>
	</div>
</div>