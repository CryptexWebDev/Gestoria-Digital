'use client';
import React from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { Icon } from "@iconify/react";

const StyledAnimationFeature = styled(Box)(() => ({
    width: '100%',
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    display: 'flex',
    gap: '24px'
}));

const StyledAnimationContent = styled(Box)(() => ({
    animation: 'marquee 45s linear infinite'
}));

const StyledAnimationContent2 = styled(Box)(() => ({
    animation: 'marquee2 45s linear infinite'
}));

const slide1 = [
    {
        color: 'primary',
        icon: "tabler:wand",
        text: '6 Theme Colors'
    },
    {
        color: 'secondary',
        icon: "tabler:shield-lock",
        text: "NextAuth",
    },
    {
        color: 'error',
        icon: "tabler:brand-firebase",
        text: "Firebase",
    },
    {
        color: 'warning',
        icon: "tabler:archive",
        text: "90+ Page Templates",
    },
    {
        color: 'success',
        icon: "tabler:adjustments",
        text: "45+ UI Components",
    },
    {
        color: 'info',
        icon: "tabler:building-carousel",
        text: "Matrial Ui",
    },
    {
        color: 'primary',
        icon: "tabler:diamond",
        text: "3400+ Font Icons",
    },
    {
        color: 'secondary',
        icon: "tabler:wand",
        text: '50+ UI Components'
    },

]

const slide2 = [
    {
        icon: "tabler:database",
        text: "Axios",
        color: "primary",
    },
    {
        icon: "tabler:tags",
        text: "i18 React",
        color: "error",
    },
    {
        icon: "tabler:hexagons",
        text: "Flowbite React",
        color: "info",
    },
    {
        icon: "tabler:arrows-shuffle",
        text: "Easy to Customize",
        color: "success",
    },
]

const slide3 = [
    {

        icon: "tabler:chart-pie",
        text: "Lots of Chart Options",
        color: "secondary",
    },
    {

        icon: "tabler:layers-intersect",
        text: "Lots of Table Examples",
        color: "warning",
    },
    {

        icon: "tabler:refresh",
        text: "Regular Updates",
        color: "success",
    },
    {

        icon: "tabler:book",
        text: "Detailed Documentation",
        color: "warning",
    },
    {

        icon: "tabler:calendar",
        text: "Calendar Design",
        color: "info",
    },
    {

        icon: "tabler:user-screen",
        text: "Dedicated Support",
        color: "primary",
    },
]

const TemplateFeature = () => {

    const theme = useTheme();

    const StyledFeatureBox = styled(Box)(() => ({

        backgroundColor: theme.palette.background.default,
        height: '60px',
        padding: '10px 16px',
        borderRadius: '16px', marginTop: '15px', marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        flexShrink: 0
    }));

    return (
        <Box sx={{
            backgroundColor: theme.palette.mode == 'light' ? 'white' : 'background.default'
        }}>
            <Container maxWidth="lg">
                <Box borderRadius="24px" sx={{
                    py: '40px'
                }}>


                    <StyledAnimationFeature>
                        {[0, 1, 2, 3].map((item, index) => {
                            return (
                                <StyledAnimationContent display="flex" gap="30px" key={index}>
                                    {slide1.map((item, i) => (
                                        <StyledFeatureBox key={i} sx={{
                                            backgroundColor: `${item.color}.light`,
                                            color: `${item.color}.main`,
                                        }}>
                                            <Icon icon={item.icon} width={24} height={24} />
                                            <Typography fontSize="15px" fontWeight={600}>{item.text}</Typography>
                                        </StyledFeatureBox>
                                    ))}
                                </StyledAnimationContent>
                            )
                        })}
                    </StyledAnimationFeature>

                    <StyledAnimationFeature>
                        {[0, 1, 2, 3, 4, 5].map((item, index) => {
                            return (
                                <StyledAnimationContent2 display="flex" gap="30px" key={index}>
                                    {slide2.map((item, i) => (
                                        <StyledFeatureBox key={i} sx={{
                                            backgroundColor: `${item.color}.light`,
                                            color: `${item.color}.main`,
                                        }}>
                                            <Icon icon={item.icon} width={24} height={24} />
                                            <Typography fontSize="15px" fontWeight={600}>{item.text}</Typography>
                                        </StyledFeatureBox>
                                    ))}

                                </StyledAnimationContent2>
                            )
                        })}
                    </StyledAnimationFeature>

                    <StyledAnimationFeature>
                        {[0, 1, 2, 3].map((item, index) => {
                            return (
                                <StyledAnimationContent display="flex" gap="30px" key={index}>
                                    {slide3.map((item, i) => (
                                        <StyledFeatureBox key={i} sx={{
                                            backgroundColor: `${item.color}.light`,
                                            color: `${item.color}.main`,
                                        }}>
                                            <Icon icon={item.icon} width={24} height={24} />
                                            <Typography fontSize="15px" fontWeight={600}>{item.text}</Typography>
                                        </StyledFeatureBox>
                                    ))}
                                </StyledAnimationContent>
                            )
                        })}
                    </StyledAnimationFeature>
                </Box>
            </Container>
        </Box>
    );
};

export default TemplateFeature;
