import React, { createContext, FC, ReactElement, useState, useContext, useEffect } from "react";
import { backendHttp } from "../../utils/Utility";
import {
    DepoimentosContent,
    DepoimentosEditableDeposition,
    depoimentosSkeletonContent,
    isEditableDepoimentoType,
} from "./DepoimentosType";

import { EDITABLE_TYPES, HTML_TEXT_TAGS, TextContent } from "../../types/aggerTypes";

interface Props {
    children: ReactElement | ReactElement[];
}

export const DepoimentoContentContext = createContext({
    depoimentoContent: depoimentosSkeletonContent,
    updateDepoimentoContent: (newContent: DepoimentosContent) => {},
    addDepoimento: () => {},
    deleteDepoimento: (index: number) => {},
    depoimentoChanged: false,
});

export const useDepoimentoContentContext = () => {
    return useContext(DepoimentoContentContext);
};

export const DepoimentoContentProvider: FC<Props> = (props) => {
    const [depoimentoContent, setDepoimentoContent] = useState(depoimentosSkeletonContent);
    const [changed, setChanged] = useState(false);

    const filterNotDepoimentos = (item: TextContent | DepoimentosEditableDeposition) => {
        return item.type !== EDITABLE_TYPES.DEPOIMENTO;
    };

    const filterDepoimentos = (item: TextContent | DepoimentosEditableDeposition) => {
        return item.type === EDITABLE_TYPES.DEPOIMENTO;
    };

    useEffect(() => {
        backendHttp.get("/deposition").then((res) => {
            if (res.status === 200 && Array.isArray(res.data) && res.data.length) {
                const newDepoimentoContent = {
                    texts: res.data.filter(filterNotDepoimentos),
                    depoimentos: res.data.filter(filterDepoimentos),
                };
                if (isEditableDepoimentoType(newDepoimentoContent)) {
                    setDepoimentoContent(newDepoimentoContent);
                }
            }
        });
    }, []);
    //
    const addDepoimento = () => {
        const newDepoimentoContent = { ...depoimentoContent };
        const depoimentoNumber = newDepoimentoContent.depoimentos.length + 1;
        let newDepoimento = {
            key: "Depoimento 1",
            type: EDITABLE_TYPES.DEPOIMENTO,
            name: {
                type: EDITABLE_TYPES.TEXT,
                htmlTag: HTML_TEXT_TAGS.H4,
                key: "Nome",
                text: "<p>Nome</p>",
                style: {
                    color: "#fff",
                    fontSize: "1.1rem",
                    fontFamily: "Asap SemiBold",
                },
            },
            profession: {
                type: EDITABLE_TYPES.TEXT,
                htmlTag: HTML_TEXT_TAGS.H5,
                key: "Profissão",
                text: "<p>Profissão</p>",
                style: {
                    color: "#003050",
                    fontSize: "1rem",
                    fontFamily: "Asap Bold",
                },
            },
            deposition: {
                type: EDITABLE_TYPES.TEXT,
                htmlTag: HTML_TEXT_TAGS.P,
                key: "Placeholder Depoimento",
                text: "<p>Depoimento</p>",
                style: {
                    color: "#fff",
                    fontSize: "1.1rem",
                    fontFamily: "K2D Regular",
                },
            },
        };
        newDepoimento.key = `Depoimento ${depoimentoNumber}`;
        newDepoimento.name.text = "<p>Nome</p>";
        newDepoimento.profession.text = "<p>Profissão</p>";
        newDepoimento.deposition.text = "<p>Conteudo</p>";
        newDepoimentoContent.depoimentos.push(newDepoimento);
        setDepoimentoContent(newDepoimentoContent);
        setChanged(true);
    };

    const deleteDepoimento = (index: number) => {
        const newDepoimentoContent = { ...depoimentoContent };
        newDepoimentoContent.depoimentos.splice(index, 1);
        newDepoimentoContent.depoimentos.forEach((depoimento, index, depoimentos) => {
            depoimentos[index].key = `Depoimento ${index + 1}`;
        });

        setDepoimentoContent(newDepoimentoContent);
        setChanged(true);
    };

    return (
        <DepoimentoContentContext.Provider
            value={{
                depoimentoContent,
                updateDepoimentoContent: (depoimentoContent) => {
                    setDepoimentoContent(depoimentoContent);
                    setChanged(true);
                },
                addDepoimento,
                deleteDepoimento,
                depoimentoChanged: changed,
            }}
        >
            {props.children}
        </DepoimentoContentContext.Provider>
    );
};

export default DepoimentoContentProvider;
