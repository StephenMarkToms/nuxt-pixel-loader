/**
 * Wrapper for loading in scripts and firing js on demand
 */
export class onDemand {
  /**
   * @param string src source url to be injects into script tag
   * @param array srcAttributes attribute properties to be assigned to the script tag
   * @param boolean waitForPageLoad wait for page load event on first hit?
   */
  constructor(src, srcAttributes = [], waitForPageLoad = true) {
    this.isLoaded = false;
    this.isLoading = false;
    this.callbacks = [];
    this.src = src;
    this.srcAttributes = srcAttributes;
    this.waitForPageLoad = waitForPageLoad;
  }

  load(callback = () => {}) {
    if (this.isLoaded) return callback();

    this.callbacks.push(callback);

    if (!this.isLoading) {
      this.isLoading = true;
      if (!this.waitForPageLoad || document.readyState === 'complete') {
        this._loadScript();
      } else {
        window.addEventListener('load', () => this._loadScript());
      }
    }
  }

  _loadScript() {
    const script = document.createElement('script');
    this.srcAttributes.forEach((attr) => {
      script[attr.name] = attr.value;
    });

    if (this.src) {
      script.src = this.src;
      script.onload = () => this._invokeCallbacks();
    } else {
      this._invokeCallbacks();
    }

    document.getElementsByTagName('head')[0].appendChild(script);
  }

  _invokeCallbacks() {
    this.isLoaded = true;
    this.callbacks.forEach(callback => callback());
  }
}
