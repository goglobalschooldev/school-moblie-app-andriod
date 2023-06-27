import React, { useState } from "react";
import {
  SafeAreaView,
  Modal,
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { t } from "react-multi-lang";

const ModalProminent = ({ setAlertPopup }) => {
  const [showModal, setShowModal] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const HandleOK = () => {
    (async () => {
      try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      // let backPerm = await Location.requestBackgroundPermissionsAsync();
      if (status !== "granted") {
        // alert(t("ការអនុញ្ញាតឱ្យចូលប្រើទីតាំងត្រូវបានបដិសេធ"));
        Location.requestForegroundPermissionsAsync()
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setShowModal(!showModal);
      setAlertPopup(true);
    } catch (error) {
      console.log(error.message)
    }
    })();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={showModal}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
        >
          <View style={styles.modal}>
            {/* <View style={styles.body}> */}
            <View>
              <Image
                source={require("../../assets/Images/18-location-pin-gradient.gif")}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <Text style={styles.title}>{t("ប្រើប្រាស់ទីតាំងរបស់អ្នក")}</Text>
            <Text style={[styles.description, styles.text]}>
              {"    "}
              {t(
                "អនុញ្ញាតឱ្យ​ សាលាហ្គោគ្លូប៊ល មើលទីតាំងដោយស្វ័យប្រវត្តិ និងប្រើប្រាស់ទីតាំងរបស់អ្នក ខណៈពេលដែលកម្មវិធីកំពុងបើកដំណើរការ។"
              )}
            </Text>
            <Text style={styles.description}>
              {"    "}
              {t(
                "សាលាហ្គោគ្លូប៊ល ប្រមូលទិន្នន័យទីតាំងដើម្បីបញ្ជាក់ថា អ្នក​បាន​មក​សាលា​ដើម្បី​យក​កូន​របស់​អ្នក ​សូម្បី​តែ​នៅ​ពេល​កម្មវិធី​ត្រូវបានបិទ ឬមិនប្រើប្រាស់ក៏ដោយ។"
              )}
            </Text>
            <View style={{ paddingBottom: 20, paddingTop: 10 }}>
              <Image
                source={require("../../assets/Images/map.png")}
                style={{ width: 120, height: 120 }}
              />
            </View>
            {/* </View> */}
            <View style={{ position: "absolute", bottom: 20, right: 30 }}>
              <Button
                title={t(" យល់ព្រម ")}
                onPress={() => HandleOK()}
                style={{ fontFamily: "Kantumruy-Regular", fontSize: 14 }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 30,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
  },
  text: {
    marginVertical: 10,
  },
  body: {
    width: "100%",
    backgroundColor: "pink",
  },
  description: {
    fontSize: 14,
    fontFamily: "Kantumruy-Regular",
    color: "#3f2949",
    marginVertical: 10,
    alignSelf: "baseline",
  },
  title: {
    fontSize: 18,
    fontFamily: "Kantumruy-Regular",
    color: "#3f2949",
    // marginVertical: 20,
    paddingBottom: 15,
  },
});

export default ModalProminent;
