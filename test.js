const config = require('./index');
const path = require('path');

config.cfgClear()
config.cfgUseMemory()
config.user.name = 'Y'
config.birth.day = 26
config.birth.month = 8
config.books = []
config.books[0].name = "Thinking in JavaScript"
console.log(JSON.stringify(config))
return

console.log(JSON.stringify(config));
// << {"name":"yuanliwei","age":13}
console.log('测试 cfgClear()');
// << 测试 cfgClear()
config.name = 'yuanliwei'
console.log(JSON.stringify(config.AGE));
// << {"name":"yuanliwei","age":13,"AGE":{}}
console.log(JSON.stringify(config));
// <<
config.cfgClear()
console.log(JSON.stringify(config));
console.log('Object.keys(config) == 0 :', Object.keys(config) == 0);

console.log('\n测试 cfgDefault({})');
config.setOptions({
  name: 'yuanliwei',
  age: 13
})
console.log(JSON.stringify(config));

console.log('\n测试 cfgReset()');
config.books = []
config.books[0] = {name:'世界尽头', price: 34.8}
config.books[0].car.oldPrice = 7
console.log(JSON.stringify(config));
config.cfgReset()
console.log(JSON.stringify(config));

console.log(config.name1);
console.log(JSON.stringify(config.name1));
config.name.leng = 'yuanliwei'
console.log(config.name.leng);
console.log(JSON.stringify(config));
config.name1.t.y=9
console.log(JSON.stringify(config));
config.obj={a:2,b:3,c:{w:3,e:'t'}}
console.log(JSON.stringify(config));
console.log('config.obj.c.e:',config.obj.c.e);

config.setOptions({
  name: 'yuanliwei'
})
config.cfgUseFile(path.join(__dirname, '.git/cfg.json'))

config.cfgReset()
config.cfgClear()

console.log('config.name', config.name);
config.age = '13'
console.log('config.age', config.age);
// console.log('config', config);
config.books = []
config.books[0].name = 'stars'
config.books[0].price = 45

// console.log('config', config);
console.log('---------------');
console.log('keys:', Object.keys(config));
console.log('---------------');
console.log('json:', JSON.stringify(config));

// config.name.bind(document.getElementById('id'))
// config.name.bind($('input'))
// config.name.bind($('input'), true)
