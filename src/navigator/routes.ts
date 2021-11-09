import { StackNavigationOptions } from '@react-navigation/stack'
import { ComponentType, FC } from 'react'

import { BasicImageProps, Images } from '@/components/'

import Account from '../screens/Account'
import AccountMore from '../screens/Account/AccountMore'
import Contact from '../screens/Account/AccountMore/Contact'
import EditPassword from '../screens/Account/EditPassword'
import InputPassword from '../screens/Account/InputPassword'
import EditCity from '../screens/Account/Profile/EditCity'
import EditEmail from '../screens/Account/Profile/EditEmail'
import SmsVerification from '../screens/Account/SmsVerification'
import TransferForm from '../screens/Account/Transfer/TransferForm'
import Authentication from '../screens/Authentication'
import CheckInDetail from '../screens/CheckIn/CheckInDetail'
import CheckInSuccess from '../screens/CheckIn/CheckInSuccess'
import JobAgreement from '../screens/Job/JobAgreement'
import JobConfirm from '../screens/Job/JobConfirm'
import JobHashtagList from '../screens/Job/JobHashtagList'
import JobInfo from '../screens/Job/JobInfo'
import JobList from '../screens/Job/JobList'
import JobResult from '../screens/Job/JobResult'
import Kyc from '../screens/Kyc'
import MySalaryCalendar from '../screens/MySalary/MySalaryCalendar'
import MySalary from '../screens/MySalary/MySalaryDashboard'
import MySalaryDetail from '../screens/MySalary/MySalaryDetail'
import MySchedule from '../screens/MySchedule'
import NotificationDetail from '../screens/Notification/NotificationDetail'
import NotificationList from '../screens/Notification/NotificationList'
import { BOTTOM_TABS, SCREEN_TYPE, SCREENS } from './interfaces'

export interface Route {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>
  options?: StackNavigationOptions
  type?: SCREEN_TYPE
  icons?: {
    active: FC<BasicImageProps>
    inactive: FC<BasicImageProps>
  }
}

const routes: Route[] = [
  // public
  {
    name: SCREENS.AUTHENTICATION,
    component: Authentication,
    type: SCREEN_TYPE.PUBLIC,
    options: { headerShown: false },
  },

  // tab
  {
    name: SCREENS.JOB_LIST,
    component: JobList,
    type: SCREEN_TYPE.TAB,
    icons: {
      active: Images.TabJobActive,
      inactive: Images.TabJobInactive,
    },
    options: { headerShown: false },
  },
  {
    name: SCREENS.MY_SALARY,
    component: MySalary,
    type: SCREEN_TYPE.TAB,
    icons: {
      active: Images.TabSalaryActive,
      inactive: Images.TabSalaryInactive,
    },
  },
  {
    name: SCREENS.MY_SCHEDULE,
    component: MySchedule,
    type: SCREEN_TYPE.TAB,
    icons: {
      active: Images.TabCalenderActive,
      inactive: Images.TabCalenderInactive,
    },
  },
  {
    name: SCREENS.NOTIFICATION,
    component: NotificationList,
    type: SCREEN_TYPE.TAB,
    icons: {
      active: Images.TabNotificationActive,
      inactive: Images.TabNotificationInactive,
    },
  },
  {
    name: SCREENS.ACCOUNT,
    component: Account,
    type: SCREEN_TYPE.TAB,
    icons: {
      active: Images.TabAccountActive,
      inactive: Images.TabAccountInactive,
    },
  },

  // private
  { name: SCREENS.JOB_INFO, component: JobInfo, type: SCREEN_TYPE.PRIVATE },
  { name: SCREENS.JOB_HASHTAG_LIST, component: JobHashtagList, type: SCREEN_TYPE.PRIVATE },
  { name: SCREENS.JOB_AGREEMENT, component: JobAgreement, type: SCREEN_TYPE.PRIVATE },
  { name: SCREENS.JOB_CONFIRM, component: JobConfirm, type: SCREEN_TYPE.PRIVATE },
  { name: SCREENS.JOB_RESULT, component: JobResult, type: SCREEN_TYPE.PRIVATE },
  { name: SCREENS.CHECK_IN_DETAIL, component: CheckInDetail, type: SCREEN_TYPE.PRIVATE },
  { name: SCREENS.NOTIFICATION_ITEM, component: NotificationDetail, type: SCREEN_TYPE.PRIVATE },
  { name: SCREENS.MY_SALARY_DETAIL, component: MySalaryDetail, type: SCREEN_TYPE.PRIVATE },
  { name: SCREENS.MY_SALARY_CALENDAR, component: MySalaryCalendar, type: SCREEN_TYPE.PRIVATE },
  { name: SCREENS.TRANSFER_FORM, component: TransferForm, type: SCREEN_TYPE.PRIVATE },
  { name: SCREENS.EDIT_EMAIL, component: EditEmail, type: SCREEN_TYPE.PRIVATE },
  { name: SCREENS.EDIT_CITY, component: EditCity, type: SCREEN_TYPE.PRIVATE },
  { name: SCREENS.ACCOUNT_MORE, component: AccountMore, type: SCREEN_TYPE.PRIVATE },
  { name: SCREENS.CONTACT, component: Contact, type: SCREEN_TYPE.PRIVATE },

  // modal
  {
    name: SCREENS.KYC,
    component: Kyc,
    type: SCREEN_TYPE.MODAL,
    options: { headerShown: false, gestureEnabled: false },
  },
  { name: SCREENS.CHECK_IN_SUCCESS, component: CheckInSuccess, type: SCREEN_TYPE.MODAL },
  { name: SCREENS.INPUT_PASSWORD, component: InputPassword, type: SCREEN_TYPE.MODAL },
  { name: SCREENS.EDIT_PASSWORD, component: EditPassword, type: SCREEN_TYPE.MODAL },
  { name: SCREENS.SMS_VERIFICATION, component: SmsVerification, type: SCREEN_TYPE.MODAL },
]

export default routes
export const publicRoutes = routes.filter((cfg) => cfg.type === SCREEN_TYPE.PUBLIC)
export const privateRoutes = routes.filter((cfg) => cfg.type === SCREEN_TYPE.PRIVATE)
export const modalRoutes = routes.filter((cfg) => cfg.type === SCREEN_TYPE.MODAL)
export const bottomTabRoutes = routes.filter(
  (cfg) => cfg.type === SCREEN_TYPE.TAB && BOTTOM_TABS.includes(cfg.name as SCREENS),
)
