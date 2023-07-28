import React, { FC } from "react";
import {
  Grid,
  GridProps,
  Box,
  BoxProps,
  useTheme,
} from "@mui/material";
import SectionBox from "../Utility/SectionBox";
import EditableTypography from "../GenericEditableContent/EditableTypography";
import EditableNumero from "./EditableNumero";
import { SobreNosContent } from "./SobreNosType";

interface Props extends BoxProps {
  gridDefaultProps: GridProps;
  sobreNosContent: SobreNosContent;
}

const SobreNosSection: FC<Props> = (props) => {
  const theme = useTheme();
  const { sobreNosContent } = props;

  return (
    <SectionBox id="sobre_nos_section">
      <Grid {...props.gridDefaultProps}>
        <Grid item xs={12}>
          <Box paddingBottom="25px">
            <EditableTypography text={sobreNosContent.texts[0]} />
          </Box>
          <Grid
            className="flex flex-col items-center md:grid grid-cols-3"
            container
            justifyContent="center"
            alignItems="flex-start"
            m="auto"
          >
            {sobreNosContent.numbers.map((number, index) => {
              return (
                <Grid key={index} item py={4} px={3}>
                  <EditableNumero numero={number} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </SectionBox>
  );
};

export default SobreNosSection;
