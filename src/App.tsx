import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import { Layout } from './components/layout/Layout';
import {
  HomePage,
  QuizPage,
  ResultPage,
  JobDetailPage,
  JobListPage,
  HistoryPage,
  DesignSystemPage,
} from './pages';

function App() {
  return (
    <QuizProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/jobs" element={<JobListPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/design" element={<DesignSystemPage />} />
          </Routes>
        </Layout>
      </Router>
    </QuizProvider>
  );
}

export default App;
