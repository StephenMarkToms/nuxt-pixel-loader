// debug.js
const options = JSON.parse(`<%= JSON.stringify(options) %>`)
const pixels = `<%= pixels %>`

const { debug, namespace } = options
if (debug) {
  console.log(`${namespace} options: `, options)
  console.log(`${namespace} pixels: `, pixels)
}
