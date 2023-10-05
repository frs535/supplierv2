import {CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {useSelector} from "react-redux";
import {themeSettings} from "./theme";
import {useMemo, useEffect} from "react";
import {BrowserRouter, Navigate, Routes, Route, useLocation} from "react-router-dom";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import ProductDetails from "scenes/products/ProductDetails";
import {Checkout} from "./scenes/checkout/Checkout";
import Orders from "./scenes/orders/Orders";
import Order from "./scenes/orders/Order";
import Profile from "scenes/profile";
import ProductGrid from "./components/ProductGrid";

/* Login */
import SignIn from "scenes/auth/SignIn";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

function App() {
    const mode = useSelector((state) => state.global.mode); //state.mode
    const theme = useMemo(()=>createTheme(themeSettings(mode)), [mode]);
    const user = useSelector((state) => state.global.user);

  return (
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
              <CssBaseline/>
              <ScrollToTop/>
              <Routes>
                <Route path="/" element={user=== null ? <SignIn /> : <Navigate to="/dashboard" replace/>} />
                <Route element={<Layout/>}>
                    <Route path="/dashboard"  element={user != null? <Dashboard /> : <Navigate to="/" replace/>}/>
                    <Route path="/profile" element={user != null? <Profile /> : <Navigate to="/" replace/> } />
                    <Route path="/products" element={user != null? <Products /> : <Navigate to="/" replace/>} >
                        <Route path="group/:groupId" element={<ProductGrid />} />
                    </Route>
                    <Route path="product/:itemId" element={<ProductDetails />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orders" element={<Orders/>} />
                    <Route path="/orders/:id" element={<Order/>} />
                </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
        </div>)
}

export default App;
