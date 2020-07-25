import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description }) => (
  <Helmet>
    {title && <title>{title}</title>}
    {description && <meta name="description" content={description} />}
    {title && <meta property="og:title" content={title} />}
    {description && <meta property="og:description" content={description} />}
  </Helmet>
);

export default SEO;
