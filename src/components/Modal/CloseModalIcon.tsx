import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { createStyledAggerTheme } from "../../utils/Utility";

const styled = createStyledAggerTheme();

const CloseModalIconStyled = styled(CloseIcon)(({ theme }) => ({
    cursor: "pointer",
    position: "absolute",
    right: "10px",
    top: "10px",
    transition: "color 0.3s ease",
    color: theme.palette.primary.main,
    "&:hover": { color: theme.palette.warning.main },
}));

interface Props {
    closeModal: () => void;
    color?: string;
}

const CloseModalIcon: FC<Props> = (props) => {
    return (
        <CloseModalIconStyled
            onClick={props.closeModal}
            sx={{ color: props.color ? props.color : null }}
        />
    );
};

export default CloseModalIcon;
