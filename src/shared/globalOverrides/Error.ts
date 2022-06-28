import clonePrototype from './fixedPrototype';

class CustomError extends Error {}

clonePrototype(CustomError, Error.prototype);

export default CustomError;
