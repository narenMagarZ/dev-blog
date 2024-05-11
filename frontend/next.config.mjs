/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        'remotePatterns':[{
            protocol:'http',
            hostname:'localhost',
            port:'5000',
            pathname:'/images/**'
        },
        {
            protocol:'https',
            hostname:'lh3.googleusercontent.com'
        },
        {
            protocol:'https',
            hostname:'avatars.githubusercontent.com'
        }
    ]
    }
};

export default nextConfig;
