// module.js
import { resolve, join } from 'path'
import { readdirSync } from 'fs'

export default function (moduleOptions) {
  // get all options for the module
  const options = {
    ...moduleOptions,
    ...this.options.pixelLoader,
  }

  // expose the namespace / set a default
  if (!options.namespace) options.namespace = 'pixelLoader'
  if (!options.folder) {
    options.folder = '../../pixels'
  } else {
    options.folder = '../../' + options.folder
  }
  const { namespace } = options

  // sync all of the files and folders to revelant places in the nuxt build dir (.nuxt/)
  const foldersToSync = ['helpers']
  for (const pathString of foldersToSync) {
    const path = resolve(__dirname, pathString)
    for (const file of readdirSync(path)) {
      this.addTemplate({
        src: resolve(path, file),
        fileName: join(namespace, pathString, file),
      })
    }
  }

  // sync all pixels into the namespaced folder
  const pixelFolder = '../' + options.folder
  const pixelsToSync = [pixelFolder]
  for (const pathString of pixelsToSync) {
    const path = resolve(__dirname, pathString)
    for (const file of readdirSync(path)) {
      const { dst } = this.addTemplate({
        src: resolve(path, file),
        fileName: join(namespace, file),
      })
      this.options.plugins.push(join(this.options.buildDir, dst))
    }
  }
}

module.exports.meta = require('./package.json')
