import { CSSProperties } from "react";

import { NavbarContent, NavbarEditableContent } from "../components/Navbar/NavbarType";
import {
    ContatoContent,
    ContatoEditableContent,
    ContatoEditableContentSubKeys,
} from "../components/Contato/ContatoType";
import {
    SobreNosContent,
    SobreNosEditableContent,
    SobreNosEditableContentSubKeys,
} from "../components/SobreNos/SobreNosType";
import {
    DepoimentosContent,
    DepoimentosEditableContent,
    DepoimentosEditableContentSubKeys,
} from "../components/Depoimento/DepoimentosType";
import {
    NossasSolucoesContent,
    NossasSolucoesditableContentSubKeys,
    NossasSolucoesEditableContent,
} from "../components/NossasSolucoes/NossasSolucoesType";
import {
    FuncionalidadeContent,
    FuncionalidadeEditableContent,
    FuncionalidadesEditableContentSubKeys,
} from "../components/Funcionalidade/FuncionalidadeType";
import {
    PlanoContent,
    PlanoEditableContent,
    PlanosEditableContentSubKeys,
} from "../components/Plano/PlanoType";
import {
    FormModalContent,
    FormModalEditableContent,
    FormModalEditableContentSubKeys,
} from "../components/FormModal/FormModalType";

export enum EDITABLE_TYPES {
    TEXT = "0",
    LINK = "1",
    BUTTON = "2",
    NUMERO = "3",
    DEPOIMENTO = "4",
    SOLUCAO = "5",
    FUNCIONALIDADE = "6",
    PLANO = "7",
    LICENCE = "8",
    POPUP = "9",
    FORM = "10",
}

export enum HTML_TEXT_TAGS {
    H1 = "h1",
    H2 = "h2",
    H3 = "h3",
    H4 = "h4",
    H5 = "h5",
    H6 = "h6",
    P = "body1",
    BUTTON = "button",
}

export enum EDITABLE_CONTENT_CSS_MAP {
    COLOR = "color",
    BACKGROUND_COLOR = "backgroundColor",
    FONT_SIZE = "fontSize",
    FONT_FAMILY = "fontFamily",
    LINE_HEIGHT = "lineHeight",
    LETTER_SPACING = "letterSpacing",
    TEXT_ALIGN = "textAlign",
    WIDTH = "width",
    HEIGHT = "height",
    MARGIN = "margin",
}

export type EditableCSSProperties = Pick<CSSProperties, EDITABLE_CONTENT_CSS_MAP>;

export type TextContent = {
    type: EDITABLE_TYPES;
    htmlTag: HTML_TEXT_TAGS;
    key: string;
    href?: string;
    icon?: number;
    googleTagManagerID?: string;
    text: string;
    style: EditableCSSProperties;
};

export type TextEditableContent = "href" | "text" | "style";

export type PopUpContent = {
    type: EDITABLE_TYPES;
    key: string;
    title: TextContent;
    content: TextContent;
    actionButton?: TextContent;
};

export type PopUpContentEditableContent = "title" | "content" | "actionButton";

export type EditableContentName =
    | TextEditableContent
    | NavbarEditableContent
    | ContatoEditableContent
    | SobreNosEditableContent
    | DepoimentosEditableContent
    | NossasSolucoesEditableContent
    | FuncionalidadeEditableContent
    | PlanoEditableContent
    | FormModalEditableContent;

export type AggerContent = {
    nav: NavbarContent;
    contato: ContatoContent;
    sobreNos: SobreNosContent;
    depoimento: DepoimentosContent;
    nossasSolucoes: NossasSolucoesContent;
    funcionalidade: FuncionalidadeContent;
    plano: PlanoContent;
    formModal: FormModalContent;
};

export type EditableSectionTypes =
    | NavbarContent
    | ContatoContent
    | SobreNosContent
    | DepoimentosContent
    | NossasSolucoesContent
    | FuncionalidadeContent
    | PlanoContent
    | FormModalContent;

export type EditableSubContentKeys =
    | ContatoEditableContentSubKeys
    | SobreNosEditableContentSubKeys
    | DepoimentosEditableContentSubKeys
    | NossasSolucoesditableContentSubKeys
    | FuncionalidadesEditableContentSubKeys
    | PlanosEditableContentSubKeys
    | FormModalEditableContentSubKeys;

export type EditableSubContentKeysType = {
    [key in EditableSubContentKeys]?: TextContent;
};
