import { warningOnce } from '../../utils/warningOnce';

export function warningSubscribeValue() {
  warningOnce(
    false,
    'form-subscribe-valid',
    'Subscribe `valid` of field array, field set or form might cause performance issues, do it with caution.'
  );
}

export function warningSubscribeValid() {
  warningOnce(
    false,
    'form-subscribe-value',
    'Subscribe `value` of field array, field set or form might cause performance issues, do it with caution.'
  );
}
