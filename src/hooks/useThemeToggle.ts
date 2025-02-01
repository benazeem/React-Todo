import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import {toggleTheme} from '../store/themeSlice'

export const useTheme = (): string => {
  return useSelector((state: RootState) => state.theme.value);
}

export const useToggleThemeHandler = () => {
    const dispatch = useDispatch()
    const theme = useTheme()
   
    return () => {
    dispatch(toggleTheme()); 
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("light", newTheme === "light");
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  }};
  