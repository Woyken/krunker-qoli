import { defineAndBindFunctionsFrom } from './fixedPrototype';

const customMath = Object.create(null) as typeof Math;
defineAndBindFunctionsFrom(customMath, Math);

export default customMath;
