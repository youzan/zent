import Input from '../../input';
import { II18nLocaleTransfer } from '../../i18n';

interface IProps {
  showSearch: boolean;
  searchPlaceholder: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  inputVal: string;
  classNamePrefix: string;
  i18n: II18nLocaleTransfer;
}

const Search: React.FC<IProps> = ({
  showSearch,
  classNamePrefix,
  searchPlaceholder,
  i18n,
  handleInputChange,
  inputVal,
}) => {
  if (!showSearch) {
    return null;
  }
  return (
    <div className={`${classNamePrefix}__search`}>
      <Input
        placeholder={searchPlaceholder || i18n.placeholder}
        icon="search"
        onChange={handleInputChange}
        value={inputVal}
        showClear
      />
    </div>
  );
};

export default Search;
