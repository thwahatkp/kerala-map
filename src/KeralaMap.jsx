import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import * as d3 from "d3-geo";

const KeralaMap = () => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch("/district.geojson")
      .then((response) => response.json())
      .then((data) => {
        setGeoData(data);
      });
  }, []);

  const colorScale = scaleLinear().domain([0, 100]).range(["#ffedea", "#ff5233"]);

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 5000,
        center: [76.2711, 10.8505],
      }}>
      {geoData && (
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const centroid = d3.geoCentroid(geo);
              return (
                <React.Fragment key={geo.rsmKey}>
                  <Geography
                    geography={geo}
                    fill={colorScale(Math.random() * 100)}
                    stroke="#FFFFFF"
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#FF5733", outline: "none" },
                      pressed: { fill: "#FF0000", outline: "none" },
                    }}
                  />
                  <Marker coordinates={centroid}>
                    <circle r={4} fill="#F00" stroke="#fff" strokeWidth={2} />
                    <text textAnchor="middle" fontSize={8} dy={-10} style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontWeight: "bold" }}>
                      {geo.properties.DISTRICT}
                    </text>
                  </Marker>
                </React.Fragment>
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
  );
};

export default KeralaMap;
