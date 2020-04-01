const sum = (num) => {
    let currentSum = num;
    let result = (...arg) => {
        if (!arg.length) {
            return currentSum;
        }
        currentSum += arg[0];
        return result;
    };
    return result;
};
