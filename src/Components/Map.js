import React from "react";
import GoogleMapReact from "google-map-react";

function Map({ positions }) {
    const getMapBounds = (map, maps, positions) => {
        const bounds = new maps.LatLngBounds();

        positions.forEach((position) => {
            bounds.extend(new maps.LatLng(position.lat, position.lng));
        });

        return bounds;
    };

    const bindResizeListener = (map, maps, bounds) => {
        maps.event.addDomListenerOnce(map, "idle", () => {
            maps.event.addDomListener(window, "resize", () => {
                map.fitBounds(bounds);
            });
        });
    };

    const apiIsLoaded = (map, maps, positions) => {
        positions.map((position, index) => {
            const marker = new maps.Marker({
                position: position,
                map,
                title: `${index} marker`,
            });

            const contentString =
                '<div id="content">' +
                `<h4> ${index + 1} position </h4>` +
                "</div>";

            const infoWindow = new maps.InfoWindow({
                content: contentString,
            });

            marker.addListener("mouseover", () => infoWindow.open({ anchor: marker, map, shouldFocus: false }));
            marker.addListener("mouseout", () => infoWindow.close());

            return marker;
        });

        const bounds = getMapBounds(map, maps, positions);

        map.fitBounds(bounds);

        bindResizeListener(map, maps, bounds);
    };

    return (
        <GoogleMapReact
            defaultCenter={{
                lat: 40.854885,
                lng: -88.081807
            }}
            defaultZoom={11}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) =>
                apiIsLoaded(map, maps, positions)
            }
        ></GoogleMapReact >
    );
}
export default Map;