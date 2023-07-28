import React, { FC } from "react";
import { Grid, GridProps, BoxProps, useTheme, useMediaQuery } from "@mui/material";
import EditableTypography from "../GenericEditableContent/EditableTypography";
import EditableFuncionalidade from "./EditableFuncionalidade";

import { useFuncionalidadeContentContext } from "./FuncionalidadeContentContext";
import SectionBox from "../Utility/SectionBox";
import { FuncionalidadeContent } from "./FuncionalidadeType";

interface Props extends BoxProps {
    gridDefaultProps: GridProps;
    funcionalidadeContent: FuncionalidadeContent;
}

const FuncionalidadesSection: FC<Props> = (props) => {
    const theme = useTheme();
    const upToPlanoMobile = useMediaQuery(theme.breakpoints.up("md"));

    const { funcionalidadeContent } = props;
    
    return (
        <SectionBox
            component="section"
            id="funcionalidades_section"
            py={{ xs: theme.spacing(10), md: theme.spacing(14) }}
        >
            <Grid
                {...props.gridDefaultProps}
                columnSpacing={4}
                sx={{
                    width: { xs: "100%", sm: "auto" },
                    justifyContent: { xs: "space-between", md: "flex-start" },
                }}
            >
                <Grid
                    item
                    xs={12}
                    textAlign="center"
                    sx={{
                        paddingLeft: upToPlanoMobile ? "inherit" : "0 !important",
                    }}
                >
                    <EditableTypography text={funcionalidadeContent.texts[0]} />
                    <EditableTypography
                        text={funcionalidadeContent.texts[1]}
                        sx={{ paddingTop: "20px" }}
                    />
                </Grid>
                {funcionalidadeContent.funcionalidades.map((funcionalidade, index) => {
                    return (
                        <Grid
                            key={index}
                            item
                            sm={6}
                            md={4}
                            sx={{
                                marginLeft: {
                                    xs: `-${theme.spacing(4)}`,
                                    sm: index % 2 === 0 ? `-${theme.spacing(3)}` : 0,
                                    md: index % 3 === 0 ? `-${theme.spacing(3)}` : 0,
                                },
                            }}
                        >
                            <EditableFuncionalidade funcionalidade={funcionalidade} />
                        </Grid>
                    );
                })}
            </Grid>
        </SectionBox>
    );
};

export default FuncionalidadesSection;
