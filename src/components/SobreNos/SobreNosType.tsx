import {
    TextContent,
    TextEditableContent,
    EDITABLE_TYPES,
    HTML_TEXT_TAGS,
} from "../../types/aggerTypes";

export type SobreNosContent = {
    texts: TextContent[];
    numbers: SobreNosContentEditableNumber[];
};

export type SobreNosContentEditableNumber = {
    key: string;
    type: EDITABLE_TYPES;
    number: TextContent;
    text: TextContent;
};

export const sobreNosSkeletonContent: SobreNosContent = {
    texts: [
        {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.H2,
            key: "Placeholder Título",
            text: "",
            style: {
                width: "150px",
                margin: "auto",
            },
        },
    ],
    numbers: Array(6).fill({
        key: "Informativo 1",
        type: EDITABLE_TYPES.NUMERO,
        number: {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.H3,
            key: "Placeholder Informação",
            text: "",
            style: {
                textAlign: "center",
            },
        },
        text: {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.P,
            key: "Placeholder Descritivo",
            text: "",
            style: {
                textAlign: "center",
            },
        },
    }),
};

export type SobreNosEditableContent = TextEditableContent;
export type SobreNosEditableContentSubKeys = "number" | "text";

export const isEditableSobreNosType = (data: any): data is SobreNosContent => {
    return data.texts && data.numbers ? true : false;
};
