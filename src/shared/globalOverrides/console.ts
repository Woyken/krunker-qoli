import { clonePrototypesFunctionsAndBindToInstanceTree, defineAndBindFunctionsFrom } from './fixedPrototype';

const customConsole = {};

clonePrototypesFunctionsAndBindToInstanceTree(customConsole as any, console, console);
defineAndBindFunctionsFrom(customConsole, console);

export default customConsole;
