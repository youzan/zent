import { IUploadTipConfig, IUploadTipsFunc } from '../types';

export function getTipsContent<P>(
  tips: string | IUploadTipsFunc<P>,
  config: IUploadTipConfig<P>,
  defaultGenerator: (config: any) => string
) {
  if (typeof tips === 'function') {
    return tips(config);
  }
  return defaultGenerator(config);
}
