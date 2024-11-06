import { BlobServiceClient } from 'npm:@azure/storage-blob';

const connectionString = Deno.env.get('AZURE_STORAGE_CONNECTION_STRING');
if (!connectionString) {
  throw new Error('AZURE_STORAGE_CONNECTION_STRING is not set');
}

const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);

export async function createContainer(containerName: string) {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.create();

  console.log(`Created container ${containerName}`);
}

export async function listContainers() {
  const containers = blobServiceClient.listContainers();
  let i = 1;
  for await (const container of containers) {
    console.log(`Container ${i++}: ${container.name}`);
  }
}

export async function listContainersByPage(maxPageSize: number) {
  let i = 1;
  let page = 1;

  for await (const response of blobServiceClient.listContainers().byPage({
    maxPageSize
  })) {
    if (response.containerItems) {
      console.log(`\n============= Page ${page++} =============`);
      for (const container of response.containerItems) {
        console.log(`Container ${i++}: ${container.name}`);
      }
    }
  }
}

export async function createFileBlob({
  containerName,
  blobName,
  content
}: {
  containerName: string;
  blobName: string;
  content: string;
}) {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.upload(content, content.length);

  console.log(`Created blob ${blobName}`);
}

export async function uploadFileBlob({
  containerName,
  blobName,
  filePath
}: {
  containerName: string;
  blobName: string;
  filePath: string;
}) {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadFile(filePath);

  console.log(`Created blob ${blobName}`);
}

export async function listBlobs(containerName: string) {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blobs = containerClient.listBlobsFlat();
  let i = 1;
  for await (const blob of blobs) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }
}
