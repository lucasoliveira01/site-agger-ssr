import { FC, ReactElement } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, Divider } from "@mui/material";
import CloseModalIcon from "./CloseModalIcon";
interface Props {
    dialogTitle: ReactElement;
    dialogContent: ReactElement;
    dialogAction?: ReactElement;
    open: boolean;
    setOpen: (arg0: boolean) => void;
}

const AlertDialog: FC<Props> = (props) => {
    const closeDialog = () => {
        props.setOpen(false);
    };

    return (
        <Dialog open={props.open} onClose={closeDialog} disableScrollLock={true}>
            <CloseModalIcon closeModal={closeDialog} />
            <DialogTitle sx={{ paddingRight: "50px" }}>{props.dialogTitle}</DialogTitle>
            <Divider />
            <DialogContent>{props.dialogContent}</DialogContent>
            {props.dialogAction && (
                <DialogActions sx={{ paddingBottom: 2 }}>{props.dialogAction}</DialogActions>
            )}
        </Dialog>
    );
};

export default AlertDialog;
