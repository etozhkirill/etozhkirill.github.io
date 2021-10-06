module.exports = () => {
  const env = {
    LOCATION_ORIGIN:
      process.env['LOCATION_ORIGIN'] ||
      `http://localhost:${process.env['PORT']}`
  };

  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    env,
    trailingSlash: true
  };
  return nextConfig;
};
