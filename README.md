[![ko-fi](https://img.shields.io/badge/Ko--Fi-farling-success)](https://ko-fi.com/farling)
[![patreon](https://img.shields.io/badge/Patreon-amusingtime-success)](https://patreon.com/amusingtime)
[![paypal](https://img.shields.io/badge/Paypal-farling-success)](https://paypal.me/farling)
![GitHub License](https://img.shields.io/github/license/farling42/fvtt-extra-embed)
![](https://img.shields.io/badge/Foundry-v9-informational)
![Latest Release Download Count](https://img.shields.io/github/downloads/farling42/fvtt-extra-embed/latest/module.zip)

## Introduction

This module extends the capabilities of `@Embed` added in Foundry V12+ with some extra config options (which should appear after the uuid in the embed).

## `inline=sentence`

Only the first sentence from the linked document will be inserted into the current paragraph.

The inserted text will be in it's own `span` (and Foundry will give the span a class of `content-embed`).

## `inline=paragraph`

Only the text of the first paragraph from the linked document will be inserted into the current paragraph. (Unlike the normal `inline` syntax of `@Embed` which puts the inline text into a separate section.)

The inserted text will be in it's own `span` (and Foundry will give the span a class of `content-embed`).

## Support

If you like what it does, then all contributions will be gratefully received at [Kofi](https://ko-fi.com/farling) or [Paypal](https://paypal.me/farling)
or if you're feeling really generous you could set up a regular contribution at [Patreon](https://www.patreon.com/amusingtime) 