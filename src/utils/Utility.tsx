import { useLayoutEffect, useState, useEffect, RefObject } from "react";
import { createStyled } from "@mui/system";
import AggerTheme from "./AggerTheme";
import axios, { AxiosRequestConfig } from "axios";
import { TextContent, EditableContentName } from "../types/aggerTypes";

export const BACKEND_URL = process.env
  .NEXT_PUBLIC_REACT_APP_BACKEND_URL as string;
export const REACT_HIRE_API_URL = process.env
  .NEXT_PUBLIC_REACT_APP_HIRE_API_URL as string;

export const backendHttp = axios.create({
  baseURL: BACKEND_URL,
});

backendHttp.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { origin } = new URL(BACKEND_URL + config.url);
    const allowedOrigins = [BACKEND_URL];
    if (allowedOrigins.includes(origin)) {
      config.headers!["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

type Event = MouseEvent | TouchEvent;
export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      handler(event); // Call the handler only if the click is outside of the element passed.
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Reload only if ref or handler changes
};

export const scrollTo = (id: string): void => {
  const element = document.querySelector(id)!;
  const navbarOffset = document
    .querySelector("#navbar")!
    .getBoundingClientRect().height;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

  if (element) {
    // element.scrollIntoView({ behavior: "smooth", block: "start" });
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export const scrollToRef = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>
): void => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export const createStyledAggerTheme = () => {
  return createStyled({ defaultTheme: AggerTheme });
};

export const useGetHtmlInnerText = (html: string) => {
  let text = "";
  useLayoutEffect(() => {
    var div = document.createElement("div");
    div.innerHTML = html;
    text = div.textContent || div.innerText || "";
  }, []);
  return text;
};

export const mergeSxProps = () => {
  return <></>;
};

export const isValidCPF = (cpf: string) => {
  if (typeof cpf !== "string") return false;
  cpf = cpf.replace(/[\s.-]*/gim, "");
  if (!cpf || cpf.length !== 11 || stringWithRepeatedCharacters(cpf)) {
    return false;
  }
  let soma = 0;
  let resto;
  for (let i = 1; i <= 9; i++) {
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }
  if (resto !== parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.substring(10, 11))) {
    return false;
  }
  return true;
};

export const isValidCNPJ = (value: string) => {
  if (!value) {
    return false;
  }

  // Aceita receber o valor como string, número ou array com todos os dígitos
  const isString = typeof value === "string";
  const validTypes =
    isString || Number.isInteger(value) || Array.isArray(value);

  // Elimina valor em formato inválido
  if (!validTypes) {
    return false;
  }
  // Filtro inicial para entradas do tipo string
  if (isString) {
    // Limita ao máximo de 18 caracteres, para CNPJ formatado
    if (value.length > 18) {
      return false;
    }
    // Teste Regex para veificar se é uma string apenas dígitos válida
    const digitsOnly = /^\d{14}$/.test(value);
    // Teste Regex para verificar se é uma string formatada válida
    const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value);

    if (!digitsOnly && !validFormat) {
      return false;
    }
  }
  // Guarda um array com todos os dígitos do valor
  const match = value.toString().match(/\d/g);
  const numbers = Array.isArray(match) ? match.map(Number) : [];

  // Valida a quantidade de dígitos
  if (numbers.length !== 14) {
    return false;
  }

  // Elimina inválidos com todos os dígitos iguais
  // const items = [...new Set(numbers)];
  // if (items.length === 1) return false;
  if (numbers.every((char) => char === numbers[0])) {
    return false;
  }

  // Cálculo validador
  const calc = (x: number) => {
    const slice = numbers.slice(0, x);
    let factor = x - 7;
    let sum = 0;

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i];
      sum += n * factor--;
      if (factor < 2) factor = 9;
    }

    const result = 11 - (sum % 11);

    return result > 9 ? 0 : result;
  };

  // Separa os 2 últimos dígitos de verificadores
  const digits = numbers.slice(12);

  // Valida 1o. dígito verificador
  const digit0 = calc(12);
  if (digit0 !== digits[0]) {
    return false;
  }
  // Valida 2o. dígito verificador
  const digit1 = calc(13);
  return digit1 === digits[1];
};

export const validateCEP = async (cep: string | number) => {
  const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

  if (res.status === 200) {
    return res.data;
  } else {
    return false;
  }
};

export const stringWithRepeatedCharacters = (string: string) => {
  return string.split("").every((char) => char === string[0]);
};

export type HandleChangeParametersType<T, K> = {
  editablePropName: K;
  editablePropValue: unknown;
  oldProps: T;
  contentName: keyof T;
  contentIndex: number;
  subContentName?: string;
  update: (arg0: T) => void;
};

export type onPropChangeParameters<T, K> = Required<
  Pick<
    HandleChangeParametersType<T, K>,
    "editablePropName" | "editablePropValue" | "contentName" | "contentIndex"
  >
> &
  Pick<HandleChangeParametersType<T, K>, "subContentName">;

export const handleEditableContentChange = <
  EditableSectionTypes,
  EditableContentName
>({
  editablePropName,
  editablePropValue,
  contentName,
  contentIndex,
  subContentName,
  oldProps,
  update,
}: HandleChangeParametersType<EditableSectionTypes, EditableContentName>) => {
  const newProps = { ...oldProps };

  //@ts-ignore
  let content = newProps[contentName][contentIndex];

  if (subContentName) {
    //@ts-ignore
    content = content[subContentName];
  }
  content[editablePropName] = editablePropValue;

  update(newProps);
};

//TYPE GUARD
export const isEditableDataContentType = (data: any): data is TextContent => {
  return data.style || data.htmlTag ? true : false;
};
