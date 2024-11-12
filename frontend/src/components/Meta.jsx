import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};
Meta.defaultProps = {
  title: 'Welcome to ProShop',
  description: 'E-commerce platform for buying and selling products',
  keywords: 'e-commerce, shopping, online store',
}
export default Meta;
