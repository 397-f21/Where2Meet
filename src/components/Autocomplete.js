// Autocomplete.js
import React, { Component } from 'react';
import { AutoCompleteWrapper } from '../utils/wrappers';

class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.clearSearchBox = this.clearSearchBox.bind(this);
    }

    componentDidMount({ map, mapApi } = this.props) {
        const options = {
            // restrict your search to a specific type of result
            // types: ['address'],
            // restrict your search to a specific country, or an array of countries
            // componentRestrictions: { country: ['gb', 'us'] },
        };
        this.autoComplete = new mapApi.places.Autocomplete(
            this.searchInput,
            options,
        );
        this.autoComplete.addListener('place_changed', this.onPlaceChanged);
        this.autoComplete.bindTo('bounds', map);
    }

    componentWillUnmount({ mapApi } = this.props) {
        mapApi.event.clearInstanceListeners(this.searchInput);
    }

    onPlaceChanged = ({ map, addplace } = this.props) => {
        const place = this.autoComplete.getPlace();

        if (!place.geometry) return;
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(3);
        }

        addplace(place);
        this.searchInput.blur();
    };

    clearSearchBox() {
        this.searchInput.value = '';
    }

    render() {
        return (
            <AutoCompleteWrapper>
                <div>
                    <input
                        className="search-input"
                        ref={(ref) => {
                            this.searchInput = ref;
                        }}
                        type="text"
                        onFocus={this.clearSearchBox}
                        placeholder="Enter a location"
                    />
                </div> 
            </AutoCompleteWrapper>
        );
    }
}

export default AutoComplete;