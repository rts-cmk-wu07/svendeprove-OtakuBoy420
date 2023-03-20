import { Helmet } from "react-helmet-async";

const SEO = ({ title }) => {
  return (
    <Helmet
      prioritizeSeoTags={true}
      title={title}
      htmlAttributes={{ lang: "en" }}
      meta={[
        {
          property: `og:title`,
          content: title,
        },
        {
          name: `twitter:title`,
          content: title,
        },
      ]}
    />
  );
};
export default SEO;
