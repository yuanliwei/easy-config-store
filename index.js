let defaultCfg;
let saveConfigFunc;
let rawConfig = {}
let config
let timer

let handle = {
  get: function(oTarget, sKey) {
    let result = oTarget[sKey]
    if (typeof result == 'undefined' && sKey != 'toJSON') {
      result = oTarget[sKey] = new Proxy({}, handle)
    }
    return result
  },
  set: function(oTarget, sKey, vValue) {
    if (vValue && typeof vValue == 'object') {
      vValue = new Proxy(vValue, handle)
    }
    oTarget[sKey] = vValue
    saveConfigFunc(config)
    return true;
  }
}

config = new Proxy(rawConfig, handle)

Object.defineProperties(rawConfig, {
  cfgClear: {
    value: () => {
      for (let k in config) {
        delete config[k]
      }
    }
  },
  cfgReset: {
    value: () => {
      for (let k in config) {
        delete config[k]
      }
      cfg = Object.assign({}, defaultCfg)
      for (let k in cfg) {
        config[k] = cfg[k]
      }
    }
  },
  setOptions: {
    value: (cfg, onSaveCallback) => {
      if (onSaveCallback) {
        saveConfigFunc = onSaveCallback
      }
      defaultCfg = Object.assign({}, cfg)
      for (let k in cfg) {
        config[k] = cfg[k]
      }
    }
  },
  cfgUseFile: {
    value: (cfgPath) => {
      const fs = require('fs');
      if (!fs.existsSync(cfgPath)) {
        fs.writeFileSync(cfgPath, '{}', 'utf-8')
      }
      let cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf-8'))
      config.setOptions(cfg, (cfg) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          fs.writeFileSync(cfgPath, JSON.stringify(cfg), 'utf-8')
        }, 300)
      })
    }
  },
  cfgUseLocalStorage: {
    value: (key) => {
      let cfg = JSON.parse(localStorage[key])
      config.setOptions(cfg, (cfg) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          localStorage[key] = JSON.stringify(cfg)
        }, 300)
      })
    }
  },
  cfgUseMemory: {
    value: (key) => {
      config.setOptions({}, (cfg) => {})
    }
  }
})

function build() {
  if (typeof(localStorage) == 'object') {
    config.cfgUseLocalStorage('easy-config-store')
  } else if (typeof(require('os')) == 'object') {
    const os = require('os');
    const path = require('path');
    config.cfgUseFile(path.join(os.tmpdir(), 'easy-config-store.cfg'))
  } else {
    config.cfgUseMemory()
  }
}

build()

module.exports = config;
