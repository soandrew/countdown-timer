import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import CountdownTimer from 'components/CountdownTimer';
import useQueryParams from 'hooks/useQueryParams';
import routes from 'static/routes';
import styles from './DisplayCountdown.module.scss';

const {
  SeeMore: seeMoreClass,
  SeeMore__linkGroup: seeMoreLinkGroupClass,
} = styles;

const SeeMore = () => {
  return (
    <Container className={seeMoreClass} aria-labelledby="see-more">
      <p id="see-more">Need a different countdown?</p>
      <p className={seeMoreLinkGroupClass}>
        <Button
          as={Link}
          to={routes.home.path}
          variant="outline-light"
          block
        >
          Browse common countdowns
        </Button>
        <span className="mt-1 mb-2 mx-3">or</span>
        <Button
          as={Link}
          to={routes.create.path}
          variant="outline-light"
          block
        >
          Create a custom countdown
        </Button>
      </p>
    </Container>
  );
}

const DisplayCountdown = () => {
  const { iso, zone, title } = useQueryParams();
  return (
    <>
      <CountdownTimer iso={iso} zone={zone} title={title} />
      <nav className="bg-dark text-white pt-3 pb-1">
        <SeeMore />
      </nav>
    </>
  );
};

export default DisplayCountdown;
