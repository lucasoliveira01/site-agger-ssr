import React, {
  FC,
  useState,
  MouseEvent,
  useEffect,
  ReactElement,
} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { EDITABLE_TYPES } from "../../types/aggerTypes";
import { createStyledAggerTheme } from "../../utils/Utility";

import { withTheme } from "@emotion/react";
import { Link, Stack, Theme, useMediaQuery } from "@mui/material";
import EditableLink from "../GenericEditableContent/EditableLink";
import EditableButton from "../GenericEditableContent/EditableButton";

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

import Logo from "../../images/logo-agger.webp";
import LogoAlternativo from "../../images/logo-alternativo-agger.webp";

import { useNavbarContentContext } from "./NavbarContentContext";
import Image from "next/image";
import { NavbarContent } from "./NavbarType";

interface Props {
  theme: Theme;
  navbarContent: NavbarContent;
}

const NavbarSection: FC<Props> = (props) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [pageTop, setPageTop] = useState(true);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const styled = createStyledAggerTheme();
  const StyledEditableLinkHover = styled(EditableLink)(({ theme }) => ({
    color: pageTop ? "#666666" : `${theme.palette.primary.contrastText}`,
    cursor: "pointer",
    "& p, & span": {},
    "&:hover": {
      "& p, & span": {
        color: pageTop
          ? `${theme.palette.primary.main}`
          : `${theme.palette.warning.main}`,
      },
      color: pageTop
        ? `${theme.palette.primary.main}`
        : `${theme.palette.warning.main}`,
    },
  }));

  const StyledEditableLink = styled(EditableLink)(({ theme }) => ({
    cursor: "pointer",
    "& p, & span": {
      color: "inherit",
    },
    "&:hover": {
      "& p, & span": {
        color: `${theme.palette.warning.main}`,
      },
    },
  }));

  const StyledLinkHover = styled(Link)(({ theme }) => ({
    cursor: "pointer",
    color: pageTop ? "#666666" : `${theme.palette.primary.contrastText}`,
    fontFamily: "Asap Regular",
    fontSize: "1.1rem",
    textDecoration: "none",
    "&:hover": {
      color: pageTop
        ? `${theme.palette.primary.main}`
        : `${theme.palette.warning.main}`,
    },
  }));

  const StyledEditableButtonHover = styled(EditableButton)(({ theme }) => ({
    marginLeft: theme.spacing(3),
    borderRadius: "25px",
    padding: `12px ${theme.spacing(4)}`,
    cursor: "pointer",
    backgroundColor: pageTop ? "none" : theme.palette.warning.main,
    color: pageTop ? "none" : "#004564",
    fontWeight: pageTop ? "none" : "bold",
    "&:hover": {
      color: pageTop ? theme.palette.primary.contrastText : "#fff",
      backgroundColor: pageTop ? "#004564" : "#ffd61e",
      "& p": {
        color: pageTop ? `${theme.palette.primary.contrastText}` : "#fff",
        backgroundColor: pageTop ? "#004564" : "#ffd61e",
      },
    },
    "& p": {
      zIndex: 2,
      backgroundColor: pageTop ? "none" : `${theme.palette.warning.main}`,
    },
    "& span": {
      backgroundColor: "none",
    },
  }));

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setPageTop(false);
      } else {
        setPageTop(true);
      }
    });
  }, []);

  const theme = props.theme;
  const upToLaptop = useMediaQuery(theme.breakpoints.up("lg"));

  const socialMedias = () => {
    return (
      <Stack direction="row" alignItems="center" spacing={0} ml={2}>
        <Link
          href="https://www.facebook.com/aggersistemas"
          target="_blank"
          rel="noopener"
          sx={{ cursor: "default" }}
        >
          <FacebookIcon
            sx={{
              cursor: "pointer",
              width: "20px",
              color: pageTop ? "primary" : "#fff",
              transition: "0.5s transform ease",
              "&:hover": { transform: "scale(1.1)" },
            }}
          />
        </Link>
        <Link
          href="https://www.linkedin.com/company/aggersistemas/?original_referer=https%3A%2F%2Fagger.com.br%2F"
          target="_blank"
          rel="noopener"
          sx={{ cursor: "default" }}
        >
          <LinkedInIcon
            sx={{
              cursor: "pointer",
              width: "20px",
              color: pageTop ? "primary" : "#fff",
              transition: "0.5s transform ease",
              "&:hover": { transform: "scale(1.1)" },
            }}
          />
        </Link>
        <Link
          href="https://www.instagram.com/aggersistemas/"
          target="_blank"
          rel="noopener"
          sx={{ cursor: "default" }}
        >
          <InstagramIcon
            sx={{
              cursor: "pointer",
              width: "20px",
              color: pageTop ? "primary" : "#fff",
              transition: "0.5s transform ease",
              "&:hover": { transform: "scale(1.1)" },
            }}
          />
        </Link>
      </Stack>
    );
  };

  const navbarLinks = () => {
    let navbarLinks: ReactElement[] = [];

    props.navbarContent.texts.map((n, index) => {
      if (n.type === EDITABLE_TYPES.BUTTON) {
        if (upToLaptop) {
          navbarLinks.push(
            <StyledEditableButtonHover
              className={pageTop ? "bg-aggerBlue" : "bg-aggerYellow"}
              key={index}
              disableElevation
              button={n}
              sx={{ marginLeft: 0 }}
              onClick={() => {
                window.open(n.href);
              }}
            />
          );
        } else {
          navbarLinks.push(
            <MenuItem
              key={index}
              onClick={handleCloseNavMenu}
              sx={{ paddingTop: "25px" }}
            >
              <StyledEditableButtonHover
                key={index}
                disableElevation
                button={n}
                sx={{ marginLeft: 0 }}
                onClick={() => {
                  window.open(n.href);
                }}
              />
            </MenuItem>
          );
        }
      } else {
        if (upToLaptop) {
          navbarLinks.push(
            <StyledEditableLinkHover key={index} link={n} whiteSpace="nowrap" />
          );
        } else {
          navbarLinks.push(
            <MenuItem key={index} onClick={handleCloseNavMenu}>
              <StyledEditableLink link={n} />
            </MenuItem>
          );
        }
      }

      return true;
    });

    return navbarLinks;
  };

  return (
    <>
      <AppBar
        position="sticky"
        id="navbar"
        elevation={pageTop ? 0 : 1}
        sx={{
          py: pageTop ? theme.spacing(2) : theme.spacing(3),
          background: pageTop ? "white" : theme.palette.primary.main,
          transition: "all 0.2s ease",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              className="hidden sm:flex mr-1"
              // sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }}
              alignItems="center"
            >
              <Image
                src={pageTop ? Logo : LogoAlternativo}
                width={150}
                className="w-[150px] min-w-[150px]"
                alt="Aegger logo"
                style={{ cursor: "pointer" }}
                onClick={() => window.scrollTo(0, 0)}
              />
              {socialMedias()}
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", lg: "none" },
                order: 1,
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color={pageTop ? "primary" : "secondary"}
              >
                <MenuIcon sx={{ width: "1.5em", height: "1.5em" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", lg: "none" },
                  "& .MuiPaper-root": { borderRadius: "15px" },
                }}
                disableScrollLock={true}
              >
                {navbarLinks()}
              </Menu>
            </Box>
            <Box className="flex sm:hidden mr-1 order-none">
              <Image
                src={pageTop ? Logo : LogoAlternativo}
                width={150}
                alt="Aegger logo"
                style={{ cursor: "pointer" }}
                onClick={() => window.scrollTo(0, 0)}
              />
              {socialMedias()}
            </Box>
            <div
              className="max-h-[52px] flex-grow hidden lg:flex justify-end gap-4 px-2 items-center"
              // sx={{
              //   flexGrow: 1,
              //   display: { xs: "none", lg: "flex" },
              //   justifyContent: "end",
              //   columnGap: theme.spacing(2),
              //   px: theme.spacing(2),
              //   alignItems: "center",
              // }}
            >
              {navbarLinks()}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default withTheme(NavbarSection);
