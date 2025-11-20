import React, { ReactNode } from 'react';

interface PortfolioPageWrapperProps {
  children: ReactNode;
}

const PortfolioPageWrapper: React.FC<PortfolioPageWrapperProps> = ({ children }) => {
  return <>{children}</>;
};

export default PortfolioPageWrapper;
