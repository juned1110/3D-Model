import React, { useState, useCallback, useEffect } from "react";
import numeral from "numeral";
import Viewer from "./Viewer";
import { units } from "./_data";

const colorScale = (rental) => {
  if (rental < 3000) return "#3aa655";
  if (rental < 6000) return "#c3ae0e";
  if (rental < 9000) return "#c77a15";
  return "#ff3f34";
};

const LeasingTenancy = () => {
  const [space, setSpace] = useState(null);

  const onReady = useCallback((space) => setSpace(space), []);

  useEffect(() => {
    if (!space) return;

    space.addDataLayer({
      id: "units",
      type: "polygon",
      data: units,
      tooltip: (d) => `${d.name} - $${numeral(d.rental).format("0,0")}/mo`,
      color: (d) => colorScale(d.rental),
      alpha: 0.7,
      height: 2.9,
    });

    return () => {
      space.removeDataLayer("units");
    };
  }, [space]);

  return (
    <div className="viewer-container">
      <Viewer mode="2d" onReady={onReady} />
    </div>
  );
};

export default LeasingTenancy;
