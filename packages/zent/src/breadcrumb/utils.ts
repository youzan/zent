import { IBreadcrumbItemProps } from './Item';

const MIN_FOLD_COUNT = 2;

interface IGetFoldItemsParam {
  breads: IBreadcrumbItemProps[];
  isFolded: boolean;
  maxItemCount: number;
  foldProps: IBreadcrumbItemProps;
}

type GetFoldItems = (param: IGetFoldItemsParam) => IBreadcrumbItemProps[];

export const getFoldItems: GetFoldItems = ({
  breads,
  isFolded,
  maxItemCount,
  foldProps,
}) => {
  if (!maxItemCount || maxItemCount < MIN_FOLD_COUNT) return breads;
  if (!isFolded || breads?.length <= maxItemCount) return breads;
  const result = [...breads];
  result.splice(1, breads.length - maxItemCount, foldProps);
  return result;
};
