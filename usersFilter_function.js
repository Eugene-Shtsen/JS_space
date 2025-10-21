const users = [
  { name: 'Alice', age: 22, active: true },
  { name: 'Bob', age: 17, active: true },
  { name: 'Charlie', age: 25, active: false },
  { name: 'Dave', age: 19, active: true },
];

async function loadUsers() {
  // имитация запроса на сервер
  return new Promise((resolve) => {
    setTimeout(() => resolve(users), 300);
  });
}

async function getActiveAdultNames() {
  const users = await loadUsers();
  return users
    .filter(user => user.active && user.age >= 18).map(user => user.name).sort();                                     
}

getActiveAdultNames().then(console.log);
// ['Alice', 'Dave']