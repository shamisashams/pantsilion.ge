import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "./PriceRange.css";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

function valuetext(value) {
    return `${value}°C`;
}

export default function RangeSlider({ appliedFilters }) {
    const { filter } = usePage().props;
    let min, max;

    if (appliedFilters.hasOwnProperty("price")) {
        min = appliedFilters["price"][0];
        max = appliedFilters["price"][1];
    } else {
        min = 0;
        max = filter.price.max;
    }

    const [value, setValue] = React.useState([min, max]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        //console.log(value)
    };

    const handleCommit = (event, value) => {
        console.log(value);
        console.log(appliedFilters);

        appliedFilters["price"] = value;

        let params = [];

        for (let key in appliedFilters) {
            params.push(key + "=" + appliedFilters[key].join(","));
        }

        Inertia.visit("?" + params.join("&"));
    };

    console.log("price range min max are ", min, max);

    return (
        <>
            <div className="flex justify-between items-center text-sm">
                <div>{min} ₾</div>
                <div>{max} ₾</div>
            </div>
            <Box>
                <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={value}
                    onChange={handleChange}
                    onChangeCommitted={handleCommit}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={0}
                    max={filter.price.max}
                />
            </Box>
        </>
    );
}
