import axios from 'axios';

interface StorageInfo {
  alreadyCertified?: {
    blobId: string;
    endEpoch: number;
    eventOrObject: {
      Event: {
        txDigest: string;
      };
    };
  };
  newlyCreated?: {
    blobObject: {
      blobId: string;
      id: string;
      storage: {
        endEpoch: number;
      };
    };
  };
}

interface UploadResponse {
  info: StorageInfo;
  mediaType: string;
  blobUrl: string;
  status: 'Already certified' | 'Newly created';
  blobId: string;
  endEpoch: number;
  suiRef: string;
}

export async function uploadBlob(
  file: File,
  epochs: number = 1,
  publisherUrl: string = "https://publisher.walrus-testnet.walrus.space",
  aggregatorUrl: string = "https://aggregator.walrus-testnet.walrus.space"
): Promise<UploadResponse> {
  try {
    // Create form data
    const formData = new FormData();
    formData.append('file', file);

    // Upload the file
    const response = await axios.put(
      `${publisherUrl}/v1/store?epochs=${epochs}`,
      file,
      {
        headers: {
          'Content-Type': file.type,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to upload blob');
    }

    const storageInfo: StorageInfo = response.data;
    let uploadResponse: UploadResponse;

    if (storageInfo.alreadyCertified) {
      uploadResponse = {
        info: storageInfo,
        mediaType: file.type,
        blobUrl: `${aggregatorUrl}/v1/${storageInfo.alreadyCertified.blobId}`,
        status: 'Already certified',
        blobId: storageInfo.alreadyCertified.blobId,
        endEpoch: storageInfo.alreadyCertified.endEpoch,
        suiRef: storageInfo.alreadyCertified.eventOrObject.Event.txDigest
      };
    } else if (storageInfo.newlyCreated) {
      uploadResponse = {
        info: storageInfo,
        mediaType: file.type,
        blobUrl: `${aggregatorUrl}/v1/${storageInfo.newlyCreated.blobObject.blobId}`,
        status: 'Newly created',
        blobId: storageInfo.newlyCreated.blobObject.blobId,
        endEpoch: storageInfo.newlyCreated.blobObject.storage.endEpoch,
        suiRef: storageInfo.newlyCreated.blobObject.id
      };
    } else {
      throw new Error('Invalid response format');
    }

    return uploadResponse;

  } catch (error) {
    console.error('Error uploading blob:', error);
    throw error;
  }
}