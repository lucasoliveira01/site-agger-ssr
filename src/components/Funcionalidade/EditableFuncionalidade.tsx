import { FC, ReactElement, useState } from "react";
import { createStyledAggerTheme } from "../../utils/Utility";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import {
  FuncionalidadeEditableFuncionality,
  FUNCIONALIDADE_SVG_TYPES,
} from "./FuncionalidadeType";
import AggerTheme from "../../utils/AggerTheme";

import CenterModalBox from "../Modal/CenterModalBox";
import EditableTypography from "../GenericEditableContent/EditableTypography";
import EditableButton from "../GenericEditableContent/EditableButton";

//ICONS
import FuncionalidadeCelularIcon from "../../images/icone-agilize-seus-calculos-pelo-celular-agger.svg";
import FuncionalidadeCelularIconPopup from "../../images/icone-agilize-seus-calculos-pelo-celular-agger-popup.svg";
import FuncionalidadeDocumentoIcon from "../../images/icone-agilize-seus-documentos-agger.svg";
import FuncionalidadeDocumentoIconPopup from "../../images/icone-agilize-seus-documentos-agger-popup.svg";
import FuncionalidadeDocumentoEletronicoIcon from "../../images/icone-assine-seus-documentos-eletronicamente-agger.svg";
import FuncionalidadeDocumentoEletronicoIconPopup from "../../images/icone-assine-seus-documentos-eletronicamente-agger-popup.svg";
import FuncionalidadePDFIcon from "../../images/icone-importe-seus-pdfs-agger.svg";
import FuncionalidadePDFIconPopup from "../../images/icone-importe-seus-pdfs-agger-popup.svg";
import FuncionalidadeDadosClienteIcon from "../../images/icone-tenha-os-dados-dos-clientes-e-da-sua-corretora-agger.svg";
import FuncionalidadeDadosClienteIconPopup from "../../images/icone-tenha-os-dados-dos-clientes-e-da-sua-corretora-agger-popup.svg";
import EditableLink from "../GenericEditableContent/EditableLink";
import { Box } from "@mui/material";
import CloseModalIcon from "../Modal/CloseModalIcon";
import Image from "next/image";

const styled = createStyledAggerTheme();

interface FuncionalidadeProps {
  funcionalidade: FuncionalidadeEditableFuncionality;
}

interface FuncionalidadeSvgMapType {
  default: {
    [key: string]: any;
  };
  popedUp: {
    [key: string]: any;
  };
}

const FuncionalidadeSvgMap: FuncionalidadeSvgMapType = {
  default: {
    [FUNCIONALIDADE_SVG_TYPES.DOCUMENTO]: FuncionalidadeDocumentoIcon,
    [FUNCIONALIDADE_SVG_TYPES.PDF]: FuncionalidadePDFIcon,
    [FUNCIONALIDADE_SVG_TYPES.CELULAR]: FuncionalidadeCelularIcon,
    [FUNCIONALIDADE_SVG_TYPES.DADOS_CLIENTES]: FuncionalidadeDadosClienteIcon,
    [FUNCIONALIDADE_SVG_TYPES.DOCUMENTO_ELETRONICO]:
      FuncionalidadeDocumentoEletronicoIcon,
  },
  popedUp: {
    [FUNCIONALIDADE_SVG_TYPES.DOCUMENTO]: FuncionalidadeDocumentoIconPopup,
    [FUNCIONALIDADE_SVG_TYPES.PDF]: FuncionalidadePDFIconPopup,
    [FUNCIONALIDADE_SVG_TYPES.CELULAR]: FuncionalidadeCelularIconPopup,
    [FUNCIONALIDADE_SVG_TYPES.DADOS_CLIENTES]:
      FuncionalidadeDadosClienteIconPopup,
    [FUNCIONALIDADE_SVG_TYPES.DOCUMENTO_ELETRONICO]:
      FuncionalidadeDocumentoEletronicoIconPopup,
  },
};

const FuncionalidadePaper = styled(Paper)(({ theme }) => ({
  position: "relative",
  display: "flex",
  borderRadius: "10px",
  justifyContent: "center",
  "&:hover": {
    outline: `2.5px solid ${theme.palette.warning.main}`,
  },
}));

const FuncionalidadeStack = styled(Stack)(({ theme }) => ({
  position: "relative",
  height: "300px",
  overflow: "hidden",
  WebkitMaskImage: "linear-gradient(180deg, #000 75%, transparent );",
}));

const CenterModalBoxFuncionalidade = styled(CenterModalBox)(({ theme }) => ({
  minWidth: "230px",
  maxWidth: "500px",
  backgroundColor: theme.palette.primary.main,
  border: "0.5px solid #fff",
  borderRadius: "25px",
  padding: theme.spacing(4),
  paddingTop: theme.spacing(6),
})) as typeof Box;

export const EditableFuncionalidade: FC<FuncionalidadeProps> = (
  props
): ReactElement => {
  const [open, setOpen] = useState(false);

  const funcionalidade = props.funcionalidade;
  const DefaultIcon = FuncionalidadeSvgMap.default[funcionalidade.icon];
  const PopedupIcon = FuncionalidadeSvgMap.popedUp[funcionalidade.icon];

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <FuncionalidadePaper elevation={11}>
        <FuncionalidadeStack spacing={2} py={2} px={4}>
          <Image alt="Icon" src={DefaultIcon} width={70} height={60} />

          <EditableTypography text={funcionalidade.title} />
          <EditableTypography text={funcionalidade.description} />
        </FuncionalidadeStack>
        <EditableButton
          button={funcionalidade.popUpButton}
          className="bg-aggerBlue"
          sx={{
            position: "absolute",
            bottom: "-20px",
            borderRadius: "25px",
            padding: "8px 28px",
            "&:hover": {
              backgroundColor: AggerTheme.palette.warning.main,
            },
          }}
          onClick={openModal}
        />
      </FuncionalidadePaper>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <CenterModalBoxFuncionalidade>
          <CloseModalIcon closeModal={closeModal} color="white" />
          <Stack spacing={2}>
            <Image
              alt="Icon"
              src={PopedupIcon}
              width={50}
              height={50}
              style={{
                position: "absolute",
                top: "-25px",
                width: "50px",
                minWidth: "50px",
                height: "50px",
                minHeight: "50px",
              }}
            />
            <EditableTypography
              text={funcionalidade.title}
              sx={{
                "& p, & span, & ul": {
                  color: `${AggerTheme.palette.primary.contrastText}`,
                },
              }}
            />
            <EditableTypography
              text={funcionalidade.description}
              sx={{
                "& p, & span, & ul": {
                  color: `${AggerTheme.palette.primary.contrastText}`,
                },
              }}
            />
            {funcionalidade.knowMoreLink.href && (
              <EditableLink
                onClick={closeModal}
                sx={{ cursor: "pointer" }}
                link={funcionalidade.knowMoreLink}
                target="_blank"
              />
            )}
          </Stack>
        </CenterModalBoxFuncionalidade>
      </Modal>
    </>
  );
};

export default EditableFuncionalidade;
