import { FC, useState } from "react";

import { Grid, useTheme } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import {
  createStyledAggerTheme,
  useGetHtmlInnerText,
} from "../../utils/Utility";
import AggerTheme from "../../utils/AggerTheme";

import EditableButton from "../GenericEditableContent/EditableButton";
import {
  EDITABLE_TYPES,
  HTML_TEXT_TAGS,
  TextContent,
} from "../../types/aggerTypes";

import {
  PlanoContent,
  PlanoEditablePlan,
  PLANO_HIRE_API_REFERENCE,
} from "./PlanoType";
import { SelectedPlanoInformation } from "./PlanoType";

import { useFormModalContentContext } from "../FormModal/FormModalContext";

const styled = createStyledAggerTheme();

interface ContatoProps {
  plano: PlanoEditablePlan;
  onSelectPlan: (licenceIndex: number) => void;
}

const StyledEditableButton = styled(EditableButton)(({ theme }) => ({
  padding: "15px 50px",
  borderRadius: "25px",

  "&&&.MuiButtonBase-root": {
    backgroundColor: `${AggerTheme.palette.primary.light}`,
  },
  "&:hover": {
    backgroundColor: `${AggerTheme.palette.primary.light}`,
    color: "#fff",
  },
  "&:hover p, &:hover span": {
    color: "#fff",
  },
}));

export const ContatoButton: FC<ContatoProps> = (props) => {
  const theme = useTheme();

  const [selectedLicence, setSelectedLicence] = useState(0);

  const [selectedPlanoIndexInformation, settSelectedPlanoIndexInformation] =
    useState<SelectedPlanoInformation>({
      planIndex: 0,
      licenceIndex: 0,
    });

  const { showFormModal } = useFormModalContentContext();

  const plano = props.plano;

  const handleContrate = () => {
    props.onSelectPlan(selectedLicence);
    showFormModal();
  };

  return (
    <>
      <StyledEditableButton
        button={plano.requestContactButton}
        onClick={handleContrate}
        disableElevation
      />
    </>
  );
};

export default ContatoButton;
