import {
    TextContent,
    TextEditableContent,
    PopUpContent,
    PopUpContentEditableContent,
    EDITABLE_TYPES,
    HTML_TEXT_TAGS,
} from "../../types/aggerTypes";
import { AggerHighlightColor } from "../../utils/AggerTheme";

export type ContatoContent = {
    texts: TextContent[];
    popUps: PopUpContent[];
};

export const contatoSkeletonContent: ContatoContent = {
    texts: [
        {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.H1,
            key: "Placeholder Título",
            text: "",
            style: {},
        },
        {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.P,
            key: "Placeholder Subtítulo",
            text: "",
            style: {},
        },
        {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.H2,
            key: "Placeholder Título do Formulario",
            text: "",
            style: {},
        },
        {
            type: EDITABLE_TYPES.BUTTON,
            htmlTag: HTML_TEXT_TAGS.BUTTON,
            key: "Placeholder Botão",
            text: "",
            style: {
                backgroundColor: AggerHighlightColor,
            },
        },
        {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.P,
            key: "Placeholder Disclaimer",
            text: "",
            style: {},
        },
    ],
    popUps: [
        {
            type: EDITABLE_TYPES.POPUP,
            key: "Popup novo contato",
            title: {
                type: EDITABLE_TYPES.TEXT,
                htmlTag: HTML_TEXT_TAGS.H2,
                key: "Placeholder Título",
                text: "",
                style: {},
            },
            content: {
                type: EDITABLE_TYPES.TEXT,
                htmlTag: HTML_TEXT_TAGS.P,
                key: "Placeholder Conteudo",
                text: "",
                style: {},
            },
            actionButton: {
                type: EDITABLE_TYPES.BUTTON,
                htmlTag: HTML_TEXT_TAGS.BUTTON,
                key: "Placeholder Botão",
                text: "",
                style: {
                    backgroundColor: AggerHighlightColor,
                },
            },
        },
    ],
};

export type ContatoEditableContent = TextEditableContent;

export type ContatoEditableContentSubKeys = PopUpContentEditableContent;

export const isEditableContatoType = (data: any): data is ContatoContent => {
    return data.texts && data.popUps && data.popUps.length === 1 ? true : false;
};
