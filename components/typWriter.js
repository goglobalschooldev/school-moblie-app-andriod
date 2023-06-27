import React from "react";
import { useTranslation } from "react-multi-lang";
import { Text, View } from "react-native";
import { useTypewriter } from "react-simple-typewriter";

export default function TypeWriter() {
  const t = useTranslation();
  const [text] = useTypewriter({
    words: [
      t("ចក្ខុវិស័យរបស់ពួកយើងគឺដើម្បីអប់រំកុមារជំនាន់ក្រោយ"),
      t("របស់កម្ពុជា ឱ្យក្លាយជាធនធានអន្តរជាតិ។"),
    ],
    loop: true,
    typeSpeed: 50,
    deleteSpeed: 0,
    delaySpeed:1500,
  });
  return (
    <View>
      <Text
        style={{
          fontFamily: "Kantumruy-Regular",
          fontSize: 14,
          color: "#EA2877",
        }}
      >
        {text}
      </Text>
    </View>
  );
}
