import { ThemeProviders } from "./theme/theme-provider";
import Routes from "./routes/Routes";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ToastContainer } from "react-toastify";

function App() {
  console.log = console.warn = console.error = () => {}
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProviders>
        <Routes />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </ThemeProviders>
    </LocalizationProvider>
  );
}

export default App;
