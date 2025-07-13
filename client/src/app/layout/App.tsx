import { Box, Container, CssBaseline} from "@mui/material";
import NavBar from "./NavBar.tsx";
import { Outlet } from "react-router";

function App() {

  return (
    <Box sx={{bgcolor: '#eeeeee', minHeight: '100vh'}}>
    <CssBaseline />
      {/* CssBaseline helps to kickstart an elegant, consistent, and simple baseline to build upon */}
      <NavBar/>
      <Container maxWidth="xl" sx={{ marginTop: 3 }}>
       <Outlet/>
      </Container>
    </Box>
  );
}

export default App
