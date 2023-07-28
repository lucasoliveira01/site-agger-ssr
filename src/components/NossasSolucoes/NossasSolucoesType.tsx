import {
    TextContent,
    TextEditableContent,
    EDITABLE_TYPES,
    HTML_TEXT_TAGS,
} from "../../types/aggerTypes";
import { AggerPrimaryColor } from "../../utils/AggerTheme";

export type NossasSolucoesContent = {
    texts: TextContent[];
    solutions: NossasSolucoesEditableSolution[];
};

export type NossasSolucoesEditableSolution = {
    key: string;
    type: EDITABLE_TYPES;
    title: TextContent;
    description: TextContent;
    knowMoreButton: TextContent;
    modalTitle: TextContent;
    imageURL: string;
    videoURL: string;
};

export const nossasSolucoesSkeletonContent: NossasSolucoesContent = {
    texts: [
        {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.H2,
            key: "Placeholder Título",
            text: "",
            style: {
                width: "150px",
                textAlign: "center",
                margin: "auto",
            },
        },
    ],
    solutions: Array(2).fill({
        key: "Aggilizador",
        type: EDITABLE_TYPES.SOLUCAO,
        title: {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.H3,
            key: "Placeholder  Título",
            text: "",
            style: {
                width: "100%",
            },
        },
        description: {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.P,
            key: "Placeholder Subtítulo",
            text: "",
            style: {
                width: "100%",
            },
        },
        knowMoreButton: {
            type: EDITABLE_TYPES.BUTTON,
            htmlTag: HTML_TEXT_TAGS.BUTTON,
            key: "Placeholder Botão",
            text: "",
            style: {
                width: "250px",
                backgroundColor: AggerPrimaryColor,
            },
        },
        modalTitle: {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.H6,
            key: "Placeholder Título vídeo",
            text: "",
            style: {},
        },
        imageURL: "image-aggilizador-nosso-sistema-multicalculo-agger.webp",
        videoURL: "https://www.youtube.com/embed/Jg0NJYpqRMo?enablejsapi=1&widgetid=2&autoplay=1",
    }),
};

export type NossasSolucoesEditableContent = TextEditableContent | "imageURL" | "videoURL";

export type NossasSolucoesditableContentSubKeys =
    | "title"
    | "description"
    | "knowMoreButton"
    | "modalTitle"
    | "imageURL"
    | "videoURL";

export const isEditableNossasSolucoesType = (data: any): data is NossasSolucoesContent => {
    return data.texts && data.solutions && data.solutions.length > 0 ? true : false;
};
