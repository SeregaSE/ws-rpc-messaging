export const is = (value, target) => value === target;
export const isType = (value, type) => is(typeof value, type);
export const isNull = (value) => value === null;
export const isString = (value) => isType(value, 'string');
export const isObject = (value) => isType(value, 'object') && !isNull(value);
export const isUndefined = (value) => is(value, undefined);
