/**
 * @description The base url for the CoinGecko API
 * @kind constant
 */
const BASE = 'https://api.coingecko.com/api/';

/**
 * @description The host of the CoinGecko API
 * @kind constant
 */
const HOST = 'api.coingecko.com';

/**
 * @description The current version for the CoinGecko API
 * @kind constant
 */
const API_VERSION = '3';

/**
 * @description The CoinGecko URI according to base and current version
 * @kind constant
 */
const URI = `${BASE}v${API_VERSION}`;

/**
 * @description The maximum number of requests per second for the CoinGecko API
 * @kind constant
 */
const REQUESTS_PER_SECOND = 10;

/**
 * @description Timeout for connecton to CoinGecko API
 * @kind constant
 */
const TIMEOUT = 30;

/**
 * @description The current accepted methods for CoinGecko API calls
 * @kind constant
 */
const ACCEPTED_METHODS = [
    'GET',
];

/**
 * @description Available options to order results by
 * @kind constant
 */
const ORDER = {
    GECKO_ASC: 'gecko_asc',
    GECKO_DESC: 'gecko_desc',
    MARKET_CAP_ASC: 'market_cap_asc',
    MARKET_CAP_DESC: 'market_cap_desc',
    VOLUME_ASC: 'volume_asc',
    VOLUME_DESC: 'volume_desc',
    COIN_NAME_ASC: 'coin_name_asc',
    COIN_NAME_DESC: 'coin_name_desc',
    PRICE_ASC: 'price_asc',
    PRICE_DESC: 'price_desc',
    HOUR_24_ASC: 'h24_change_asc',
    HOUR_24_DESC: 'h24_change_desc',
};

/**
 * @description Available status update category types to filter by
 * @kind constant
 */
const STATUS_UPDATE_CATEGORY = {
    GENERAL: 'general',
    MILESTONE: 'milestone',
    PARTNERSHIP: 'partnership',
    EXCHANGE_LISTING: 'exchange_listing',
    SOFTWARE_RELEASE: 'software_release',
    FUND_MOVEMENT: 'fund_movement',
    NEW_LISTINGS: 'new_listings',
    EVENT: 'event',
};

/**
 * @description Available project type options to filter by
 * @kind constant
 */
const STATUS_UPDATE_PROJECT_TYPE = {
    COIN: 'coin',
    MARKET: 'market',
}

/**
 * @description List of event types (most recent from /events/type)
 * @kind constant
 */
const EVENT_TYPE = {
    EVENT: 'Event',
    CONFERENCE: 'Conference',
    MEETUP: 'Meetup',
};

//

module.exports = {
    BASE,
    HOST,
    API_VERSION,
    URI,
    REQUESTS_PER_SECOND,
    ACCEPTED_METHODS,
    ORDER,
    STATUS_UPDATE_CATEGORY,
    STATUS_UPDATE_PROJECT_TYPE,
    EVENT_TYPE,
    TIMEOUT
};