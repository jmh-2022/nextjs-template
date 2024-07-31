export type TSelectOption<T = string> = {
  value: T;
  label?: string;
};

export type TCheckValue = { checked: boolean; value: any };
export type CheckContextProp = {
  disabled?: boolean;
  value?: string;
  onChange?: ({ checked, value }: TCheckValue) => void;
};

export type CheckboxGroupProp = {
  label: string;
  children: React.ReactNode;
  name: string;
  disabled?: boolean;
  value?: string;
  onChange?: ({ checked, value }: TCheckValue) => void;
};

export type RadioContextProp = {
  name: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: TSelectOption) => void;
};

export type RadioGroupProp = {
  label: string;
  children: React.ReactNode;
  name: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: TSelectOption) => void;
};
