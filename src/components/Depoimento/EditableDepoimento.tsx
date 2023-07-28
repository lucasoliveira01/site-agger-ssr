import { FC, ReactElement } from "react";
import { createStyledAggerTheme } from "../../utils/Utility";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { DepoimentosEditableDeposition } from "./DepoimentosType";
import EditableTypography from "../GenericEditableContent/EditableTypography";
import { SxProps } from "@mui/system";

const styled = createStyledAggerTheme();

interface DepoimentoProps {
    depoimento: DepoimentosEditableDeposition;
    sx?: SxProps;
}

const DepoimentoPaper = styled(Paper)(({ theme }) => ({
    width: "280px",
    border: "1.5px solid #fff",
    borderRadius: "25px",
    background: "transparent",
    transition: "0.2s ease background",
    "&:hover": {
        background: "#fff",
        "& .editable, & .editable p, & .editable span": {
            color: `${theme.palette.primary.main}`,
            cursor: "default",
        },
    },
}));

export const EditableDepoimento: FC<DepoimentoProps> = (props): ReactElement => {
    const depoimento = props.depoimento;

    return (
        <DepoimentoPaper className="editable" sx={props.sx}>
            <Stack spacing={1} p={2}>
                <EditableTypography text={depoimento.name} />
                <EditableTypography text={depoimento.profession} />
                <EditableTypography text={depoimento.deposition} />
            </Stack>
        </DepoimentoPaper>
    );
};

export default EditableDepoimento;
