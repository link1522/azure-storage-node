import { BlobServiceClient } from 'npm:@azure/storage-blob';

const connectionString = Deno.env.get('AZURE_STORAGE_CONNECTION_STRING');
if (!connectionString) {
  throw new Error('AZURE_STORAGE_CONNECTION_STRING is not set');
}

const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);

export async function createContainer(containerName: string) {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  blobServiceClient.getContainerClient(containerName);
  await containerClient.create();

  console.log(`Created container ${containerName}`);
}
