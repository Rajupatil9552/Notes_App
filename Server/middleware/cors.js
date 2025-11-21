const corsMiddleware = (req, res, next) => {
  const allowedOrigins = [
    'http://localhost:5173', 
    'http://localhost:5174',
    'https://notes-app-f9s2.vercel.app',
    'https://notes-app-fyar.vercel.app', // Your actual Vercel domain
    'https://notes-app-*.vercel.app'     // Allow all Vercel preview domains
  ];
  
  const origin = req.headers.origin;
  
  // Allow any Vercel preview domain
  if (origin && origin.endsWith('.vercel.app')) {
    res.header('Access-Control-Allow-Origin', origin);
  } 
  // Allow specific domains
  else if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  // For production, allow the main domain
  else {
    res.header('Access-Control-Allow-Origin', 'https://notes-app-fyar.vercel.app');
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
