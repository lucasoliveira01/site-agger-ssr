import {
    TextContent,
    TextEditableContent,
    EDITABLE_TYPES,
    HTML_TEXT_TAGS,
} from "../../types/aggerTypes";

export type DepoimentosContent = {
    depoimentos: DepoimentosEditableDeposition[];
    texts: TextContent[];
};

export type DepoimentosEditableDeposition = {
    key: string;
    type: EDITABLE_TYPES;
    name: TextContent;
    profession: TextContent;
    deposition: TextContent;
};

export const depoimentosSkeletonContent: DepoimentosContent = {
    depoimentos: Array(8).fill({
        key: "Depoimento 1",
        type: EDITABLE_TYPES.DEPOIMENTO,
        name: {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.H4,
            key: "Placeholder Nome",
            text: "",
            style: {},
        },
        profession: {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.H5,
            key: "Placeholder Profissão",
            text: "",
            style: {},
        },
        deposition: {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.P,
            key: "Placeholder Depoimento",
            text: "",
            style: {},
        },
    }),
    texts: [
        {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.H2,
            key: "Título",
            text: "",
            style: {
                textAlign: "end",
            },
        },
        {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.P,
            key: "Subtítulo",
            text: "",
            style: {
                textAlign: "end",
            },
        },
    ],
};

export type DepoimentosEditableContent = TextEditableContent;
export type DepoimentosEditableContentSubKeys = "name" | "profession" | "deposition";

export const isEditableDepoimentoType = (data: any): data is DepoimentosContent => {
    return data.texts && data.depoimentos ? true : false;
};
