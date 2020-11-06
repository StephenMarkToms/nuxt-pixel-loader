// callback - the function to run after onLoad
// delay - wait # milliseconds after onLoad
export const onLoad = (callback, delay) => {
  // missed the load event, run now
  if (document.readyState === 'complete') {
    setTimeout(() => callback(), delay)
  } else {
    window.addEventListener('load', function () {
      setTimeout(() => callback(), delay)
    })
  }
}
