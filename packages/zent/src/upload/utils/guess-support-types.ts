const subTypeGuessMap: {
  [type: string]: string[];
} = {
  image: ['jpeg', 'png', 'bmp', 'gif'],
  audio: ['mp3', 'wav', 'aac'],
  video: ['mp4', 'avi', 'webm'],
};

/** 推测可支持的文件格式 */
export const guessSupportTypes = (accept?: string): string[] => {
  if (!accept) {
    return [];
  }
  const supportTypes = [];
  const acceptTypes = accept.split(',').map(type => type.trim());

  acceptTypes.forEach(acceptType => {
    // .jpg
    if (acceptType[0] === '.') {
      supportTypes.push(acceptType.slice(1));
    }

    if (acceptType.indexOf('/') !== -1) {
      const [mimeType, subtype] = acceptType.split('/', 2);
      if (subtype !== '*') {
        // image/jpeg
        supportTypes.push(subtype);
      } else {
        // image/*
        supportTypes.push(...(subTypeGuessMap[mimeType] || []));
      }
    }
  });

  return supportTypes;
};
