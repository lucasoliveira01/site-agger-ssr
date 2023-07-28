import React, { createContext, FC, ReactElement, useState, useContext, useEffect } from "react";
import {
    SobreNosContent,
    SobreNosContentEditableNumber,
    sobreNosSkeletonContent,
    isEditableSobreNosType,
} from "./SobreNosType";
import { backendHttp } from "../../utils/Utility";
import { EDITABLE_TYPES, TextContent } from "../../types/aggerTypes";

interface Props {
    children: ReactElement | ReactElement[];
}

export const SobreNosContentContext = createContext({
    sobreNosContent: sobreNosSkeletonContent,
    updateSobreNosContent: (arg0: SobreNosContent) => {},
    isSkeleton: true,
    sobreNosChanged: false,
});

export const useSobreNosContentContext = () => {
    return useContext(SobreNosContentContext);
};

export const SobreNosContentProvider: FC<Props> = (props) => {
    const [sobreNosContent, setSobreNosContent] = useState(sobreNosSkeletonContent);
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [changed, setChanged] = useState(false);

    const filterNotNumbers = (item: TextContent | SobreNosContentEditableNumber) => {
        return item.type !== EDITABLE_TYPES.NUMERO;
    };

    const filterNumbers = (item: TextContent | SobreNosContentEditableNumber) => {
        return item.type === EDITABLE_TYPES.NUMERO;
    };

    useEffect(() => {
        backendHttp.get("/about-us").then((res) => {
            if (res.status === 200 && Array.isArray(res.data) && res.data.length) {
                const newSobreNosContent = {
                    texts: res.data.filter(filterNotNumbers),
                    numbers: res.data.filter(filterNumbers),
                };

                if (isEditableSobreNosType(newSobreNosContent)) {
                    setSobreNosContent(newSobreNosContent);
                    setIsSkeleton(false);
                }
            }
        });
    }, []);

    return (
        <SobreNosContentContext.Provider
            value={{
                sobreNosContent,
                updateSobreNosContent: (sobreNosContent) => {
                    setSobreNosContent(sobreNosContent);
                    setChanged(true);
                },
                isSkeleton,
                sobreNosChanged: changed,
            }}
        >
            {props.children}
        </SobreNosContentContext.Provider>
    );
};

export default SobreNosContentProvider;
