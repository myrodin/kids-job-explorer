import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
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
    <I18nextProvider i18n={i18n}>
      <QuizProvider>
        <Router basename="/kids-job-explorer">
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
    </I18nextProvider>
  );
}

export default App;
