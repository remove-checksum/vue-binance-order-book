export default class {
  constructor() {
    this.plugins = {};
  }
  /**
   *
   * @param {Object} plugin - plugin object to include
   * @param {string} plugin.name
   * @param {function} plugin.???
   */

  register(plugin) {
    this.plugins[plugin.name] = {};
    Object.entries(plugin)
      .forEach(([key, value], index, arr) => {
        if (arr.length === 2) this.plugins[plugin.name] = value;
        if (key !== 'name') this.plugins[plugin.name][key] = value;
      });
  }
}
