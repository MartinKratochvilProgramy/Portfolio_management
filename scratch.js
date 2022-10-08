var a = [{one: 'one'}, {one: 'two;'}]

a = a.filter(item => {return item.one !== 'one'})

console.log(a);