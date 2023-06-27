// import {
//   View,
//   Text,
//   SafeAreaView,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   StyleSheet,
//   RefreshControl,
//   ActivityIndicator,
//   StatusBar,
//   Animated,
//   FlatList,
// } from "react-native";
// import React, { useState, useEffect, useMemo, useContext } from "react";
// import { PlusIcon } from "react-native-heroicons/outline";
// import SelectDropdown from "react-native-select-dropdown";
// import { useTranslation, getLanguage } from "react-multi-lang";
// import RequestCard from "../RequestCard";
// import Header4 from "../../routes/header/Header4";
// import { useQuery } from "@apollo/client";
// import { STUDENT_ATT_PERMISSION } from "../../graphql/gql_GetStudentAttPermission";
// import { StyleController } from "../../static/styleProvider";
// import { DataController } from "../../context/Provider";
// import moment from "moment";
// import localization from "moment/locale/km";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ACTION } from "../../context/Reducer";

// const LeaveScreen = ({ navigation, route }) => {
//   const { styleState, height, width } = useContext(StyleController);
//   const { enrollmentDBCtx, listLeaveDBCtxDispatch, listLeaveDBCtx } =
//     useContext(DataController);
//   const [stuID, setStuID] = useState();
//   const [attLimit, setAttLimit] = useState(10);
//   const [viewAtt, setViewAtt] = useState([]);
//   const { data } = route?.params || {};
//   const t = useTranslation();

//   const [loadingMore, setLoadingMore] = useState(false);
//   const [pageCurrent, setPageCurrent] = useState(1);

//   useEffect(() => {
//     enrollmentDBCtx?.forEach((element) => {
//       setStuID(element?.studentId);
//     });
//   }, [enrollmentDBCtx]);

//   const {
//     data: PermissionData,
//     loading,
//     refetch,
//   } = useQuery(STUDENT_ATT_PERMISSION, {
//     variables: {
//       stuId: stuID,
//       limit: attLimit,
//     },
//     pollInterval: 2000,
//     onCompleted: ({ getStudenAttendancePermissionById }) => {
//       // console.log(getStudenAttendancePermissionById,"getStudenAttendancePermissionById")
//     },
//     onError: (e) => {
//       console.log(e.message, "PermissionError");
//     },
//   });

//   const [fackData, setFackData] = useState([]);

//   useEffect(() => {
//     setLoadingMore(true);
//     getData();
//   }, [pageCurrent]);

//   const getData = async () => {
//     const apiURL =
//       "https://jsonplaceholder.typicode.com/photos?_limit=10&_page=" +
//       pageCurrent;

//     fetch(apiURL)
//       .then((res) => res.json())
//       .then((resJson) => {
//         setFackData(fackData.concat(resJson));
//         setLoadingMore(false);
//       });
//   };

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center">
//         <ActivityIndicator size="large" color="#EFB419" />
//       </View>
//     );
//   }
//   return (
//     <SafeAreaView className="flex-1 bg-background">
//       <Header4 navigation={navigation} title={t("ស្នើសុំច្បាប់")} />
//       <View className="flex w-full bg-background items-center mb-12">
//         <View>
//           <FlatList
//             data={fackData}
//             renderItem={({ item }) => (
//               <View key={item?.id} className="mt-5 bg-blue-thin">
//                 <Image source={{ uri: item?.url }} className="w-full h-28" />
//                 <View className="border-red mb-10 border-[2] flex-col"></View>
//                 <Text>{item?.id}</Text>
//                 <Text>{item?.title}</Text>
//               </View>
//             )}
//             keyExtractor={(item, index) => index}
//             ListFooterComponent={
//               loadingMore ? (
//                 <View className="w-full p-8 items-center">
//                   <ActivityIndicator
//                     size="large"
//                     className=" items-center justify-start"
//                     color="#EFB419"
//                   />
//                 </View>
//               ) : null
//             }
//             onEndReached={(info) => {
//               setPageCurrent(pageCurrent + 1);
//               setLoadingMore(true);
//             }}
//             onEndReachedThreshold={0.5}
//           />
//         </View>
//         <TouchableOpacity
//           className="bottom-10 absolute right-5"
//           onPress={() =>
//             navigation.navigate("LeaveRequest", { enrollment: data })
//           }
//         >
//           <View
//             className="h-14 w-14 bg-main rounded-full justify-center items-center"
//             style={{
//               shadowColor: "#747373",
//               shadowOffset: {
//                 width: 0,
//                 height: 3,
//               },
//               shadowOpacity: 0.2,
//               shadowRadius: 4,

//               elevation: 6,
//             }}
//           >
//             <PlusIcon size={35} color="white" />
//           </View>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     // justifyContent: "center",
//     // width: "100%",
//     // height: "100%",
//   },
// });

// export default LeaveScreen;
