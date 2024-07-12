/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,      
  webpack: (config) => {      
    config.watchOptions = {   
      poll: 1000,             
      aggregateTimeout: 300   
    }
    config.resolve.alias.canvas = false;
    return config;            
  }                           
};

export default nextConfig;

