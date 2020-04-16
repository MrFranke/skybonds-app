export type TRawData = {
  Open: number;
  Close: number;
  Volume: number;
  Date: number;
  High: number;
  Low: number;
}

export type TFormattedData = {
  value: number;
} & TRawData;
