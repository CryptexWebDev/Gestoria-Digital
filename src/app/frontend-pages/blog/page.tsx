import React from "react";
import BlogList from "../../components/frontend-pages/blog/blog-list/Blog";
import PageContainer from '@/app/components/container/PageContainer';
import HeaderAlert from '../../components/frontend-pages/shared/header/HeaderAlert';
import HpHeader from '../../components/frontend-pages/shared/header/HpHeader';
import C2a from '../../components/frontend-pages/shared/c2a';
import Footer from '../../components/frontend-pages/shared/footer';
import ScrollToTop from '../../components/frontend-pages/shared/scroll-to-top';
import BreadcrumbTwo from '@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbTwo';

const BCrumb = [
    {
        to: "/",
        title: "Spike",
    },
    {
        title: "Blog Page",
    },
];

const BlogPage = () => {

    return (
        <>
            <PageContainer title="Blog" description="this is Blog">

                <HeaderAlert />
                <HpHeader />
                {/* breadcrumb */}
                <BreadcrumbTwo title="Our most recent articles" items={BCrumb} />
                {/* end breadcrumb */}

                <BlogList />
                <C2a />
                <Footer />
                <ScrollToTop />
            </PageContainer>



        </>
    );
};

export default BlogPage;