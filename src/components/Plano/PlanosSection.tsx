import {
  Grid,
  GridProps,
  BoxProps,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { FC, useState } from "react";
import SectionBox from "../Utility/SectionBox";
import EditableTypography from "../GenericEditableContent/EditableTypography";
import EditablePlano from "./EditablePlano";
import { usePlanoContentContext } from "./PlanoContentContext";
import FormModal from "../FormModal/FormModalSection";
import { PlanoContent, SelectedPlanoInformation } from "./PlanoType";
import {
  createStyledAggerTheme,
  useGetHtmlInnerText,
} from "../../utils/Utility";
import ContatoButton from "./ContatoButton";
import {
  EDITABLE_TYPES,
  HTML_TEXT_TAGS,
  TextContent,
} from "../../types/aggerTypes";
import { margin } from "@mui/system";
import { FormModalContent } from "../FormModal/FormModalType";

interface Props extends BoxProps {
  gridDefaultProps: GridProps;
  planoContent: PlanoContent;
  formModalContent: FormModalContent;
}

const PlanosSection: FC<Props> = (props) => {
  const { planoContent } = props;
  

  const [selectedPlanoIndexInformation, settSelectedPlanoIndexInformation] =
    useState<SelectedPlanoInformation>({
      planIndex: 0,
      licenceIndex: 0,
    });

  const theme = useTheme();
  const upToLaptop = useMediaQuery(theme.breakpoints.up("lg"));
  const upToPlanoMobile = useMediaQuery(theme.breakpoints.up("md"));

  const contatoText: TextContent = {
    text: "Ficou com alguma dúvida? Clique e entre em contato.",
    type: EDITABLE_TYPES.TEXT,
    htmlTag: HTML_TEXT_TAGS.H5,
    key: "Placeholder Título",
    style: {
      textAlign: "start",
      margin: "auto",
      color: "white",
    },
  };

  const contato2Text: TextContent = {
    text: "Fornecedores, seguradoras e demais categorias, clique e entre em contato.",
    type: EDITABLE_TYPES.TEXT,
    htmlTag: HTML_TEXT_TAGS.P,
    key: "Placeholder Título",
    style: {
      textAlign: "start",
      margin: "auto",
      color: "white",
    },
  };

  return (
    <>
      <FormModal
        selectedPlanoIndexInformation={selectedPlanoIndexInformation}
        planoContent={planoContent}
      />
      <SectionBox
        component="section"
        bgcolor="primary.main"
        id="planos_section"
        py={theme.spacing(10)}
        marginTop={theme.spacing(4)}
      >
        <Grid
          {...props.gridDefaultProps}
          sx={{
            justifyContent: { xs: "flex-start", lg: "center" },
          }}
          columnSpacing={upToPlanoMobile ? 3 : 0}
        >
          <Grid item xs={12} paddingTop={theme.spacing(4)}>
            <Stack spacing={2}>
              <EditableTypography text={planoContent.texts[0]} />
              <EditableTypography text={planoContent.texts[1]} />
            </Stack>
          </Grid>

          <Grid
            container
            item
            className="flex flex-col items-center md:grid grid-cols-3"
            columnSpacing={upToPlanoMobile ? 3 : 0}
            sx={{ marginLeft: { xl: "-48px" } }}
          >
            {planoContent.planos.map((plano, index) => {
              const handleSelectPlan = (licenceIndex: number) => {
                settSelectedPlanoIndexInformation({
                  planIndex: index,
                  licenceIndex,
                });
              };

              const planoPrice = plano.licences[0].price.text;

              if (planoPrice !== "0") {
                return (
                  <Grid
                    key={index}
                    item
                    sx={{
                      height: {
                        xs: "auto",
                        md: "50%",
                        lg: "100%",
                      },
                      boxSizing: "border-box",
                      marginTop: { xs: "25px", lg: 0 },
                    }}
                  >
                    <EditablePlano
                      plano={plano}
                      onSelectPlan={handleSelectPlan}
                    />
                  </Grid>
                );
              }
            })}
          </Grid>

          <Grid item width="100%" alignItems="start">
            <EditableTypography sx={{}} text={contatoText} />

            <EditableTypography
              sx={{
                marginBottom: 3,
              }}
              text={contato2Text}
            />

            {planoContent.planos.map((plano, index) => {
              const handleSelectPlan = (licenceIndex: number) => {
                settSelectedPlanoIndexInformation({
                  planIndex: index,
                  licenceIndex,
                });
              };
              const planoPrice = useGetHtmlInnerText(
                plano.licences[0].price.text
              );

              if (planoPrice === "0") {
                return (
                  <ContatoButton
                    key={plano.title.text}
                    plano={plano}
                    onSelectPlan={handleSelectPlan}
                  />
                );
              }
            })}
          </Grid>
        </Grid>
      </SectionBox>
    </>
  );
};

export default PlanosSection;
