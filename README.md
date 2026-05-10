## PollApp

## Security
 All database IDs use UUID (universally unique identifier) instead of sequential integers
to prevent ID enumeration attacks.
 Supabase Row Level Security (RLS) is enabled on all tables.
 No authentication is required for this project — all policies are set to public read and
write.

Getting Started
Prerequisites
Ensure you have Node.js (https://nodejs.org/) and the Angular CLI
(https://angular.dev/tools/cli) installed.
Installation
1. 1. Clone the repository.
2. 2. Open your terminal and navigate to the project directory:
cd PollApp
3. 3. Install the dependencies:
npm install

## Development Server
To start the local development server, run:
ng serve
Once the server is running, navigate to http://localhost:4200/. The application will reload
automatically if you change any source files.

## Build

```bash
ng build
```

## Additional Resources

[Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)