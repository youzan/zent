import isNil from '../../../utils/isNil';

export const renderHeader = (title: React.ReactNode) => {
  if (isNil(title)) {
    return null;
  }

  return (
    <div className="zent-drawer-header">
      {typeof title === 'number' || typeof title === 'string' ? (
        <span className="zent-drawer-header__title">{title}</span>
      ) : (
        title
      )}
    </div>
  );
};
