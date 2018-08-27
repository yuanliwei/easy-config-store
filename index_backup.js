// var config = {};
var defaultCfg;
var cfgFilePath;
var rawConfig = {}

var handle = {
  get: function (oTarget, sKey) {
    if (typeof(sKey) != 'symbol') {
      console.log('get:', sKey, 'key type:',typeof(sKey));
    }
    if (sKey == 'toJSON') {
      console.log('------------------------');
      console.log('toJSON:',sKey, oTarget,'key length:' ,Object.keys(oTarget).length);
      console.log('=======================');
      if (Object.keys(oTarget).length == 0) {
        return JSON.stringify(null)
      } else {
        return JSON.stringify(oTarget)
      }
    }
    if (sKey == 'valueOf') { return oTarget.valueOf() }
    var result = oTarget[sKey]
    if (!result) {
      result = oTarget[sKey] = new Proxy({}, handle)
      handleSymbolProties(result)
    }
    return result
  },
  set: function (oTarget, sKey, vValue) {
    console.log('set:', sKey, vValue);
    if (typeof vValue == 'object') {
      vValue = new Proxy(vValue, handle)
      handleSymbolProties(vValue)
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
handleSymbolProties(config)

// Object.defineProperties(config, {
  //   setDefaultConfig:{
    //     value: (cfg)=>{
      //       defaultCfg = cfg
      //       console.log('call setDefaultConfig', cfg);
      //     }
      //   },
      //   setConfigPath:{
        //     value: (cfgPath)=>{
          //       cfgFilePath = cfgPath
          //       console.log('call setConfigPath', cfgPath);
          //     }
          //   }
          // })

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
