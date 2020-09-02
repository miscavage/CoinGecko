# CoinGecko API Client for Node.js

<span class="badge-travisci"><a href="http://travis-ci.org/miscavage/CoinGecko-API" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/miscavage/CoinGecko-API/master.svg" alt="Travis CI Build Status" /></a></span>
<span class="badge-npmversion"><a href="https://npmjs.org/package/coingecko-api" title="View this project on NPM"><img src="https://img.shields.io/npm/v/coingecko-api.svg" alt="NPM version"/></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/coingecko-api" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/coingecko-api.svg" alt="NPM downloads" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/miscavage/coingecko-api" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/miscavage/coingecko-api.svg" alt="Dependency Status" /></a></span>
<span class="badge-daviddmdev"><a href="https://david-dm.org/miscavage/coingecko-api#info=devDependencies" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/miscavage/coingecko-api.svg" alt="Dev Dependency Status" /></a></span>

A Node.js wrapper for the CoinGecko API with no dependencies.

## • Installation

Latest version: 1.0.10

`npm install coingecko-api`

## • CoinGecko API Documentation

For complete API documentation, up-to-date parameters, responses and errors, please refer to https://www.coingecko.com/api/docs/v3.

## • Quick Start Example

```javascript
//1. Import coingecko-api
const CoinGecko = require('coingecko-api');

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
var func = async() => {
  let data = await CoinGeckoClient.ping();
};
```

## • Constants

This module provides helper constants for use in calls.

___
#### • `CoinGecko.ORDER`
Order results in specific calls by using one of the following values.

| Key | Usage | Description |
| --- | --- | --- |
`GECKO_ASC` | `CoinGecko.ORDER.GECKO_ASC` | Order results by CoinGecko's scoring system (ascending)
`GECKO_DESC` | `CoinGecko.ORDER.GECKO_DESC` | Order results by CoinGecko's scoring system (descending)
`MARKET_CAP_ASC` | `CoinGecko.ORDER.MARKET_CAP_ASC` | Order results by market cap (ascending)
`MARKET_CAP_DESC` | `CoinGecko.ORDER.MARKET_CAP_DESC` | Order results by market cap (descending)
`VOLUME_ASC` | `CoinGecko.ORDER.VOLUME_ASC` | Order results by volume (ascending)
`VOLUME_DESC` | `CoinGecko.ORDER.VOLUME_DESC` | Order results by volume (descending)
`COIN_NAME_ASC` | `CoinGecko.ORDER.COIN_NAME_ASC` | Order results by coin name (ascending)
`COIN_NAME_DESC` | `CoinGecko.ORDER.COIN_NAME_DESC` | Order results by coin name (descending)
`PRICE_ASC` | `CoinGecko.ORDER.PRICE_ASC` | Order results by price (ascending)
`PRICE_DESC` | `CoinGecko.ORDER.PRICE_DESC` | Order results by price (descending)
`HOUR_24_ASC` | `CoinGecko.ORDER.HOUR_24_ASC` | Order results by 24 hour change (ascending)
`HOUR_24_DESC` | `CoinGecko.ORDER.HOUR_24_DESC` | Order results by 24 hour change (descending)
`TRUST_SCORE_DESC` | `CoinGecko.ORDER.TRUST_SCORE_DESC` | Order results by CoinGecko's trust scoring system (descending)

___
#### • `CoinGecko.STATUS_UPDATE_CATEGORY`
Available status update categories to filter by.

| Key | Usage | Description |
| --- | --- | --- |
`GENERAL` | `CoinGecko.STATUS_UPDATE_CATEGORY.GENERAL` | Filter status update results by general news
`MILESTONE` | `CoinGecko.STATUS_UPDATE_CATEGORY.MILESTONE` | Filter status update results by milestones
`PARTNERSHIP` | `CoinGecko.STATUS_UPDATE_CATEGORY.PARTNERSHIP` | Filter status update results by partnerships
`EXCHANGE_LISTING` | `CoinGecko.STATUS_UPDATE_CATEGORY.EXCHANGE_LISTING` | Filter status update results by exchange listings
`SOFTWARE_RELEASE` | `CoinGecko.STATUS_UPDATE_CATEGORY.SOFTWARE_RELEASE` | Filter status update results by software releases
`FUND_MOVEMENT` | `CoinGecko.STATUS_UPDATE_CATEGORY.FUND_MOVEMENT` | Filter status update results by fund movements
`NEW_LISTINGS` | `CoinGecko.STATUS_UPDATE_CATEGORY.NEW_LISTINGS` | Filter status update results by new listings
`EVENT` | `CoinGecko.STATUS_UPDATE_CATEGORY.EVENT` | Filter status update results by events

___
#### • `CoinGecko.STATUS_UPDATE_PROJECT_TYPE`
Available status update project types to filter by.

| Key | Usage | Description |
| --- | --- | --- |
`COIN` | `CoinGecko.STATUS_UPDATE_PROJECT_TYPE.COIN` | Filter status update results by coins only
`MARKET` | `CoinGecko.STATUS_UPDATE_PROJECT_TYPE.MARKET` | Filter status update results by markets only

___
#### • `CoinGecko.EVENT_TYPE`
List of event types (most recent from `CoinGeckoClient.events.fetchTypes()`)

| Key | Usage | Description |
| --- | --- | --- |
`EVENT` | `CoinGecko.EVENT_TYPE.EVENT` | Filter events by _events_ only
`CONFERENCE` | `CoinGecko.EVENT_TYPE.CONFERENCE` | Filter events by conferences only
`MEETUP` | `CoinGecko.EVENT_TYPE.MEETUP` | Filter events by meetups only

___
## • Making Calls
All calls using the CoinGeckoClient are asynchronous.

All calls are returned in the following format:
```javascript
{
    success: Boolean,
    message: String,
    code: Number,
    data: Object
}
```

The CoinGeckoClient splits up the currently available calls outline in the official CoinGecko API documentation into nine (9) parts. (Aside from the `ping` and `global` calls.)

| Namespace | Usage | Description |
| --- | --- | --- |
`coins` | `CoinGeckoClient.coins[...]` | Calls related to coins
`exchanges` | `CoinGeckoClient.exchanges[...]` | Calls related to exchanges
`statusUpdates` | `CoinGeckoClient.statusUpdates[...]` | Calls related to status updates
`events` | `CoinGeckoClient.events[...]` | Calls related to events
`exchangeRates` | `CoinGeckoClient.exchangeRates[...]` | Calls related to exchange rates
`simple` | `CoinGeckoClient.simple[...]` | Calls related to "simple" endpoints
`finance` | `CoinGeckoClient.finance[...]` | Calls related to finance endpoints
`indexes` | `CoinGeckoClient.indexes[...]` | Calls related to index endpoints
`derivatives` | `CoinGeckoClient.derivatives[...]` | Calls related to derivative endpoints

___
### • Ping
Check API server status.

#### `ping()`
Check API server status.

Usage Example:
```javascript
let data = await CoinGeckoClient.ping();
```

___
### • Global
Get cryptocurrency global data.

#### `global()`
Get cryptocurrency global data.

Usage Example:
```javascript
let data = await CoinGeckoClient.global();
```

___
### • Coins
Calls related to coins.


#### `coins.all()`
List all coins with data (name, price, market, developer, community, etc) - paginated by 50.

Official documentation: https://www.coingecko.com/api/docs/v3#/coins/get_coins

Params:

- `params`: `Object` - Parameters to pass through to the request
- `params.order`: `String` - Order results by `CoinGecko.ORDER[*]`
- `params.per_page`: `Number` - Total results per page
- `params.page`: `Number` - Page through results
- `params.localization`: `Boolean` [default: `true`] - Set to false to exclude localized languages in response
- `params.sparkline`: `Boolean` [default: `false`] - Include sparkline 7 days data

Usage Example:
```javascript
let data = await CoinGeckoClient.coins.all();
```

___
#### `coins.list()`
Use this to obtain all the coins’ id in order to make API calls

Official documentation: https://www.coingecko.com/api/docs/v3#/coins/get_coins_list

Usage Example:
```javascript
let data = await CoinGeckoClient.coins.list();
```

___
#### `coins.markets()`
Use this to obtain all the coins market data (price, market cap, volume).

Official documentation: https://www.coingecko.com/api/docs/v3#/coins/get_coins_markets

Params:
             
- `params`: `Object` - Parameters to pass through to the request
- `params.order`: `String` - Order results by `CoinGecko.ORDER[*]`
- `params.per_page`: `Number` - Total results per page
- `params.page`: `Number` - Page through results
- `params.localization`: `Boolean` [default: `true`] - Set to false to exclude localized languages in response
- `params.sparkline`: `Boolean` [default: `false`] - Include sparkline 7 days data
- `params.vs_currency`: `String` [default: `usd`] - The target currency of market data (`usd`, `eur`, `jpy`, etc.)
- `params.ids`: `Array|String` - List of coin id to filter if you want specific results

Usage Example:
```javascript
let data = await CoinGeckoClient.coins.markets();
```

___
#### `coins.fetch()`
Get current data (name, price, market, … including exchange tickers) for a coin.

Official documentation: https://www.coingecko.com/api/docs/v3#/coins/get_coins__id_

Params:

- `coinId`: `String` - (Required) The coin id (can be obtained from `coins.list()`) eg. `bitcoin`
- `params`: `Object` - Parameters to pass through to the request
- `params.tickers`: `Boolean` - [default: `true`] - Include ticker data
- `params.market_data`: `Boolean` - [default: `true`] - Include market data
- `params.community_data`: `Boolean` - [default: `true`] - Include community data
- `params.developer_data`: `Boolean` - [default: `true`] - Include developer data
- `params.localization`: `Boolean` [default: `true`] - Set to false to exclude localized languages in response
- `params.sparkline`: `Boolean` [default: `false`] - Include sparkline 7 days data

Usage Example:
```javascript
let data = await CoinGeckoClient.coins.fetch('bitcoin', {});
```

___
#### `coins.fetchTickers()`
Get coin tickers (paginated to 100 items).

Official documentation: https://www.coingecko.com/api/docs/v3#/coins/get_coins__id__tickers

Params:

- `coinId`: `String` - (Required) The coin id (can be obtained from `coins.list()`) eg. `bitcoin`
- `params`: `Object` - Parameters to pass through to the request
- `params.page`: `Number` - Page through results
- `params.exchange_ids`: `Array|String` - Filter tickers by exchange_ids (can be obtained from `exchanges.list()`) eg. `binance`
- `params.order`: `String` - [default: `trust_score_desc`] - Order results by `CoinGecko.ORDER.TRUST_SCORE_DESC` or `CoinGecko.ORDER.VOLUME_DESC`

Usage Example:
```javascript
let data = await CoinGeckoClient.coins.fetchTickers('bitcoin');
```

___
#### `coins.fetchHistory()`
Get historical data (name, price, market, stats) at a given date for a coin.

Official documentation: https://www.coingecko.com/api/docs/v3#/coins/get_coins__id__history

Params:

- `coinId`: `String` - (Required) The coin id (can be obtained from `coins.list()`) eg. `bitcoin`
- `params`: `Object` - Parameters to pass through to the request
- `params.date`: `String` - (Required) The date of data snapshot in dd-mm-yyyy eg. `30-12-2017`
- `params.localization`: `Boolean` [default: `true`] - Set to false to exclude localized languages in response

Usage Example:
```javascript
let data = await CoinGeckoClient.coins.fetchHistory('bitcoin', {
  date: '30-12-2017'
});
```

___
#### `coins.fetchMarketChart()`
Get historical market data include price, market cap, and 24h volume (granularity auto).

Official documentation: https://www.coingecko.com/api/docs/v3#/coins/get_coins__id__market_chart

Params:

- `coinId`: `String` - (Required) The coin id (can be obtained from `coins.list()`) eg. `bitcoin`
- `params`: `Object` - Parameters to pass through to the request
- `params.days`: `String` [default: `1`] - (Required )Data up to number of days ago (eg. `1`, `14`, `30`, `max`)
- `params.vs_currency`: `String` [default: `usd`] - (Required) The target currency of market data (`usd`, `eur`, `jpy`, etc.)

Usage Example:
```javascript
let data = await CoinGeckoClient.coins.fetchMarketChart('bitcoin');
```

___
#### `coins.fetchMarketChartRange()`
Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto). Minutely data will be used for duration within 1 day. Hourly data will be used for duration between 1 day and 90 days. Daily data will be used for duration above 90 days.

Official documentation: https://www.coingecko.com/api/documentations/v3#/coins/get_coins__id__market_chart_range

Params:

- `coinId`: `String` - (Required) The coin id (can be obtained from `coins.list()`) eg. `bitcoin`
- `params`: `Object` - Parameters to pass through to the request
- `params.vs_currency`: `String` [default: `usd`] - The target currency of market data (`usd`, `eur`, `jpy`, etc.)
- `params.from`: `Number` - (Required) From date in UNIX Timestamp (eg. 1392577232)
- `params.to`: `Number` - (Required) To date in UNIX Timestamp (eg. 1422577232)

Usage Example:
```javascript
let data = await CoinGeckoClient.coins.fetchMarketChartRange('bitcoin', {
  from: 1392577232,
  to: 1422577232,
});
```

___
#### `coins.fetchStatusUpdates()`
Get status updates for a given coin.

Official documentation: https://www.coingecko.com/api/docs/v3#/coins/get_coins__id__status_updates

Params:

- `coinId`: `String` - (Required) The coin id (can be obtained from `coins.list()`) eg. `bitcoin`
- `params`: `Object` - Parameters to pass through to the request
- `params.per_page`: `Number` - Total results per page
- `params.page`: `Number` - Page through results

Usage Example:
```javascript
let data = await CoinGeckoClient.coins.fetchStatusUpdates('bitcoin');
```

___
#### `coins.fetchCoinContractInfo()`
Get coin info from contract address.

Official documentation: https://www.coingecko.com/api/docs/v3#/coins/get_coins__id__contract__contract_address_

Params:

- `contractAddress`: `String` - (Required) Token’s contract address
- `assetPlatform`: `String` [default: `ethereum`] -  Asset platform (only `ethereum` is supported at this moment).

Usage Example:
```javascript
// 0x contract address (as a test)
let zrx = '0xe41d2489571d322189246dafa5ebde1f4699f498';
let data = await CoinGeckoClient.coins.fetchCoinContractInfo(zrx);
```

___
#### `coins.fetchCoinContractMarketChart()`
Get historical market data include price, market cap, and 24h volume (granularity auto) from a contract address.

Official documentation: https://www.coingecko.com/api/documentations/v3#/contract/get_coins__id__contract__contract_address__market_chart_

Params:

- `contractAddress`: `String` - (Required) Token’s contract address
- `assetPlatform`: `String` [default: `ethereum`] -  Asset platform (only `ethereum` is supported at this moment).
- `params`: `Object` - Parameters to pass through to the request
- `params.vs_currency`: `String` [default: `usd`] - (Required) The target currency of market data (usd, eur, jpy, etc.)
- `params.days`: `String` [default: `1`] - (Required) Data up to number of days ago (eg. 1,14,30,max)

Usage Example:
```javascript
// 0x contract address (as a test)
let zrx = '0xe41d2489571d322189246dafa5ebde1f4699f498';
let data = await CoinGeckoClient.coins.fetchCoinContractMarketChart(zrx);
```

___
#### `coins.fetchCoinContractMarketChartRange()`
Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto).

Official documentation: https://www.coingecko.com/api/documentations/v3#/contract/get_coins__id__contract__contract_address__market_chart_range
Params:

- `contractAddress`: `String` - (Required) Token’s contract address
- `assetPlatform`: `String` [default: `ethereum`] -  Asset platform (only `ethereum` is supported at this moment).
- `params`: `Object` - Parameters to pass through to the request
- `params.vs_currency`: `String` [default: `usd`] - (Required) The target currency of market data (usd, eur, jpy, etc.)
- `params.from`: `Number` - (Required) From date in UNIX Timestamp (eg. 1392577232)
- `params.to`: `Number` - (Required) To date in UNIX Timestamp (eg. 1422577232)

Usage Example:
```javascript
// 0x contract address (as a test)
let zrx = '0xe41d2489571d322189246dafa5ebde1f4699f498';
let data = await CoinGeckoClient.coins.fetchCoinContractMarketChartRange(zrx, 'ethereum', {
  from: 1392577232,
  to: 1422577232,
});
```

___
### • Exchanges
Calls related to exchanges.


#### `exchanges.all()`
List all exchanges.

Official documentation: https://www.coingecko.com/api/docs/v3#/exchanges_(beta)/get_exchanges

Params:

- `params`: `Object` - Parameters to pass through to the request
- `params.page`: `Number` - Page through results
- `params.per_page`: `Number` - Total results per page maximun 250, default 100

Usage Example:
```javascript
let data = await CoinGeckoClient.exchanges.all();
```

___
#### `exchanges.list()`
List all supported markets id and name (no pagination required).

Official documentation: https://www.coingecko.com/api/docs/v3#/exchanges_(beta)/get_exchanges_list

Usage Example:
```javascript
let data = await CoinGeckoClient.exchanges.list();
```

___
#### `exchanges.fetch()`
Get exchange volume in BTC and top 100 tickers only for a given exchange.

Official documentation: https://www.coingecko.com/api/docs/v3#/exchanges_(beta)/get_exchanges__id_

Params:

- `exchangeId`: `String` - (Required) The exchange id (can be obtained from `exchanges.all()`) eg. `binance`

Usage Example:
```javascript
let data = await CoinGeckoClient.exchanges.fetch('binance');
```

___
#### `exchanges.fetchTickers()`
Get tickers for a given exchange.

Official documentation: https://www.coingecko.com/api/docs/v3#/exchanges_(beta)/get_exchanges__id__tickers

Params:

- `exchangeId`: `String` - (Required) The exchange id (can be obtained from `exchanges.all()`) eg. `binance`
- `params`: `Object` - Parameters to pass through to the request
- `params.page`: `Number` - Page through results
- `params.coin_ids`: `Array|String` - Filter tickers by coin_ids (can be obtained from `coins.list()`) eg. `bitcoin`
- `params.order`: `String` - [default: `trust_score_desc`] - Order results by `CoinGecko.ORDER.TRUST_SCORE_DESC` or `CoinGecko.ORDER.VOLUME_DESC`

Usage Example:
```javascript
let data = await CoinGeckoClient.exchanges.fetchTickers('binance');
```

___
#### `exchanges.fetchStatusUpdates()`
Get status updates for a given exchange.

Official documentation: https://www.coingecko.com/api/docs/v3#/exchanges_(beta)/get_exchanges__id__status_updates

Params:

- `exchangeId`: `String` - (Required) The exchange id (can be obtained from `exchanges.all()`) eg. `binance`
- `params`: `Object` - Parameters to pass through to the request
- `params.page`: `Number` - Page through results
- `params.per_page`: `Number` - Total results per page

Usage Example:
```javascript
let data = await CoinGeckoClient.exchanges.fetchStatusUpdates('binance');
```

___
#### `exchanges.fetchVolumeChart()`
Get volume chart data for a given exchange, returned in BTC

Official documentation: https://www.coingecko.com/en/api#operations-exchanges%20(beta)-get_exchanges__id__volume_chart

Params:

- `exchangeId`: `String` - (Required) The exchange id (can be obtained from `exchanges.all()`) eg. `binance`
- `params`: `Object` - Parameters to pass through to the request
- `params.days`: `Number` - Data up to number of days ago (eg. 1, 14, 30)

Usage Example:
```javascript
let data = await CoinGeckoClient.exchanges.fetchVolumeChart('binance', {
  days: 1,
});
```

___
### • Status Updates
Calls related to status updates.


#### `statusUpdates.all()`
List all status_updates with data (description, category, created_at, user, user_title and pin).

Official documentation: https://www.coingecko.com/api/docs/v3#/status_updates_(beta)/get_status_updates

Params:

- `params`: `Object` - Parameters to pass through to the request
- `params.category`: `Number` - Filter results by `CoinGecko.STATUS_UPDATE_CATEGORY[*]`
- `params.project_type`: `Number` - Filter results by `CoinGecko.STATUS_UPDATE_PROJECT_TYPE[*]` (If left empty returns both status from `coins` and `markets`)
- `params.page`: `Number` - Page through results
- `params.per_page`: `Number` - Total results per page

Usage Example:
```javascript
let data = await CoinGeckoClient.statusUpdates.all();
```

___
### • Events
Calls related to events.


#### `events.all()`
Get events, paginated by 100.

Official documentation: https://www.coingecko.com/api/docs/v3#/events/get_events

Params:

- `params`: `Object` - Parameters to pass through to the request
- `params.country_code`: `Number` - country_code of event (eg. `US`). Use `events.fetchHistory()` for list of `country_codes`
- `params.type`: `String` - Type of event (eg. `Conference`). Use `events.fetchTypes()` for list of types. Or use `CoinGecko.EVENT_TYPE[*]`
- `params.page`: `Number` - Page through results
- `params.upcoming_events_only`: `Boolean` - [default: `true`] - Lists only upcoming events
- `params.from_date`: `String` - Lists events after this date yyyy-mm-dd
- `params.to_date`: `String` - Lists events before this date yyyy-mm-dd (set `upcoming_events_only` to false if fetching past events)

Usage Example:
```javascript
let data = await CoinGeckoClient.events.all();
```

___
#### `events.fetchCountries()`
Get list of event countries.

Official documentation: https://www.coingecko.com/api/docs/v3#/events/get_events_countries

Usage Example:
```javascript
let data = await CoinGeckoClient.events.fetchCountries();
```

___
#### `events.fetchTypes()`
Get list of event types.

Official documentation: https://www.coingecko.com/api/docs/v3#/events/get_events_types

Usage Example:
```javascript
let data = await CoinGeckoClient.events.fetchTypes();
```

___
### • Exchange Rates
Calls related to exchange rates.


#### `exchangeRates.all()`
Get BTC-to-Currency exchange rates.

Official documentation: https://www.coingecko.com/api/docs/v3#/exchange_rates/get_exchange_rates

Usage Example:
```javascript
let data = await CoinGeckoClient.exchangeRates.all();
```

___
### • Simple
Calls related to simple endpoints.


#### `simple.price()`
Get the current price of any cryptocurrencies in any other supported currencies that you need.

Official documentation: https://www.coingecko.com/api/docs/v3#/simple/get_simple_price

Params:

- `params`: `Object` - Parameters to pass through to the request
- `params.ids`: `Array|String` - (Required) A single id or a list of coin ids to filter if you want specific results. Use `coins.list()` for a list of coin ids.
- `params.vs_currencies`: `Array|String` - [default: `usd`] - A single id or a list of ids. Use `simple.supportedVsCurrencies()` for a list of vsCurrency ids.
- `params.include_24hr_vol`: `Boolean` - [default: `false`] - To include 24hr volume.
- `params.include_last_updated_at`: `Boolean` - [default: `false`] - To include last_updated_at of price.

Usage Example:
```javascript
let data = await CoinGeckoClient.simple.price({
    ids: ['bitcoin', 'ethereum'],
    vs_currencies: ['eur', 'usd'],
});
```

___
#### `simple.supportedVsCurrencies()`
Get list of supported vs/comparisons currencies.

Official documentation: https://www.coingecko.com/api/docs/v3#/simple/get_simple_supported_vs_currencies

Usage Example:
```javascript
let data = await CoinGeckoClient.simple.supportedVsCurrencies();
```

___
#### `simple.fetchTokenPrice()`
Get current price of tokens (using contract addresses) for a given platform in any other currency that you need.

Official documentation: https://www.coingecko.com/en/api#operations-simple-get_simple_token_price__id_

Params:

- `params`: `Object` - Parameters to pass through to the request
- `assetPlatform`: `String` - [default: `ethereum`] - (Required) Asset platform (only ethereum is supported at this moment)
- `params.contract_addresses`: `String|Array` - (Required) Token’s contract address
- `params.vs_currencies`: `String|Array` - (Required) vs_currency of coins. Use `simple.supportedVsCurrencies()` for a list of vsCurrency ids.
- `params.include_market_cap`: `Boolean` - [default: `false`] - Include market cap in results or not
- `params.include_24hr_vol`: `Boolean` - [default: `false`] - Include 24hr volume in results or not
- `params.include_24hr_change`: `Boolean` - [default: `false`] - Include 24hr change in results or not
- `params.include_last_updated_at`: `Boolean` - [default: `false`] - Include last updated date in results or not


Usage Example:
```javascript
// 0x contract address (as a test)
var zrx = '0xe41d2489571d322189246dafa5ebde1f4699f498';
let data = await CoinGeckoClient.simple.fetchTokenPrice({
  contract_addresses: zrx,
  vs_currencies: 'usd',
});
```

___
### • Finance
Calls related to finance endpoints.


#### `finance.fetchPlatforms()`
List all finance platforms

Official documentation: https://www.coingecko.com/api/documentations/v3#/finance_(beta)/get_finance_platforms

Params:

- `params`: `Object` - Parameters to pass through to the request
- `params.per_page`: `Number` - Total results per page
- `params.page`: `Number` - Page of results (paginated to 100 by default)

Usage Example:
```javascript
let data = await CoinGeckoClient.finance.fetchPlatforms();
```

___
#### `finance.fetchProducts()`
List all finance products

Official documentation: https://www.coingecko.com/api/documentations/v3#/finance_(beta)/get_finance_products

Params:

- `params`: `Object` - Parameters to pass through to the request
- `params.per_page`: `Number` - Total results per page
- `params.page`: `Number` - Page of results (paginated to 100 by default)
- `params.start_at`: `String` - Start date of the financial products
- `params.end_at`: `String` - End date of the financial products

Usage Example:
```javascript
let data = await CoinGeckoClient.finance.fetchProducts();
```

___
### • Indexes
Calls related to index endpoints.


#### `indexes.all()`
List all market indexes

Official documentation: https://www.coingecko.com/en/api#operations-tag-indexes_(beta)

Params:

- `params`: `Object` - Parameters to pass through to the request
- `params.per_page`: `Number` - Total results per page
- `params.page`: `Number` - Page of results (paginated to 100 by default)

Usage Example:
```javascript
let data = await CoinGeckoClient.indexes.all();
```

#### `indexes.fetch()`
List all market indexes

Official documentation: https://www.coingecko.com/en/api#operations-indexes%20(beta)-get_indexes__id_

Params:

- `indexId`: `String` - (Required) The index id (can be obtained from `indexes.list()`)

Usage Example:
```javascript
let testIndexId = 'BTC'; // as a test
let data = await CoinGeckoClient.indexes.fetch(testIndexId);
```

#### `indexes.list()`
List market indexes id and name

Official documentation: https://www.coingecko.com/en/api#operations-indexes%20(beta)-get_indexes_list

Usage Example:
```javascript
let data = await CoinGeckoClient.indexes.list();
```

___
### • Derivatives
Calls related to derivative endpoints.


#### `derivatives.fetchTickers()`
List all derivative tickers

Official documentation: https://www.coingecko.com/api/documentations/v3#/operations-tag-derivatives_(beta)

Usage Example:
```javascript
let data = await CoinGeckoClient.derivatives.fetchTickers();
```

#### `derivatives.allExchanges()`
List all derivative exchanges

Official documentation: https://www.coingecko.com/en/api#operations-derivatives%20(beta)-get_derivatives_exchanges

Params:

- `params`: `Object` - Parameters to pass through to the request
- `params.order`: `String` - Order results by `CoinGecko.ORDER[*]`
- `params.per_page`: `Number` - Total results per page
- `params.page`: `Number` - Page of results

Usage Example:
```javascript
let data = await CoinGeckoClient.derivatives.allExchanges();
```

#### `derivatives.fetchExchange()`
Show derivative exchange data

Official documentation: https://www.coingecko.com/en/api#operations-derivatives%20(beta)-get_derivatives_exchanges__id_

Params:

- `exchangeId`: `String` - (Required) The exchange id (can be obtained from `derivatives.listExchanges()`)
- `params`: `Object` - Parameters to pass through to the request
- `params.include_tickers`: `boolean` - [default: `false`] - Include the tickers information

Usage Example:
```javascript
let testExchangeId = 'bitmex'; // as a test
let data = await CoinGeckoClient.derivatives.fetchExchange(testExchangeId);
```

#### `derivatives.listExchanges()`
List all derivative exchanges name and identifier

Official documentation: https://www.coingecko.com/en/api#operations-derivatives%20(beta)-get_derivatives_exchanges_list

Usage Example:
```javascript
let data = await CoinGeckoClient.derivatives.listExchanges();
```

## • Say Hi

Find me on Gab: [@markmiscavage](https://gab.com/markmiscavage).

Tweet at me: [@markmiscavage](https://twitter.com/markmiscavage).

## • License

MIT License

Copyright (c) 2020 Mark Miscavage

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
