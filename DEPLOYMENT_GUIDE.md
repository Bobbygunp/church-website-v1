# How to Deploy Your Church Website

Deploying your Next.js application is a straightforward process. We recommend using **Vercel**, the platform built by the creators of Next.js, as it provides the best integration and is free to start.

Here is a step-by-step guide to get your website live for your church members and the world to see.

---

### Step 1: Push Your Code to a Git Repository

Before you can deploy your site, your code needs to be on a Git hosting service. If you haven't done this already, you'll need to:

1.  **Create a new repository** on a platform like [GitHub](https://github.com/new), [GitLab](https://gitlab.com/projects/new), or [Bitbucket](https://bitbucket.org/repo/create).
2.  **Initialize Git in your project folder** (if you haven't already):
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
3.  **Link your local project to the remote repository** and push your code:
    ```bash
    # Replace with your repository URL
    git remote add origin https://github.com/your-username/your-repo-name.git
    git branch -M main
    git push -u origin main
    ```

---

### Step 2: Sign Up for Vercel

1.  Go to [vercel.com](https://vercel.com) and sign up for a new account. The easiest way is to sign up using your GitHub, GitLab, or Bitbucket account.

---

### Step 3: Import and Deploy Your Project

1.  **From your Vercel dashboard**, click the "**Add New...**" button and select "**Project**".
2.  **Import your Git Repository**: Find the repository you just created and click the "**Import**" button next to it.
3.  **Configure Your Project**: Vercel will automatically detect that you're using Next.js. You now need to configure the environment variables.

---

### Step 4: Configure Environment Variables

This is the most important step to ensure your deployed site can connect to your database and authentication works correctly.

1.  In the "Configure Project" screen, expand the "**Environment Variables**" section.
2.  Add the following variables:

    *   **`DATABASE_URL`**:
        *   **Name**: `DATABASE_URL`
        *   **Value**: This is the connection string for your NeonDB database. You should have this in your local `.env` file. It will look something like `postgresql://...`.

    *   **`NEXTAUTH_SECRET`**:
        *   **Name**: `NEXTAUTH_SECRET`
        *   **Value**: This is a secret key used to secure your authentication sessions. You need to generate a strong, random string for this. You can use the following command in your terminal to generate one:
            ```bash
            openssl rand -base64 32
            ```
            Copy the output and paste it as the value.

    *   **`NEXTAUTH_URL`**:
        *   **Name**: `NEXTAUTH_URL`
        *   **Value**: Vercel will automatically provide the URL of your deployed site. When you have a custom domain, you'll update this to your domain (e.g., `https://www.yourchurchwebsite.com`). For now, you can leave this blank, and Vercel will handle it, but it's good practice to set it once your site is deployed.

3.  After adding the environment variables, click the "**Deploy**" button.

---

### Step 5: All Done!

Vercel will now start building and deploying your website. This process may take a few minutes. Vercel will run the `prisma generate && next build` command we configured.

Once the deployment is complete, you'll be given a URL (like `your-project-name.vercel.app`) where you can view your live website. You can share this link with your church members!

Later, you can go to your project's "Domains" settings in Vercel to add a custom domain (e.g., `yourchurch.com`).

Congratulations on your new website!
