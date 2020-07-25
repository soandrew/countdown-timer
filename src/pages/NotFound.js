import React from 'react';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom';

import SEO from 'components/SEO';
import routes from 'static/routes';

const NotFound = () => {
  return (
    <Container
      className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center"
    >
      <SEO title="Page Not Found" />
      <div
        aria-hidden
        className="text-muted display-1"
        style={{ userSelect: 'none' }}
      >
        404
      </div>
      <h1>Oops! The page you are looking for could not be found</h1>
      <p>The page might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Button
        as={Link}
        to={routes.home.path}
        variant="dark"
        block
        className="p-3"
        style={{ maxWidth: '960px' }}
      >
        Back to homepage
      </Button>
    </Container>
  );
}

export default NotFound;
