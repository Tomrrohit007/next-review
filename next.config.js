/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [toRemotePatterns(process.env.CMS_IMAGE_URL)],
  },
};

function toRemotePatterns(stringUrl) {
  const url = new URL(stringUrl);
  return {
    protocol: url.protocol.replace(":", ""),
    hostname: url.hostname,
    port: url.port,
    pathname: url.pathname,
  };
}
