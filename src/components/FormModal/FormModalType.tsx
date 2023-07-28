import {
    TextContent,
    TextEditableContent,
    PopUpContent,
    PopUpContentEditableContent,
    EDITABLE_TYPES,
    HTML_TEXT_TAGS,
} from "../../types/aggerTypes";
import { AggerPrimaryColor } from "../../utils/AggerTheme";

export enum FORM_MODAL_SVG_TYPES {
    PAGAMENTO = 1,
    FIDELIDADE = 2,
    CANCELAMENTO = 3,
}

export type FormModalContent = {
    forms: FormModalEditableForm[];
    popUps: PopUpContent[];
};

export type FormModalEditableForm = {
    type: EDITABLE_TYPES;
    key: string;
    title: TextContent;
    descriptions: TextContent[];
    submitButton: TextContent;
};

export const formModalSkeletonContent: FormModalContent = {
    forms: Array(2).fill({
        type: EDITABLE_TYPES.FORM,
        key: "Formulário Contratação",
        title: {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.H2,
            key: "Placeholder Form Título",
            text: "",
            style: {},
        },
        descriptions: [
            {
                type: EDITABLE_TYPES.TEXT,
                htmlTag: HTML_TEXT_TAGS.H4,
                icon: FORM_MODAL_SVG_TYPES.PAGAMENTO,
                key: "Placeholder Descrição Pagamento",
                text: "",
                style: {},
            },
            {
                type: EDITABLE_TYPES.TEXT,
                htmlTag: HTML_TEXT_TAGS.H4,
                icon: FORM_MODAL_SVG_TYPES.FIDELIDADE,
                key: "Placeholder Descrição Fidelidade",
                text: "",
                style: {},
            },
            {
                type: EDITABLE_TYPES.TEXT,
                htmlTag: HTML_TEXT_TAGS.H4,
                icon: FORM_MODAL_SVG_TYPES.CANCELAMENTO,
                key: "Placeholder Descrição Cancelamento",
                text: "",
                style: {},
            },
            {
                type: EDITABLE_TYPES.TEXT,
                htmlTag: HTML_TEXT_TAGS.P,
                key: "Placeholder Informações Técnicas",
                text: "",
                style: {},
            },
        ],
        submitButton: {
            type: EDITABLE_TYPES.BUTTON,
            htmlTag: HTML_TEXT_TAGS.BUTTON,
            key: "Placeholder Botão",
            text: "",
            style: {
                backgroundColor: AggerPrimaryColor,
            },
        },
    }),
    popUps: [
        {
            type: EDITABLE_TYPES.POPUP,
            key: "Popup contratação com sucesso",
            title: {
                type: EDITABLE_TYPES.TEXT,
                htmlTag: HTML_TEXT_TAGS.H2,
                key: "Placeholder Popup Título",
                text: "",
                style: {},
            },
            content: {
                type: EDITABLE_TYPES.TEXT,
                htmlTag: HTML_TEXT_TAGS.P,
                key: "Placeholder Popup Conteudo",
                text: "",
                style: {},
            },
        },
        {
            type: EDITABLE_TYPES.POPUP,
            key: "Popup client já cadastrado",
            title: {
                type: EDITABLE_TYPES.TEXT,
                htmlTag: HTML_TEXT_TAGS.H2,
                key: "Placeholder Popup Título",
                text: "",
                style: {},
            },
            content: {
                type: EDITABLE_TYPES.TEXT,
                htmlTag: HTML_TEXT_TAGS.P,
                key: "Placeholder Popup Conteudo",
                text: "",
                style: {},
            },
        },
        {
            type: EDITABLE_TYPES.POPUP,
            key: "Popup erro ao contratar",
            title: {
                type: EDITABLE_TYPES.TEXT,
                htmlTag: HTML_TEXT_TAGS.H2,
                key: "Placeholder Popup Título",
                text: "",
                style: {},
            },
            content: {
                type: EDITABLE_TYPES.TEXT,
                htmlTag: HTML_TEXT_TAGS.P,
                key: "Placeholder Popup Conteudo",
                text: "",
                style: {},
            },
        },
    ],
};

export type FormModalEditableContent = TextEditableContent;

export type FormModalEditableContentSubKeys =
    | Exclude<PopUpContentEditableContent, "actionButton">
    | "title"
    | "descriptions"
    | "submitButton"
    | "fields";

export const isEditableFormModalType = (data: any): data is FormModalContent => {
    return data.popUps && data.popUps.length === 3 && data.forms.length === 2 ? true : false;
};
