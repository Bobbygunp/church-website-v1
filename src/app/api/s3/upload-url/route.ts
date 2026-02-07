// src/app/api/s3/upload-url/route.ts
import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

// Initialize S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  signatureVersion: 'v4',
});

export async function POST(request: Request) {
  try {
    const { contentType } = await request.json();

    if (!contentType) {
      return NextResponse.json({ error: 'Content type is required' }, { status: 400 });
    }

    const fileExtension = contentType.split('/')[1];
    const key = `${uuidv4()}.${fileExtension}`; // Generate a unique key for the file

    const bucketName = process.env.AWS_S3_BUCKET_NAME!;

    // Create a pre-signed URL for the PUT operation
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: contentType,
      ACL: 'public-read', // Make the uploaded object publicly readable
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 }); // URL expires in 60 seconds

    // The final URL of the object after upload
    const objectUrl = `https://${bucketName}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${key}`;

    return NextResponse.json({ signedUrl, objectUrl });

  } catch (error) {
    console.error('Error generating signed URL:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
