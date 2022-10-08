const arr = [{one: "one"}, {one: "two"}];

const pos = arr.map(item => item.ticker).indexOf('two');

console.log(pos);