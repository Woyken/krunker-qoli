import { getClonedPrototype } from './fixedPrototype';

class CustomError extends Error {}

TODO = getClonedPrototype(CustomError, Error.prototype);

export default CustomError;
