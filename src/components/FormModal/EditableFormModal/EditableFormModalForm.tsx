"use client";
import { FC, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
  backendHttp,
  createStyledAggerTheme,
  useGetHtmlInnerText,
  isValidCNPJ,
  isValidCPF,
  validateCEP,
} from "../../../utils/Utility";
import FormikTextField from "../../FormikTextField/FormikTextField";
import {
  Box,
  CircularProgress,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditableButton from "../../GenericEditableContent/EditableButton";
import { TextContent } from "../../../types/aggerTypes";
import {
  PlanoEditableLicence,
  PlanoEditablePlan,
  PLANO_HIRE_API_REFERENCE,
  SelectedPlanoInformation,
  PlanoContent,
} from "../../Plano/PlanoType";
import axios, { AxiosError } from "axios";
import AlertDialog from "../../Modal/AlertDialog";
import EditableTypography from "../../GenericEditableContent/EditableTypography";
import { useFormModalContentContext } from "../FormModalContext";
import { usePlanoContentContext } from "../../Plano/PlanoContentContext";
import { useContatoContentContext } from "../../Contato/ContatoContentContext";
import { v4 as uuidv4 } from "uuid";

const styled = createStyledAggerTheme();

interface Props {
  type: "hireAPI" | "contato";
  selectedPlanoIndexInformation: SelectedPlanoInformation;
  submitButton: TextContent;
  ipInformation: { IP: string; countryName: string };
  planoContent: PlanoContent;
}

const EditableFormModalForm: FC<Props> = (props) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const executeGoogleReCaptcha = async () => {
    let passedScore = false;

    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return false;
    }

    const token = await executeRecaptcha("formulario_contratacao");
    try {
      const captchaResponse = await backendHttp.post("/google/recaptcha", {
        token,
      });
      passedScore = captchaResponse.data;
    } catch (e) {
      passedScore = false;
    }

    return passedScore;
  };

  const { planoContent } = props;

  const plan =
    planoContent.planos[props.selectedPlanoIndexInformation.planIndex];
  const planSelectedLicence =
    plan.licences[props.selectedPlanoIndexInformation.licenceIndex];
  const planPrice = planSelectedLicence.price.text;
  const { formModalContent, hideFormModal } = useFormModalContentContext();
  const [alertDialog, setAlertDialog] = useState<string | undefined>();

  const handleAlertDialogOpen = (open: boolean, alertName: string) => {
    if (open) {
      setAlertDialog(alertName);
    } else {
      setAlertDialog(undefined);
      hideFormModal();
    }
  };

  return (
    <>
      {props.type === "hireAPI" && (
        <EditableContrateFormHireAPI
          executeReCaptcha={executeGoogleReCaptcha}
          submitButton={props.submitButton}
          plan={plan}
          planSelectedLicence={planSelectedLicence}
          planPrice={planPrice}
          ipInformation={props.ipInformation}
          openNewClientDialog={() => setAlertDialog("newClient")}
          openOldClientDialog={() => setAlertDialog("oldClient")}
          openErrorDialog={() => setAlertDialog("error")}
        />
      )}
      {props.type === "contato" && (
        <EditableContrateFormContato
          executeReCaptcha={executeGoogleReCaptcha}
          submitButton={props.submitButton}
          plan={plan}
          planSelectedLicence={planSelectedLicence}
          planPrice={planPrice}
          ipInformation={props.ipInformation}
          openNewClientDialog={() => setAlertDialog("newClient")}
          openOldClientDialog={() => setAlertDialog("oldClient")}
          openErrorDialog={() => setAlertDialog("error")}
        />
      )}
      <AlertDialog
        dialogTitle={
          <EditableTypography text={formModalContent.popUps[0].title} />
        }
        dialogContent={
          <EditableTypography text={formModalContent.popUps[0].content} />
        }
        open={alertDialog === "newClient"}
        setOpen={(open) => handleAlertDialogOpen(open, "newClient")}
      />
      <AlertDialog
        dialogTitle={
          <EditableTypography text={formModalContent.popUps[1].title} />
        }
        dialogContent={
          <EditableTypography text={formModalContent.popUps[1].content} />
        }
        open={alertDialog === "oldClient"}
        setOpen={(open) => handleAlertDialogOpen(open, "oldClient")}
      />
      <AlertDialog
        dialogTitle={
          <EditableTypography text={formModalContent.popUps[2].title} />
        }
        dialogContent={
          <EditableTypography text={formModalContent.popUps[2].content} />
        }
        open={alertDialog === "error"}
        setOpen={(open) => handleAlertDialogOpen(open, "error")}
      />
    </>
  );
};

const StyledFormikTextField = styled(FormikTextField)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: theme.palette.text.primary,
  },
}));

const StyledButton = styled(EditableButton)(({ theme }) => ({
  width: "100%",
  padding: "10px 0",
  borderRadius: "25px",
  "&:hover": {
    backgroundColor: `${theme.palette.warning.main}`,
    color: "#fff",
  },
  "&:hover p, &:hover span": {
    color: "#fff",
  },
  "&:disabled": {
    backgroundColor: "#fbbb2173",
  },
}));

interface ContrateFormProps {
  executeReCaptcha: () => Promise<boolean>;
  submitButton: TextContent;
  plan: PlanoEditablePlan;
  planSelectedLicence: PlanoEditableLicence;
  planPrice: string;
  ipInformation: { IP: string; countryName: string };
  openNewClientDialog: () => void;
  openOldClientDialog: () => void;
  openErrorDialog: () => void;
}

interface CEPInformation {
  address: string;
  district: string;
  city: string;
  state: string;
}

const createYupSchemaContrate = (
  type: "hireAPI" | "contato",
  setCEPInformation?: (arg0: undefined | CEPInformation) => void,
  recommendation?: String
) => {
  Yup.addMethod(Yup.string, "CPFCNPJ", function (cpfErrorMsg, cnpjErrorMsg) {
    return this.test("document", cpfErrorMsg, function (value) {
      const { path, createError } = this;

      const length = value?.toString().length || 0;
      const stringfiedValue = value?.toString() || "";

      if (length < 11) {
        return createError({ message: cpfErrorMsg, path });
      } else if (length === 11) {
        return isValidCPF(stringfiedValue)
          ? true
          : createError({ message: cpfErrorMsg, path });
      } else if (length > 11 && length < 14) {
        return createError({ message: cnpjErrorMsg, path });
      } else if (length === 14) {
        return isValidCNPJ(stringfiedValue)
          ? true
          : createError({ message: cnpjErrorMsg, path });
      } else {
        return false;
      }
    });
  });

  Yup.addMethod(Yup.string, "CEP", function (cepErrorMsg) {
    return this.test("cep", cepErrorMsg, async function (value) {
      const length = value?.toString().length || 0;

      if (value && length === 8) {
        const cepInformation = await validateCEP(value);

        if (!cepInformation.erro) {
          setCEPInformation!({
            address: cepInformation.logradouro,
            district: cepInformation.bairro,
            city: cepInformation.localidade,
            state: cepInformation.uf,
          });

          return true;
        }
      }
      setCEPInformation!(undefined);
      return false;
    });
  });

  let formValidade;
  if (type === "hireAPI") {
    if (recommendation && recommendation === "Outro") {
      formValidade = Yup.object().shape({
        price: Yup.number()
          .transform((_, value) => {
            if (value.includes(".")) {
              return null;
            }
            return +value.replace(/,/, ".");
          })
          .required("Obrigatório")
          .typeError("O preço só poder conter numeros"),
        name: Yup.string().required("Obrigatório"),
        document: Yup.string()
          .required("Obrigatório")
          .CPFCNPJ("CPF invalido", "CNPJ invalido"),
        contactName: Yup.string().required("Obrigatório"),
        email: Yup.string().email("Email invalido").required("Obrigatório"),
        telephone: Yup.number().integer(),
        cellphone: Yup.number().integer().required("Obrigatório"),
        website: Yup.string(),
        cep: Yup.string().required("Obrigatório").CEP("CEP invalido"),
        address: Yup.string().required("Obrigatório"),
        addressNumber: Yup.number().integer().required("Obrigatório"),
        complement: Yup.string(),
        district: Yup.string().required("Obrigatório"),
        city: Yup.string().required("Obrigatório"),
        state: Yup.string().required("Obrigatório"),
        recommendation: Yup.string().required("Obrigatório"),
        textRecommendation: Yup.string().required("Obrigatório"),
      });
    } else {
      formValidade = Yup.object().shape({
        price: Yup.number()
          .transform((_, value) => {
            if (value.includes(".")) {
              return null;
            }
            return +value.replace(/,/, ".");
          })
          .required("Obrigatório")
          .typeError("O preço só poder conter numeros"),
        name: Yup.string().required("Obrigatório"),
        document: Yup.string()
          .required("Obrigatório")
          .CPFCNPJ("CPF invalido", "CNPJ invalido"),
        contactName: Yup.string().required("Obrigatório"),
        email: Yup.string().email("Email invalido").required("Obrigatório"),
        telephone: Yup.number().integer(),
        cellphone: Yup.number().integer().required("Obrigatório"),
        website: Yup.string(),
        cep: Yup.string().required("Obrigatório").CEP("CEP invalido"),
        address: Yup.string().required("Obrigatório"),
        addressNumber: Yup.number().integer().required("Obrigatório"),
        complement: Yup.string(),
        district: Yup.string().required("Obrigatório"),
        city: Yup.string().required("Obrigatório"),
        state: Yup.string().required("Obrigatório"),
        recommendation: Yup.string().required("Obrigatório"),
      });
    }
  } else {
    formValidade = Yup.object().shape({
      corretor: Yup.string().required("Obrigatório"),
      name: Yup.string().required("Obrigatório"),
      document: Yup.string()
        .required("Obrigatório")
        .CPFCNPJ("CPF invalido", "CNPJ invalido"),
      contactName: Yup.string().required("Obrigatório"),
      email: Yup.string().email("Email invalido").required("Obrigatório"),
      telephone: Yup.number().integer(),
      cellphone: Yup.number().integer().required("Obrigatório"),
      website: Yup.string(),
      bestContactForm: Yup.string(),
      observation: Yup.string(),
    });
  }

  return formValidade;
};

//HIRE API
interface ContrateFormHireAPIValues {
  price: number | string;
  name: string;
  document: string;
  contactName: string;
  email: string;
  telephone: number | string;
  cellphone: number | string;
  website: string;
  cep: string;
  address: string;
  addressNumber: number | string;
  complement: string;
  district: string;
  city: string;
  state: string;
  recommendation: string;
  textRecommendation: string;
}

const EditableContrateFormHireAPI: FC<ContrateFormProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [CEPInformation, setCEPInformation] = useState<CEPInformation>();

  const [Recommendation, setRecommendation] = useState<String>("");

  const theme = useTheme();
  const upToLaptop = useMediaQuery(theme.breakpoints.up("lg"));
  const { clearContatoFormInformation, getContatoFormInformation } =
    useContatoContentContext();

  const contatoInformation = getContatoFormInformation();

  const initialValuesHireAPI: ContrateFormHireAPIValues = {
    price: props.planPrice,
    name: contatoInformation.name,
    document: "",
    contactName: contatoInformation.name,
    email: contatoInformation.email,
    telephone: "",
    cellphone: contatoInformation.personal_phone,
    website: "",
    cep: "",
    address: "",
    addressNumber: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    recommendation: "",
    textRecommendation: "",
  };

  const handleRecommendation = (e: any) => {
    setRecommendation(e.target.value);
  };

  const onSubmitHireAPI = async (values: ContrateFormHireAPIValues) => {
    setLoading(true);

    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window.dataLayer.push({
      event: "purchase",
      ecommerce: {
        transaction_id: uuidv4(),
        currency: "BRL",
        tax: 0,
        shipping: 0,
        value: values.price,
        items: [
          {
            price: values.price,
            name: `${props.plan.key} - ${props.planSelectedLicence.description}`,
            document: values.document,
            contactName: values.contactName,
            email: values.email,
            telephone: values.telephone,
            cellphone: values.cellphone,
            website: values.website,
            cep: values.cep,
            address: values.address,
            addressNumber: values.addressNumber,
            complement: values.complement,
            district: values.district,
            city: values.city,
            state: values.state,
            recommendation: values.recommendation,
            textRecommendation: values.textRecommendation,
          },
        ],
      },
    });

    // const passedScore = await props.executeReCaptcha();
    const passedScore = true; //await props.executeReCaptcha();
    let hired = false;
    let error = false;

    if (passedScore) {
      //HIRE API
      const recommendationTxt =
        Recommendation === "Outro" ? values.textRecommendation : Recommendation;

      if (props.plan.hireApiType !== undefined) {
        try {
          const swaggerPackage = {
            name: values.name,
            document: values.document,
            contact: values.contactName,
            postcode: values.cep,
            street: values.address,
            adjunct: values.complement,
            number: values.addressNumber,
            country: values.district,
            city: values.city,
            state: values.state,
            cellNumber: values.cellphone,
            phoneNumber: values.telephone,
            mail: values.email,
            ip: props.ipInformation.IP,
            site: values.website,
            recommendation: recommendationTxt,
            package: {
              type: PLANO_HIRE_API_REFERENCE.MONTHLY,
              product: props.plan.hireApiType,
              licenses: props.planSelectedLicence.licenceQuantity,
              price: parseFloat(props.planPrice.replace(",", ".")),
            },
          };

          await backendHttp.post("/hireAPI/hire", swaggerPackage);
        } catch (e) {
          const apiError = e as Error | AxiosError;

          if (axios.isAxiosError(apiError)) {
            if (apiError.response?.status !== 200) {
              error = true;
            }
            const axiosError = apiError.response?.data as {
              error?: string;
              hired?: boolean;
            };

            if (axiosError.hired) {
              hired = true;
            }
          }
        }
      }

      //RD STATION
      const productName = props.plan.key
        .toLocaleLowerCase()
        .replaceAll(" ", "_");
      const licence = props.planSelectedLicence.description;

      await backendHttp.post("/rdstation/conversion", {
        conversion_identifier: "formulario de contratação",
        email: values.email,
        cf_nome_da_corretora: values.name,
        cf_nome_para_contato: values.contactName,
        cf_cnpj_cpf: values.document,
        personal_phone: values.telephone,
        mobile_phone: values.cellphone,
        cf_site_da_corretora: values.website,
        cf_produto: productName,
        cf_licenca: licence,
        cf_valor_licenca: values.price.toString(),
        cf_cep: values.cep,
        state: values.state,
        city: values.city,
        cf_bairro: values.district,
        cf_endereco: values.address,
        cf_numero: values.addressNumber,
        cf_complemento: values.complement,
        country: props.ipInformation.countryName,
        tags: [
          "site",
          "formulário_contratação",
          hired ? "já_é_cliente" : "nova_compra",
          productName,
          `${productName}_${props.planSelectedLicence.licenceQuantity}_licenças`,
        ],
      });

      if (error) props.openErrorDialog();
      else {
        if (hired) {
          props.openOldClientDialog();
        } else {
          props.openNewClientDialog();
        }
      }

      clearContatoFormInformation();
    }

    setLoading(false);
  };

  return (
    <Formik
      initialValues={initialValuesHireAPI}
      onSubmit={onSubmitHireAPI}
      validationSchema={() =>
        createYupSchemaContrate("hireAPI", setCEPInformation, Recommendation)
      }
    >
      {(formikProps) => (
        <Form className="w-full">
          <Grid
            container
            justifyContent={upToLaptop ? "end" : "center"}
            m="auto"
            columnGap={2}
            sx={{ p: { xs: 0, sm: 4 } }}
          >
            <Grid item xs={12} sm={5}>
              <Stack spacing={2}>
                <StyledFormikTextField
                  size="small"
                  label="Preço"
                  name="price"
                  fullWidth
                  variant="outlined"
                  formated="BrazilMoney"
                  disabled
                />
                <StyledFormikTextField
                  size="small"
                  label="Nome da Corretora"
                  name="name"
                  fullWidth
                  variant="outlined"
                />
                <StyledFormikTextField
                  size="small"
                  label="CPF/CNPJ"
                  name="document"
                  fullWidth
                  variant="outlined"
                  formated="CPF/CNPJ"
                  mask="_"
                />
                <StyledFormikTextField
                  size="small"
                  label="Nome para Contato"
                  name="contactName"
                  fullWidth
                  variant="outlined"
                />
                <StyledFormikTextField
                  size="small"
                  label="E-mail"
                  name="email"
                  fullWidth
                  variant="outlined"
                />
                <StyledFormikTextField
                  size="small"
                  label="Telefone"
                  name="telephone"
                  fullWidth
                  variant="outlined"
                  formated="BrazilTelephone"
                  mask="_"
                />
                <StyledFormikTextField
                  size="small"
                  label="Celular"
                  name="cellphone"
                  fullWidth
                  variant="outlined"
                  formated="BrazilCellphone"
                  mask="_"
                />

                <StyledFormikTextField
                  size="small"
                  label="Como você nos conheceu?"
                  name="recommendation"
                  fullWidth
                  variant="outlined"
                  select
                  options={[
                    "Redes sociais da Agger",
                    "Grupos de Facebook",
                    "Google",
                    "Mala Direta",
                    "Revistas/Jornais",
                    "Indicação",
                    "Webinar",
                    "Outro",
                  ]}
                  defaultValue=""
                  onChange={handleRecommendation}
                  value={Recommendation}
                />
                {Recommendation === "Outro" && (
                  <StyledFormikTextField
                    size="small"
                    label="Como você nos conheceu?"
                    name="textRecommendation"
                    fullWidth
                    variant="outlined"
                  />
                )}
              </Stack>
            </Grid>

            <Grid item xs={12} sm={5} sx={{ py: { xs: 4, sm: 0 } }}>
              <Stack spacing={2}>
                <StyledFormikTextField
                  size="small"
                  label="Site da Corretora"
                  name="website"
                  fullWidth
                  variant="outlined"
                />

                <StyledFormikTextField
                  size="small"
                  label="CEP"
                  name="cep"
                  fullWidth
                  variant="outlined"
                  formated="CEP"
                  mask="_"
                  onBlur={() => {
                    if (CEPInformation) {
                      formikProps.setFieldValue(
                        "address",
                        CEPInformation.address
                      );
                      formikProps.setFieldValue(
                        "district",
                        CEPInformation.district
                      );
                      formikProps.setFieldValue("city", CEPInformation.city);
                      formikProps.setFieldValue("state", CEPInformation.state);
                    }
                  }}
                />
                <StyledFormikTextField
                  size="small"
                  label="Endereço"
                  name="address"
                  fullWidth
                  variant="outlined"
                />
                <StyledFormikTextField
                  size="small"
                  label="Número"
                  name="addressNumber"
                  fullWidth
                  variant="outlined"
                />
                <StyledFormikTextField
                  size="small"
                  label="Complemento"
                  name="complement"
                  fullWidth
                  variant="outlined"
                />
                <StyledFormikTextField
                  size="small"
                  label="Bairro"
                  name="district"
                  fullWidth
                  variant="outlined"
                />
                <StyledFormikTextField
                  size="small"
                  label="Cidade"
                  name="city"
                  fullWidth
                  variant="outlined"
                />
                <StyledFormikTextField
                  size="small"
                  label="Estado"
                  name="state"
                  fullWidth
                  variant="outlined"
                  select
                  options={[
                    "AC",
                    "AL",
                    "AP",
                    "AM",
                    "BA",
                    "CE",
                    "DF",
                    "ES",
                    "GO",
                    "MA",
                    "MT",
                    "MS",
                    "MG",
                    "PA",
                    "PB",
                    "PR",
                    "PE",
                    "PI",
                    "RJ",
                    "RN",
                    "RS",
                    "RO",
                    "RR",
                    "SC",
                    "SP",
                    "SE",
                    "TO",
                  ]}
                />
                <Box
                  paddingTop={6}
                  position="relative"
                  sx={{ display: { xs: "none", sm: "inherit" } }}
                >
                  <StyledButton
                    className="bg-aggerBlue"
                    type="submit"
                    button={props.submitButton}
                    disabled={loading}
                  />
                  {loading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: "primary",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                        display: { xs: "none", sm: "inherit" },
                      }}
                    />
                  )}
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sx={{ display: { xs: "inherit", sm: "none" } }}>
              <Box position="relative" width={1}>
                <StyledButton
                  className="bg-aggerBlue"
                  type="submit"
                  button={props.submitButton}
                  disabled={loading}
                />
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: "primary",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                      display: { xs: "none", sm: "inherit" },
                    }}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

//CONTATO
interface ContrateFormContatoValues {
  licenceQuantity: number;
  name: string;
  document: string;
  contactName: string;
  email: string;
  telephone: number | string;
  cellphone: number | string;
  website: string;
  bestContactForm: string;
  corretor: string;
  observation: string;
}

const EditableContrateFormContato: FC<ContrateFormProps> = (props) => {
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const upToLaptop = useMediaQuery(theme.breakpoints.up("lg"));
  const { clearContatoFormInformation, getContatoFormInformation } =
    useContatoContentContext();

  const contatoInformation = getContatoFormInformation();

  const initialValuesContato: ContrateFormContatoValues = {
    licenceQuantity: 0,
    name: contatoInformation.name,
    document: "",
    contactName: contatoInformation.name,
    email: contatoInformation.email,
    telephone: "",
    cellphone: contatoInformation.personal_phone,
    website: "",
    bestContactForm: "Telefone",
    corretor: "",
    observation: "",
  };

  const onSubmitContato = async (values: ContrateFormContatoValues) => {
    setLoading(true);

    // const passedScore = await props.executeReCaptcha();
    const passedScore = true; //await props.executeReCaptcha();

    if (passedScore) {
      //RD STATION
      await backendHttp.post("/rdstation/conversion", {
        conversion_identifier: "formulário de contato",
        email: values.email,
        cf_nome_da_corretora: values.name,
        cf_nome_para_contato: values.contactName,
        cf_cnpj_cpf: values.document,
        personal_phone: values.telephone,
        mobile_phone: values.cellphone,
        country: props.ipInformation.countryName,
        cf_site_da_corretora: values.website,
        cf_melhor_forma_de_contato: "Telefone",
        cf_corretora: values.corretor,
        cf_descricao_do_contato: values.observation,
        tags: [
          "site",
          "formulário_contato",
          "quero_um_contato",
          `corretora_${values.corretor}`,
        ],
      });

      props.openNewClientDialog();
      clearContatoFormInformation();
    }

    setLoading(false);
  };

  return (
    <Formik
      initialValues={initialValuesContato}
      onSubmit={onSubmitContato}
      validationSchema={() => createYupSchemaContrate("contato")}
    >
      <Form>
        <Grid
          container
          justifyContent={upToLaptop ? "end" : "center"}
          m="auto"
          columnGap={2}
          sx={{ p: { xs: 0, sm: 4 } }}
        >
          <Grid item xs={12} sm={5}>
            <Stack spacing={2}>
              <StyledFormikTextField
                size="small"
                label="Sou Corretor"
                name="corretor"
                fullWidth
                variant="outlined"
                select
                options={["SIM", "NÃO"]}
              />

              <StyledFormikTextField
                size="small"
                label="Nome da Empresa"
                name="name"
                fullWidth
                variant="outlined"
              />
              <StyledFormikTextField
                size="small"
                label="CPF/CNPJ"
                name="document"
                fullWidth
                variant="outlined"
                formated="CPF/CNPJ"
                mask="_"
              />
              <StyledFormikTextField
                size="small"
                label="Nome para Contato"
                name="contactName"
                fullWidth
                variant="outlined"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={5} sx={{ py: { xs: 4, sm: 0 } }}>
            <Stack spacing={2}>
              <StyledFormikTextField
                size="small"
                label="E-mail"
                name="email"
                fullWidth
                variant="outlined"
              />

              <StyledFormikTextField
                size="small"
                label="Telefone"
                name="telephone"
                fullWidth
                variant="outlined"
                formated="BrazilTelephone"
                mask="_"
              />
              <StyledFormikTextField
                size="small"
                label="Celular"
                name="cellphone"
                fullWidth
                variant="outlined"
                formated="BrazilCellphone"
                mask="_"
              />
              <StyledFormikTextField
                size="small"
                label="Site da Empresa"
                name="website"
                fullWidth
                variant="outlined"
              />
            </Stack>
          </Grid>
          <Grid
            m="auto"
            sx={{ marginTop: "12px", textAlign: "center", width: "100%" }}
          >
            <Stack spacing={2}>
              <StyledFormikTextField
                size="medium"
                label="Descreva com poucas palavras a sua solicitação"
                name="observation"
                fullWidth
                rows={4}
                variant="outlined"
              />
              <Box
                position="relative"
                sx={{ display: { xs: "none", sm: "inherit" } }}
              >
                <StyledButton
                  className="bg-aggerBlue"
                  type="submit"
                  button={props.submitButton}
                  disabled={loading}
                />
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: "primary",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                      display: { xs: "none", sm: "inherit" },
                    }}
                  />
                )}
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ display: { xs: "inherit", sm: "none" } }}>
            <Box position="relative" width={1}>
              <StyledButton
                className="bg-aggerBlue"
                type="submit"
                button={props.submitButton}
                disabled={loading}
              /> 
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "primary",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default EditableFormModalForm;
