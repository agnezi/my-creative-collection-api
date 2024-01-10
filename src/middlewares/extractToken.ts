import { Request, Response, NextFunction } from 'express';

interface MiddlewareRequest extends Request {
  token?: string;
  user?: {
    username?: string;
  };
}

export const extractToken = (
  req: MiddlewareRequest,
  res: Response,
  next: NextFunction,
): void => {
  // Get the Authorization header
  const authHeader: string | undefined = req.headers['authorization'] as string;

  // Check if the header exists
  if (authHeader) {
    // Split the header value to extract the Bearer token
    const tokenArray: string[] = authHeader.split(' ');

    // Check if the header has the expected format "Bearer <token>"
    if (tokenArray.length === 2 && tokenArray[0].toLowerCase() === 'bearer') {
      // Attach the token to the request object for later use
      req.token = tokenArray[1];
      req.user = {
        username: tokenArray[1],
      };
      // Continue to the next middleware or route handler
      next();
    } else {
      // Return a 401 Unauthorized status if the header format is incorrect
      res.status(401).json({ error: 'Invalid Authorization header format' });
    }
  } else {
    // Return a 401 Unauthorized status if the Authorization header is missing
    res.status(401).json({ error: 'Authorization header is missing' });
  }
};
