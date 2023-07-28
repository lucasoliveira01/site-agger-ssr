import React, { FC, forwardRef } from "react";
import { Box, BoxProps } from "@mui/material";
import { createStyledAggerTheme } from "../../utils/Utility";

interface Props extends BoxProps {}

const styled = createStyledAggerTheme();

const StyledBox = styled(Box)(({ theme }) => ({
    minHeight: "550px",
    display: "flex",
    alignContent: "center",
    padding: `${theme.spacing(4)} 0`,
    [theme.breakpoints.down("lg")]: {
        padding: `${theme.spacing(8)} ${theme.spacing(8)}`,
    },
    [theme.breakpoints.down("sm")]: {
        padding: `${theme.spacing(8)} ${theme.spacing(2)}`,
    },
})) as typeof Box;

const SectionBox: FC<Props> = forwardRef((props, ref) => {
    return <StyledBox component="section" {...props}></StyledBox>;
});

export default SectionBox;
