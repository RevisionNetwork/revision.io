	</div>

	<footer class="footer">

		<nav class="menu">
			<?php foreach ($site->children()->listed() as $item): ?>
			<?= $item->title()->link() ?>
			<?php endforeach ?>
		</nav>

		<div class="links--small">
			<a class="link--internal" href="imprint" target="blank">Imprint</a>
			<a class="link--internal" href="privacy" target="blank">Privacy</a>
		</div>

		<div class="menu--mobile">
			<div class="menu--mobile--bar">
				<span>MENU</span>
				<a class="link--home menu--mobile--logo" href="<?= $site->url() ?>">R</a>
			</div>
			<div class="menu--mobile--list">
				<div class="menu--1 menu--list">
					<a class="link--home" href="<?= $site->url() ?>">HOME</a>
					<?php foreach ($site->children()->listed() as $item): ?>
					<?= $item->title()->link() ?>
					<?php endforeach ?>
				</div>
				<div class="menu--2 menu--list links--small">
					<a class="link--internal" href="imprint" target="blank">Imprint</a>
					<a class="link--internal" href="privacy" target="blank">Privacy</a>
				</div>
			</div>
		</div>



		<script src="https://rawgit.com/mrdoob/three.js/master/build/three.js"></script>
		<script src="https://rawgit.com/mrdoob/three.js/master/examples/js/lights/RectAreaLightUniformsLib.js"></script>
		<script src="https://rawgit.com/mrdoob/three.js/master/examples/js/controls/OrbitControls.js"></script>
		<script src="https://rawgit.com/mrdoob/three.js/master/examples/js/libs/dat.gui.min.js"></script>
		<script src="https://rawgit.com/mrdoob/three.js/master/examples/js/libs/stats.min.js"></script>
		<script src="https://rawgit.com/mrdoob/three.js/master/examples/js/loaders/FBXLoader.js"></script>
		<script src="https://rawgit.com/mrdoob/three.js/master/examples/js/libs/inflate.min.js"></script>

		<?= js('assets/js/threed.js') ?>
		<?= js('assets/js/THREE.MeshLine.js') ?>

		<script src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js" data-cfasync="false"></script>
		<script>
		window.cookieconsent.initialise({
		  "palette": {
		    "popup": {
		      "background": "#ececec",
		      "text": "#000000"
		    },
		    "button": {
		      "background": "#000000",
		      "text": "#ffffff"
		    }
		  },
		  "theme": "classic",
		  "position": "bottom-left",
		  "content": {
		    "message": "This website uses cookies to improve your experience",
		    "dismiss": "ACCEPT"
		  }
		});
		</script>

	</footer>

</body>
</html>
