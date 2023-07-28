import React, { createContext, FC, ReactElement, useState, useContext, useEffect } from "react";
import {
    NossasSolucoesContent,
    NossasSolucoesEditableSolution,
    nossasSolucoesSkeletonContent,
    isEditableNossasSolucoesType,
} from "./NossasSolucoesType";

import { TextContent, EDITABLE_TYPES } from "../../types/aggerTypes";
import { backendHttp } from "../../utils/Utility";

interface Props {
    children: ReactElement | ReactElement[];
}

export const NossasSolucoesContentContext = createContext({
    nossasSolucoesContent: nossasSolucoesSkeletonContent,
    updateNossasSolucoesContent: (arg0: NossasSolucoesContent) => {},
    nossasSolucoesChanged: false,
});

export const useNossasSolucoesContentContext = () => {
    return useContext(NossasSolucoesContentContext);
};

export const NossasSolucoesContentProvider: FC<Props> = (props) => {
    const [nossasSolucoesContent, setNossasSolucoesContent] = useState(
        nossasSolucoesSkeletonContent
    );
    const [changed, setChanged] = useState(false);

    const filterNotSolucao = (item: TextContent | NossasSolucoesEditableSolution) => {
        return item.type !== EDITABLE_TYPES.SOLUCAO;
    };

    const filterSolucoes = (item: TextContent | NossasSolucoesEditableSolution) => {
        return item.type === EDITABLE_TYPES.SOLUCAO;
    };

    useEffect(() => {
        backendHttp.get("/solutions").then((res) => {
            if (res.status === 200 && Array.isArray(res.data) && res.data.length) {
                const newNossasSolucoesContent = {
                    texts: res.data.filter(filterNotSolucao),
                    solutions: res.data.filter(filterSolucoes),
                };

                if (isEditableNossasSolucoesType(newNossasSolucoesContent)) {
                    setNossasSolucoesContent(newNossasSolucoesContent);
                }
            }
        });
    }, []);

    return (
        <NossasSolucoesContentContext.Provider
            value={{
                nossasSolucoesContent,
                updateNossasSolucoesContent: (nossasSolucoesContent) => {
                    setNossasSolucoesContent(nossasSolucoesContent);
                    setChanged(true);
                },
                nossasSolucoesChanged: changed,
            }}
        >
            {props.children}
        </NossasSolucoesContentContext.Provider>
    );
};

export default NossasSolucoesContentProvider;
