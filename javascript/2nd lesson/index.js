const func1 = () => {
  console.log('func1');
  return Promise.resolve(1);
};

const func2 = () => new Promise(resolve => {
  console.log('func2');
  setTimeout(() => resolve(2), 2000);
});

function promiseReduce(asyncFunctions, reduceFunc, initialValue) {
    return new Promise(function(resolve, reject) {
        (async () => {
            for (const item of asyncFunctions) {
                data = await item().then(function(value){
                    return reduceFunc.call(this, initialValue, value);
                });
            }
            resolve(data);
        })();
    });
}

promiseReduce(
[func1, func2],
function (memo, value) {
    console.log('reduce');
    return memo * value;
},
1
).then(console.log);
