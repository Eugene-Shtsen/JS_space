const original = {
  name: 'Alice',
  age: 25,
  skills: ['JS', 'HTML'],
  address: { city: 'Minsk', zip: 220000 },
};

const cloneObject = obj => 
    (typeof obj !== 'object' || obj === null) ? obj :
        Array.isArray(obj) ? obj.map(cloneObject) :
            Object.fromEntries(Object.entries(obj).map(([key, value]) => ([key, cloneObject(value)])))


const copy = cloneObject(original)

console.log(original);
console.log(copy);

copy.name = 'Bob';
copy.address.city = 'Warsaw';
copy.skills.push('CSS');

console.log(original.name); // 'Alice'
console.log(original.address.city); // 'Minsk'
console.log(original.skills.length); // 2
console.log('');
console.log(copy.name); // Bob
console.log(copy.address.city); // Warsaw
console.log(copy.skills.length); // 3