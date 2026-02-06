# AWS S3 Setup for Image Uploads

To solve the "Payload Too Large" issue, we will now implement image uploads to AWS S3. Before we change the code, you need to set up a few things in your AWS account.

**If you don't have an AWS account, you'll need to [create one](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/).**

---

### Step 1: Create an S3 Bucket

An S3 bucket is a container for your files (in this case, your speaker images).

1.  **Navigate to the S3 service** in your AWS Console.
2.  Click "**Create bucket**".
3.  **Bucket name**: Choose a **globally unique** name (e.g., `your-church-website-images-` followed by some random numbers).
4.  **AWS Region**: Select a region close to you or your users (e.g., `us-west-2` for US West (Oregon)).
5.  **Block Public Access settings**: For now, you can leave the "Block all public access" settings checked. We will be granting temporary, secure access to upload and view images using pre-signed URLs.
6.  Click "**Create bucket**".

---

### Step 2: Create an IAM User for Programmatic Access

It's a security best practice to create a dedicated user with limited permissions to access your AWS resources, rather than using your root account.

1.  **Navigate to the IAM service** in your AWS Console.
2.  Go to **Users** and click "**Create user**".
3.  **User name**: Give it a descriptive name, like `church-website-s3-uploader`.
4.  Select "**Attach policies directly**" and click "**Next**".
5.  In the "Permissions policies" section, click "**Create policy**". This will open a new tab.
    *   In the policy editor, switch to the **JSON** tab.
    *   Paste the following policy. **Replace `YOUR_BUCKET_NAME` with the actual name of the S3 bucket you created in Step 1.**
        ```json
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Action": [
                "s3:PutObject",
                "s3:GetObject"
              ],
              "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
            }
          ]
        }
        ```
    *   Click "**Next: Tags**", then "**Next: Review**".
    *   **Name** the policy `ChurchWebsiteS3AccessPolicy` and click "**Create policy**".
6.  **Go back to the "Create user" tab**, refresh the list of policies, and attach the `ChurchWebsiteS3AccessPolicy` you just created. Click "**Next**".
7.  Review the user details and click "**Create user**".

---

### Step 3: Get Your Access Keys

1.  After the user is created, click on their name in the user list.
2.  Go to the "**Security credentials**" tab.
3.  Scroll down to "**Access keys**" and click "**Create access key**".
4.  Select "**Application running outside AWS**" and click "**Next**".
5.  Click "**Create access key**".
6.  **This is the only time you will see the Secret access key.** Copy both the **Access key ID** and the **Secret access key** and save them somewhere safe. You will need them for the next step.

---

### Step 4: Set Environment Variables

You will need to add these new credentials as environment variables in your Vercel project settings and your local `.env` file for development.

*   **`AWS_ACCESS_KEY_ID`**: The Access Key ID you just saved.
*   **`AWS_SECRET_ACCESS_KEY`**: The Secret Access Key you just saved.
*   **`AWS_S3_REGION`**: The region where you created your S3 bucket (e.g., `us-west-2`).
*   **`AWS_S3_BUCKET_NAME`**: The name of the S3 bucket you created.

Once you have completed these steps and configured your environment variables, I can proceed with the code changes to integrate the S3 upload functionality.
