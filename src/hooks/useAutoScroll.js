import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// Defer to browser for scroll restoration on 'POP'
const AUTO_SCROLL_ACTIONS = ['PUSH', 'REPLACE'];

const useAutoScroll = () => {
  const { action } = useHistory();
  const location = useLocation();
  useEffect(() => {
    const { hash } = location;
    if (AUTO_SCROLL_ACTIONS.includes(action)) {
      const fragment = (hash[0] === '#') ? hash.slice(1) : hash;
      let el;
      if (fragment) {
        el = document?.getElementById(fragment);
        if (!el) {
          const decodedFragment = decodeURIComponent(fragment);
          el = document?.getElementById(decodedFragment);
        }
      }
      // eslint-disable-next-line no-unused-expressions
      el ?  el.scrollIntoView() : window?.scrollTo(0, 0);
    }
  }, [action, location]);
};

export default useAutoScroll;
