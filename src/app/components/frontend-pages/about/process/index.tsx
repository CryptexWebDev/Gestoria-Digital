'use client';
import React from "react";
import { Box, Stack, Typography, Grid, Container, Divider, useTheme } from "@mui/material";
import Image from "next/image";
import { Icon } from "@iconify/react";

const Processes = [
    {
        icon: "tabler:building-store",
        title: "Effective Support",
        subtitle: "Suspendisse vestibulum eu erat ac scelerisque.",
        color: "primary",
    },
    {
        icon: "tabler:chart-bubble",
        title: "Expert Advisor",
        subtitle: "Suspendisse vestibulum eu erat ac scelerisque.",
        color: "error",
    },
    {
        icon: "material-symbols:category-outline",
        title: "Low Fees",
        subtitle: "Suspendisse vestibulum eu erat ac scelerisque.",
        color: "success",
    },
    {
        icon: "material-symbols:earthquake",
        title: "Loan Facility",
        subtitle: "Suspendisse vestibulum eu erat ac scelerisque.",
        color: "warning",
    },
];

const Process = () => {

    const theme = useTheme();

    return (
        <Box pt={10} sx={{
            backgroundColor: theme.palette.mode == 'light' ? 'white' : 'background.default'
        }}>
            <Container maxWidth="lg">
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} lg={7} textAlign="center">
                        <Typography variant="h4" sx={{
                            fontSize: {
                                lg: '40px',
                                xs: '35px'
                            }
                        }} fontWeight="700" mt={5}>The hassle-free setup process</Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={3} mt={3}>
                    {Processes.map((process, i) => (
                        <Grid item xs={12} sm={6} lg={3} key={i}>
                            <Box mb={3} borderRadius="24px" sx={{
                                backgroundColor: `${process.color}.light`,
                            }}>
                                <Box p="30px">
                                    <Stack direction="column" spacing={2}>
                                        <Box display="flex" alignItems="center" justifyContent="center" sx={{
                                            height: '48px',
                                            width: '48px',
                                            borderRadius: '12px',
                                            backgroundColor: theme.palette.mode == 'light' ? 'white' : 'background.default',
                                            color: `${process.color}.main`,
                                            boxShadow: theme.shadows[10]
                                        }}>
                                            <Icon
                                                icon={process.icon}
                                                height={24}
                                            />
                                        </Box>
                                        <Typography variant="h6" fontWeight={700}>{process.title}</Typography>
                                        <Typography variant="body1">{process.subtitle}</Typography>
                                    </Stack>
                                </Box>
                            </Box>
                        </Grid>
                    ))}


                </Grid>

            </Container>
            <Divider sx={{
                mt: '65px'
            }} />
        </Box>
    );
};

export default Process;
