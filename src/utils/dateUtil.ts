// 이 함수는 ISO 형식의 날짜 문자열을 입력받아 한국어 날짜 형식의 문자열로 반환합니다.
export function formatDateString(isoString: string): string {
  const months: string[] = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ]
  const date: Date = new Date(isoString)

  const month: string = months[date.getMonth()]
  const day: number = date.getDate()
  let hour: number = date.getHours()
  const minute: number = date.getMinutes()
  const ampm: string = hour >= 12 ? '오후' : '오전'

  hour = hour % 12
  hour = hour ? hour : 12 // 0시는 12시로 표시
  const minuteStr: string = minute < 10 ? '0' + minute : minute.toString()

  return `${month} ${day}일 ${ampm} ${hour}:${minuteStr}`
}

type TFormatDate = {
  date: Date | string | null
  format: 'YYYY' | 'YYYYMM' | 'YYYYMMDD' | 'MM' | 'MMDD' | 'DD'
  separator?: string
}
export function formatDate({ date, format, separator = '' }: TFormatDate) {
  // 날짜의 각 부분을 추출
  if (date === null) {
    // You can return an empty string, a default date, or handle it as needed
    return '' // or your preferred handling for null dates
  }
  let dateObj

  // Check if date is a string and in 'YYYYMMDD' format
  if (typeof date === 'string' && /^\d{8}$/.test(date)) {
    // Convert 'YYYYMMDD' to 'YYYY-MM-DD'
    const year = date.substring(0, 4)
    const month = date.substring(4, 6)
    const day = date.substring(6, 8)

    dateObj = new Date(`${year}-${month}-${day}`)
  } else if (typeof date === 'string') {
    // Parse standard date string
    dateObj = new Date(date)
  } else {
    // Date is already a Date object
    dateObj = date
  }

  if (isNaN(dateObj.getTime())) {
    return 'Invalid date' // Handle invalid date
  }

  const year = dateObj.getFullYear().toString()
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0') // 월은 0부터 시작하므로 +1
  const day = dateObj.getDate().toString().padStart(2, '0')

  // 지정된 형식에 따라 날짜를 포매팅
  switch (format) {
    case 'YYYY':
      return year
    case 'MM':
      return month
    case 'MMDD':
      return [month, day].join(separator)
    case 'DD':
      return day
    case 'YYYYMM':
      return [year, month].join(separator)
    case 'YYYYMMDD':
      return [year, month, day].join(separator)
    default:
      // 형식이 지정되지 않은 경우, 전체 날짜 반환
      return [year, month, day].join(separator)
  }
}

export function format12Hour(date: Date) {
  // 시, 분, 초 추출
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  // 오전/오후 결정
  const period = hours >= 12 ? '오후' : '오전'

  // 12시간제로 변환 (0시는 12시로 표현)
  const convertedHours = hours % 12 || 12

  // 0을 앞에 붙여 두 자리 숫자 형식으로 맞춤
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds

  // 최종 형식 반환
  return `${period} ${convertedHours}:${formattedMinutes}`
}

export const localDateString = (date: Date) => {
  return date.toLocaleDateString('ko-KR', { weekday: 'long' }).slice(0, 1)
}

/**
 * 일수 차이를 구하는 함수
 * @date 6/8/2023 - 1:12:00 PM
 *
 * @param {string} serverTime 파라미터형태는 YYYY-MM-DD 한다.
 */
export const calculateDateDifferenceInDays = (targetTime: string): number => {
  const givenTimeString: string = targetTime
    .replace(/[^-\d.]/g, '')
    .substring(0, 10)

  // 현재 시간을 얻기 위해 JavaScript Date 객체를 사용
  const currentTime: Date = new Date()

  // 문자열로 표현된 시간을 JavaScript Date 객체로 변환
  const givenTime: Date = new Date(givenTimeString)

  // 일수 차이 계산을 위해 날짜 차이를 계산
  const timeDifferenceInMs: number = givenTime.getTime() - currentTime.getTime()
  const timeDifferenceInDays: number = Math.round(
    timeDifferenceInMs / (1000 * 60 * 60 * 24),
  )

  // 결과 출력
  return timeDifferenceInDays
}

/**
 * 초단위 기준  현재 시간과 targetDate 차이를 구하는 함수
 * @date 6/8/2023 - 1:12:00 PM
 *
 * @param {string} serverTime 파라미터형태는 YYYY-MM-DD HH:mm 한다.
 */
export const calculateDateDifferenceInTimes = (
  targetTime: string | Date,
): number => {
  // 현재 시간을 얻기 위해 JavaScript Date 객체를 사용
  const currentTime: Date = new Date()

  // 문자열로 표현된 시간을 JavaScript Date 객체로 변환
  const givenTime: Date = new Date(targetTime)

  // 일수 차이 계산을 위해 날짜 차이를 계산
  const timeDifferenceInMs: number = givenTime.getTime() - currentTime.getTime()
  // const timeDifferenceInDays: number = Math.round(timeDifferenceInMs / (1000 * 60 * 60 * 24));

  // 결과 출력
  return timeDifferenceInMs
}
