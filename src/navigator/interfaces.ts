import { RouteParamAccount } from '@/screens/Account'
import { RouteParamEditPassword } from '@/screens/Account/EditPassword'
import { RouteParamInputPassword } from '@/screens/Account/InputPassword'
import { RouteParamEditCity } from '@/screens/Account/Profile/EditCity'
import { RouteParamEditEmail } from '@/screens/Account/Profile/EditEmail'
import { RouteParamSmsVerification } from '@/screens/Account/SmsVerification'
import { RouteParamTransferForm } from '@/screens/Account/Transfer/TransferForm'
import { RouteParamCheckDetail } from '@/screens/CheckIn/CheckInDetail/index'
import { RouteParamCheckSuccess } from '@/screens/CheckIn/CheckInSuccess'
import { RouteParamJobHashtagList } from '@/screens/Job/JobHashtagList'
import { RouteParamJobInfo } from '@/screens/Job/JobInfo'
import { RouteParamJobResult } from '@/screens/Job/JobResult'
import { RouteParamKyc } from '@/screens/Kyc'
import { RouteParamSalaryCalendar } from '@/screens/MySalary/MySalaryCalendar'
import { RouteParamSalaryDetail } from '@/screens/MySalary/MySalaryDetail'
import { RouteParamNotificationItem } from '@/screens/Notification/NotificationDetail/index'

export enum SCREEN_TYPE {
  PUBLIC,
  PRIVATE,
  MODAL,
  TAB,
  INTERNAL,
}

export enum SCREENS {
  // internal
  MAIN = 'main',
  TAB = 'tab',

  // public
  AUTHENTICATION = 'authentication',

  // private
  // tab layer
  HOME = 'home',
  MY_SALARY = 'my_salary',
  MY_SCHEDULE = 'my_schedule',
  NOTIFICATION = 'notification',
  ACCOUNT = 'account',

  // nested layers
  JOB_LIST = 'job_list',
  JOB_HASHTAG_LIST = 'job_hashtag_list',
  JOB_INFO = 'job_info',
  JOB_AGREEMENT = 'job_agreement',
  JOB_CONFIRM = 'job_confirm',
  JOB_RESULT = 'job_result',

  MY_SALARY_DETAIL = 'my_salary_detail',
  MY_SALARY_CALENDAR = 'my_salary_calendar',

  // modal layer
  KYC = 'kyc',

  // checkIn
  CHECK_IN_DETAIL = 'check_in_detail',
  CHECK_IN_SUCCESS = 'check_in_success',
  CHECK = 'check',

  // notification
  NOTIFICATION_ITEM = 'notification_item',

  // account
  TRANSFER_FORM = 'transfer_form',
  EDIT_EMAIL = 'edit_email',
  EDIT_CITY = 'edit_city',
  ACCOUNT_MORE = 'account_more',
  INPUT_PASSWORD = 'input_password',
  EDIT_PASSWORD = 'edit_password',
  SMS_VERIFICATION = 'sms_verification',
  CONTACT = 'contact',
}

export type RootStackParamList = {
  [SCREENS.AUTHENTICATION]: undefined
  [SCREENS.HOME]: undefined
  [SCREENS.ACCOUNT]: RouteParamAccount | undefined
  [SCREENS.KYC]: RouteParamKyc | undefined
  [SCREENS.JOB_LIST]: undefined
  [SCREENS.JOB_HASHTAG_LIST]: RouteParamJobHashtagList
  [SCREENS.JOB_INFO]: RouteParamJobInfo
  [SCREENS.JOB_AGREEMENT]: undefined
  [SCREENS.JOB_CONFIRM]: undefined
  [SCREENS.JOB_RESULT]: RouteParamJobResult
  [SCREENS.CHECK_IN_DETAIL]: RouteParamCheckDetail
  [SCREENS.CHECK_IN_SUCCESS]: RouteParamCheckSuccess
  [SCREENS.MY_SALARY]: undefined
  [SCREENS.MY_SALARY_DETAIL]: RouteParamSalaryDetail
  [SCREENS.MY_SALARY_CALENDAR]: RouteParamSalaryCalendar
  [SCREENS.MY_SCHEDULE]: undefined
  [SCREENS.NOTIFICATION]: undefined
  [SCREENS.NOTIFICATION_ITEM]: RouteParamNotificationItem
  [SCREENS.TRANSFER_FORM]: RouteParamTransferForm
  [SCREENS.EDIT_EMAIL]: RouteParamEditEmail
  [SCREENS.EDIT_CITY]: RouteParamEditCity
  [SCREENS.ACCOUNT_MORE]: undefined
  [SCREENS.INPUT_PASSWORD]: RouteParamInputPassword
  [SCREENS.EDIT_PASSWORD]: RouteParamEditPassword
  [SCREENS.SMS_VERIFICATION]: RouteParamSmsVerification
  [SCREENS.CONTACT]: undefined
}

export const BOTTOM_TABS: SCREENS[] = [
  SCREENS.JOB_LIST,
  SCREENS.MY_SALARY,
  SCREENS.MY_SCHEDULE,
  SCREENS.NOTIFICATION,
  SCREENS.ACCOUNT,
]
