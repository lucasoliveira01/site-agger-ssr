import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  Hidden,
} from "@mui/material";
import AggerTheme from "../../../utils/AggerTheme";
import EditableTypography from "../../GenericEditableContent/EditableTypography";
import { FormModalEditableForm } from "../FormModalType";
import EditableFormModalDescription from "./EditableFormModalDescription";
import { backendHttp, useGetHtmlInnerText } from "../../../utils/Utility";
import Logo from "../../../images/logo-agger.webp";
import EditableContrateFormForm from "./EditableFormModalForm";
import { PlanoContent, SelectedPlanoInformation } from "../../Plano/PlanoType";
import Image from "next/image";

interface ipInformation {
  country_code: string;
  country_name: string;
  city: string;
  postal: string;
  latitude: number;
  longitude: number;
  IPv4: string;
  state: string;
}

interface Props {
  type: "hireAPI" | "contato";
  contrateFormEditableForm: FormModalEditableForm;
  selectedPlanoIndexInformation: SelectedPlanoInformation;
  planoContent: PlanoContent;
}

const EditableFormModal: FC<Props> = (props) => {
  const theme = useTheme();
  const upToDesktop = useMediaQuery(theme.breakpoints.up("xl"));
  const upToLaptop = useMediaQuery(theme.breakpoints.up("lg"));

  const [ipInformation, setIpInformation] = useState<ipInformation>();
  useEffect(() => {
    backendHttp.get("https://geolocation-db.com/json/").then((res) => {
      setIpInformation(res.data as ipInformation);
    });
  }, []);

  return (
    <Grid className="flex flex-col px-5 max-w-screen-lg mx-auto py-5 3xl:mt-8 3xl:max-w-screen-xl">
      <div className="flex flex-col md:flex justify-center">
        <Grid className="flex flex-col">
          <div className="mx-auto mb-3 3xl:mb-10 md:w-full">
            {upToLaptop && (
              <Divider
                sx={{
                  "::after, ::before": {
                    borderColor: AggerTheme.palette.primary.main,
                    borderWidth: "1px",
                  },
                }}
              >
                <EditableTypography
                  text={props.contrateFormEditableForm.title}
                />
              </Divider>
            )}
            {!upToLaptop && (
              <EditableTypography
                className="text-5xl pt-5"
                text={props.contrateFormEditableForm.title}
                textAlign="center"
              />
            )}
          </div>
        </Grid>
        <Grid className="flex flex-col md:flex-row md:px-10">
          <div className="mb-10 md:mb-0">
            <Grid>
              <Image
                className="w-60 m-auto my-5"
                src={Logo}
                width={250}
                alt="Logo Agger"
              />
            </Grid>
            <div className="flex flex-col gap-2">
              {upToDesktop
                ? props.contrateFormEditableForm.descriptions.map(
                    (description, index) => {
                      return (
                        <EditableFormModalDescription
                          key={index}
                          description={description}
                        />
                      );
                    }
                  )
                : props.contrateFormEditableForm.descriptions
                    .filter((item) => item.icon)
                    .map((description, index) => {
                      return (
                        <EditableFormModalDescription
                          key={index}
                          description={description}
                        />
                      );
                    })}
            </div>

            <Typography color="text.primary" variant="body1" hidden>
              Seu IP: {ipInformation?.IPv4}
            </Typography>
          </div>
          <EditableContrateFormForm
            planoContent={props.planoContent}
            type={props.type}
            selectedPlanoIndexInformation={props.selectedPlanoIndexInformation}
            submitButton={props.contrateFormEditableForm.submitButton}
            ipInformation={{
              IP: ipInformation?.IPv4 ? ipInformation?.IPv4 : "",
              countryName: ipInformation?.country_name
                ? ipInformation?.country_name
                : "",
            }}
          />
        </Grid>
        {!upToDesktop ?? (
          <div>
            {props.contrateFormEditableForm.descriptions
              .filter((item) => !item.icon)
              .map((description, index) => {
                return (
                  <EditableFormModalDescription
                    key={index}
                    description={description}
                  />
                );
              })}
          </div>
        )}
      </div>
    </Grid>
  );
};

export default EditableFormModal;
