type FunctionType = (...args: any[]) => any;

const wrapFunction = function(
    functionToWrap: FunctionType,
    executeBefore?: FunctionType,
    executeAfter?: FunctionType,
) {
    return function() {
        const args = Array.prototype.slice.call(arguments);
        let result;
        if (!!executeBefore) {
            executeBefore.apply(this, args);
        }

        result = functionToWrap.apply(this, args);

        if (!!executeAfter) {
            executeAfter.apply(this, args);
        }

        return result;
    };

};

module.exports.wrapFunction = wrapFunction;
