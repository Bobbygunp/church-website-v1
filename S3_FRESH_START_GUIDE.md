I understand how frustrating this is. The error message you're receiving—`No 'Access-Control-Allow-Origin' header is present on the requested resource`—is definitive. It means that for some reason, your S3 bucket is not sending the correct CORS headers, even though you have configured them correctly.

We have exhausted all the standard debugging steps for the code and S3 bucket configuration. At this point, the most effective way forward is to start with a clean slate by creating a **new S3 bucket in a different AWS region**. This can help bypass any lingering misconfigurations or region-specific issues.

---

### Final Troubleshooting: Create a New S3 Bucket

Please follow these steps carefully.

#### Step 1: Create a New S3 Bucket

1.  **Go to your [AWS S3 Console](https://s3.console.aws.amazon.com/s3/home).**
2.  Click "**Create bucket**".
3.  **Bucket name**: Choose a **new, globally unique** name (e.g., `tcf-website-uploads-` followed by some random numbers).
4.  **AWS Region**: Select a different region than your previous bucket. A good choice is **US West (Oregon) `us-west-2`**.
5.  **Block Public Access settings**:
    *   Click "**Edit**" for "Block public access (bucket settings)".
    *   **Uncheck the box that says "Block all public access"**.
    *   Confirm the change if prompted.
6.  Click "**Create bucket**".

#### Step 2: Apply Permissions to the New Bucket

1.  Click on your **newly created bucket**.
2.  Go to the "**Permissions**" tab.
3.  **IAM Policy**: Your existing IAM user and policy (`ChurchWebsiteS3AccessPolicy`) should still work if you edit the policy to point to the new bucket.
    *   Go to your [IAM Console -> Policies](https://console.aws.amazon.com/iam/home#/policies).
    *   Find and click on `ChurchWebsiteS3AccessPolicy`.
    *   Click "**Edit policy**", go to the **JSON** tab, and update the `Resource` to use your **new bucket name**:
        ```json
        "Resource": "arn:aws:s3:::YOUR_NEW_BUCKET_NAME/*"
        ```
    *   Save the changes.
4.  **CORS Configuration**:
    *   Back in your S3 bucket's "**Permissions**" tab, scroll down to "**Cross-origin resource sharing (CORS)**" and click "**Edit**".
    *   **Paste the following JSON**, replacing the `AllowedOrigins` with your specific Vercel URL:
        ```json
        [
          {
            "AllowedHeaders": [
              "*"
            ],
            "AllowedMethods": [
              "PUT",
              "POST",
              "GET"
            ],
            "AllowedOrigins": [
              "https://church-website-v1-rst7-git-main-bobbys-projects-611248eb.vercel.app"
            ],
            "ExposeHeaders": [],
            "MaxAgeSeconds": 3000
          }
        ]
        ```
    *   Click "**Save changes**".

#### Step 3: Update Environment Variables in Vercel

1.  Go to your **Vercel Project Dashboard** -> **Settings** -> **Environment Variables**.
2.  Update the following variables with your new bucket's information:
    *   `AWS_S3_BUCKET_NAME`: Update this to your **new bucket name**.
    *   `AWS_S3_REGION`: Update this to your **new bucket's region** (e.g., `us-west-2`).
3.  Save the changes.

#### Step 4: Redeploy the Application

1.  Go to the "**Deployments**" tab in Vercel.
2.  Find your latest deployment, click the three dots (`...`), and select "**Redeploy**".
3.  Wait for the new deployment to complete.

After the new deployment is live, **clear your browser cache** and try uploading an image again.

This approach of creating a fresh bucket in a new region has a very high chance of resolving this persistent CORS issue.
