# Nuxt Pixel Loader

[![npm (scoped with tag)](https://img.shields.io/npm/v/@sutura/nuxt-pixel-loader/latest.svg?style=flat-square)](https://npmjs.com/package/@sutura/nuxt-pixel-loader)
[![npm](https://img.shields.io/npm/dt/@sutura/nuxt-pixel-loader.svg?style=flat-square)](https://npmjs.com/package/@sutura/nuxt-pixel-loader)
[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)

> A NuxtJS module to intuitively import 3rd party integrations.

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
3. Use the following example (Google Tag Manager) below to create an injection pixel

```js
/* eslint-disable no-undef */
import { onLoad } from './helpers/onLoad'

export default ({ app }) => {
  onLoad(() => {
    const gId = app.$config.gtmID // Garbs GTM ID from .env file
    const script = document.createElement('script')
    script.defer = true

    script.innerHTML =
      `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','` +
      gId +
      `');`

    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', gId)
  })
}
```


## License

[MIT License](./LICENSE)