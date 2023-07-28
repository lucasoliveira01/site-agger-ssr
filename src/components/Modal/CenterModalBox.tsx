/* eslint-disable react/display-name */
import React, { FC, forwardRef } from "react";
import { Box, BoxProps } from "@mui/material";
import { createStyledAggerTheme } from "../../utils/Utility";

interface Props extends BoxProps {}

const styled = createStyledAggerTheme();

const CenterModalBox: FC<Props> = forwardRef(
    (props, ref) => {
    const StyledBox = styled(Box)(({ theme }) => ({
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        minWidth: "300px",
        backgroundColor: "#fff",
        border: "0.5px solid #fff",
        borderRadius: "10px",
    })) as typeof Box;

    return <StyledBox {...props}></StyledBox>;
});

export default CenterModalBox;
