# Nuxt Pixel Loader

[![npm (scoped with tag)](https://img.shields.io/npm/v/@sutura/nuxt-pixel-loader/latest.svg?style=flat-square)](https://npmjs.com/package/@sutura/nuxt-pixel-loader)
[![npm](https://img.shields.io/npm/dt/@sutura/nuxt-pixel-loader.svg?style=flat-square)](https://npmjs.com/package/@sutura/nuxt-pixel-loader)
[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)

> A NuxtJS module to import intuitively import 3rd party integrations.

## Table of Contents ##

* [Requirements](#requirements)
* [Install](#install)
* [Getting Started](#getting-started)
* [Options](#options)
* [Usage](#usage)
* [License](#license)

## Requirements

* npm
* NuxtJS
* NodeJS

## Install

```bash
# npm
$ npm install --save @sutura/nuxt-pixel-loader

# yarn
$ yarn add @sutura/nuxt-pixel-loader
```



## Getting Started

Add `'@sutura/nuxt-pixel-loader'` to the `modules` section of your `nuxt.config.js` file.

#### Inline configuration entry

```javascript
{
  buildModules: [
    ['@sutura/nuxt-pixel-loader'],
  ]
}
```

## Options

The following options can be configured in the module's configuration entry in your `nuxt.config.js` file.

#### Pixels Folder - `folder`

- **Required**
- **Default:** `pixels`

## Usage

1. Inject the module in your `nuxt.config.js` file. See [Getting Started](#getting-started).
2. Create a folder in the root of you nuxt project `/pixels`

```js
{
  ...
  mounted() {
    const elements = this.$stripe.elements();
    const card = elements.create('card', {});
    // Add an instance of the card Element into the `card-element` <div>
    card.mount('#card-element');
  },
  ...
}
```


## License

[MIT License](./LICENSE)