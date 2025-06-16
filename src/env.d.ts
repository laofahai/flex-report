declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * Database connection string. Supports SQLite, PostgreSQL (Supabase), MySQL, etc.
     * Example: "file:./dev.db" or "postgresql://user:pass@host:port/db" or "mysql://user:pass@host:port/db"
     */
    DATABASE_URL?: string;
    /**
     * Authentication type: clerk, internal, none
     */
    AUTH_TYPE?: | 'clerk' | 'internal' | 'none';
    /**
     * Your main application internal SSO login URL
     */
    INTERNAL_AUTH_URL?: string;
    /**
     * Internal SSO user info API URL
     */
    INTERNAL_AUTH_USERINFO_URL?: string;
    /**
     * Clerk public key (if using Clerk auth)
     */
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?: string;
    /**
     * Clerk secret key (if using Clerk auth)
     */
    CLERK_SECRET_KEY?: string;
    // Add more environment variables as needed
  }
}

