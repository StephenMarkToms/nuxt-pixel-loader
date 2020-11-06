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

Your publishable key.

https://stripe.com/docs/js/initializing#init_stripe_js-publishableKey

#### API version - `apiVersion`

- **Optional**
- **Default:** `null`

Override your account's API version.

https://stripe.com/docs/js/initializing#init_stripe_js-options-apiVersion

#### Locale - `locale`

- **Optional**
- **Default**: `'en'`

A locale used to globally configure localization in Stripe. Setting the locale here will localize
error strings for all Stripe.js methods. It will also configure the locale for Elements and Checkout. Default is auto (Stripe detects the locale of the browser).

https://stripe.com/docs/js/initializing#init_stripe_js-options-locale

## Usage

1. Inject the module in your `nuxt.config.js` file. See [Getting Started](#getting-started).
2. `this.$stripe` is now available in your components:

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
[For more details, please refer to the official Stripe documentation.](https://stripe.com/docs/stripe-js/reference)



## License

[MIT License](./LICENSE)