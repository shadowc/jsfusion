/**
 * Gets a parsed attribute and returns a list of component names, given that the attribute value comes
 * from data-component.
 *
 * Throws an error if the information parsed is not valid
 */
export declare const getComponentNamesFromParsedAttribute: (parsedAttribute: string | boolean | number | Object | Array<any>) => string[];
