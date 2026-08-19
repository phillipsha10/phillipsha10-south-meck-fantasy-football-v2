import React from 'react';

const BrandedFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        🏈 South Mecklenburg High School Fantasy Football League ©{currentYear}
      </p>
      <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.8 }}>
        Est. 2014 • Charlotte, NC
      </p>
      <p style={{ fontSize: '0.8rem', marginTop: '1rem', opacity: 0.6 }}>
        Powered by ESPN Fantasy Football API
      </p>
    </footer>
  );
};

export default BrandedFooter;
