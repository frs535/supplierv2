import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./LoginForm";

const Login = () =>{
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1200px)");
  return (
      <Box
          sx={{
              display: 'flex',
              justifyContent: 'center',
              p: 1,
              m: 1,
              borderRadius: 1,
              alignContent: 'center',
          }}>
        <Box
            backgroundColor={theme.palette.background.alt}
            p="1rem 6%"
            textAlign="center"
        >
          <Typography fontWeight="bold" fontSize="32px" color="primary">
            Поставщик
          </Typography>
        </Box>

        <Box
            width={isNonMobileScreens ? "93%" : "50%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            backgroundColor={theme.palette.background.alt}
        >
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
              Добропожаловать на портал клиента!
          </Typography>
          <Form/>
        </Box>
      </Box>
  );
};

export  default  Login;