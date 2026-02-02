# Terrific Todo Client Application

This is the client-side application for the Terrific Todo project, built with React, TypeScript, and Vite.

## Getting Started

Follow these steps to get the client application running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js**: Version 18 or higher (LTS recommended). You can download it from [nodejs.org](https://nodejs.org/).
-   **npm** or **Yarn** or **pnpm**: A package manager. npm comes with Node.js. Its prefered to use yarn

### Installation

1.  **Clone the repository** (if you haven't already):

    ```bash
    git clone https://github.com/hacknugithub/trfc-todo
    cd terrific-todo
    ```

2.  **Install dependencies**:

    Navigate to the `terrific-todo` directory and install the required packages:

    ```bash
    yarn install
    ```

3.  **Database**:

   Make sure you have postgress installed and running


### Running the Application

To start the development server:

```bash
yarn dev
```

This will start the application in development mode, typically accessible at `http://localhost:5173` (or another port if 5173 is in use). The page will reload if you make edits.

### Building for Production

To build the application for production:

```bash
yarn build
```

This command bundles React in production mode and optimizes the build for the best performance. The build artifacts will be stored in the `dist/` directory.

### Linting

To run the linter to check for code style and potential errors:

```bash
yarn @terrific-todo/client lint
```

For more advanced ESLint configuration and React-specific lint rules, refer to the original `README.md` content or the project's `eslint.config.js` file.
