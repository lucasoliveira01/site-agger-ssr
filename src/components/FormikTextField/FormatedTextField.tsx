import { FC, forwardRef } from "react";
import { MenuItem, TextField, TextFieldProps } from "@mui/material";
import NumberFormat, {
    InputAttributes,
    NumberFormatProps,
    FormatInputValueFunction,
    NumberFormatValues,
} from "react-number-format";

type Props = TextFieldProps & {
    name: string;
    options?: string[];
    formated?:
        | boolean
        | "BrazilMoney"
        | "CEP"
        | "CPF"
        | "CNPJ"
        | "CPF/CNPJ"
        | "BrazilTelephone"
        | "BrazilCellphone";
    prefix?: string;
    suffix?: string;
    format?: string | FormatInputValueFunction;
    thousandSeparator?: string | boolean;
    decimalSeparator?: string;
    isNumericString?: boolean;
    allowLeadingZeros?: boolean;
    decimalScale?: number;
    thousandsGroupStyle?: "thousand" | "lakh" | "wan";
    mask?: string | string[];
};

interface CustomProps extends NumberFormatProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const NumberFormatCustom = forwardRef<NumberFormat<InputAttributes>, CustomProps>(
    function NumberFormatCustom(props, ref) {
        const { onChange, ...other } = props;

        const handleChange = (values: NumberFormatValues) => {
            onChange({
                target: {
                    name: props.name,
                    value: values.value,
                },
            });
        };

        return <NumberFormat {...other} getInputRef={ref} onValueChange={handleChange} />;
    }
);

const FormatedTextField: FC<Props> = (props) => {
    let {
        prefix,
        suffix,
        format,
        thousandSeparator,
        decimalSeparator,
        isNumericString,
        allowLeadingZeros,
        decimalScale,
        thousandsGroupStyle,
        mask,
        ...MUITextFieldProps
    } = props;

    let textFieldProps = {
        ...MUITextFieldProps,
    };

    const formatCPFAndCNPJ = (value: string) => {
        const length = value.length;

        let splitValue = value;
        if (length > 14) {
            splitValue = value.substring(0, 14);
        }

        let paddedValue;
        //CPF
        if (length <= 11) {
            paddedValue = splitValue.padEnd(11, "_");
            return `${paddedValue.substring(0, 3)}.${paddedValue.substring(
                3,
                6
            )}.${paddedValue.substring(6, 9)}-${paddedValue.substring(9, 11)}`;
        }
        //CNPJ
        else {
            paddedValue = splitValue.padEnd(14, "_");
            return `${paddedValue.substring(0, 2)}.${paddedValue.substring(
                2,
                5
            )}.${paddedValue.substring(5, 8)}/${paddedValue.substring(
                8,
                12
            )}-${paddedValue.substring(12, 14)}`;
        }
    };

    switch (props.formated) {
        case "BrazilMoney":
            prefix = "R$";
            thousandSeparator = ".";
            decimalSeparator = ",";
            decimalScale = 2;
            thousandsGroupStyle = "thousand";
            break;
        case "BrazilTelephone":
            decimalScale = 0;
            allowLeadingZeros = true;
            format = "(##) ####-####";
            break;
        case "BrazilCellphone":
            decimalScale = 0;
            allowLeadingZeros = true;
            format = "(##) #####-####";
            break;
        case "CEP":
            allowLeadingZeros = true;
            format = "#####-###";
            break;
        case "CPF":
            allowLeadingZeros = true;
            format = "###.###.###-##";
            break;
        case "CNPJ":
            allowLeadingZeros = true;
            format = "##.###.###/####-##";
            break;
        case "CPF/CNPJ":
            allowLeadingZeros = true;
            format = formatCPFAndCNPJ;
            break;
        default:
            thousandSeparator = ".";
    }
    return (
        <TextField
            {...textFieldProps}
            onChange={props.onChange ? props.onChange : textFieldProps.onChange}
            InputProps={
                props.formated
                    ? {
                          inputComponent: NumberFormatCustom as any,
                          inputProps: {
                              prefix: prefix,
                              suffix: suffix,
                              format: format,
                              thousandSeparator: thousandSeparator,
                              decimalSeparator: decimalSeparator,
                              isNumericString: isNumericString,
                              allowLeadingZeros: allowLeadingZeros,
                              decimalScale: decimalScale,
                              thousandsGroupStyle: thousandsGroupStyle,
                              mask: mask,
                          },
                      }
                    : {}
            }
        >
            {props.options &&
                props.options.map((key) => {
                    return (
                        <MenuItem key={key} value={key}>
                            {key}
                        </MenuItem>
                    );
                })}
        </TextField>
    );
};

export default FormatedTextField;
