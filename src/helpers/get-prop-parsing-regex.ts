export const getPropParsingRegex = (): RegExp => {
    return /^((.+)\.)?(.+):\s*(#parentProp\.)?(.+),?$/;
};
