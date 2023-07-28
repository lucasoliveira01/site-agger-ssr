import {
    TextContent,
    TextEditableContent,
    EDITABLE_TYPES,
    HTML_TEXT_TAGS,
} from "../../types/aggerTypes";

export enum FUNCIONALIDADE_SVG_TYPES {
    DOCUMENTO,
    PDF,
    CELULAR,
    DADOS_CLIENTES,
    DOCUMENTO_ELETRONICO,
}

export type FuncionalidadeContent = {
    texts: TextContent[];
    funcionalidades: FuncionalidadeEditableFuncionality[];
};

export type FuncionalidadeEditableFuncionality = {
    key: string;
    icon: FUNCIONALIDADE_SVG_TYPES;
    type: EDITABLE_TYPES;
    title: TextContent;
    description: TextContent;
    popUpButton: TextContent;
    knowMoreLink: TextContent;
};

export const funcionalidadeSkeletonContent: FuncionalidadeContent = {
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
        {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.H2,
            key: "Placeholder Subtítulo",
            text: "",
            style: {},
        },
    ],
    funcionalidades: Array(5).fill({
        key: "Funcionalidade 1",
        type: EDITABLE_TYPES.FUNCIONALIDADE,
        icon: FUNCIONALIDADE_SVG_TYPES.DOCUMENTO,
        title: {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.H3,
            key: "Placeholder Título",
            text: "",
            style: {},
        },
        description: {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.P,
            key: "Placeholder  Descrição",
            text: "",
            style: {},
        },
        popUpButton: {
            type: EDITABLE_TYPES.BUTTON,
            htmlTag: HTML_TEXT_TAGS.BUTTON,
            key: "Placeholder Botão",
            text: "",
            style: {
                backgroundColor: "gray",
            },
        },
        knowMoreLink: {
            type: EDITABLE_TYPES.LINK,
            htmlTag: HTML_TEXT_TAGS.P,
            key: "Placeholder  Link",
            text: "",
            style: {},
        },
    }),
};

export type FuncionalidadeEditableContent = TextEditableContent;

export type FuncionalidadesEditableContentSubKeys =
    | "title"
    | "description"
    | "popUpButton"
    | "knowMoreLink";

export const isEditableFuncionalidadeType = (data: any): data is FuncionalidadeContent => {
    return data.texts && data.funcionalidades && data.funcionalidades.length > 0 ? true : false;
};
