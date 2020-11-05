// module.js
import { resolve, join } from 'path'
import { readdirSync, statSync } from 'fs'

export default function (moduleOptions) {
  // get all options for the module
  const options = {
    ...moduleOptions,
    ...this.options.pixelLoader,
  }

  // expose the namespace / set a default
  if (!options.namespace) options.namespace = 'pixelLoader'
  if (!options.folder) options.folder = 'pixels'
  const { namespace } = options

  // add all of the initial plugins
  const pluginsToSync = [
    'store/index.js',
    'plugins/index.js',
    'debug.js',
    'middleware/index.js',
  ]
  for (const pathString of pluginsToSync) {
    this.addPlugin({
      src: resolve(__dirname, pathString),
      fileName: join(namespace, pathString),
      options,
    })
  }

  // sync all of the files and folders to revelant places in the nuxt build dir (.nuxt/)
  const pixelFolder = '../' + options.folder
  const foldersToSync = ['plugins/helpers', 'store/modules', pixelFolder]
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

  // configure webpack to recognize .pixel files
  this.extendBuild((config, { isClient, isServer }) => {
    config.module.rules.push({
      test: /\.(pixel)$/i,
      loader: 'raw-loader',
    })
  })
}
module.exports.meta = require('./package.json')
