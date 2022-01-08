import React, { useState, useRef } from 'react';
import { setConfig, cold } from 'react-hot-loader';

import Wrapper from './Wrapper';
import InputSearch from './InputSearch';
import ButtonOptions from '../ButtonOptions/index';

import { Search, RefreshCw, Navigation } from 'react-feather';
import { isMobile } from 'react-device-detect';
import ReactTooltip from 'react-tooltip';

setConfig({
  onComponentRegister: type =>
    (String(type).indexOf('useState') > 0 ||
      String(type).indexOf('useRef') > 0) &&
    cold(type)
});

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleChange
  };
};

function ViewCityOptions({ onUpdateSearch, onRefresh, onGeoLocation }) {
  const search = useFormInput('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleEnter = e => {
    if (e.key === 'Enter' && search.value) {
      onUpdateSearch(search.value);
    }
  };

  const actionSearch = () => {
    inputRef.current.focus();
  };

  const actionRefresh = () => {
    onRefresh();
  };

  const actionGeoLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      position => {
        onGeoLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setLoading(false);
      },
      err => {
        const error =
          err.code === 1
            ? 'Please, enable your location.'
            : 'Could not find your location, please try again later.';
        onGeoLocation({ error });
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
    );
  };

  return (
    <Wrapper>
      <ButtonOptions
        action={actionSearch}
        text="Search"
        margin="5px"
        icon={<Search color="#ffffff" size={21} />}
      />
      <InputSearch
        ref={inputRef}
        id="input"
        type="search"
        placeholder="Search a City"
        aria-label="Search input"
        onKeyPress={handleEnter}
        {...search}
      />
      <ButtonOptions
        action={actionRefresh}
        text="Refresh"
        margin="5px"
        icon={<RefreshCw color="#ffffff" size={21} />}
      />
      <ButtonOptions
        action={actionGeoLocation}
        text="My location"
        margin="0"
        loading={loading}
        icon={<Navigation color="#ffffff" size={21} />}
      />
      {!isMobile && <ReactTooltip effect="solid" globalEventOff="click" />}
    </Wrapper>
  );
}

export default ViewCityOptions;
