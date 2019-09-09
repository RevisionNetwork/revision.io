<?php

return [
	'debug'  => true,
	'routes' => [  
		[
		  'pattern' => '(:any)/(:all)',
		  'action'  => function ($any) {
		    return page($any);
		  }
		]
	],
      'panel' => [
        	 'install' => true
        ]
];



?>
