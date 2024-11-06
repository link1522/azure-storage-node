import 'jsr:@std/dotenv/load';
import {
  createContainer,
  listContainers,
  listContainersByPage
} from './helpers/StorageHelper.ts';

// createContainer('test-999');
// listContainers();

listContainersByPage(10);
