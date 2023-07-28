import {
    TextContent,
    TextEditableContent,
    EDITABLE_TYPES,
    HTML_TEXT_TAGS,
} from "../../types/aggerTypes";
import { AggerHighlightColor } from "../../utils/AggerTheme";

export enum PLANO_HIRE_API_REFERENCE {
    GESTOR = 0,
    AGGILIZADOR = 1,
    MONTHLY = 0,
    YEARLY = 1,
}

export interface SelectedPlanoInformation {
    planIndex: number;
    licenceIndex: number;
}

export type PlanoContent = {
    texts: TextContent[];
    planos: PlanoEditablePlan[];
};

export type PlanoEditablePlan = {
    type: EDITABLE_TYPES;
    key: string;
    hireApiType?: PLANO_HIRE_API_REFERENCE;
    title: TextContent;
    description: TextContent;
    packageItems: TextContent[];
    licences: PlanoEditableLicence[];
    buyButton: TextContent;
    requestContactButton: TextContent;
};

export type PlanoEditableLicence = {
    type: EDITABLE_TYPES;
    key: string;
    licenceQuantity: number;
    price: TextContent;
    description: string;
};

export const planoSkeletonContent: PlanoContent = {
    texts: [
        {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.H2,
            key: "Placeholder Título",
            text: "",
            style: {
                width: "250px",
            },
        },
        {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.P,
            key: "Placeholder Subtítulo",
            text: "",
            style: {
                width: "350px",
            },
        },
    ],
    planos: Array(3).fill({
        type: EDITABLE_TYPES.PLANO,
        hireApiType: PLANO_HIRE_API_REFERENCE.AGGILIZADOR,
        key: "Plano Aggilizador",
        title: {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.H3,
            key: "Placeholder Título",
            text: "",
            style: {},
        },
        description: {
            type: EDITABLE_TYPES.TEXT,
            htmlTag: HTML_TEXT_TAGS.H2,
            key: "Placeholder Descrição",
            text: "",
            style: {},
        },
        packageItems: [
            {
                type: EDITABLE_TYPES.TEXT,
                htmlTag: HTML_TEXT_TAGS.P,
                key: "Item Pacote 1",
                text: "",
                style: {},
            },
        ],
        licences: [
            {
                type: EDITABLE_TYPES.LICENCE,
                key: "Licensa 1",
                licenceQuantity: 1,
                price: {
                    type: EDITABLE_TYPES.TEXT,
                    htmlTag: HTML_TEXT_TAGS.H4,
                    key: "Placeholder Preço",
                    text: "",
                    style: {},
                },
                description: "1 Licença",
            },
        ],
        buyButton: {
            type: EDITABLE_TYPES.BUTTON,
            htmlTag: HTML_TEXT_TAGS.BUTTON,
            key: "Placeholder Botão Compra",
            text: "",
            style: {
                backgroundColor: AggerHighlightColor,
            },
        },
        requestContactButton: {
            type: EDITABLE_TYPES.BUTTON,
            htmlTag: HTML_TEXT_TAGS.BUTTON,
            key: "Placeholder Botão Contato",
            text: "",
            style: {
                backgroundColor: AggerHighlightColor,
            },
        },
    }),
};

export type PlanoEditableContent = TextEditableContent | "description" | "licenceQuantity";

export type PlanosEditableContentSubKeys =
    | "title"
    | "description"
    | "packageItems"
    | "licences"
    | "buyButton"
    | "requestContactButton";

export const isEditablePlanoType = (data: any): data is PlanoContent => {
    return data.texts && data.planos && data.planos.length > 0 ? true : false;
};
