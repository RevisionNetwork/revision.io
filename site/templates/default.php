<?php if(!kirby()->request()->ajax()) { 
    snippet('header');
  }
?>

<?php if(!$page->isHomePage() && $page->children()->count() > 1): ?>
  <?php snippet('submenu', ['data' => $page]); ?>
<?php endif ?>

<?php if(!$page->isHomePage()): ?>
  <div class="page--title"><?= $page->title() ?></div>
<?php endif ?>

<div class="page">

<main class="<?= str::slug($page->title()->lower()) ?> hide">

  <?php foreach($page->children() as $subpage): ?>
    <?php snippet('block', ['data' => $subpage]) ?>
  <?php endforeach ?>


</main>

<script type="text/javascript">
  $(document).ready(function(){
    $(".submenu, main").removeClass('hide');
  });
</script>

</div>

<?php if(!kirby()->request()->ajax()) { 
    snippet('footer');
  }
?>