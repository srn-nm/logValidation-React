import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Box from "@mui/material/Box";
import {motion} from "framer-motion"

export default function Layout() {

  return (
    
    <Box
      className="flex justify-end min-h-screen min-w-screen bg-cover bg-center bg-no-repeat transition-colors"
      sx={{ backgroundImage: "url(/Background.jpg)" }}
    >
      <Box className="flex flex-col flex-1 min-h-screen h-full stretch">
        
        <NavBar />
        <motion.main
          className="flex-1 h-full stretch"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          <Box className="flex flex-col flex-1 min-h-screen h-full stretch bg-gray-800 m-10 p-5 rounded-lg shadow-lg opacity-75">
            <div><Outlet /></div>
          </Box>

        </motion.main>
      </Box>
      
    </Box>
 
  );
}