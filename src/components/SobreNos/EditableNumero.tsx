import { FC, ReactElement } from "react";
import { createStyledAggerTheme } from "../../utils/Utility";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { SobreNosContentEditableNumber } from "./SobreNosType";
import EditableTypography from "../GenericEditableContent/EditableTypography";
import { Skeleton } from "@mui/material";
import { useSobreNosContentContext } from "./SobreNosContentContext";

const styled = createStyledAggerTheme();

interface NumeroProps {
  numero: SobreNosContentEditableNumber;
}

const NumeroStack = styled(Stack)(() => ({
  justifyContent: "flex-start",
}));

const NumeroDivider = styled(Divider)(({ theme }) => ({
  borderBottomWidth: 2,
  borderBottomColor: theme.palette.primary.main,
}));

export const EditableNumero: FC<NumeroProps> = (props): ReactElement => {
  const numero = props.numero;

  const isSkeleton = false;

  return (
    <>
      {isSkeleton && (
        <Skeleton variant="rectangular" width="100%" height={180} />
      )}
      {!isSkeleton && (
        <NumeroStack
          className="editable"
          spacing={2}
          divider={<NumeroDivider />}
        >
          <EditableTypography whiteSpace="nowrap" text={numero.number} />
          <EditableTypography text={numero.text} />
        </NumeroStack>
      )}
    </>
  );
};
export default EditableNumero;
