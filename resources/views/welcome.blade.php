<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @viteReactRefresh
        @vite('resources/scripts/index.tsx')
    </head>
    <body>
        <div id="app"></div>
        @vite('resources/scripts/index.tsx')
    </body>
</html>