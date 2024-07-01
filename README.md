[![ko-fi](https://img.shields.io/badge/Ko--Fi-farling-success)](https://ko-fi.com/farling)
[![patreon](https://img.shields.io/badge/Patreon-amusingtime-success)](https://patreon.com/amusingtime)
[![paypal](https://img.shields.io/badge/Paypal-farling-success)](https://paypal.me/farling)
![GitHub License](https://img.shields.io/github/license/farling42/fvtt-extra-embed)
![](https://img.shields.io/badge/Foundry-v12-informational)
![Latest Release Download Count](https://img.shields.io/github/downloads/farling42/fvtt-extra-embed/latest/module.zip)
![Forge installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Fextra-embed)

Do you love the new `@Embed` enricher but wish it could embed on the first **sentence** or **paragraph** from the linked document? Then this module is for you!

## Introduction

This module extends the capabilities of `@Embed` added in Foundry V12+ with some extra config options (which should appear after the uuid in the embed).

## `inline=paragraph`

Only the text of the first paragraph from the linked document will be inserted into the current paragraph. (Unlike the normal `inline` syntax of `@Embed` which puts the inline text into a separate section.)

_The inserted text will be in it's own `span` (and Foundry will give the span a class of `content-embed`)._

## `inline=paragraph:N`  (where N is a number)

Only the text of the nth paragraph (as identified by the number after the colon) from the linked document will be inserted into the current paragraph. (Unlike the normal `inline` syntax of `@Embed` which puts the inline text into a separate section.)

_The inserted text will be in it's own `span` (and Foundry will give the span a class of `content-embed`)._

## `inline=sentence`

Only the first sentence from the linked document will be inserted into the current paragraph.

_The inserted text will be in it's own `span` (and Foundry will give the span a class of `content-embed`)._

## Additional Information

The original implementation of `@Embed` is described at https://github.com/foundryvtt/foundryvtt/issues/10262

## Support

If you like what it does, then all contributions will be gratefully received at [Kofi](https://ko-fi.com/farling) or [Paypal](https://paypal.me/farling)
or if you're feeling really generous you could set up a regular contribution at [Patreon](https://www.patreon.com/amusingtime) 
