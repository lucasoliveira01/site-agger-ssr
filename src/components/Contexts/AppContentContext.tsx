import React, { FC, ReactElement } from "react";

// import NavbarContentProvider from "../Navbar/NavbarContentContext";
// import ContatoContentProvider from "../Contato/ContatoContentContext";
import NossasSolucoesContentProvider from "../NossasSolucoes/NossasSolucoesContentContext";
import SobreNosContentProvider from "../SobreNos/SobreNosContentContext";
import DepoimentoContentProvider from "../Depoimento/DepoimentoContext";
import FuncionalidadeContentProvider from "../Funcionalidade/FuncionalidadeContentContext";
import PlanoContentProvider from "../Plano/PlanoContentContext";
import FormModalProvider from "../FormModal/FormModalContext";

interface Props {
    children: ReactElement | ReactElement[];
}

export const AppContentProvider: FC<Props> = (props) => {
    return (
        // <PlanoContentProvider>
            <FormModalProvider>
                {/* <FuncionalidadeContentProvider> */}
                    {/* <NossasSolucoesContentProvider> */}
                        {/* <DepoimentoContentProvider> */}
                            {/* <SobreNosContentProvider> */}
                                {/* <ContatoContentProvider> */}
                                        {/* <NavbarContentProvider> */}
                                            {props.children}
                                        {/* </NavbarContentProvider> */}
                                {/* </ContatoContentProvider> */}
                            {/* </SobreNosContentProvider> */}
                        {/* </DepoimentoContentProvider> */}
                    {/* </NossasSolucoesContentProvider> */}
                {/* </FuncionalidadeContentProvider> */}
            </FormModalProvider>
        // </PlanoContentProvider>
    );
};

export default AppContentProvider;
