import spreadObjectAndBindFunctions from '../utils/spreadObjectAndBindFunctions';

const customArray = spreadObjectAndBindFunctions(window.Array as any) as typeof window.Array;

export default customArray;
