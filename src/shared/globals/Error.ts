import fixedPrototype from './fixedPrototype';

class CustomError extends Error {}

fixedPrototype(CustomError, Error.prototype);

export default CustomError;
