const { colors: defaultColors } = require("tailwindcss/defaultTheme");

const colors = {
    ...defaultColors,
    ...{
        "custom-red": "#FE6969",
        "custom-dark": "#0F1B13",
    },
};

module.exports = {
    content: ["./resources/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            colors: colors,
        },
    },
    plugins: [],
};
