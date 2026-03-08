'use client'
import { useSelector } from "@/store/hooks"
import Link from "next/link"
import { styled } from "@mui/material/styles"
import { useTheme } from "@mui/material/styles"
import { AppState } from "@/store/store"
import Image from "next/image"

export default function Logo() {
  const theme = useTheme()
  const customizer = useSelector((state: AppState) => state.customizer)
  const isDark = theme.palette.mode === "dark"
  const logoSrc = isDark ? "/images/logo-dark.svg" : "/images/logo.svg"

  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse && !customizer.isSidebarHover ? "40px" : "180px",
    overflow: "hidden",
    display: "block",
  }))

  const logoWidth = 180
  const logoHeight = Math.round(logoWidth * (137 / 783))

  if (customizer.activeDir === "ltr") {
    return (
      <LinkStyled href="/">
        <Image
          src={logoSrc}
          alt="logo"
          height={logoHeight}
          width={logoWidth}
          priority
          style={{ objectFit: "contain" }}
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
        style={{ objectFit: "contain" }}
      />
    </LinkStyled>
  )
}
