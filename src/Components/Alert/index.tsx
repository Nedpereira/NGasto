import { Toast, ALERT_TYPE } from 'react-native-alert-notification';

export const MyAlert = (status: number, textBody: string) => {
  let type;
  let title;

  switch (status) {
    case 300:
      type = ALERT_TYPE.WARNING;
      break;
    case 200:
      type = ALERT_TYPE.SUCCESS;
      break;
    default:
      type = ALERT_TYPE.DANGER;
      break;
  }

  Toast.show({
    type: type,
    textBody: textBody,
  });
};