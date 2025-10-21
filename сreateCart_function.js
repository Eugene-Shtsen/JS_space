function createCart() {
    const items = [];

    function validateItem(item) {
        if (typeof item !== 'object' || item === null) {
            throw new Error(`Ошибка добавления! Ожидается объект, получено: ${typeof item}`);
        }
        const keys = ['name', 'price', 'quantity'];

        for (const key of keys) {
            if (!(key in item)) {
                throw new Error(`Ошибка добавления! Отсутствует обязательное поле "${key}" в объекте: ${JSON.stringify(item)}`);
            }
        }

        if (typeof item.name !== 'string' || item.name.trim() === '') {
            throw new Error(`Ошибка добавления! Поле "name" должно быть непустой строкой в объекте: ${JSON.stringify(item)}. Получено: ${item.name}`);
        }
        if (typeof item.price !== 'number' || item.price <= 0) {
            throw new Error(`Ошибка добавления! Поле "price" должно быть числом больше нуля в объекте: ${JSON.stringify(item)}. Получено: ${item.price}`);
        }
        if (typeof item.quantity !== 'number' || item.quantity <= 0) {
            throw new Error(`Ошибка добавления! Поле "quantity" должно быть числом больше нуля в объекте: ${JSON.stringify(item)}. Получено: ${item.quantity}`);
        }
    }

    return {
        addItem(item) {
            try {
                validateItem(item);

                const normalizedItem = {
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                };

                const existingItem = items.find(i => i.name === normalizedItem.name);
                if (existingItem) {
                    existingItem.quantity += normalizedItem.quantity;
                } else {
                    items.push(normalizedItem);
                }
                return true;
            } catch (error) {
                console.error(error.message);
                return false;
            }
        },

        removeItem(name) {
            try {
                const index = items.findIndex(i => i.name === name);
                if (index === -1) {
                    throw new Error(`Ошибка удаления! Товар с именем "${name}" не найден в корзине.`);
                }
                items.splice(index, 1);
            } catch (error) {
                console.error(error.message);
            }
        },

        getTotal() {
            return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },

        getItems() {
            return items.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }));
        }
    };
}

const cart = createCart();

cart.addItem({ name: 'Apple', price: 5, quantity: 2 });
cart.addItem({ name: 'Apple', price: 3, quantity: 1 });
cart.addItem({ name: 'Banana', price: 3, quantity: 5 });
cart.addItem({ name: 'Orange', price: 4, quantity: -3 });
cart.addItem({ name: 'Orange', price: 4 });
cart.addItem({ name: 'Orange', quantity: 8, price: 8 });
cart.addItem({ name: 'Milk', quantity: 8, price: 2 });
cart.removeItem('Banananza');

console.log('Общая сумма:', cart.getTotal());
console.log('Товары в корзине:', JSON.stringify(cart.getItems(), null, 2));