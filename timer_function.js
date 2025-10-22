/* Напиши реализацию функции, чтобы при вызове:

const counter = createCounter(5);
counter.start();

Напиши реализацию функции, чтобы при вызове, с интервалом в 1 секунду между числами.:
1
2
3
4
5
Done! */

function createCounter(n) {
    return {
        start() {
            let current_value = 1;
            let timerId = setInterval(function() {
                console.log(current_value);
                if (current_value == n) {
                    clearInterval(timerId);
                    console.log("Done!");
                }
                current_value++;
            }, 1000);
        }
    }
}

const counter = createCounter(5);
const counter_two = createCounter(8);
const counter_three = createCounter(3);
counter.start();
counter_two.start();
counter_three.start();