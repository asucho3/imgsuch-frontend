import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route index path="/" element={<Home />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="friends" element={<Friends />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
