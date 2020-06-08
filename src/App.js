import React from 'react';
import { Link } from 'react-router-dom';
import CountdownTimer from 'components/CountdownTimer';
import useQueryParams from 'hooks/useQueryParams';

function App() {
  const { iso, title } = useQueryParams();
  return (
    <>
      <CountdownTimer title={title} iso={iso} />
      Set timer to:
      <ul>
        <li>
          <Link to="?iso=2020-06-13T00:00:00-04:00">June 13th</Link>
        </li>
        <li>
          <Link to="?iso=2020-06-30T00:00:00-04:00">June 30th</Link>
        </li>
      </ul>
    </>
  );
}

export default App;
