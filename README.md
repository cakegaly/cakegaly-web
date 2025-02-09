# cakegaly-web

---

## Tech Stack

- **[Next.js](https://nextjs.org/)**
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[shadcn/ui](https://ui.shadcn.com/)**
- **[MDX](https://mdxjs.com/)**
<!-- - **[Storybook](https://storybook.js.org/)** -->
- **ESLint + Prettier**

## Running Locally

Follow these steps to get the application up and running on your local machine:

1. Clone this repository:

   ```sh
   git clone git@github.com:cakegaly/cakegaly-web.git
   cd cakegaly-web
   ```

2. Install the dependencies & Setup your local `.env` file:

   ```sh
   pnpm install
   cp .env.example .env.local
   ```

3. Run the build command to prepare the next.js data cache:

   ```sh
   pnpm build
   ```

4. Run the development server:

   ```sh
   pnpm dev
   ```

5. Visit `http://localhost:8888` in your browser to see the app in action.

<!-- 6. Run the storybook server:

   ```sh
   npm run storybook
   ```

7. Visit `http://localhost:6006` in your browser to see storybook in action. -->
