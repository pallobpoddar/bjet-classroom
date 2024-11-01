import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  DeleteObjectCommandInput,
  DeleteObjectCommand,
  DeleteObjectsCommandInput,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import config from "../config";

const s3Client = new S3Client({
  region: config.awsRegion,
  credentials: {
    accessKeyId: config.awsAccessKeyId || "",
    secretAccessKey: config.awsSecretAccessKey || "",
  },
});

const uploadToS3 = async (params: PutObjectCommandInput) => {
  try {
    await s3Client.send(new PutObjectCommand(params));
    const url = `https://${params.Bucket}.s3.${config.awsRegion}.amazonaws.com/${params.Key}`;

    return url;
  } catch (error) {
    throw error;
  }
};

const deleteOneFromS3 = async (params: DeleteObjectCommandInput) => {
  try {
    await s3Client.send(new DeleteObjectCommand(params));
  } catch (error) {
    throw error;
  }
};

const deleteManyFromS3 = async (params: DeleteObjectsCommandInput) => {
  try {
    await s3Client.send(new DeleteObjectsCommand(params));
  } catch (error) {
    throw error;
  }
};

export { uploadToS3, deleteOneFromS3, deleteManyFromS3 };
