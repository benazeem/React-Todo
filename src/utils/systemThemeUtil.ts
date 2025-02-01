const darkThemeSys = window.matchMedia("(prefers-color-scheme: dark)");

const systemThemeUtil = () => {
  const storedTheme = localStorage.getItem("theme");
  const theme = storedTheme || (darkThemeSys.matches ? "dark" : "light");

  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.classList.toggle("light", theme === "light");

  return theme;
};

export default systemThemeUtil;
