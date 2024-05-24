import PropTypes from "prop-types";
import PlacesAutocomplete from "react-places-autocomplete";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

const LocationSearch = ({
  address,
  setAddress,
  handleSelect,
  MAPS_API_KEY,
  MAP_ID,
  pos,
}) => {
  return (
    <div className="w-full text-slate-950">
      <p>Address: {address}</p>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div key={suggestions.description}>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "red", cursor: "pointer" }
                  : { backgroundColor: "yellow", cursor: "pointer" };
                return (
                  <div
                    key={suggestion.description}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      <APIProvider apiKey={MAPS_API_KEY}>
        <div style={{ height: "60vh" }} className="mt-5">
          <Map defaultZoom={14} defaultCenter={pos} mapId={MAP_ID}>
            <AdvancedMarker position={pos}></AdvancedMarker>
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};

LocationSearch.propTypes = {
  address: PropTypes.string, // Add prop type validation for address
  setAddress: PropTypes.func,
  handleSelect: PropTypes.func,
  MAPS_API_KEY: PropTypes.string,
  MAP_ID: PropTypes.string,
  pos: PropTypes.object,
};

export default LocationSearch;
