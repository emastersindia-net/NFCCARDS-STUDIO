import { BrowserRouter, Route, Routes } from "react-router-dom";
import Studio from "./pages/Studio";
import HomePage from "./pages/HomePage";

const App = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/studio/:id" element={<Studio />}/>
        </Routes>
      </BrowserRouter>
    )
}
export default App;