// module.js
import { resolve, join } from 'path'
import { readdirSync, statSync } from 'fs'

export default function (moduleOptions) {
  // sync all of the files and folders to revelant places in the nuxt build dir (.nuxt/)
  const foldersToSync = ['helpers']
  for (const pathString of foldersToSync) {
    const path = resolve(__dirname, pathString)
    for (const file of readdirSync(path)) {
      this.addTemplate({
        src: resolve(path, file),
        fileName: join(pathString, file),
      })
    }
  }

  this.nuxt.hook('build:before', () => {
    const folder = resolve(__dirname, '../integrations')
    const files = readdirSync(folder)

    files.forEach((file) => {
      const filename = resolve(folder, file)
      const stat = statSync(filename)

      if (stat.isFile()) {
        const { dst } = this.addTemplate({
          src: filename,
          fileName: join(file),
          ssr: false,
        })
        this.options.plugins.push(join(this.options.buildDir, dst))
      }
    })
  })
}

module.exports.meta = require('./package.json')
