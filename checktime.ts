import * as rimraf from 'rimraf';

import { prisma } from './generated/prisma-client/index';

export async function checkMetadata() {
  const [{ expire }] = await prisma.metadatas();

  const timestamp = parseInt(expire, 10);

  const currentTimestamp = new Date().getTime();

  if (timestamp <= currentTimestamp) {
    try {
      rimraf.sync('./test');
      // file removed
    } catch (err) {
      console.error(err);
    }
    return;
  }

  console.log('You still have some time');
}
