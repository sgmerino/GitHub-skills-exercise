import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <h1 className="mb-4">OctoFit Tracker</h1>
        <Routes>
          <Route path="/" element={<p>Welcome to OctoFit Tracker!</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
