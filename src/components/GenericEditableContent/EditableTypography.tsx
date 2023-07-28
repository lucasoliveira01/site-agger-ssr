import { ElementType, FC, ReactElement } from "react";
import { createStyledAggerTheme } from "../../utils/Utility";
import { SxProps } from "@mui/system";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { Skeleton, Theme } from "@mui/material";
import { TextContent, HTML_TEXT_TAGS } from "../../types/aggerTypes";
import parse from "html-react-parser";

const styled = createStyledAggerTheme();

interface Component {
  component?: string | ElementType;
}

const StyledTypography = styled(Typography)<Component>(({ theme }) => ({
  cursor: "default",
  whiteSpace: "inherit",
  wordBreak: "break-word",
  "& p": {
    padding: 0,
    margin: 0,
  },
  "& span": {
    display: "block",
  },
  "& ul": {
    marginTop: '10px',
    listStyle: "disc",
    padding: "0 30px",
  },
  "& ul li": {
    marginTop: "3px",
  },
}));

interface EditableTextProps extends TypographyProps {
  text: TextContent;
}

export const EditableTypography: FC<EditableTextProps> = (
  props
): ReactElement => {
  const text = props.text;
  const variant = text.htmlTag;
  const sxStyle: SxProps<Theme> = [
    ...(Array.isArray(text.style) ? text.style : [text.style]),
    ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
  ];

  return (
    <StyledTypography
      className="editable"
      {...props}
      sx={sxStyle}
      variant={variant}
      component={variant === HTML_TEXT_TAGS.P ? "div" : variant}
    >
      {text.text === "" && <Skeleton />}
      {text.text !== "" && parse(text.text)}
    </StyledTypography>
  );
};

export default EditableTypography;
