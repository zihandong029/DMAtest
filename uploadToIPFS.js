// upload-to-filebase.js
import pkg from 'aws-sdk';
const { S3 } = pkg;
import { readFileSync } from 'fs';

// 配置 Filebase
const s3 = new S3({
  endpoint: 'https://s3.filebase.com',
  accessKeyId: 'ADFB8A39E10059330322',
  secretAccessKey: 'hHtyPFrGWbigHmn4GnPKUKHMNGFKXbRgQpxQHBit',
  region: 'us-east-1',
  signatureVersion: 'v4'
});

// 上传图片函数
async function uploadImage(filePath, fileName) {
  const fileContent = readFileSync(filePath);
  
  const params = {
    Bucket: 'dma-test-first',
    Key: fileName,
    Body: fileContent,
    ContentType: 'image/png' // 根据你的图片格式调整
  };

  try {
    const result = await s3.upload(params).promise();
    console.log(`文件上传成功: ${result.Location}`);
    
    // 获取 IPFS CID
    const headResult = await s3.headObject({
      Bucket: 'dma-test-first',
      Key: fileName
    }).promise();
    
    console.log(`IPFS CID: ${headResult.Metadata['ipfs-hash']}`);
    return headResult.Metadata['ipfs-hash'];
  } catch (error) {
    console.error('上传失败:', error);
  }
}

// 使用示例
uploadImage('./testUploadFiles/DMA3.png', 'DMA3.png');
uploadImage('./testUploadFiles/DMA4.png', 'DMA4.png');