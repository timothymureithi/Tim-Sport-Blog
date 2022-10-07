import { MDBBadge } from 'mdb-react-ui-kit';
import React from 'react'

function Badge(children, blogStyle) {
    const leagueColor = {
        EPL: "primary",
        Bundesliga: "danger",
        LaLiga: "success",
        MLS: "info",
        SuperSport: "warning",
        SeriaA: "dark"
    };

  return (
    <h5 style={blogStyle}>
        <MDBBadge color ={leagueColor[children]}>{children}</MDBBadge>
    </h5>

    );
};

export default Badge