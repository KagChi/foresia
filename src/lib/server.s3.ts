"use server";

import { objectStorageBucket, objectStorageEndpoint } from "@/client.config";
import { objectStorageKey, objectStorageSecret } from "@/server.config";
import { S3Client as AWSS3Client, DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const S3Client = new AWSS3Client({
    region: "AUTO",
    endpoint: objectStorageEndpoint,
    credentials: {
        accessKeyId: objectStorageKey,
        secretAccessKey: objectStorageSecret
    }
});

function parseType(type: string) {
    if (type === "posts") {
        return "/assets/posts";
    } if (type === "icons") {
        return "/assets/icons";
    } if (type === "banners") {
        return "/assets/banners";
    } if (type === "avatars") {
        return "/assets/avatars";
    }

    throw new Error("Invalid path type!");
}

export const deleteObject = async (objectId: string, type: string) => {
    const response = await S3Client.send(
        new DeleteObjectCommand({
            Bucket: objectStorageBucket,
            Key: `${parseType(type)}/${objectId}.jpg`
        })
    );

    return response;
};

export const putObject = async (objectId: string, type: string, buffer: ArrayBuffer) => {
    const response = await S3Client.send(
        new PutObjectCommand({
            Bucket: objectStorageBucket,
            Key: `${parseType(type)}/${objectId}.jpg`,
            Body: Buffer.from(buffer)
        })
    );

    return response;
};

export const getObject = async (objectId: string, type: string) => {
    const response = await S3Client.send(
        new GetObjectCommand({
            Bucket: objectStorageBucket,
            Key: `${parseType(type)}/${objectId}.jpg`
        })
    );

    return response;
};
