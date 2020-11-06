// module.js
import { resolve, join } from 'path'
import { readdirSync, readFileSync } from 'fs'

export default function (moduleOptions) {
  // get all options for the module
  const options = {
    ...moduleOptions,
    ...this.options.pixelLoader,
    pixels: '',
  }

  // configure webpack to recognize .pixel files
  this.extendBuild((config, { isClient, isServer }) => {
    config.module.rules.push({
      test: /\.(pixel)$/i,
      loader: 'raw-loader',
    })
  })

  // expose the namespace / set a default
  if (!options.namespace) options.namespace = 'pixelLoader'
  if (!options.folder) options.folder = 'pixels'
  const { namespace } = options

  const pixelFolder = '../' + options.folder

  // push all the pixel files into an array
  const pixelsToSync = [pixelFolder]
  for (const pathString of pixelsToSync) {
    const path = resolve(__dirname, pathString)
    for (const file of readdirSync(path)) {
      const pixel = readFileSync(join(path, file), 'utf8')
      options.pixels = options.pixels + pixel
      console.log('pushed: ' + file)
    }
  }

  // add all of the initial plugins
  const pluginsToSync = ['plugins/index.js', 'debug.js']
  for (const pathString of pluginsToSync) {
    this.addPlugin({
      src: resolve(__dirname, pathString),
      fileName: join(namespace, pathString),
      options,
    })
  }

  // sync all of the files and folders to revelant places in the nuxt build dir (.nuxt/)

  const foldersToSync = ['plugins/helpers', pixelFolder]
  for (const pathString of foldersToSync) {
    const path = resolve(__dirname, pathString)
    for (const file of readdirSync(path)) {
      this.addTemplate({
        src: resolve(path, file),
        fileName: join(namespace, pathString, file),
        options,
      })
    }
  }
}

module.exports.meta = require('./package.json')
