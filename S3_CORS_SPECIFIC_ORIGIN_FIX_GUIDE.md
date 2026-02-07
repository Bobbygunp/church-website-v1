It appears we are still facing the same stubborn CORS issue with AWS S3, where your S3 bucket is not sending the correct headers to allow the browser to upload the image.

**`No 'Access-Control-Allow-Origin' header is present on the requested resource.`**

This means that despite our previous attempts, the CORS policy on your S3 bucket is still not configured in a way that S3 can recognize or apply correctly.

Let's try one more, more specific approach for the CORS policy. Instead of allowing any origin (`"*"`), we will explicitly specify your Vercel app's URL.

---

### Step 1: Meticulously Re-apply S3 CORS Configuration (with Specific Origin)

1.  **Go to your [AWS S3 Console](https://s3.console.aws.amazon.com/s3/home).**
2.  **Find and click on the name of your bucket** (e.g., `tcf-website-images`).
3.  Go to the "**Permissions**" tab.
4.  Scroll down to the "**Cross-origin resource sharing (CORS)**" section and click "**Edit**".
5.  **Delete any existing JSON content in the text box.**
6.  **Exactly copy and paste the following JSON configuration.** This time, we are replacing the wildcard `"*"` with your specific Vercel URL.

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

7.  Click "**Save changes**". **Ensure you see a confirmation message that the CORS policy was saved successfully.**

After saving, **clear your browser cache** or use an incognito window, and try uploading an image again.

---

### Step 2: Fixing the Tiptap Warning

While we are at it, I will also fix the Tiptap warning you're seeing: `[tiptap warn]: Duplicate extension names found: ['paragraph'].`

This is happening because `StarterKit` already includes a `paragraph` extension, and we are also adding one explicitly. The fix is to tell `StarterKit` not to use its default `paragraph` extension. I will apply this change to the code now.

After I've applied the code change, please **commit and push the latest changes to your Git repository** to trigger a new deployment on Vercel.

Let's hope that the more specific CORS configuration resolves this issue once and for all.
