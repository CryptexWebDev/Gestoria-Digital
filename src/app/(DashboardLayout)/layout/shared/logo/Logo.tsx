'use client'
import { useSelector } from "@/store/hooks"
import Link from "next/link"
import { styled } from "@mui/material/styles"
import { useTheme } from "@mui/material/styles"
import { AppState } from "@/store/store"
import Image from "next/image"

const LOGO_FULL_WIDTH = 180
const LOGO_FULL_HEIGHT = Math.round(LOGO_FULL_WIDTH * (137 / 783))
const LOGO_SMALL_SIZE = 40

export default function Logo() {
  const theme = useTheme()
  const customizer = useSelector((state: AppState) => state.customizer)
  const isDark = theme.palette.mode === "dark"
  const isCollapsed = customizer.isCollapse && !customizer.isSidebarHover

  const logoSrc = isCollapsed
    ? isDark
      ? "/images/logo-small-dark.svg"
      : "/images/logo-small.svg"
    : isDark
      ? "/images/logo-dark.svg"
      : "/images/logo.svg"

  const logoWidth = isCollapsed ? LOGO_SMALL_SIZE : LOGO_FULL_WIDTH
  const logoHeight = isCollapsed ? LOGO_SMALL_SIZE : LOGO_FULL_HEIGHT

  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: isCollapsed ? "40px" : "180px",
    overflow: "hidden",
    display: "block",
  }))

  if (customizer.activeDir === "ltr") {
    return (
      <LinkStyled href="/">
        <Image
          src={logoSrc}
          alt="logo"
          height={logoHeight}
          width={logoWidth}
          priority
          style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }}
        />
      </LinkStyled>
    )
  }

  return (
    <LinkStyled href="/">
      <Image
        src={logoSrc}
        alt="logo"
        height={logoHeight}
        width={logoWidth}
        priority
        style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }}
      />
    </LinkStyled>
  )
}
