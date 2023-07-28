import React, { createContext, FC, ReactElement, useState, useContext, useEffect } from "react";
import { ContatoContent, contatoSkeletonContent, isEditableContatoType } from "./ContatoType";
import { EDITABLE_TYPES, TextContent, PopUpContent } from "../../types/aggerTypes";
import { backendHttp } from "../../utils/Utility";

interface Props {
    children: ReactElement | ReactElement[];
}

interface ContatoInformation {
    name: string;
    email: string;
    personal_phone: string;
}

export const ContatoContentContext = createContext({
    contatoContent: contatoSkeletonContent,
    updateContatoContent: (arg0: ContatoContent) => {},
    saveContatoFormInformation: (arg0: ContatoInformation) => {},
    clearContatoFormInformation: () => {},
    getContatoFormInformation: () => {
        return { name: "", email: "", personal_phone: "" };
    },
    contatoChanged: false,
});

export const useContatoContentContext = () => {
    return useContext(ContatoContentContext);
};

export const ContatoContentProvider: FC<Props> = (props) => {
    const [contatoContent, setContatoContent] = useState(contatoSkeletonContent);
    const [changed, setChanged] = useState(false);

    const filterNotPopUps = (item: TextContent | PopUpContent) => {
        return item.type !== EDITABLE_TYPES.POPUP;
    };

    const filterPopUps = (item: TextContent | PopUpContent) => {
        return item.type === EDITABLE_TYPES.POPUP;
    };

    useEffect(() => {
        backendHttp.get("/contact").then((res) => {
            if (res.status === 200 && Array.isArray(res.data) && res.data.length) {
                const newContatoContent = {
                    texts: res.data.filter(filterNotPopUps),
                    popUps: res.data.filter(filterPopUps),
                };

                if (isEditableContatoType(newContatoContent)) {
                    setContatoContent(newContatoContent);
                }
            }
        });
    }, []);

    const saveContatoFormInformation = (contatoInformation: ContatoInformation) => {
        localStorage.setItem("contatoFormInformation", JSON.stringify(contatoInformation));
    };

    const clearContatoFormInformation = () => {
        localStorage.removeItem("contatoFormInformation");
    };

    const getContatoFormInformation = () => {
        const storageData = localStorage.getItem("contatoFormInformation");
        return storageData ? JSON.parse(storageData) : { name: "", email: "", personal_phone: "" };
    };

    return (
        <ContatoContentContext.Provider
            value={{
                contatoContent,
                updateContatoContent: (contatoContent) => {
                    setContatoContent(contatoContent);
                    setChanged(true);
                },
                saveContatoFormInformation,
                clearContatoFormInformation,
                getContatoFormInformation,
                contatoChanged: changed,
            }}
        >
            {props.children}
        </ContatoContentContext.Provider>
    );
};

export default ContatoContentProvider;
