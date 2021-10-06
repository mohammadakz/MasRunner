import React from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Polyline,
  Marker,
  InfoWindow,
} from "react-google-maps";
import NullMap from "./EmptyMap";
import { LoggedinContext } from "../Context/UserContext";
import { v4 as uuidv4 } from "uuid";

const API_KEY = process.env.REACT_APP_GOOGLE_KEY;

const Map = () => {
  //States
  const {
    state: { pastLocation, selectedDate },
  } = React.useContext(LoggedinContext);
  const [walkPath, setWalkPath] = React.useState([]);
  const [allPaths, setAllPaths] = React.useState([]);
  const [selectedPath, setSelectedPath] = React.useState(null);
  //useEffect for every pastlocation
  React.useEffect(() => {
    const userPath = [];
    const allWalkingDate = [];
    const allPathArray = [];
    Object.values(pastLocation).forEach((item) => {
      allWalkingDate.push(item.time);

      userPath.push({
        lat: Number(item.lat),
        lng: Number(item.lng),
      });
    });
    allWalkingDate
      .filter((x, y) => allWalkingDate.indexOf(x) === y)
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
        {/* Paths */}
        {allPaths.map((t) => {
          if (t.time === selectedDate) {
            return (
              <Polyline
                key={uuidv4()}
                path={t.loc}
                geodesic={true}
                options={{
                  strokeColor: `#51db6f`,
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
          }
        })}

        {/* Marker */}
        {allPaths.map((te) => {
          if (te.time === selectedDate) {
            return (
              <Marker
                key={uuidv4()}
                position={{ lat: te.loc[0].lat, lng: te.loc[0].lng }}
                onClick={(e) => {
                  setSelectedPath(te);
                  return false;
                }}
              />
            );
          }
        })}
        {selectedPath && (
          <InfoWindow
            position={{
              lat: selectedPath.loc[0].lat,
              lng: selectedPath.loc[0].lng,
            }}
            onCloseClick={(e) => {
              setSelectedPath(null);
              return false;
            }}
          >
            <div style={{ fontSize: "2rem" }}>{selectedPath.time}</div>
          </InfoWindow>
        )}
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
