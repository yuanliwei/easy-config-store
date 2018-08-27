# easy-config-store

## usage
```javascript
const config = require('easy-config-store')
console.log(JSON.stringify(config))
>> {}
// configration
config.cfgUseMemory() // no save
config.cfgUseFile('path to file.cfg') // save to file
config.cfgUseLocalStorage('the key') // save to localStorage
config.cfgClear() // clear all config
config.setOptions({defaultConfig}[, onSaveCallback(cfg)])
config.cfgReset() // reset to defaultConfig

// use
config.user.name = 'Y'
config.birth.day = 26
config.birth.month = 8
config.books = []
config.books[0].name = "Thinking in JavaScript"
console.log(JSON.stringify(config))
// auto generated 'user' and 'birth'
>> {"user":{"name":"Y"},"birth":{"day":26,"month":8},"books":[{"name":"Thinking in JavaScript"}]}
```
