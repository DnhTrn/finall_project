import { Outlet } from "react-router-dom";
import Grid from "../../components/grid/grid";
import Pages from "../../components/settings/pages/pages";
import useSettings from "../../../view-models/settingsVM/settingsVM";
const Setting=()=>{
    const {theme}=useSettings();
    return (
        <Grid initial={{background:theme.background.layout}} animate={{background:theme.background.layout}}
         justify="center" align="start" columns='15% calc(85% - 3px)' height="100%" gap="3px" >
            <Pages/>
            <Outlet/>
        </Grid>
    )
}

export default Setting;