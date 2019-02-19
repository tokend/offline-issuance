
export default function localize (value, digits = 6, deleteZeros = false) {
  if (value === '') return ''
  if (typeof value !== 'string' && typeof value !== 'number') {
    return ''
  }

  const parts = Number(value).toString().split('.')
  const localized = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '')

  const fourDigitsDecimal = beautifyDecimal(localized, digits)

  if (!deleteZeros) return fourDigitsDecimal

  return deleteTrailingZeros(fourDigitsDecimal)
}

localize.parseLocalized = function (value) {
  return value.split(',').join('')
}

function beautifyDecimal (value, digits) {
  const splittedValue = value.split('.')
  const beforePoint = splittedValue[0]
  let afterPoint = splittedValue[1] || ''
  afterPoint += '000000'
  afterPoint = afterPoint.substr(0, digits)

  return [beforePoint, afterPoint].join('.')
}

function deleteTrailingZeros (value) {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return ''
  }
  const splittedValue = value.split('.')
  const beforePoint = splittedValue[0]
  const parsed = localize.parseLocalized(value)
  const number = Number(parsed)
  const noZerosValue = number.toString()
  const afterPoint = noZerosValue.split('.')[1]

  return [beforePoint, afterPoint || '0'].join('.')
}
