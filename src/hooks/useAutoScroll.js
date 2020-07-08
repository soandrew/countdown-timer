import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { document, window } from 'browser-monads';

// Defer to browser for scroll restoration on 'POP'
const AUTO_SCROLL_ACTIONS = ['PUSH', 'REPLACE'];

const useAutoScroll = () => {
  const { action } = useHistory();
  const location = useLocation();
  useEffect(() => {
    const { hash } = location;
    if (AUTO_SCROLL_ACTIONS.includes(action)) {
      const fragment = (hash && hash[0] === '#') ? hash.slice(1) : hash;
      let el;
      if (fragment) {
        el = document.getElementById(fragment);
        if (!el) {
          const decodedFragment = decodeURIComponent(fragment);
          el = document.getElementById(decodedFragment);
        }
      }
      el ?  el.scrollIntoView() : window.scrollTo(0, 0);
    }
  }, [action, location]);
};

export default useAutoScroll;
