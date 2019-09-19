<!doctype html>
<html lang="en">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?= $site->title() ?> | <?= $page->title() ?></title>

  <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96" href="favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">

  <!-- <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.css" /> -->
  <link rel="stylesheet" type="text/css" href="assets/css/slick.css"/>
  <?= css(['assets/css/index.css', '@auto']) ?>

  <?= js('assets/js/jquery.min.js') ?>
  <?= js('assets/js/main.js') ?>
  <?= js('assets/js/perlin.js') ?>
  <?= js('assets/js/slick.min.js') ?>

  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-123294241-1"></script>
  <script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-123294241-1');
  </script>

  <?php if($page->isHomePage()): ?>
    <meta name = "description" content = "<?= $site->metadesc() ?>" />
    <meta property="og:title" content="<?= $site->metatitle() ?>">
    <meta property="og:description" content="<?= $site->metadesc() ?>">
  <?php endif ?>

  <?php if(!$page->isHomePage()): ?>
    <meta name = "description" content = "<?= $page->metadesc() ?>" />
    <meta property="og:title" content="<?= $page->metatitle() ?>">
    <meta property="og:description" content="<?= $page->metadesc() ?>">
  <?php endif ?>

  <meta property="og:image" content="<?= $site->metaimg() ?>">

</head>
<body class="<?php if(!$page->isHomePage()): ?>page--open<?php endif ?>">

  <div class="header">
    <a class="site--title" href="<?= $site->url() ?>"><?= $site->title() ?></a>
    <div class="home--tag">technology + accountability</div>
  </div>

  <div class="page--wrapper">


