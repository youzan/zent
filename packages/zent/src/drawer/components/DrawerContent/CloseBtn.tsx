import Icon from '../../../icon';
import isNil from '../../../utils/isNil';

export const renderCloseBtn = (
  closeBtn: React.ReactNode,
  onClose: () => void
) => {
  if (isNil(closeBtn)) {
    return null;
  }

  return (
    <div onClick={onClose} className="zent-drawer-close">
      {true === closeBtn ? <Icon type="close" /> : closeBtn}
    </div>
  );
};
