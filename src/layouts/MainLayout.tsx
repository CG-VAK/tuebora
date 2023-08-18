// src/layouts/MainLayout.tsx
import React from 'react';
import Header from '../components/Header';
interface Props {
    children: React.ReactNode;
  }
const MainLayout: React.FC<Props> = ({ children  }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
