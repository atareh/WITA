import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import { UploadStep } from './components/UploadStep';
import { NamingStep } from './components/NamingStep';
import { ContextStep } from './components/ContextStep';
import { ConfirmStep } from './components/ConfirmStep';
import ResultsPage from './pages/ResultsPage';
import SharePage from './pages/SharePage';

function App() {
  useEffect(() => {
    document.title = 'WITA | Who is the A-Hole';
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/analyze" element={<UploadStep />} />
      <Route path="/analyze/names" element={<NamingStep />} />
      <Route path="/analyze/context" element={<ContextStep />} />
      <Route path="/analyze/confirm" element={<ConfirmStep />} />
      <Route path="/analyze/results" element={<ResultsPage />} />
      <Route path="/share/:id" element={<SharePage />} />
    </Routes>
  );
}

export default App;