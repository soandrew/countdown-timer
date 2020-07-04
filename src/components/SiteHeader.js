import React from 'react';
import Container from 'react-bootstrap/Container';

const SiteHeader = ({ title }) => {
  return (
    <Container fluid as="header" className="bg-dark text-white py-3 text-center">
      <h1 className="h4">{title}</h1>
    </Container>
  );
};

export default SiteHeader;
