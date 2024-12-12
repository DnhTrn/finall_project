import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import themes from "@/constants/themes/themes";

const useThemes:any = () => {
    const [list, setList] = useState(['light', 'dark']);
    const [mode, setMode] = useState('light');
    // @ts-ignore
    const [theme, setTheme] = useState(themes['light']);

    // Load theme mode from AsyncStorage
    useEffect(() => {
        const loadThemeMode:any = async () => {
            try {
                const storedMode:string|null = await AsyncStorage.getItem('theme-mode');
                if (storedMode !== null) {
                    const parsedMode:any = JSON.parse(storedMode);
                    setMode(parsedMode);
                    // @ts-ignore
                    setTheme(themes[parsedMode]);
                }
            } catch (error) {
                console.error('Failed to load theme mode:', error);
            }
        };
        loadThemeMode();
    }, []);

    // Save mode and update theme whenever mode changes
    useEffect(() => {
        const updateTheme = async () => {
            try {
                await AsyncStorage.setItem('theme-mode', JSON.stringify(mode));
                // @ts-ignore
                setTheme(themes[mode]);
                const temp = list;
                temp.splice(temp.indexOf(mode), 1);
                temp.unshift(mode);
                setList(temp);
            } catch (error) {
                console.error('Failed to save theme mode:', error);
            }
        };
        updateTheme();
    }, [mode]);

    // Function to toggle theme
    const changeTheme = (mode:any) => {
        setMode(mode);
    };

    return { mode, theme, list, changeTheme };
};

export default useThemes;
