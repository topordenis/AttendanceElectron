import React from "react";
import { MDBCol, MDBRow, MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer } from "mdb-react-ui-kit";
import { useLocation } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs';

const Breadcrumb = () => {
    let location = useLocation();
    const breadcrumbs = useBreadcrumbs();


    return (
        <MDBRow>
            <MDBCol>
                <MDBBreadcrumb className="bg-light rounded-4 p-3 mb-4">
                    {breadcrumbs.map(({ match, breadcrumb }) => <MDBBreadcrumbItem key={match.pathname} active> <a href={'#' + match.pathname}>{breadcrumb}</a></MDBBreadcrumbItem>)}
                </MDBBreadcrumb>
            </MDBCol>
        </MDBRow>

    );
};

export default Breadcrumb;