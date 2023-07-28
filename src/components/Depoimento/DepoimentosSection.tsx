import React, { FC, ReactElement, useEffect, useState } from "react";
import {
  Grid as MuiGrid,
  GridProps,
  BoxProps,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SectionBox from "../Utility/SectionBox";

import EditableTypography from "../GenericEditableContent/EditableTypography";
import EditableDepoimento from "./EditableDepoimento";

import { useDepoimentoContentContext } from "./DepoimentoContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { createStyledAggerTheme } from "../../utils/Utility";
import { DepoimentosContent } from "./DepoimentosType";
interface Props extends BoxProps {
  gridDefaultProps: GridProps;
  depoimentoContent: DepoimentosContent;
}

const styled = createStyledAggerTheme();

const DepoimentosSection: FC<Props> = (props) => {
  const theme = useTheme();
  const upToLaptop = useMediaQuery(theme.breakpoints.up("lg"));
  const upToPlanoMobile = useMediaQuery(theme.breakpoints.up("md"));
  const { depoimentoContent } = props;

  const slidesItems = () => {
    let slides: ReactElement[] = [];

    depoimentoContent.depoimentos.map((depoimento, index) => {
      slides.push(
        <SwiperSlide key={index} className="mt-10">
          <EditableDepoimento key={index} depoimento={depoimento} />
        </SwiperSlide>
      );
      return true;
    });

    return slides;
  };

  const [swiperHeight, setSwiperHeight] = useState(0);

  useEffect(() => {
    if (upToPlanoMobile) {
      const slides = document.querySelectorAll(".swiper-slide");
      let height = 0;

      slides.forEach((slide, index) => {
        height += slide.clientHeight;
      });

      height =
        height / 2 +
        document.querySelector(".swiper-slide:last-child")!.clientHeight;

      setSwiperHeight(height);
    }
  }, [depoimentoContent, upToPlanoMobile]);

  const StyledFormikTextField = styled(Swiper)(({ theme }) => ({
    width: "100%",
    height: "100%",
    "& .swiper-wrapper": {
      height: swiperHeight === 0 ? "auto" : `${swiperHeight}px !important`,
    },
  }));

  return (
    <SectionBox
      component="section"
      bgcolor="primary.main"
      sx={{ overflow: "hidden" }}
      id="depoimentos_section"
      py={2}
      {...props}
    >
      <MuiGrid {...props.gridDefaultProps}>
        <MuiGrid
          item
          xs={upToLaptop ? 8 : 12}
          sx={{
            overflow: "hidden",
            maxHeight: "500px",
            order: upToLaptop ? 0 : 1,
            alignItems: upToLaptop ? "inherit" : "center",
          }}
        >
          <StyledFormikTextField
            direction="horizontal"
            slidesPerView={upToPlanoMobile ? 2.5 : 1}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            navigation={false}
            centeredSlides
            modules={[Autoplay]}
          >
            {slidesItems()}
          </StyledFormikTextField>
        </MuiGrid>
        <MuiGrid
          item
          xs={upToLaptop ? 4 : 12}
          display="flex"
          justifyContent="center"
          sx={{
            flexDirection: "column",
            alignItems: upToLaptop ? "inherit" : "center",
          }}
        >
          <EditableTypography
            text={depoimentoContent.texts[0]}
            sx={{
              "& p, & span": {
                textAlign: upToPlanoMobile ? "inherit" : "center",
                paddingBottom: "20px",
              },
            }}
          />
          <EditableTypography
            text={depoimentoContent.texts[1]}
            sx={{
              "& p, & span": {
                textAlign: upToPlanoMobile ? "inherit" : "center",
              },
            }}
          />
        </MuiGrid>
      </MuiGrid>
    </SectionBox>
  );
};

export default DepoimentosSection;
