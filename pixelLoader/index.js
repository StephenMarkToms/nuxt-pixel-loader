/* eslint-disable no-undef */
export const onLoad = (callback, delay = 1) => {
  // missed the load event, run now
  if (document.readyState === 'complete') {
    setTimeout(() => callback(), delay)
  } else {
    window.addEventListener('load', function () {
      setTimeout(() => callback(), delay)
    })
  }
}

export default ({ app }) => {
  onLoad(() => {
    const script = document.createElement('script')
    script.defer = true

    script.innerHTML = `test`

    document.head.appendChild(script)
  })
}
