import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SearchResults from './pages/search-results';
import ToolCategoryBrowse from './pages/tool-category-browse';
import PrivacyPolicyLegal from './pages/privacy-policy-legal';
import IndividualToolPage from './pages/individual-tool-page';
import Homepage from './pages/homepage';
import PDFToolsHub from './pages/pdf-tools-hub';
import MultiCategoryToolDashboard from './pages/multi-category-tool-dashboard';
import AdvancedToolInterface from './pages/advanced-tool-interface';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/tool-category-browse" element={<ToolCategoryBrowse />} />
        <Route path="/privacy-policy-legal" element={<PrivacyPolicyLegal />} />
        <Route path="/individual-tool-page" element={<IndividualToolPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/pdf-tools-hub" element={<PDFToolsHub />} />
        <Route path="/multi-category-tool-dashboard" element={<MultiCategoryToolDashboard />} />
        <Route path="/advanced-tool-interface" element={<AdvancedToolInterface />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;