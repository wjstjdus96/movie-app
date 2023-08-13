import { IGetDataResult } from "./data";

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
  title: string;
}

export interface IPaginationProps {
  maxIndex: number;
  curIndex: number;
}

export interface ISliderArrow {
  onChangeIndex: (isBack: boolean) => void;
}
