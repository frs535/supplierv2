import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";
import {themeSettings} from "./theme";
import { useMemo } from "react";
import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";

/* Login */
import Login from "scenes/auth";
import Profile from "scenes/profile";

function App() {
  const mode = useSelector((state) => state.mode); //state.global.mode
  const theme = useMemo(()=>createTheme(themeSettings(mode)), [mode]);
  return (
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Routes>
              <Route element={mode.userId != null? <Layout/>: ""}>
                  <Route path="/" element={<Login />} />
                  <Route path="/profile/:userId" element={mode.userId != null? <Profile /> : <Navigate to="/" replace/> } />
                  <Route path="/dashboard" element={mode.userId != null? <Dashboard /> : <Navigate to="/" replace/>} />
                  <Route path="/products" element={mode.userId != null? <Products /> : <Navigate to="/" replace/>}  />
                  <Route path="/customers" element={mode.userId != null? <Customers /> : <Navigate to="/" replace/>} />
                  <Route path="/transactions" element={mode.userId != null? <Transactions/> : <Navigate to="/" replace/>}/>
                  <Route path="/overview" element={mode.userId != null? <Overview /> : <Navigate to="/" replace/>} />
                  <Route path="/daily" element={mode.userId != null? <Daily /> : <Navigate to="/" replace/>} />
                  <Route path="/monthly" element={mode.userId != null? <Monthly /> : <Navigate to="/" replace/>} />
                  <Route path="/breakdown" element={mode.userId != null? <Breakdown /> : <Navigate to="/" replace/>} />
                  <Route path="/admin" element={mode.userId != null? <Admin /> : <Navigate to="/" replace/>} />
                  <Route path="/performance" element={mode.userId != null? <Performance /> : <Navigate to="/" replace/>} />
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
        </div>)
}

export default App;
