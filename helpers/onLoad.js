/**
 * Wrapper for loading in scripts after the dom has finished loading
 *
 * @param function callback function to run after load
 * @param integer delay timeout before firing callback
 */
 export const onLoad = (callback, delay = 1) => {
  // missed the load event, run now
  if (document.readyState === 'complete') {
    setTimeout(() => callback(), delay);
  } else {
    window.addEventListener('load', () => {
      setTimeout(() => callback(), delay);
    });
  }
};
