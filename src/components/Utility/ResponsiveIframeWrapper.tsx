import React, { FC, forwardRef } from "react";
import { Box, BoxProps } from "@mui/material";
import { createStyledAggerTheme } from "../../utils/Utility";

interface Props extends BoxProps {}
const styled = createStyledAggerTheme();

const StyledBox = styled(Box)(({ theme }) => ({
    position: "relative",
    paddingBottom: "56.25%",
    overflow: "hidden",
})) as typeof Box;

const ResponsiveIframeWrapper: FC<Props> = forwardRef((props, ref) => {
    return <StyledBox {...props}></StyledBox>;
});

export default ResponsiveIframeWrapper;
