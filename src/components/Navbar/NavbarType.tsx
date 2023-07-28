import {
    TextContent,
    TextEditableContent,
    EDITABLE_TYPES,
    HTML_TEXT_TAGS,
} from "../../types/aggerTypes";
import { AggerPrimaryColor } from "../../utils/AggerTheme";

export type NavbarContent = {
    texts: TextContent[];
};

export const navbarSkeletonContent: NavbarContent = {
    texts: Array(5)
        .fill({
            type: EDITABLE_TYPES.LINK,
            htmlTag: HTML_TEXT_TAGS.H6,
            key: "Placeholder Link 1",
            text: "",
            style: {
                width: "70px",
            },
        })
        .concat({
            type: EDITABLE_TYPES.BUTTON,
            htmlTag: HTML_TEXT_TAGS.BUTTON,
            key: "Placeholder Link 6",
            text: "",
            style: {
                backgroundColor: AggerPrimaryColor,
                width: "200px",
            },
        }),
};

export type NavbarEditableContent = TextEditableContent;

export const isNavbarContentType = (data: any): data is NavbarContent => {
    return data.texts && Object.keys(data).length === 1 ? true : false;
};
