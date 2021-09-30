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

  return walkPath.length ? (
    <div style={{ width: "100%", height: "80vh" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
        loadingElement={
          <div style={{ height: `100%`, borderRadius: "5rem" }} />
        }
        containerElement={
          <div style={{ height: `100%`, borderRadius: "5rem" }} />
        }
        mapElement={<div style={{ height: `100%`, borderRadius: "5rem" }} />}
      />
    </div>
  ) : (
    "loading"
  );
};

export default Map;
