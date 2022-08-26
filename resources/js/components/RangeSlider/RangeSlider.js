import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./RangeSlider.css";
import {usePage} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";

const MultiRangeSlider = ({ onChange, appliedFilters }) => {
    const { filter } = usePage().props;
    let min, max, min_o, max_o;
    if(appliedFilters.hasOwnProperty('price')){
        min = appliedFilters['price'][0];
        max = appliedFilters['price'][1];
    } else {
        min = 0;
        min_o = 0
        max = filter.price.max
        max_o = filter.price.max
    }
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  function set(min,max){
      console.log(min)
      console.log(max)

      appliedFilters['price'] = [min,max]

      let params = [];

      for (let key in appliedFilters) {
          params.push(key + "=" + appliedFilters[key].join(","));
      }

      Inertia.visit("?" + params.join("&"));
  }


  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="container">

      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
        onMouseUp={() => {
            set(minVal,maxVal)
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"

        onMouseUp={(e) => {
            set(minVal,maxVal)
        }}
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">{minVal}₾</div>
        <div className="slider__right-value">{maxVal}₾</div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MultiRangeSlider;
