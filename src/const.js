const POINT_COUNT = 5;

const DateFormat = {
  TIME_TEMPLATE: 'HH:mm',
  EVENT_TEMPLATE: 'DD/MM/YY HH:mm',
  INVERTED_SHORT_TEMPLATE: 'MMM DD',
  AVERAGE_EVENT_DURATION_TEMPLATE: 'HH[H] mm[M]',
  SHORT_EVENT_DURATION_TEMPLATE: 'mm[M]',
  LONG_EVENT_DURATION_TEMPLATE: 'DD[D] HH[H] mm[M]',
  MACHINE_TEMPLATE: 'YYYY-MM-DD',
  FULL_MACHINE_TEMPLATE: 'YYYY-MM-DD[T]HH:mm',
};

const PointType = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant',
};

const DEFAULT_POINT_TYPE = PointType.FLIGHT;

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const DEFAULT_FILTER_TYPE = FilterType.EVERYTHING;

const TypeTextMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const DEFAULT_SORTING_TYPE = SortType.DAY;

const ACCEPTABLE_SORTING = [SortType.DAY, SortType.TIME, SortType.PRICE];

const BLANK_POINT = {
  id: '',
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: DEFAULT_POINT_TYPE,
};

export {
  POINT_COUNT,
  DateFormat,
  PointType,
  DEFAULT_POINT_TYPE,
  FilterType,
  DEFAULT_FILTER_TYPE,
  SortType,
  DEFAULT_SORTING_TYPE,
  ACCEPTABLE_SORTING,
  BLANK_POINT,
  TypeTextMessage,
};
