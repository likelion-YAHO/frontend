import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./layout/RootLayout";

function TestPage() {
  return (
    <div>
      <h1>테스트 페이지</h1>
      <p>Header랑 Footer가 보이면 성공!</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<TestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
