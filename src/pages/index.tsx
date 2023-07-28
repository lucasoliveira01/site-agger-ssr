//next imports
import Image from "next/image";

//cra imports
import { FC, useState } from "react";
import { Box, GridProps, Stack } from "@mui/material";
import { Container } from "@mui/system";
import { backendHttp, useWindowSize } from "../utils/Utility";

import NavbarSection from "@/components/Navbar/NavbarSection";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import Logo from "@/images/logoRodape.webp";
import Selo from "@/images/selo.webp";

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

import CookieConsent from "react-cookie-consent";
import Link from "next/link";
import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType } from "next";
import { NavbarContent } from "@/components/Navbar/NavbarType";
import { ContatoContent } from "@/components/Contato/ContatoType";
import {
  SobreNosContent,
  SobreNosContentEditableNumber,
} from "@/components/SobreNos/SobreNosType";
import {
  DepoimentosContent,
  DepoimentosEditableDeposition,
} from "@/components/Depoimento/DepoimentosType";
import {
  NossasSolucoesContent,
  NossasSolucoesEditableSolution,
} from "@/components/NossasSolucoes/NossasSolucoesType";
import {
  FuncionalidadeContent,
  FuncionalidadeEditableFuncionality,
} from "@/components/Funcionalidade/FuncionalidadeType";
import { PlanoContent, PlanoEditablePlan } from "@/components/Plano/PlanoType";
import { EDITABLE_TYPES, PopUpContent, TextContent } from "@/types/aggerTypes";
import {
  FormModalContent,
  FormModalEditableForm,
} from "@/components/FormModal/FormModalType";
import ContatoSection from "@/components/Contato/ContatoSection";
import DepoimentosSection from "@/components/Depoimento/DepoimentosSection";
import FuncionalidadesSection from "@/components/Funcionalidade/FuncionalidadesSection";
import NossasSolucoesSection from "@/components/NossasSolucoes/NossasSolucoesSection";
import PlanosSection from "@/components/Plano/PlanosSection";
import SobreNosSection from "@/components/SobreNos/SobreNosSection";
import AppContentProvider from "@/components/Contexts/AppContentContext";

export default function Home({
  navbarContent,
  contatoContent,
  sobreNosContent,
  depoimentoContent,
  nossasSolucoesContent,
  funcionalidadeContent,
  planoContent,
  formModalContent,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  interface Props {
    contrate?: boolean;
    navbarContent: NavbarContent;
    contatoContent: ContatoContent;
    sobreNosContent: SobreNosContent;
    depoimentoContent: DepoimentosContent;
    nossasSolucoesContent: NossasSolucoesContent;
    funcionalidadeContent: FuncionalidadeContent;
    planoContent: PlanoContent;
    formModalContent: FormModalContent;
  }

  const Main: FC<Props> = (props) => {
    const [windowsWidth] = useWindowSize();
    const [mainWidthAvaliable, setMainWidthAvaliable] = useState<number>();
    const [mainMarginLeft, setMainMarginLeft] = useState(0);

    const gridContainerDefaultProps: GridProps = {
      container: true,
      rowGap: 6,
      justifyContent: "center",
      maxWidth: "xl",
      m: "auto",
    };

    return (
      <>
        <Box
          component="main"
          sx={{
            width: mainWidthAvaliable,
            margin: 0,
            marginLeft: `${mainMarginLeft}px`,
          }}
        >
          <Container disableGutters maxWidth={false} sx={{ width: "100%" }}>
            <NavbarSection
              navbarContent={
                props.navbarContent ?? {
                  texts: [],
                }
              }
            />

            {/** Contato section */}
            <ContatoSection
              gridDefaultProps={gridContainerDefaultProps}
              contatoContent={
                props.contatoContent ?? {
                  texts: [],
                  popUps: [],
                }
              }
            />

            {/** Sobre Nós section  */}
            <SobreNosSection
              gridDefaultProps={gridContainerDefaultProps}
              sobreNosContent={
                props.sobreNosContent ?? { texts: [], numbers: [] }
              }
            />

            {/** Depoimentos section */}
            <DepoimentosSection
              gridDefaultProps={gridContainerDefaultProps}
              depoimentoContent={
                props.depoimentoContent ?? { texts: [], depoimentos: [] }
              }
            />

            {/** Nossas Soluções section */}
            <NossasSolucoesSection
              gridDefaultProps={gridContainerDefaultProps}
              nossasSolucoesContent={
                props.nossasSolucoesContent ?? { solutions: [], texts: [] }
              }
            />

            {/** Funcionalidades section */}
            <FuncionalidadesSection
              gridDefaultProps={gridContainerDefaultProps}
              funcionalidadeContent={
                props.funcionalidadeContent ?? {
                  funcionalidades: [],
                  texts: [],
                }
              }
            />

            {/** Planos section */}
            <PlanosSection
              gridDefaultProps={gridContainerDefaultProps}
              planoContent={props.planoContent ?? { planos: [], texts: [] }}
              formModalContent={
                props.formModalContent ?? { forms: [], popUps: [] }
              }
            />
            {/* TODO: ENTENDER QUAL BREAKPOINT SERA USADO */}
            {/* <Container maxWidth="desktop"> */}
            <Container maxWidth="xl">
              <Box
                sx={{
                  display: { xs: "none", lg: "flex" },
                  mr: 1,
                  my: 2,
                  justifyContent: "space-between",
                }}
              >
                <Image src={Logo} width={210} height={100} alt="Agger logo" />

                <Box sx={{ display: "flex" }}>
                  <Image priority src={Selo} width={100} alt="Selo Agger" />
                  <Stack direction="row" alignItems="center" spacing={0} ml={2}>
                    <p
                      style={{
                        color: "#005b87",
                        fontWeight: "bold",
                        margin: "0 30px 0 30px",
                        fontFamily:
                          "Asap Regular,Asap Medium,Asap SemiBold,Asap Bold,K2D Thin,K2D ExtraLight,K2D Light,K2D Regular,K2D SemiBold,K2D Bold,K2D ExtraBold",
                        fontSize: "20px",
                      }}
                    >
                      SIGA-NOS
                    </p>

                    <Link
                      href="https://www.facebook.com/aggersistemas"
                      target="_blank"
                      rel="noopener"
                      style={{ cursor: "default" }}
                    >
                      <FacebookIcon
                        sx={{
                          cursor: "pointer",
                          width: "30px",
                          color: "primary",
                          transition: "0.5s transform ease",
                          "&:hover": { transform: "scale(1.1)" },
                        }}
                      />
                    </Link>
                    <Link
                      href="https://www.linkedin.com/company/aggersistemas/?original_referer=https%3A%2F%2Fagger.com.br%2F"
                      target="_blank"
                      rel="noopener"
                      style={{ cursor: "default" }}
                    >
                      <LinkedInIcon
                        sx={{
                          cursor: "pointer",
                          width: "30px",
                          color: "primary",
                          transition: "0.5s transform ease",
                          "&:hover": { transform: "scale(1.1)" },
                        }}
                      />
                    </Link>
                    <Link
                      href="https://www.instagram.com/aggersistemas/"
                      target="_blank"
                      rel="noopener"
                      style={{ cursor: "default" }}
                    >
                      <InstagramIcon
                        sx={{
                          cursor: "pointer",
                          width: "30px",
                          color: "primary",
                          transition: "0.5s transform ease",
                          "&:hover": { transform: "scale(1.1)" },
                        }}
                      />
                    </Link>
                  </Stack>
                </Box>
              </Box>
            </Container>
          </Container>
          <Box
            sx={{
              display: { xs: "none", lg: "block" },
              background: "lightgray",
              py: 0.1,
            }}
            alignItems="center"
            textAlign={"center"}
          >
            <p
              style={{
                fontSize: "20px",
                color: "#005b87",
                fontFamily:
                  "Asap Regular,Asap Medium,Asap SemiBold,Asap Bold,K2D Thin,K2D ExtraLight,K2D Light,K2D Regular,K2D SemiBold,K2D Bold,K2D ExtraBold",
              }}
              className="text-center"
            >
              ©2023 AGGER. ALL RIGHTS RESERVED | CNPJ 00.585.578/0001-57
            </p>
          </Box>

          <Box
            sx={{
              display: { xs: "block", lg: "none" },
              background: "lightgray",
              py: 0.1,
            }}
            alignItems="center"
            textAlign={"center"}
          >
            <p
              style={{
                fontSize: "12px",
                color: "#005b87",
                fontFamily:
                  "Asap Regular,Asap Medium,Asap SemiBold,Asap Bold,K2D Thin,K2D ExtraLight,K2D Light,K2D Regular,K2D SemiBold,K2D Bold,K2D ExtraBold",
              }}
              className="text-center"
            >
              ©2023 AGGER. ALL RIGHTS RESERVED | CNPJ 00.585.578/0001-57
            </p>
          </Box>
        </Box>

        {/* <CookieConsent
          location="bottom"
          buttonText="CIENTE"
          declineButtonText="REJEITAR"
          cookieName="cookieNotification"
          style={{
            fontFamily: "Asap Bold",
            background: "#005B87",
            color: "white",
            fontSize: "15px",
          }}
          buttonStyle={{
            fontFamily: "Asap Bold",
            color: "#003050",
            fontSize: "15px",
            padding: "15px 50px",
            borderRadius: "25px",
            fontWeight: "bold",
          }}
          declineButtonStyle={{
            fontFamily: "Asap Bold",
            color: "#003050",
            fontSize: "15px",
            padding: "15px 50px",
            borderRadius: "25px",
            fontWeight: "bold",
            background: "#FFD526",
          }}
        >
          <p style={{ fontSize: "16px" }}>
            Este site utiliza apenas cookies necessários, ou seja, aqueles sem
            os quais o site não realizará funções básicas ou operará
            corretamente. Para mais informações sobre o uso de dados pessoais,
            consulte nossa{" "}
            <a
              href="https://aggerinstala.blob.core.windows.net/docs/Declaracao_Privacidade.pdf"
              target="_blank"
              style={{ color: "white" }}
            >
              Declaração de Privacidade.
            </a>
          </p>
        </CookieConsent> */}
      </>
    );
  };

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY as string}
      language="pt-BR"
    >
      <AppContentProvider>
        {/* <BrowserRouter> */}
        <Main
          navbarContent={navbarContent}
          contatoContent={contatoContent}
          sobreNosContent={sobreNosContent}
          depoimentoContent={depoimentoContent}
          nossasSolucoesContent={nossasSolucoesContent}
          funcionalidadeContent={funcionalidadeContent}
          planoContent={planoContent}
          formModalContent={formModalContent}
        />
        {/* <Routes> */}
        {/* <Route path="/login" element={<LoginForm />}></Route> */}
        {/* </Routes> */}
        {/* </BrowserRouter> */}
      </AppContentProvider>
    </GoogleReCaptchaProvider>
  );
}

export const getServerSideProps: GetServerSideProps<{
  navbarContent: NavbarContent;
  contatoContent: ContatoContent;
  sobreNosContent: SobreNosContent;
  depoimentoContent: DepoimentosContent;
  nossasSolucoesContent: NossasSolucoesContent;
  funcionalidadeContent: FuncionalidadeContent;
  planoContent: PlanoContent;
  formModalContent: FormModalContent;
}> = async () => {
  var res = await backendHttp.get("/nav");

  // if (res.status === 200 && Array.isArray(res.data) && res.data.length) {
  const navbarContent = { texts: res.data };

  var res = await backendHttp.get("/contact");

  const filterNotPopUps = (item: TextContent | PopUpContent) => {
    return item.type !== EDITABLE_TYPES.POPUP;
  };

  const filterPopUps = (item: TextContent | PopUpContent) => {
    return item.type === EDITABLE_TYPES.POPUP;
  };

  const contatoContent = {
    texts: res.data.filter(filterNotPopUps),
    popUps: res.data.filter(filterPopUps),
  };

  const filterNotNumbers = (
    item: TextContent | SobreNosContentEditableNumber
  ) => {
    return item.type !== EDITABLE_TYPES.NUMERO;
  };

  const filterNumbers = (item: TextContent | SobreNosContentEditableNumber) => {
    return item.type === EDITABLE_TYPES.NUMERO;
  };

  var res = await backendHttp.get("/about-us");
  const sobreNosContent = {
    texts: res.data.filter(filterNotNumbers),
    numbers: res.data.filter(filterNumbers),
  };

  const filterNotDepoimentos = (
    item: TextContent | DepoimentosEditableDeposition
  ) => {
    return item.type !== EDITABLE_TYPES.DEPOIMENTO;
  };

  const filterDepoimentos = (
    item: TextContent | DepoimentosEditableDeposition
  ) => {
    return item.type === EDITABLE_TYPES.DEPOIMENTO;
  };

  var res = await backendHttp.get("/deposition");
  const depoimentoContent = {
    texts: res.data.filter(filterNotDepoimentos),
    depoimentos: res.data.filter(filterDepoimentos),
  };

  const filterNotSolucao = (
    item: TextContent | NossasSolucoesEditableSolution
  ) => {
    return item.type !== EDITABLE_TYPES.SOLUCAO;
  };

  const filterSolucoes = (
    item: TextContent | NossasSolucoesEditableSolution
  ) => {
    return item.type === EDITABLE_TYPES.SOLUCAO;
  };

  var res = await backendHttp.get("/solutions");
  const nossasSolucoesContent = {
    texts: res.data.filter(filterNotSolucao),
    solutions: res.data.filter(filterSolucoes),
  };

  const filterNotFuncionalidades = (
    item: TextContent | FuncionalidadeEditableFuncionality
  ) => {
    return item.type !== EDITABLE_TYPES.FUNCIONALIDADE;
  };

  const filterFuncionalidades = (
    item: TextContent | FuncionalidadeEditableFuncionality
  ) => {
    return item.type === EDITABLE_TYPES.FUNCIONALIDADE;
  };

  var res = await backendHttp.get("/functionality");
  const funcionalidadeContent = {
    texts: res.data.filter(filterNotFuncionalidades),
    funcionalidades: res.data.filter(filterFuncionalidades),
  };

  const filterNotPlano = (item: TextContent | PlanoEditablePlan) => {
    return item.type !== EDITABLE_TYPES.PLANO;
  };

  const filterPlano = (item: TextContent | PlanoEditablePlan) => {
    return item.type === EDITABLE_TYPES.PLANO;
  };

  var res = await backendHttp.get("/plan");
  const planoContent = {
    texts: res.data.filter(filterNotPlano),
    planos: res.data.filter(filterPlano),
  };

  const filterForm = (
    item: TextContent | PopUpContent | FormModalEditableForm
  ) => {
    return item.type === EDITABLE_TYPES.FORM;
  };

  var res = await backendHttp.get("/form-modal");
  const formModalContent = {
    popUps: res.data.filter(filterPopUps),
    forms: res.data.filter(filterForm),
  };

  return {
    props: {
      navbarContent,
      contatoContent,
      sobreNosContent,
      depoimentoContent,
      nossasSolucoesContent,
      funcionalidadeContent,
      planoContent,
      formModalContent,
    }
  };
};
