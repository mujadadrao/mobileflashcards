import React from 'react';
import {AsyncStorage} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import {Platform} from "react-native";


const NOTIFICATION_KEY = 'MobileFlashcard:notifications';


export function isEmptyArray(array) {
    return !Array.isArray(array) || !array.length;
}

export function timeToString(time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    );
}

export function setLocalNotification() {
    try {
        AsyncStorage.getItem(NOTIFICATION_KEY)
            .then(JSON.parse)
            .then((data) => {
                if (data === null) {
                    Permissions.askAsync(Permissions.NOTIFICATIONS).then(
                        ({status}) => {
                            if (status === 'granted') {
                                Notifications.cancelAllScheduledNotificationsAsync();
                                const trigger = new Date(Date.now() + 60 * 60 * 24000);
                                trigger.setMinutes(0);
                                trigger.setSeconds(0);
                                console.log(`Platform = ${Platform.OS} | Notification Time = ${trigger}`);
                                Notifications.scheduleNotificationAsync({
                                    content: {
                                        title: 'Mobile Flashcards Reminder',
                                        body:
                                            "👋 Don't forget to attempt a quiz for your upcoming exam bruh!",
                                        ios: {
                                            sound: true,
                                        },
                                        android: {
                                            sound: true,
                                            sticky: false,
                                        },
                                    },
                                    trigger,
                                })
                                AsyncStorage.setItem(
                                    NOTIFICATION_KEY,
                                    JSON.stringify(true)
                                );
                            } else {
                                console.log(`Platform = ${Platform.OS} | status = ${status}`)
                                alert('Please go to app settings and allow notifications!')
                            }
                        }
                    ).catch((error) => {
                        console.log("Error while asking for permissions: ", error)
                    })
                } else{
                    console.log('Notification already set | ', Platform.OS);
                }
            });
    } catch (error) {
        console.log('Error: ', error);
    }

}
