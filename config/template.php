<?php

// Di-generate oleh php artisan template:zip - hanya berisi flavor "landing-agensi".
// Ganti brand/warna di bawah, atau set TEMPLATE_FLAVOR di .env.

return [
    'flavor' => env('TEMPLATE_FLAVOR', 'landing-agensi'),

    'flavors' => array (
  'landing-agensi' => 
  array (
    'label' => 'KREASINUSA — Agensi Digital',
    'brand_name' => 'KREASINUSA',
    'brand_tagline' => 'Brand-mu pantas terlihat mahal',
    'brand_initials' => 'KR',
    'accent' => '#14b8a6',
    'category' => 'teknologi',
    'home' => 'landings.agensi',
    'nav' => 
    array (
      'sections' => 
      array (
        0 => 
        array (
          'label' => 'Menu',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Landing',
              'to' => '/landings/agensi',
              'icon' => 'Home',
            ),
            1 => 
            array (
              'label' => 'Dashboard',
              'to' => '/dashboard',
              'icon' => 'LayoutDashboard',
            ),
            2 => 
            array (
              'label' => 'Pengaturan',
              'to' => '/settings',
              'icon' => 'Settings',
            ),
          ),
        ),
      ),
    ),
  ),
),
];
