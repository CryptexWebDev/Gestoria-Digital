'use client';
import React from "react";
import { Box, Typography, Grid, Container, Link, useTheme } from "@mui/material";
import { Icon } from "@iconify/react";


const clients = [
    {
        icon: "tabler:chart-bubble",
        title: "Expert Advisor",
        subtitle: "Suspendisse vestibulum eu erat ac scelerisque.",
        color: "error",
    },
    {
        icon: "tabler:building-store",
        title: "Effective Support",
        subtitle: "Suspendisse vestibulum eu erat ac scelerisque.",
        color: "primary",
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
]

const Features = () => {

    const theme = useTheme();

    return (
        <Box sx={{
            py: {
                lg: 10,
                xs: 5
            },

            backgroundColor: theme.palette.mode == 'light' ? 'white' : 'background.default'

        }}>
            <Container maxWidth="lg">

                <Grid container spacing={3} mt={3}>
                    <Grid item lg={5}>
                        <Typography variant="h2" fontSize="40px" lineHeight="1.2"> Over 45,000 clients and counting.</Typography>
                        <Typography variant="body1" my={3}>Pellentesque varius semper odio non pretium. Nullam sagittis neque orci, eu elementum enim.</Typography>
                        <Link
                            href="/"
                            underline="always"
                            sx={{
                                textDecorationColor: (theme) => theme.palette.grey[600],
                                "&:hover span": {
                                    color: "primary.main",
                                },
                            }}
                        >
                            <Typography
                                component="span"
                                fontWeight={600} color="grey.600"
                                fontSize="15px"
                            >
                                Request a Callback
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item lg={7}>
                        <Box sx={{
                            marginLeft: {
                                lg: 5
                            }
                        }}>
                            <Grid container spacing={3}>
                                {clients.map((client, i) => (
                                    <Grid item xs={12} sm={6} key={i}>
                                        <Box height="48px" width="48px" display="flex" alignItems="center" justifyContent="center" sx={{
                                            backgroundColor: `${client.color}.light`, color: `${client.color}.main`
                                        }}>
                                            <Icon icon={client.icon} width={24} height={24} />
                                        </Box>
                                        <Typography variant="h4" my={2}>{client.title}</Typography>
                                        <Typography variant="body1" fontSize="15px" mb={3}>{client.subtitle}</Typography>
                                    </Grid>
                                ))}

                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Features;
