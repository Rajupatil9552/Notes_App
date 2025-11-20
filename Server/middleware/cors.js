const corsMiddleware = (req, res, next) => {
  const allowedOrigins = [
    'http://localhost:5173', 
    'http://localhost:5174',
    'https://notes-app-f9s2.vercel.app', // Your Vercel domain
    'https://notes-app-git-main-rajupatil9552.vercel.app' // Your actual Vercel URL
  ];
  
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    // For production, you might want to allow your main Vercel domain
    res.header('Access-Control-Allow-Origin', 'https://notes-app-f9s2.vercel.app');
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
}

export default corsMiddleware;