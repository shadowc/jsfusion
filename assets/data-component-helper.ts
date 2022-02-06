import { IDataComponentHelper } from "./types/data-component";

export const DataComponentHelper: IDataComponentHelper = {
    parseDataComponentAttribute: (text: string) => {
        let componentList = [];

        if (text.indexOf('[') !== -1) { // assume json array
            const parsedText: string[] = JSON.parse(text);

            if (!(typeof parsedText.length !== 'undefined' && parsedText instanceof Object)) {
                throw `Invalid format when parsing data-component attribute value ${text}`;
            }

            parsedText.forEach((key) => {
                componentList.push(key);
            });
        } else {
            componentList = text.split(' ');
        }

        return componentList;
    }
};
