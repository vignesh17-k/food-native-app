import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { SIZES } from "../../constants";
import { Icon, Input } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import apply_validations from "../../utils/rules";
import { Controller } from "react-hook-form";

interface Props {
  style: any;
  name: string;
  validations: any;
  label: string;
  control: any;
}

const Password = ({ style, label, control, validations, name }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <View style={style}>
      <Controller
        control={control}
        name={name}
        rules={apply_validations({ ...validations, name, label })}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <React.Fragment>
            <Text style={styles.textLabel}>{label}</Text>
            <Input
              onChangeText={(newText) => onChange(newText)}
              value={value}
              fontSize={18}
              borderWidth={0.6}
              height={SIZES.height * 0.055}
              borderRadius={10}
              autoCapitalize="none"
              returnKeyType="next"
              autoComplete="password"
              autoCorrect={false}
              textContentType="password"
              style={styles.inputFieldStyle}
              type={show ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr={2}
                    ml={2}
                    color="muted.400"
                  />
                </Pressable>
              }
            />

            {error && (
              <Text style={styles.formItemError}>
                {error?.message || "error"}
              </Text>
            )}
          </React.Fragment>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputFieldStyle: {
    backgroundColor: "rgb(211, 211, 211)",
    opacity: 0.4,
  },

  textLabel: {
    marginVertical: SIZES.height * 0.01,
    opacity: 0.6,
    fontSize: 16,
  },

  formItemError: {
    color: "red",
    fontSize: 14,
    marginTop: SIZES.height * 0.001,
  },
});

export default Password;
