import React from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Polyline,
} from "react-google-maps";
import NullMap from "./EmptyMap";
import { LoggedinContext } from "../Context/UserContext";

const API_KEY = process.env.REACT_APP_GOOGLE_KEY;

const Map = () => {
  let uniqueWalkingDate;
  //States
  const {
    state: { pastLocation, selectedDate },
    actions: { getColor },
  } = React.useContext(LoggedinContext);
  const [walkPath, setWalkPath] = React.useState([]);
  const [allPaths, setAllPaths] = React.useState([]);
  //useEffect for every pastlocation
  React.useEffect(() => {
    const userPath = [];
    const allWalkingDate = [];
    const allPathArray = [];
    Object.values(pastLocation).forEach((item) => {
      allWalkingDate.push(item.time);

      //Array of uniqe dates
      uniqueWalkingDate = allWalkingDate.filter(
        (x, y) => allWalkingDate.indexOf(x) == y
      );

      userPath.push({
        lat: Number(item.lat),
        lng: Number(item.lng),
      });
    });
    allWalkingDate
      .filter((x, y) => allWalkingDate.indexOf(x) == y)
      .forEach((ite, id) => {
        allPathArray.push({ time: ite, loc: [] });
      });
    allPathArray.forEach((it) => {
      Object.values(pastLocation).forEach((i) => {
        if (i.time === it.time) {
          it.loc.push({
            lat: Number(i.lat),
            lng: Number(i.lng),
          });
        }
      });
    });

    if (pastLocation.length) {
      setWalkPath(userPath);
      setAllPaths(allPathArray);
    }
  }, [pastLocation]);

  const googleMap = () => {
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 45.49474477767944, lng: -73.58054399490356 }}
      >
        {allPaths.map((t, index) => {
          const randomColor = Math.floor(Math.random() * 16777215).toString(16);
          return (
            <Polyline
              path={t.loc}
              geodesic={true}
              options={{
                strokeColor: `#${randomColor}`,
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
          );
        })}
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
    <NullMap />
  );
};

export default Map;
