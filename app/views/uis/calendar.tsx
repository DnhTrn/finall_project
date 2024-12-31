import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Agenda, Calendar} from "react-native-calendars";
import useSettings from "@/contexts/settings/settings";
import useCusNav from "@/contexts/navigations/navigations";
import {useNavigation} from "@react-navigation/core";
import EventVM from "@/app/viewModels/eventVM/eventVM";
import {month} from "react-native-calendars/src/dateutils";

const CalendarEvent=()=>{
    const {theme}=useSettings();
    const {setHidden}=useCusNav();
    // current month and year value
    const [current,setCurrent]=useState(null);
    const navigation=useNavigation();
    //
    const [events, setEvents] = useState([]);
    const [items,setItems]=useState({});
    //
    const {getMonthEvent}=EventVM();
    //
    const parseDate = (dateString:any) => {
        try{
            const [day, month, year] = dateString.split('-').map(Number); // Tách ngày, tháng, năm
            return new Date(year, month - 1, day); // Tạo đối tượng Date (tháng bắt đầu từ 0)
        }catch (e) {
            console.log(e);
            return null;
        }

    };
    // get range date of event
    const generateDateRange = (event:any) => {
        try{
            const startDate = parseDate(event?.start_at);
            const endDate = parseDate(event?.end_at);
            const dates = [];
            // @ts-ignore
            while (startDate <= endDate) {
                // @ts-ignore
                dates.push(new Date(startDate).toISOString().split('T')[0]); // Tạo bản sao trước khi thêm vào mảng
                // @ts-ignore
                startDate.setDate(startDate.getDate() + 1); // Thay đổi giá trị startDate
            }
            return dates;
        }catch (e) {
            console.log('e: '+e);
            return [];
        }

    };
    // get range date of month
    const generateMonthDays = (current:any) => {
        const daysInMonth = new Date(current?.year, current?.month, 0).getDate(); // Số ngày trong tháng
        const dates = [];
        for (let day = 1; day <= daysInMonth; day++) {
            const formattedDay = `${current?.year}-${String(current?.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            dates.push(formattedDay);
        }
        return dates;
    };
    // function trigger get event on this month
    useEffect(() => {
        const fetch=async ()=>{
            try{
                const day=new Date();
                const month=day.getMonth()+1;
                const year=day.getFullYear();
                // @ts-ignore
                setCurrent({month,year})
                const {status,events:response}=await getMonthEvent(month,year);
                console.log("status: "+status);
                console.log("events: ");
                console.log(response);
                if (status){
                    setEvents(response);
                }
            }
            catch (e) {
                console.log("UI: "+e);
            }
        }
        fetch()
    }, []);
    // trigger set event date data
    useEffect(() => {
        const data ={};
        const monthDays=generateMonthDays(current);
        events.forEach(event=>{
            const range=generateDateRange(event);
            range.forEach(item=>{
                // @ts-ignore
                if(!data[item])data[item]=[];
                // @ts-ignore
                data[item].push({...event});
            })
        })
        monthDays.forEach((day:any)=>{
            // @ts-ignore
            if(!data[day])data[day]=[];
        })
        setItems(data);
    }, [events]);
    // Hàm render sự kiện
    const renderItem = (item:any) => {
        return (
            // @ts-ignore
            <TouchableOpacity onPress={()=>navigation.navigate('event-detail',{id:item.id})} style={styles.item}>
                <Text numberOfLines={2} style={styles.eventName}>{item.name}</Text>
                <Text numberOfLines={3} style={styles.eventDetails}>{item.des}</Text>
            </TouchableOpacity>
        );
    };

    // Khi không có sự kiện
    const renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}>
                <Text>No events for this day</Text>
            </View>
        );
    };
    //
    const handleChangeDay=async (day:any)=>{
        try{
            console.log("month: "+day.month);
            console.log("year: "+day.year);
            // @ts-ignore
            if(day.month==current?.month&&day.year==current?.year){
                return;
            }
            // @ts-ignore
            setCurrent({month:day.month,year:day.year});
            // @ts-ignore
            const {status,events:response}=await getMonthEvent(day.month,day.year);
            if (status){
                setEvents(response);
            }
        }catch (e) {
            console.log('UI change day: '+e);
        }
    }
    return (
        <Agenda
            items={items}
            selected={new Date()}
            renderItem={renderItem}
            renderEmptyDate={renderEmptyDate}
            onDayPress={handleChangeDay}
            theme={{
                selectedDayBackgroundColor: theme.icon.main,
                todayTextColor: theme.text.th5,
                agendaKnobColor: theme.icon.main,
            }}
            rowHasChanged={(r1:any, r2:any) => r1.name !== r2.name}
            onCalendarToggled={(calendarOpened:any) => {
                calendarOpened?setHidden(true):setHidden(false);
            }}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    eventName: {
        fontWeight: "bold",
        fontSize: 14,
    },
    eventDetails: {
        color: "gray",
        fontSize:12,
        marginTop: 5,
    },
    emptyDate: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
});
export default React.memo(CalendarEvent);