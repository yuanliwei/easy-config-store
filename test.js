const config = require('./index');
const path = require('path');

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
return

config.setDefaultConfig({
  name: 'yuanliwei'
})
config.setConfigPath(path.join(__dirname, '.git/cfg.json'))

console.log('config.name', config.name);
config.age = '13'
console.log('config.age', config.age);
// console.log('config', config);
config.books.book1.name = 'stars'
config.books.book1.price = 45

// console.log('config', config);
console.log('---------------');
console.log('keys:', Object.keys(config));
console.log('---------------');
console.log('json:', JSON.stringify(config));

config.name.bind(document.getElementById('id'))
config.name.bind($('input'))
config.name.bind($('input'), true)
