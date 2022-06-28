import { boundFunctions } from './fixedPrototype';

const customMath = Object.create(null) as typeof Math;
boundFunctions(customMath, Math);

export default customMath;
