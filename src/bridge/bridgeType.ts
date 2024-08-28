export interface RNEventPropsType<U = any, T = any> {
  rnEvent: U;
  rnData?: T;
}

export enum RNEventEnum {
  ConsoleLog = 'CONSOLE_LOG',
  NaverLogin = 'NAVER_LOGIN',
  NaverLoginResult = 'NAVER_LOGIN_RESULT',
  KakaoLogin = 'KAKAO_LOGIN',
  KakaoLoginResult = 'KAKAO_LOGIN_RESULT',
  AppleLogin = 'APPLE_LOGIN',
  AppleLoginResult = 'APPLE_LOGIN_RESULT',
  GoogleLogin = 'GOOGLE_LOGIN',
  GoogleLoginResult = 'GOOGLE_LOGIN_RESULT',
  TurnOnNotification = 'TURN_ON_NOTIFICATION',
  RequestPermission = 'REQUEST_PERMISSION',
  SharePage = 'SHARE_PAGE',
  AppState = 'APP_STATE',
  AppStateResult = 'APP_STATE_RESULT',
  UnSubscribeToken = 'UN_SUBSCRIBE_TOKEN',
  SubscribeToken = 'SUBSCRIBE_TOKEN',
  OpenSetting = 'OPEN_SETTING',
  IamPortCertification = 'I_AM_PORT_CERTIFICATION',
  IamPortCertificationResult = 'I_AM_PORT_CERTIFICATION_RESULT',
  InAppBrowser = 'IN_APP_BROWSER',
  IsWebAppLoaded = 'IS_WEB_APP_LOADED',
  NotificaitonRegistration = 'NOTIFICATION_REGISTRATION',
  NotificaitonRegisterAll = 'NOTIFICATION_RE_REGISTER_ALL',
  NotificaitonCancel = 'NOTIFICATION_CANCEL',
  NotificaitonResult = 'NOTIFICATION_RESULT',
  NotificaitonCancelAll = 'NOTIFICATION_CANCEL_ALL',
  ReadContact = 'READ_CONTACTS',
  ReadContactResult = 'READ_CONTACTS_RESULT',
  GeoLocation = 'GEO_LOCATION',
  GeoLocationResult = 'GEO_LOCATION_RESULT',
  PhoneCalling = 'PHONE_CALLING',
  OpenUrl = 'OPEN_URL',
  ToastAndroid = 'TOAST_ANDROID',
  ExitApp = 'EXIT_APP',
  BackButtonResult = 'BACK_BUTTON_RESULT',
  FCMToken = 'FCM_TOKEN',
}

// 푸시알람 타입
export type TPushAlarmCycleType =
  | 'PUSH_ALARM_CYCLE_5M'
  | 'PUSH_ALARM_CYCLE_10M'
  | 'PUSH_ALARM_CYCLE_1H'
  | 'PUSH_ALARM_CYCLE_12H'
  | 'PUSH_ALARM_CYCLE_24H';

export const pushMessageObject: {
  [key in TPushAlarmCycleType]: { message: string; offsetMillis: number };
} = {
  PUSH_ALARM_CYCLE_5M: {
    message: '5분 후 예약 가능합니다',
    offsetMillis: 300000,
  },
  PUSH_ALARM_CYCLE_10M: {
    message: '10분 후 예약 가능합니다',
    offsetMillis: 600000,
  },
  PUSH_ALARM_CYCLE_1H: {
    message: '1시간 후 예약 가능합니다',
    offsetMillis: 3600000,
  },
  PUSH_ALARM_CYCLE_12H: {
    message: '12시간 후 예약 가능합니다',
    offsetMillis: 43200000,
  },
  PUSH_ALARM_CYCLE_24H: {
    message: '24시간 후 예약 가능합니다',
    offsetMillis: 86400000,
  },
};

export type TNotificaitonRegistration = {
  id: string;
  title: string;
  timestamp: number;
  body: string;
  data: any;
};

export type TNameWithMobilePhon = { name: string; phoneNumber: string };

export type TContact = {
  recordID: string;
  backTitle: string;
  company: string | null;
  emailAddresses: any[];
  displayName: string;
  familyName: string;
  givenName: string;
  middleName: string;
  jobTitle: string;
  phoneNumbers: any[];
  hasThumbnail: boolean;
  thumbnailPath: string;
  isStarred: boolean;
  postalAddresses: any[];
  prefix: string;
  suffix: string;
  department: string;
  birthday: any;
  imAddresses: any[];
  urlAddresses: any[];
  note: string;
};

export type TContactResult = {
  contactInfoList: TNameWithMobilePhon[];
  contacts: TContact[];
};

export type TGeoLocationResult = {
  coords: {
    accuracy: number;
    altitude: number;
    heading: number;
    latitude: number;
    longitude: number;
    speed: number;
  };
  extras: { networkLocationType: string };
  mocked: boolean;
  timestamp: number;
};

export type TAppleLoginResult = {
  user: string;
  email: string;
  authorizedScopes: [];
  fullName: {
    namePrefix: string;
    givenName: string;
    familyName: string;
    nickname: string;
    middleName: string;
    nameSuffix: string;
  };
  identityToken: string;
  authorizationCode: string;
  realUserStatus: number;
  state: any;
  nonce: string;
};

export type TKakaoOAuthToken = {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt: Date;
  scopes: string[];
};
