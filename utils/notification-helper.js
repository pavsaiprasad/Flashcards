import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'FlashCards:notifications';

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
  return {
    title: 'Want another quiz today?',
    body: '👋 don\'t forget to try a different subject!',
    ios: {
      sound: true,
    },
  };
}

export function setLocalNotification(chosenTime) {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();
            let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate());
              tomorrow.setHours(12);
              tomorrow.setMinutes(49);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: 'day',
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
