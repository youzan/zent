import { IUploadTipConfig, IUploadTipsFunc } from '../types';

export function getTipsContent<P>(
  tips: React.ReactNode | IUploadTipsFunc<P>,
  config: IUploadTipConfig<P>
) {
  if (typeof tips === 'function') {
    return tips(config);
  }
  return tips;
}
