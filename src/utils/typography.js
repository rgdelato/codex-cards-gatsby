import Typography from "typography";
import sternGroveTheme from "typography-theme-stern-grove";
// import githubTheme from "typography-theme-github";

const typography = new Typography({ ...sternGroveTheme, googleFonts: [] });
// const typography = new Typography({ ...githubTheme, googleFonts: [] });

export default typography;
