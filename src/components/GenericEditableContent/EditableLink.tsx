import { FC, MouseEvent, ReactElement } from "react";
import { createStyledAggerTheme, scrollTo } from "../../utils/Utility";
import { SxProps } from "@mui/system";
import Link, { LinkProps } from "@mui/material/Link";
import { Skeleton, Theme } from "@mui/material";
import { TextContent } from "../../types/aggerTypes";
import parse from "html-react-parser";

interface EditableLinkProps extends LinkProps {
    link: TextContent;
}

const styled = createStyledAggerTheme();

const StyledLink = styled(Link)(({ theme }) => ({
    "& p": {
        padding: 0,
        margin: 0,
    },
}));

export const EditableLink: FC<EditableLinkProps> = (props): ReactElement => {
    const link = props.link;
    const variant = link.htmlTag as any;

    const sxStyle: SxProps<Theme> = [
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
        ...(Array.isArray(link.style) ? link.style : [link.style]),
    ];

    const handleOnClick = (
        e:
            | MouseEvent<HTMLSpanElement, globalThis.MouseEvent>
            | MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
    ) => {
        if (link.href?.indexOf("#") === 0) {
            scrollTo(link.href);
        }

        if (props.onClick) {
            props.onClick(e);
        }
    };

    return (
        <StyledLink
            className="editable"
            {...props}
            id={link.googleTagManagerID ? link.googleTagManagerID : props.id}
            underline="none"
            href={link.href?.indexOf("#") === 0 ? undefined : link.href}
            onClick={handleOnClick}
            sx={sxStyle}
            variant={variant}
        >
            {link.text === "" && <Skeleton />}
            {link.text !== "" && parse(link.text)}
        </StyledLink>
    );
};

export default EditableLink;
