import { getClonedPrototype, defineAndBindFunctionsFrom } from './fixedPrototype';

// class CustomArray2 extends Array {}

const ClassFactory = (superclass: any, customPrototype: any) =>
    class extends superclass {
        constructor(...items: unknown[]) {
            super(...items);
            Object.setPrototypeOf(this, customPrototype);
        }
    };

const CustomArray = ClassFactory(Array, getClonedPrototype(Array.prototype));
defineAndBindFunctionsFrom(CustomArray, Array);
// const extendsAnyClass = (AnyClass) => class MyMixinClass extends MixinClass(AnyClass) {};

// make [[prototype]] of Child be a ref to Parent.prototype
// CustomArray.prototype = Object.create(Array.prototype);

// need to explicitly set the constructor
// CustomArray.prototype.constructor = CustomArray;

export default CustomArray;
