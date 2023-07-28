import { Stack } from "@mui/material";
import { FC, ReactElement } from "react";
import { TextContent } from "../../../types/aggerTypes";
import EditableTypography from "../../GenericEditableContent/EditableTypography";

import CancelamentoIcon from "../../../images/cancelamento-gratis-agger.svg";
import FidelidadeIcon from "../../../images/sem-fidelidade-agger.svg";
import PagamentoIcon from "../../../images/primeiro-pagamento-para-30-dias-agger.svg";
import { FORM_MODAL_SVG_TYPES } from "../FormModalType";
import Image from "next/image";

interface Props {
  description: TextContent;
}

const SVGMap = {
  [FORM_MODAL_SVG_TYPES.PAGAMENTO]: PagamentoIcon,
  [FORM_MODAL_SVG_TYPES.FIDELIDADE]: FidelidadeIcon,
  [FORM_MODAL_SVG_TYPES.CANCELAMENTO]: CancelamentoIcon,
};

const EditableFormModalDescription: FC<Props> = (props) => {
  if (props.description.icon) {
    const Icon = SVGMap[props.description.icon as keyof typeof SVGMap];
    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <Image
        src={Icon}
        alt="Icone Formulário"
          style={{
            width: "70px",
            minWidth: "70px",
            height: "60px",
            minHeight: "60px",
          }}
        />
        <EditableTypography text={props.description}></EditableTypography>
      </Stack>
    );
  } else {
    return <EditableTypography text={props.description}></EditableTypography>;
  }
};

export default EditableFormModalDescription;
