// var config = {};
var defaultCfg;
var cfgFilePath;
var rawConfig = {}

var handle = {
  get: function (oTarget, sKey) {
    if (sKey == 'toJSON') {
      for (var k in oTarget) {
        if (oTarget.hasOwnProperty(k)) {
          var v = oTarget[k]
          if (typeof(v) == 'object' && Object.keys(v).length==0) {
            oTarget[k] = ''.undefined
          }
        }
      }
      return JSON.stringify(oTarget)
    }
    if (sKey == 'valueOf') {
      return oTarget.valueOf()
    }
    var result = oTarget[sKey]
    if (typeof result == 'undefined') {
      result = oTarget[sKey] = new Proxy({}, handle)
    }
    return result
  },
  set: function (oTarget, sKey, vValue) {
    if (vValue && typeof vValue == 'object') {
      vValue = new Proxy(vValue, handle)
    }
    oTarget[sKey] = vValue
    return true;
  }
}

Object.defineProperties(rawConfig, {
  setDefaultConfig:{
    value: (cfg)=>{
      defaultCfg = cfg
      console.log('call setDefaultConfig', cfg);
    }
  },
  setConfigPath:{
    value: (cfgPath)=>{
      cfgFilePath = cfgPath
      console.log('call setConfigPath', cfgPath);
    }
  }
})
var config = new Proxy(rawConfig, handle)

function build() {
  // var json = getJson()
  // buildConfig(json)
}

function buildConfig(obj) {
  var cfgs = {}
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      cfgs[k] = {
        value: obj[k],
        configurable: true,
        enumerable: true,
        writable: true,
        get: function () {
          console.log('get:', this.value, 'this:',this);
          this.value
        },
        set: function (value) {
          console.log('set:',value, 'this:',this);
          this.value = value
          if (typeof value == 'object') {
            buildConfig(value)
          }
        }
      }
    }
  }
  Object.defineProperties(config, cfgs)
}

function save() {

}

function getJson() {
  var cfg;
  try {
    if (typeof localStorage != 'undefined') {
      cfg = JSON.parse(localStorage['easy-config-store'])
    } else {
      cfg = JSON.parse(require('fs').readFileSync(cfgFilePath, 'utf-8'))
    }
  } catch (e) { console.warn(e); }
  if (typeof cfg != 'object') {
    cfg = defaultCfg || {}
  }
  return cfg
}

build()

module.exports = config;
