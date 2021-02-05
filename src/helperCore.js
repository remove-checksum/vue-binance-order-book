export default class {
  constructor() {
    this.plugin = {};
  }
  /**
   *
   * @param {Object} plugin - plugin object to include
   * @param {string} plugin.name
   * @param {...function} plugin.method
   */

  register(pluginObject) {
    const { name, ...rest } = pluginObject;
    this.plugin[name] = Object.values(rest).length < 2 ? Object.values(rest)[0] : { ...rest };
  }
}
