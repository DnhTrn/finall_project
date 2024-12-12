import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaView} from "react-native";
import {SettingService} from "@/contexts/settings/settings";
import {DataService} from "@/contexts/datas/data";
import Route from "@/app/viewModels/viewVM/route";
import Loading from "@/app/views/layouts/load/loading";
import {NavigationIndependentTree} from "@react-navigation/core";
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function index(){
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <SettingService>
                    <DataService>
                        <Loading/>
                        <NavigationIndependentTree>
                            <NavigationContainer>
                                <Route/>
                            </NavigationContainer>
                        </NavigationIndependentTree>
                    </DataService>
                </SettingService>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}