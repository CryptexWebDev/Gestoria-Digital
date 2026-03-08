"use client";

import Grid from "@mui/material/Grid2";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";

import UpcomingAcitivity from "@/app/components/widgets/cards/UpcomingActivity";
import ComplexCard from "@/app/components/widgets/cards/ComplexCard";
import MusicCard from "@/app/components/widgets/cards/MusicCard";
import EcommerceCard from "@/app/components/widgets/cards/EcommerceCard";
import FollowerCard from "@/app/components/widgets/cards/FollowerCard";
import FriendCard from "@/app/components/widgets/cards/FriendCard";
import ProfileCard from "@/app/components/dashboards/dashboard2/ProfileCard";

import Settings from "@/app/components/widgets/cards/Settings";
import GiftCard from "@/app/components/widgets/cards/GiftCard";
import TopCards from "@/app/components/dashboards/dashboard2/TopCards";
import NewGoals from "@/app/components/dashboards/dashboard2/NewGoals";
import BlogCard from "@/app/components/dashboards/dashboard2/BlogCard";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Cards",
  },
];

const WidgetCards = () => {
  return (
    (<PageContainer title="Cards" description="this is Cards">
      {/* breadcrumb */}
      <Breadcrumb title="Cards" items={BCrumb} />
      {/* end breadcrumb */}
      <Grid container spacing={3}>
        <Grid size={12}>
          <TopCards />
        </Grid>
        <Grid size={12}>
          <ComplexCard />
        </Grid>
        <Grid size={12}>
          <EcommerceCard />
        </Grid>
        <Grid size={12}>
          <MusicCard />
        </Grid>
        <Grid size={12}>
          <FollowerCard />
        </Grid>
        <Grid size={12}>
          <FriendCard />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 4
          }}>
          <Settings />
        </Grid>
        <Grid
          size={{
            xs: 12,
            lg: 8
          }}>
          <GiftCard />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 5
          }}>
          <UpcomingAcitivity />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 3
          }}>
          <BlogCard />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
            lg: 4
          }}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <NewGoals />
            </Grid>
            <Grid size={12}>
              <ProfileCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>)
  );
};

export default WidgetCards;
