import { FC, ReactElement, useState } from "react";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { NossasSolucoesEditableSolution } from "./NossasSolucoesType";
import EditableTypography from "../GenericEditableContent/EditableTypography";
import EditableButton from "../GenericEditableContent/EditableButton";
import { Grid, Box, Modal, GridProps, useTheme } from "@mui/material";
import CenterModalBox from "../Modal/CenterModalBox";
import ResponsiveIframeWrapper from "../Utility/ResponsiveIframeWrapper";
import CloseModalIcon from "../Modal/CloseModalIcon";
import Image from "next/image";

interface Props {
  lastItem: boolean;
  gridProps: GridProps;
  solution: NossasSolucoesEditableSolution;
  imagePosition: "rgt" | "lft";
}

export const EditableSolucao: FC<Props> = (props): ReactElement => {
  const solution = props.solution;
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const SolucaoModal: FC = () => {
    return (
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <CenterModalBox p={2} sx={{ width: "50vw" }}>
          <CloseModalIcon closeModal={closeModal} />
          <Stack spacing={2} divider={<Divider />}>
            <EditableTypography
              sx={{ px: "10px", paddingTop: "10px" }}
              text={solution.modalTitle}
            />
            <ResponsiveIframeWrapper m={2}>
              <iframe
                style={{
                  overflow: "hidden",
                  border: 0,
                  alignSelf: "center",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                id="videogestor"
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="Gestor"
                width="640"
                height="360"
                src={solution.videoURL}
              ></iframe>
            </ResponsiveIframeWrapper>
          </Stack>
        </CenterModalBox>
      </Modal>
    );
  };

  const textOrder = props.imagePosition === "rgt" ? 1 : 2;
  const imageOrder = props.imagePosition === "rgt" ? 2 : 1;

  return (
    <>
      <SolucaoModal />
      <Grid
        container
        rowGap={{ xs: 6, md: 0 }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item md={6} order={{ xs: 2, md: textOrder }}>
          <Stack
            spacing={4}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <EditableTypography text={solution.title} />
            <EditableTypography text={solution.description} />
            <EditableButton
              disableElevation
              button={solution.knowMoreButton}
              sx={{
                padding: "20px 80px",
                borderRadius: "50px",
                alignSelf: { xs: "center", sm: "flex-start" },
              }}
              onClick={openModal}
            />
          </Stack>
        </Grid>
        <Grid item md={6} order={{ xs: 1, md: imageOrder }}>
          <Box
            width={1}
            display="flex"
            justifyContent={props.imagePosition === "rgt" ? "end" : "start"}
          >
            <Image
              width={450}
              src={require(`../../images/${solution.imageURL}`)}
              alt="imagen"
            />
          </Box>
        </Grid>
        {!props.lastItem && (
          <Grid item xs={12} order={3} py={theme.spacing(10)}>
            <Divider sx={{ borderBottomWidth: 2 }} />
          </Grid>
        )}
      </Grid>
    </>
  );
};
export default EditableSolucao;
