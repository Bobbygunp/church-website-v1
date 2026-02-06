To add environment variables to your Vercel project, follow these steps:

1.  **Log in to Vercel**: Go to [vercel.com/dashboard](https://vercel.com/dashboard) and log in to your account.

2.  **Navigate to Your Project**:
    *   From your dashboard, find and click on the specific project for your church website (e.g., `church-website-v1`).

3.  **Go to Project Settings**:
    *   On your project's overview page, click on the "**Settings**" tab (usually located near the top of the page, next to "Deployments", "Analytics", etc.).

4.  **Find Environment Variables**:
    *   In the left-hand sidebar of the settings page, click on "**Environment Variables**".

5.  **Add Each Variable**:
    *   For each of the required AWS environment variables:
        *   **`AWS_ACCESS_KEY_ID`**
        *   **`AWS_SECRET_ACCESS_KEY`**
        *   **`AWS_S3_REGION`**
        *   **`AWS_S3_BUCKET_NAME`**
        *   You also need `NEXTAUTH_SECRET` if you haven't set it already.

    *   **For each variable, do the following:**
        1.  In the input field under "Name", type the variable name exactly (e.g., `AWS_ACCESS_KEY_ID`).
        2.  In the input field under "Value", paste the corresponding secret value you obtained from AWS (or the generated `NEXTAUTH_SECRET`).
        3.  Under "Environments", select **Production**, **Preview**, and **Development** (it's good practice to set them for all, but Production is critical for your deployed site).
        4.  Click the "**Add**" button.

    *   **Repeat this process for all four AWS variables and `NEXTAUTH_SECRET`**.

6.  **Verify (Optional but Recommended)**: After adding all variables, you should see them listed in the table below. The values will be masked for security, but you can confirm the names are correct.

7.  **Trigger a New Deployment**:
    *   After adding new environment variables, Vercel **requires a new deployment** for these changes to take effect.
    *   Go back to the "**Deployments**" tab for your project.
    *   You can either:
        *   Push a new commit to your Git repository (if you have local code changes that need to be pushed anyway). This is the most common way.
        *   Manually trigger a redeployment of your latest successful build. Find your latest production deployment, click the three dots (`...`) next to it, and select "Redeploy".

Once the new deployment is complete, your application will have access to these environment variables, and the S3 image upload functionality should work as intended.
