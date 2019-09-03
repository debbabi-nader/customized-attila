# Attila

A content focused responsive theme for [Ghost](https://github.com/tryghost/ghost/).

This is a customized Attila Ghost theme, based on the original Attila Ghost theme by Peter Amende which can be found at https://github.com/zutrinken/attila.git.

Demo for the original Attila: [attila.zutrinken.com](https://attila.zutrinken.com/)

Demo for the customized Attila: [debbabi-nader.github.io](https://debbabi-nader.github.io)

## Features

* Responsive layout
* Parallax cover images for blog, archives and posts
* Reading progress for posts
* Automatic code syntax highlight and line numbers
* Disqus support

## Localization

* __English__

## Setup

To enable [Disqus](https://disqus.com/) comments go to your blogs code injection settings and add `<script>var disqus = 'YOUR_DISQUS_SHORTNAME';</script>` to your blog header.

## Development

Install [Grunt](https://gruntjs.com/getting-started/):

	npm install -g grunt-cli

Install theme dependencies:

	npm install

Build Grunt project:

	grunt build

The package Grunt task packages the theme files into `dist/customized-attila.zip`, which you can then upload to your site:

	grunt package

## Copyright & License

Copyright (C) 2015-2019 Peter Amende - Released under the [MIT License](https://github.com/zutrinken/attila/blob/master/LICENSE).
