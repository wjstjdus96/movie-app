import { IData, IGetDataResult, Itype } from "./data";

export interface IBanner {
  id: number;
  field: string;
  bgPhoto: string;
  title: string;
  overview: string;
}

export interface ISliderBox {
  field: string;
  listType: string;
  data: any;
  keyword?: string;
  isTotalType?: boolean;
  number?: number;
}

export interface ISliderBoxInfo {
  field: string;
  data: any;
  onClickDetail: () => void;
}

export interface ISlider {
  data?: IGetDataResult;
  title: string;
  listType: string;
  field: string;
}

export interface IForm {
  keyword: string;
}

export interface IVideoModal {
  detailData: any;
  relatedData: any;
  field: string;
  keyword?: string;
  logo: string | undefined;
}

export interface IModal {
  dataId: string;
  listType: string;
  field: string;
  keyword?: string;
  totalField?: string;
}

export interface ISliderPages {
  maxIndex: number;
  index: number;
}

export interface IPaginationProps {
  maxIndex: number;
  curIndex: number;
}

export interface ISliderArrow {
  onChangeIndex: (isBack: boolean) => void;
  isLeft: boolean;
}

export interface ISearchList {
  type: string;
}

export interface IMainBanner {
  data: IData;
  field: string;
}

export interface IVideoModalHead {
  bgImage: string;
  logoImage: string | undefined;
  title?: string;
}

export interface IVideoModalMainInfo {
  detailData: any;
}

export interface IVideoModalRelated {
  relatedData: any;
  field: string;
  keyword?: string;
}

export interface ISliderBoxLogo {
  logo: string | undefined;
  title: string;
}

export interface ISliderTitle {
  title: string;
}

export interface IUseOpenSliderModal {
  field: string;
  dataId: number;
  listType: string;
  keyword?: string;
  isTotalType?: boolean;
}

export interface ISliderSize {
  width: number | undefined;
  height: number | undefined;
}

export interface ISearchListInput {
  selectedType: Itype;
  setSelectedType: any;
}
