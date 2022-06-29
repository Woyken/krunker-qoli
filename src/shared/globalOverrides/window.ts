/* eslint-disable @typescript-eslint/no-explicit-any */
import { clonePrototypesFunctionsAndBindToInstanceTree, defineAndBindFunctionsFrom } from './fixedPrototype';

const customWindow = {
    location: {},
};

clonePrototypesFunctionsAndBindToInstanceTree(customWindow as any, window, window);
clonePrototypesFunctionsAndBindToInstanceTree(customWindow.location as any, window.location, window.location);
defineAndBindFunctionsFrom(customWindow.location, window.location);
defineAndBindFunctionsFrom(customWindow, window);

export default customWindow;
