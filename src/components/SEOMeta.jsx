import { Helmet } from "react-helmet-async";

const SEOMeta = ({ title, description }) => {
  return (
    <Helmet>
      {/* TITLE */}
      <title>{title}</title>

      {/* META DESCRIPTION */}
      <meta name="description" content={description} />

      {/* OPEN GRAPH */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />

      {/* TWITTER */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEOMeta;
