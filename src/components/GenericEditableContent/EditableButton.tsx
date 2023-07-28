import { FC, ReactElement } from "react";
import { SxProps } from "@mui/system";
import { Button, ButtonProps, Skeleton, Theme } from "@mui/material";
import { TextContent } from "../../types/aggerTypes";
import { createStyledAggerTheme } from "../../utils/Utility";
import parse from "html-react-parser";

interface EditableButtonProps extends ButtonProps {
    button: TextContent;
}

const styled = createStyledAggerTheme();

const StyledButton = styled(Button)(({ theme }) => ({
    "& p": {
        padding: 0,
        margin: 0,
    },
}));

export const EditableButton: FC<EditableButtonProps> = (props): ReactElement => {
    const button = props.button;

    const sxStyle: SxProps<Theme> = [
        ...(Array.isArray(button.style) ? button.style : [button.style]),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ];

    return (
        <StyledButton
            className="editable"
            {...props}
            id={button.googleTagManagerID ? button.googleTagManagerID : props.id}
            variant={button.style?.backgroundColor ? "contained" : "outlined"}
            sx={sxStyle}
        >
            {button.text === "" && <Skeleton />}
            {button.text !== "" && parse(button.text)}
        </StyledButton>
    );
};

export default EditableButton;
