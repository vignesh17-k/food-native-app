import _ from "lodash";
import { FormControl, Input } from "native-base";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";
import apply_validations from "../../utils/rules";
import ImageLinks from "../../assets/ImageLink";
import { SIZES } from "../../constants";

interface Props {
  name: string;
  control: any;
  defaultValue?: string;
  label: string;
  validations?: any;
  style?: any;
  default_selected_country?: string;
  disabled?: boolean;
  on_country_code_select: (country_code: any) => any;
  placeholder?: any;
  type: any;
}

const PhoneNumberField = ({
  name,
  control,
  defaultValue,
  label,
  validations,
  style,
  default_selected_country = "+1",
  on_country_code_select,
  disabled,
  placeholder,
  type,
}: Props) => {
  const [show_country, set_show_country] = useState(false);
  const [selected_country_code, set_selected_country_code] = useState(
    default_selected_country ? default_selected_country : "+1"
  );

  const handle_select_country_code = (item: any) => {
    set_selected_country_code(item?.dial_code);
    on_country_code_select?.(item?.dial_code);
    set_show_country(false);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={apply_validations({
        ...validations,
        name,
        label,
      })}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => {
        return (
          <FormControl isInvalid={!!error}>
            {!_.isEmpty(label) && (
              <Text style={styles.label_style}>{label}</Text>
            )}
            <Input
              value={value}
              onBlur={() => {
                onBlur();
              }}
              onChangeText={(text) => {
                if (text === " ") {
                  return;
                }
                onChange(text);
              }}
              leftElement={
                <TouchableOpacity
                  hitSlop={{ top: 5, right: 5, bottom: 5, left: 5 }}
                  style={styles.country_code_divider}
                  onPress={() => set_show_country(true)}
                >
                  <Text style={{
                    color:'grey'
                  }}>{selected_country_code}</Text>

                  <Image
                    source={ImageLinks?.down_arrow}
                    style={styles.icon_style}
                  />
                </TouchableOpacity>
              }
              isDisabled={disabled}
              isReadOnly={disabled}
              scrollEnabled={true}
              borderRadius={10}
              type={type}
              keyboardType={"numeric"}
              placeholder={placeholder}
              style={styles.input_field}
              autoCapitalize="none"
              showSoftInputOnFocus={true}
              size="lg"
              variant="outline"
              width={"100%"}
            />
            {error && <Text style={styles.formItemError}>{error.message}</Text>}
            <CountryPicker
              lang="en"
              initialState={"+1"}
              show={show_country}
              onBackdropPress={() => set_show_country(false)}
              itemTemplate={({ item, name: country_name, onPress }) => {
                return (
                  <Pressable
                    style={{
                      height: 41,
                      marginTop: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 50,
                    }}
                    onPress={onPress}
                  >
                    <Text>{item.flag}</Text>
                    <Text>{country_name}</Text>
                    <Text>{item.dial_code}</Text>
                  </Pressable>
                );
              }}
              pickerButtonOnPress={(item) => handle_select_country_code(item)}
              style={{
                modal: {
                  height: 500,
                },
                textInput: {
                  backgroundColor: "rgb(211, 211, 211)",
                  opacity:0.5,
                  marginHorizontal: 40,
                  paddingHorizontal: 10,
                  borderColor: "transparent",
                  borderWidth: 1,
                },
              }}
            />
          </FormControl>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  input_field: {
    borderColor: "transparent",
    backgroundColor: "rgb(211, 211, 211)",
    height: SIZES.height * 0.055,
    borderWidth: 0,
    fontSize: 16,
    opacity: 0.5,
  },
  country_code_divider: {
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  icon_style: {
    resizeMode: "contain",
    height: SIZES.height * 0.02,
    width: SIZES.width * 0.02,
    paddingHorizontal: 15,
  },
  label_style: {
    marginVertical: SIZES.height * 0.01,
    opacity: 0.5,
    fontWeight: "400",
    fontSize: 16,
  },
  formItemError: {
    color: "red",
    fontSize: 14,
    marginTop: SIZES.height * 0.003,
  },
});

export default PhoneNumberField;
