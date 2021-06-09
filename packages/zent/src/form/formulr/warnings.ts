import { warningOnce } from '../../utils/warningOnce';

export function warningSubscribeValue(shouldWarn: boolean, tag: string) {
  warningOnce(
    !shouldWarn,
    `form-subscribe-valid-${tag}`,
    'Subscribe `valid` of %s might cause performance issues, do it with caution.',
    tag
  );
}

export function warningSubscribeValid(shouldWarn: boolean, tag: string) {
  warningOnce(
    !shouldWarn,
    `form-subscribe-value-${tag}`,
    'Subscribe `value` of %s might cause performance issues, do it with caution.',
    tag
  );
}
