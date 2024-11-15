import React, { useState, useCallback, useEffect } from "react";
import numeral from "numeral";
import Viewer from "./Viewer";
import { units } from "./_data";

// Color scale for different rent values
const colorScale = (rental) => {
  if (rental < 3000) return "#3aa655";
  if (rental < 6000) return "#c3ae0e";
  if (rental < 9000) return "#c77a15";
  return "#ff3f34";
};

const LeasingTenancy = () => {
  const [space, setSpace] = useState(null);
  const [popupData, setPopupData] = useState(null); // State to store popup data
  const [isPopupVisible, setPopupVisible] = useState(false); // State to control popup visibility

  const onReady = useCallback((space) => setSpace(space), []);

  useEffect(() => {
    if (!space) return;

    // Add the units layer with interaction (click handling)
    space.addDataLayer({
      id: "units",
      type: "polygon",
      data: units,
      tooltip: (d) => `${d.name} - $${numeral(d.rental).format("0,0")}/mo`,
      color: (d) => colorScale(d.rental),
      alpha: 0.7,
      height: 2.9,
      onClick: (event) => {
        console.log("Click Event Data:", event); // Log the event data to see its structure

        // Extract the clicked unit data directly from the event
        const clickedUnit = event; // The clicked unit should be the event itself

        if (clickedUnit) {
          // Find the unit data by its id (using `units.find` to match by `id`)
          const unitId = clickedUnit.id;
          const unitData = units.find((unit) => unit.id === unitId);

          if (unitData) {
            // Show the popup with unit data
            setPopupData(unitData);
            setPopupVisible(true);
          } else {
            console.error("Unit not found for ID:", unitId);
          }
        } else {
          console.error("Clicked unit data is missing or malformed", event);
        }
      },
    });

    return () => {
      space.removeDataLayer("units");
    };
  }, [space]);

  return (
    <div className="viewer-container">
      <Viewer mode="2d" onReady={onReady} />

      {/* Popup Component */}
      {popupData && (
        <div className={`popup-container ${isPopupVisible ? "open" : ""}`}>
          <div className="popup-content">
            <h3>{popupData.name}</h3>
            <p>
              <strong>Rent:</strong> ${numeral(popupData.rental).format("0,0")}
              /mo
            </p>
            <p>
              <strong>Status:</strong> {popupData.status}
            </p>
            <button onClick={() => setPopupVisible(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeasingTenancy;