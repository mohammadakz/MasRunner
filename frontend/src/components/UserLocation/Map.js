import React from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Polyline,
} from "react-google-maps";
import { LoggedinContext } from "../Context/UserContext";
let walkPath = [];
//
const API_KEY = process.env.REACT_APP_GOOGLE_KEY;
const Map = () => {
  const {
    state: { pastLocation },
  } = React.useContext(LoggedinContext);
  Object.values(pastLocation).map((item) => {
    walkPath.push({
      lat: Number(item.lat),
      lng: Number(item.lng),
    });
  });
  const googleMap = () => {
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 45.49474477767944, lng: -73.58054399490356 }}
      >
        <Polyline
          path={walkPath}
          // path={path}
          geodesic={true}
          options={{
            strokeColor: "#ff2527",
            strokeOpacity: 0.75,
            strokeWeight: 8,
            icons: [
              {
                offset: "0",
                repeat: "20px",
              },
            ],
          }}
        />
      </GoogleMap>
    );
  };
  const WrappedMap = withScriptjs(withGoogleMap(googleMap));

  return (
    <div style={{ width: "50vw", height: "50vh" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

export default Map;
