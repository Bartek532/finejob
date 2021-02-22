declare namespace Express {
  interface Request {
    token?: string;
    user?: {
      id: number;
      name: string;
      company: string;
      email: string;
      password: string;
    };
  }
}
