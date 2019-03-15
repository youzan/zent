import * as React from 'react';

export interface IFormContext {
  zentForm: {
    [key: string]: any;
  };
}

const FormContext = React.createContext<IFormContext>({ zentForm: {} });

export default FormContext;
