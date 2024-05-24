import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import { useMemo, useState } from "react";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

const MAPS_API_KEY = import.meta.env.VITE_MAPS_API_KEY;

const MAP_ID = import.meta.env.VITE_MAP_ID;

const libraries = ["places"];

const Places = ({ pos }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAPS_API_KEY,
    libraries: libraries,
  });

  if (!isLoaded) return <div>Loading... </div>;
  return <Map />;
};

function Map() {
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [selected, setSelected] = useState(null);
  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>
      <div style={{ width: "100%", height: "400px" }} className="map-container">
        <GoogleMap
          zoom={10}
          center={center}
          // mapContainerClassName="map-container"
        >
          {selected && <Marker position={selected} />}
        </GoogleMap>
      </div>
    </>
  );
}

const PlacesAutocomplete = ({ setSelected }) => {
  return <></>;
};

export default Places;
