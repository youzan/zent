import { useCallback } from 'react';

import Checkbox, { ICheckboxEvent } from '../../checkbox';
import { II18nLocaleTransfer } from '../../i18n';

interface IProps {
  isAllChecked: boolean;
  handleCheckBoxChange: (e: ICheckboxEvent<boolean>) => void;
  compontentDisabled: boolean;
  classNamePrefix: string;
  i18n: II18nLocaleTransfer;
  selectedKeysLength: number;
  listDataLength: number;
  title: React.ReactNode;
}

const AllCheckBox: React.FC<IProps> = ({
  classNamePrefix,
  isAllChecked,
  handleCheckBoxChange,
  compontentDisabled,
  i18n,
  selectedKeysLength,
  listDataLength,
  title,
}) => {
  const getTitle = useCallback(
    ({ item, items }) => {
      const totalText = `${listDataLength} ${
        listDataLength > 1 ? items : item
      }`;

      if (selectedKeysLength > 0) {
        return title
          ? `${title}（${selectedKeysLength}/${totalText}）`
          : `${selectedKeysLength}/${totalText}`;
      }
      return title ? `${title}（${totalText}）` : totalText;
    },
    [title, listDataLength, selectedKeysLength]
  );

  return (
    <div className={`${classNamePrefix}__allCheckbox`}>
      <Checkbox
        checked={isAllChecked}
        indeterminate={selectedKeysLength && !isAllChecked}
        onChange={handleCheckBoxChange}
        disabled={compontentDisabled}
      >
        {getTitle(i18n)}
      </Checkbox>
    </div>
  );
};

export default AllCheckBox;
