import { Route, Routes, Navigate } from 'react-router-dom';
import React, { Suspense } from 'react';

const SymbolsView = React.lazy(() => import('@/components/SymbolsView'));
const StatementsView = React.lazy(() => import('@/components/StatementsView'));
const ProfileView = React.lazy(() => import('@/components/ProfileView'));

const LoadingSpinner = () => {
  return <span>Loading...</span>;
};

const Router = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route index element={<SymbolsView />} />
        <Route index path="profile" element={<ProfileView />} />
        <Route index path="statements" element={<StatementsView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
