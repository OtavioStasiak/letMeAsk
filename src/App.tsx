import { BrowserRouter, Route, Router } from "react-router-dom";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import { auth } from "./services/firebase";
import { database } from "./services/firebase";

function App() {
  return (
   <BrowserRouter>
    <Route component={Home} />
    <Route component={NewRoom} />
   </BrowserRouter>
  );
}

export default App;
