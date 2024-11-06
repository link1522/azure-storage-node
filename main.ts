import 'jsr:@std/dotenv/load';
import {
  createContainer,
  listContainers,
  listContainersByPage,
  createFileBlob,
  uploadFileBlob,
  listBlobs,
  downloadBlob
} from './helpers/StorageHelper.ts';

// createContainer('test-999');

// listContainers();

// listContainersByPage(10);

// createFileBlob({
//   containerName: 'test-666',
//   blobName: 'my-blob.txt',
//   content: 'Hello, World!'
// });

// uploadFileBlob({
//   containerName: 'test-666',
//   blobName: 'test.png',
//   filePath: './test.png'
// });

// listBlobs('test-666');

downloadBlob('test-666', 'test.png');
