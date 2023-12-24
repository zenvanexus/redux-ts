import { toggleTheme } from "@/lib/redux/features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/legacyStore/hooks";
import { IconButton } from "@layer5/sistent-components";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function DynamicIcon({ mode }: { mode: string }) {
  if (mode === "dark") {
    return <DarkModeIcon />;
  }

  return <LightModeIcon />;
}

function ModeToggleButton() {
  const dispatch = useAppDispatch(); // Initialize the useDispatch function

  // Use useSelector to get the darkTheme state from your Redux store
  const mode = useAppSelector((state) =>
    state.theme.darkTheme ? "dark" : "light",
  );

  const toggleMode = () => {
    console.log("Toggle theme clicked");
    // Dispatch the toggleTheme action when the button is clicked
    dispatch(toggleTheme());
  };

  return (
    <IconButton onClick={toggleMode} sx={{ width: 40, height: 40 }}>
      <DynamicIcon mode={mode} />
    </IconButton>
  );
}

export default ModeToggleButton;
