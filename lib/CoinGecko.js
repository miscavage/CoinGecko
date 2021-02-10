'use strict';

//Modules
const https = require('https');
const querystring = require('querystring');

//Helpers
const Utils = require('./helpers/utilities');
const Constants = require('./helpers/constants');
const ReturnObject = require('./helpers/ReturnObject');

/**
 * @class CoinGecko
 * @author Mark Miscavage <markmiscavage@protonmail.com>
 * @description A Node.js wrapper for the CoinGecko API with no dependencies. For more information, visit: https://www.coingecko.com/api/docs/v3
 * @example
 *     const CoinGecko = require('coingecko-api');
 *     const CoinGeckoClient = new CoinGecko();
 * @public
 * @version 1.0.10
 * @license MIT
 * @kind class
 */
class CoinGecko {

  /**
   * @description Check API server status
   * @function ping
   * @returns {ReturnObject}
   */
  ping() {
    const path = `/ping`;

    return this._request(path);
  };

  /**
   * @description Get cryptocurrency global data
   * @function global
   * @returns {ReturnObject}
   */
  global() {
    const path = `/global`;

    return this._request(path);
  };

  /**
   * @description Calls related to coins
   */
  get coins() {
    const pathPrefix = 'coins';

    return {

      /**
       * @description List all coins with data (name, price, market, developer, community, etc) - paginated by 50
       * @function coins.all()
       * @param {object} params - Parameters to pass through to the request
       * @param {string} params.order - Order results by CoinGecko.ORDER[*]
       * @param {number} params.per_page - Total results per page
       * @param {number} params.page - Page through results
       * @param {boolean} params.localization [default: true] - Set to false to exclude localized languages in response
       * @param {boolean} params.sparkline [default: false] - Include sparkline 7 days data
       * @returns {ReturnObject}
       */
      all: (params = {}) => {
        const path = `/${pathPrefix}`;

        return this._request(path, params);
      },

      /**
       * @description Use this to obtain all the coins’ id in order to make API calls
       * @function coins.list()
       * @param {object} params - Parameters to pass through to the request
       * @param {object} params.include_platform - Flag to include platform contract addresses
       * @returns {ReturnObject}
       */
      list: (params = {}) => {
        const path = `/${pathPrefix}/list`;

        return this._request(path, params);
      },

      /**
       * @description Use this to obtain all the coins market data (price, market cap, volume)
       * @function coins.markets()
       * @param {object} params - Parameters to pass through to the request
       * @param {string} params.vs_currency [default: usd] - The target currency of market data (usd, eur, jpy, etc.)
       * @param {array|string} params.ids - List of coin id to filter if you want specific results
       * @param {string} params.order - Order results by CoinGecko.ORDER[*]
       * @param {number} params.per_page - Total results per page
       * @param {number} params.page - Page through results
       * @param {boolean} params.sparkline [default: false] - Include sparkline 7 days data (true/false)
       * @returns {ReturnObject}
       */
      markets: (params = {}) => {
        const path = `/${pathPrefix}/markets`;

        //Must be object
        if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

        //If no params.vs_currency, set to default: 'usd'
        if (!Utils.isString(params['vs_currency']) || Utils.isStringEmpty(params['vs_currency'])) {
          params.vs_currency = 'usd';
        }

        //Check the params.ids
        //If is string, ok. If is array, convert to string
        if (Utils.isArray(params['ids'])) {
          params.ids = params.ids.join(',');
        }

        return this._request(path, params);
      },

      /**
       * @description Get current data (name, price, market, … including exchange tickers) for a coin.
       * @function coins.fetch()
       * @param {string} coinId - (Required) The coin id (can be obtained from coins.list()) eg. bitcoin
       * @param {object} params - Parameters to pass through to the request
       * @param {boolean} params.tickers [default: true] - Include ticker data
       * @param {boolean} params.market_data [default: true] - Include market data
       * @param {boolean} params.community_data [default: true] - Include community data
       * @param {boolean} params.developer_data [default: true] - Include developer data
       * @param {boolean} params.localization [default: true] - Set to false to exclude localized languages in response
       * @param {boolean} params.sparkline [default: false] - Include sparkline 7 days data (true/false)
       * @returns {ReturnObject}
       */
      fetch: (coinId, params = {}) => {
        //Must have coinId
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

        const path = `/${pathPrefix}/${coinId}`;

        return this._request(path, params);
      },

      /**
       * @description Get coin tickers (paginated to 100 items).
       * @function coins.fetchTickers()
       * @param {string} coinId - (Required) The coin id (can be obtained from coins.list()) eg. bitcoin
       * @param {object} params - Parameters to pass through to the request
       * @param {string} params.page - Page through results
       * @param {number} params.exchange_ids - Filter tickers by exchange_ids
       * @param {string} params.order [default: trust_score_desc] - Order results by CoinGecko.ORDER.TRUST_SCORE_DESC or CoinGecko.ORDER.VOLUME_DESC
       * @returns {ReturnObject}
       */
      fetchTickers: (coinId, params = {}) => {
        //Must have coinId
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

        //Convert array to string
        if (Utils.isArray(params['exchange_ids'])) {
          params.exchange_ids = params.exchange_ids.join(',');
        }

        const path = `/${pathPrefix}/${coinId}/tickers`;

        return this._request(path, params);
      },

      /**
       * @description Get historical data (name, price, market, stats) at a given date for a coin
       * @function coins.fetchHistory()
       * @param {string} coinId - (Required) The coin id (can be obtained from coins.list()) eg. bitcoin
       * @param {object} params - Parameters to pass through to the request
       * @param {string} params.date - (Required) The date of data snapshot in dd-mm-yyyy eg. 30-12-2017
       * @param {boolean} params.localization [default: true] - Set to false to exclude localized languages in response
       * @returns {ReturnObject}
       */
      fetchHistory: (coinId, params = {}) => {
        //Must have coinId
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

        //Must be object
        if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

        //If no params.date, set to default today/now
        if (!Utils.isString(params['date']) || Utils.isStringEmpty(params['date'])) Utils._WARN_('Missing parameter', 'params must include `date` and be a string in format: `dd-mm-yyyy`');

        const path = `/${pathPrefix}/${coinId}/history`;

        return this._request(path, params);
      },

      /**
       * @description Get historical market data include price, market cap, and 24h volume (granularity auto)
       * @function coins.fetchMarketChart()
       * @param {string} coinId - (Required) The coin id (can be obtained from coins.list()) eg. bitcoin
       * @param {object} params - Parameters to pass through to the request
       * @param {string} params.vs_currency [default: usd] - (Required) The target currency of market data (usd, eur, jpy, etc.)
       * @param {string} params.days [default: 1] - (Required) Data up to number of days ago (eg. 1,14,30,max)
       * @returns {ReturnObject}
       */
      fetchMarketChart: (coinId, params = {}) => {
        //Must have coinId
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

        //Must be object
        if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

        //If no params.vs_currency, set to default: 'usd'
        if (!Utils.isString(params['vs_currency']) || Utils.isStringEmpty(params['vs_currency'])) {
          params.vs_currency = 'usd';
        }

        //If no params.days, set to default: 1
        if (params['days'] == undefined) {
          params.days = 1;
        }

        const path = `/${pathPrefix}/${coinId}/market_chart`;

        return this._request(path, params);
      },

      /**
       * @description Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto).
       *   Minutely data will be used for duration within 1 day.
       *   Hourly data will be used for duration between 1 day and 90 days.
       *   Daily data will be used for duration above 90 days.
       * @function coins.fetchMarketChartRange()
       * @param {string} coinId - (Required) The coin id (can be obtained from coins.list()) eg. bitcoin
       * @param {object} params - Parameters to pass through to the request
       * @param {string} params.vs_currency [default: usd] - (Required) The target currency of market data (usd, eur, jpy, etc.)
       * @param {number} params.from - (Required) From date in UNIX Timestamp (eg. 1392577232)
       * @param {number} params.to - (Required) To date in UNIX Timestamp (eg. 1422577232)
       * @returns {ReturnObject}
       */
      fetchMarketChartRange: (coinId, params = {}) => {
        //Must have coinId
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

        //Must be object
        if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

        //If no params.vs_currency, set to default: 'usd'
        if (!Utils.isString(params['vs_currency']) || Utils.isStringEmpty(params['vs_currency'])) {
          params.vs_currency = 'usd';
        }

        if (!Utils.isNumber(params['from'])) Utils._WARN_('Missing parameter', 'params must include `from` and be a UNIX timestamp.');
        if (!Utils.isNumber(params['to'])) Utils._WARN_('Missing parameter', 'params must include `to` and be a UNIX timestamp.');

        const path = `/${pathPrefix}/${coinId}/market_chart/range`;

        return this._request(path, params);
      },

      /**
       * @description Get status updates for a given coin
       * @function coins.fetchStatusUpdates()
       * @param {string} coinId - (Required) The coin id (can be obtained from coins.list()) eg. bitcoin
       * @param {object} params - Parameters to pass through to the request
       * @param {number} params.per_page - Total results per page
       * @param {number} params.page - Page through results
       * @returns {ReturnObject}
       */
      fetchStatusUpdates: (coinId, params = {}) => {
        //Must have coinId
        if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

        const path = `/${pathPrefix}/${coinId}/status_updates`;

        return this._request(path, params);
      },

      /**
       * @description Get coin info from contract address
       * @function coins.fetchCoinContractInfo()
       * @param {object} contractAddress - (Required) Token’s contract address
       * @param {string} assetPlatform [default: ethereum] - (Required) Asset platform (only ethereum is supported at this moment)
       * @returns {ReturnObject}
       */
      fetchCoinContractInfo: (contractAddress, assetPlatform = 'ethereum') => {
        //Must have contractAddress, assetPlatform
        if (!Utils.isString(contractAddress) || Utils.isStringEmpty(contractAddress)) Utils._WARN_('Invalid parameter', 'contractAddress must be of type: String and greater than 0 characters.');
        if (!Utils.isString(assetPlatform) || Utils.isStringEmpty(assetPlatform)) Utils._WARN_('Invalid parameter', 'assetPlatform must be of type: String and greater than 0 characters.');

        const path = `/${pathPrefix}/${assetPlatform}/contract/${contractAddress}`;

        return this._request(path);
      },

      /**
       * @description Get historical market data include price, market cap, and 24h volume (granularity auto) from a contract address
       * @function coins.fetchCoinContractMarketChart()
       * @param {object} contractAddress - (Required) Token’s contract address
       * @param {string} assetPlatform [default: ethereum] - (Required) Asset platform (only ethereum is supported at this moment)
       * @param {object} params - Parameters to pass through to the request
       * @param {string} params.vs_currency [default: usd] - (Required) The target currency of market data (usd, eur, jpy, etc.)
       * @param {string} params.days [default: 1] - (Required) Data up to number of days ago (eg. 1,14,30,max)
       * @returns {ReturnObject}
       */
      fetchCoinContractMarketChart: (contractAddress, assetPlatform = 'ethereum', params = {}) => {
        //Must have contractAddress, assetPlatform
        if (!Utils.isString(contractAddress) || Utils.isStringEmpty(contractAddress)) Utils._WARN_('Invalid parameter', 'contractAddress must be of type: String and greater than 0 characters.');
        if (!Utils.isString(assetPlatform) || Utils.isStringEmpty(assetPlatform)) Utils._WARN_('Invalid parameter', 'assetPlatform must be of type: String and greater than 0 characters.');

        //Must be object
        if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

        //If no params.vs_currency, set to default: 'usd'
        if (!Utils.isString(params['vs_currency']) || Utils.isStringEmpty(params['vs_currency'])) {
          params.vs_currency = 'usd';
        }

        //If no params.days, set to default: 1
        if (params['days'] == undefined) {
          params.days = 1;
        }

        const path = `/${pathPrefix}/${assetPlatform}/contract/${contractAddress}/market_chart`;

        return this._request(path, params);
      },

      /**
       * @description Get historical market data include price, market cap, and 24h volume within a range of timestamp (granularity auto)
       * @function coins.fetchCoinContractMarketChartRange()
       * @param {object} contractAddress - (Required) Token’s contract address
       * @param {string} assetPlatform [default: ethereum] - (Required) Asset platform (only ethereum is supported at this moment)
       * @param {object} params - Parameters to pass through to the request
       * @param {string} params.vs_currency [default: usd] - (Required) The target currency of market data (usd, eur, jpy, etc.)
       * @param {number} params.from - (Required) From date in UNIX Timestamp (eg. 1392577232)
       * @param {number} params.to - (Required) To date in UNIX Timestamp (eg. 1422577232)
       * @returns {ReturnObject}
       */
      fetchCoinContractMarketChartRange: (contractAddress, assetPlatform = 'ethereum', params = {}) => {
        //Must have contractAddress, assetPlatform
        if (!Utils.isString(contractAddress) || Utils.isStringEmpty(contractAddress)) Utils._WARN_('Invalid parameter', 'contractAddress must be of type: String and greater than 0 characters.');
        if (!Utils.isString(assetPlatform) || Utils.isStringEmpty(assetPlatform)) Utils._WARN_('Invalid parameter', 'assetPlatform must be of type: String and greater than 0 characters.');

        //Must be object
        if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

        //If no params.vs_currency, set to default: 'usd'
        if (!Utils.isString(params['vs_currency']) || Utils.isStringEmpty(params['vs_currency'])) {
          params.vs_currency = 'usd';
        }

        //If no params.days, set to default: 1
        if (params['days'] == undefined) {
          params.days = 1;
        }

        const path = `/${pathPrefix}/${assetPlatform}/contract/${contractAddress}/market_chart/range`;

        return this._request(path, params);
      },
    };
  };

  /**
   * @description Calls related to exchanges
   */
  get exchanges() {
    const pathPrefix = 'exchanges';

    return {

      /**
       * @description List all exchanges
       * @function exchanges.all()
       * @returns {ReturnObject}
       */
      all: () => {
        const path = `/${pathPrefix}`;

        return this._request(path);
      },

      /**
       * @description List all supported markets id and name
       * @function exchanges.list()
       * @returns {ReturnObject}
       */
      list: () => {
        const path = `/${pathPrefix}/list`;

        return this._request(path);
      },

      /**
       * @description Get exchange volume in BTC and top 100 tickers only for a given exchange
       * @function exchanges.fetch()
       * @param {string} exchangeId - (Required) The exchange id (can be obtained from exchanges.all()) eg. binance
       * @returns {ReturnObject}
       */
      fetch: (exchangeId) => {
        //Must have exchangeId
        if (!Utils.isString(exchangeId) || Utils.isStringEmpty(exchangeId)) Utils._WARN_('Invalid parameter', 'exchangeId must be of type: String and greater than 0 characters.');

        const path = `/${pathPrefix}/${exchangeId}`;

        return this._request(path);
      },

      /**
       * @description Get tickers for a given exchange
       * @function exchanges.fetchTickers()
       * @param {string} exchangeId - (Required) The exchange id (can be obtained from exchanges.all()) eg. binance
       * @param {object} params - Parameters to pass through to the request
       * @param {number} params.page - Page through results
       * @param {number} params.coin_ids - Filter tickers by coin_ids
       * @param {string} params.order [default: trust_score_desc] - Order results by CoinGecko.ORDER.TRUST_SCORE_DESC or CoinGecko.ORDER.VOLUME_DESC
       * @returns {ReturnObject}
       */
      fetchTickers: (exchangeId, params = {}) => {
        //Must have exchangeId
        if (!Utils.isString(exchangeId) || Utils.isStringEmpty(exchangeId)) Utils._WARN_('Invalid parameter', 'exchangeId must be of type: String and greater than 0 characters.');

        //Convert array to string
        if (Utils.isArray(params['coin_ids'])) {
          params.coin_ids = params.coin_ids.join(',');
        }

        const path = `/${pathPrefix}/${exchangeId}/tickers`;

        return this._request(path, params);
      },

      /**
       * @description Get status updates for a given exchange
       * @function exchanges.fetchStatusUpdates()
       * @param {string} exchangeId - (Required) The exchange id (can be obtained from exchanges.all()) eg. binance
       * @param {object} params - Parameters to pass through to the request
       * @param {number} params.per_page - Total results per page
       * @param {number} params.page - Page through results
       * @returns {ReturnObject}
       */
      fetchStatusUpdates: (exchangeId, params = {}) => {
        //Must have exchangeId
        if (!Utils.isString(exchangeId) || Utils.isStringEmpty(exchangeId)) Utils._WARN_('Invalid parameter', 'exchangeId must be of type: String and greater than 0 characters.');

        const path = `/${pathPrefix}/${exchangeId}/status_updates`;

        return this._request(path, params);
      },

      /**
       * @description Get volume chart data for a given exchange, returned in BTC
       * @function exchanges.fetchVolumeChart()
       * @param {string} exchangeId - (Required) The exchange id (can be obtained from exchanges.all()) eg. binance
       * @param {object} params - Parameters to pass through to the request
       * @param {number} params.days - Data up to number of days ago (eg. 1, 14, 30)
       * @returns {ReturnObject}
       */
      fetchVolumeChart: (exchangeId, params = {}) => {
        //Must have exchangeId
        if (!Utils.isString(exchangeId) || Utils.isStringEmpty(exchangeId)) Utils._WARN_('Invalid parameter', 'exchangeId must be of type: String and greater than 0 characters.');

        const path = `/${pathPrefix}/${exchangeId}/volume_chart`;

        return this._request(path, params);
      },
    };
  };

  /**
   * @description Calls related to status updates
   */
  get statusUpdates() {
    return {

      /**
       * @description List all status_updates with data (description, category, created_at, user, user_title and pin)
       * @function statusUpdates.all()
       * @param {object} params - Parameters to pass through to the request
       * @param {number} params.category - Filter results by CoinGecko.STATUS_UPDATE_CATEGORY[*]
       * @param {number} params.project_type - Filter results by CoinGecko.STATUS_UPDATE_PROJECT_TYPE[*] (If left empty returns both status from coins and markets)
       * @param {number} params.per_page - Total results per page
       * @param {number} params.page - Page through results
       * @returns {ReturnObject}
       */
      all: (params = {}) => {
        const path = `/status_updates`;

        return this._request(path, params);
      },
    };
  };

  /**
   * @description Calls related to events
   */
  get events() {
    const pathPrefix = 'events';

    return {

      /**
       * @description Get events, paginated by 100
       * @function events.all()
       * @param {object} params - Parameters to pass through to the request
       * @param {number} params.country_code - country_code of event (eg. ‘US’). Use events.fetchHistory() for list of country_codes
       * @param {string} params.type - Type of event (eg.‘Conference’). Use events.fetchTypes() for list of types. Or use CoinGecko.EVENT_TYPE[*]
       * @param {number} params.page - Page of results (paginated by 100)
       * @param {boolean} params.upcoming_events_only [default: true] - Lists only upcoming events
       * @param {string} params.from_date - Lists events after this date yyyy-mm-dd
       * @param {string} params.to_date - Lists events before this date yyyy-mm-dd (set upcoming_events_only to false if fetching past events)
       * @returns {ReturnObject}
       */
      all: (params = {}) => {
        const path = `/${pathPrefix}`;

        return this._request(path, params);
      },

      /**
       * @description Get list of event countries
       * @function events.fetchCountries()
       * @returns {ReturnObject}
       */
      fetchCountries: () => {
        const path = `/${pathPrefix}/countries`;

        return this._request(path);
      },

      /**
       * @description Get list of event types
       * @function events.fetchTypes()
       * @returns {ReturnObject}
       */
      fetchTypes: () => {
        const path = `/${pathPrefix}/types`;

        return this._request(path);
      },
    };
  };

  /**
   * @description Calls related to exchange rates
   */
  get exchangeRates() {
    return {

      /**
       * @description Get BTC-to-Currency exchange rates
       * @function exchangeRates.all()
       * @returns {ReturnObject}
       */
      all: () => {
        const path = `/exchange_rates`;

        return this._request(path);
      }
    };
  };

  /**
   * @description Calls related to "simple" endpoints
   */
  get simple() {
    return {

      /**
       * @description Get the current price of any cryptocurrencies in any other supported currencies that you need
       * @function simple.price()
       * @param {object} params - Parameters to pass through to the request
       * @param {array|string} params.ids - (Required) A single id or a list of coin ids to filter if you want specific results. Use coins.list() for a list of coin ids.
       * @param {array|string} params.vs_currencies [default: usd] - A single id or a list of ids. Use simple.supportedVsCurrencies() for a list of vsCurrency ids.
       * @param {boolean} params.include_24hr_vol [default: false] - To include 24hr_vol (true/false)
       * @param {boolean} params.include_last_updated_at [default: false] - To include last_updated_at of price (true/false)
       * @returns {ReturnObject}
       */
      price: (params = {}) => {
        //Must be object
        if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

        //Check the params.vs_currencies
        //If is string, ok. If is array, convert to string
        if (Utils.isArray(params['vs_currencies'])) {
          params.vs_currencies = params.vs_currencies.join(',');
        }

        //If no params.vs_currency, set to default: 'usd'
        if (!Utils.isString(params['vs_currencies']) || Utils.isStringEmpty(params['vs_currencies'])) {
          params.vs_currencies = 'usd';
        }

        //Check the params.ids
        //If is string, ok. If is array, convert to string
        if (Utils.isArray(params['ids'])) {
          params.ids = params.ids.join(',');
        }

        //Must have params.ids
        if (!Utils.isString(params['ids']) || Utils.isStringEmpty(params['ids'])) Utils._WARN_('Invalid parameter', 'params.ids must be of type: String or Array and greater than 0 characters.');

        //

        const path = `/simple/price`;

        return this._request(path, params);
      },

      /**
       * @description Get list of supported vs/comparisons currencies
       * @function simple.supportedVsCurrencies()
       * @returns {ReturnObject}
       */
      supportedVsCurrencies: () => {
        const path = `/simple/supported_vs_currencies`;

        return this._request(path);
      },

      /**
       * @description Get current price of tokens (using contract addresses) for a given platform in any other currency that you need
       * @function simple.fetchTokenPrice()
       * @param {object} params - Parameters to pass through to the request
       * @param {string} assetPlatform [default: ethereum] - (Required) Asset platform (only ethereum is supported at this moment)
       * @param {string|array} params.contract_addresses - (Required) Token’s contract address
       * @param {string|array} params.vs_currencies - (Required) vs_currency of coins. Use simple.supportedVsCurrencies() for a list of vsCurrency ids.
       * @param {boolean} params.include_market_cap [default: false] - Include market cap in results or not
       * @param {boolean} params.include_24hr_vol [default: false] - Include 24hr volume in results or not
       * @param {boolean} params.include_24hr_change [default: false] - Include 24hr change in results or not
       * @param {boolean} params.include_last_updated_at [default: false] - Include last updated date in results or not
       * @returns {ReturnObject}
       */
      fetchTokenPrice: (params = {}, assetPlatform = 'ethereum') => {
        //Must be object
        if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

        //Must have assetPlatform
        if (!Utils.isString(assetPlatform) || Utils.isStringEmpty(assetPlatform)) Utils._WARN_('Invalid parameter', 'assetPlatform must be of type: String and greater than 0 characters.');

        //Must have contract_addresses, vs_currencies
        if (!params['contract_addresses']) Utils._WARN_('Missing parameter', 'params must include `contract_addresses` and be a of type: String or Object');
        if (!params['vs_currencies']) Utils._WARN_('Missing parameter', 'params must include `vs_currencies` and be a of type: String or Object');

        //If are arrays, convert to string
        if (Utils.isArray(params['contract_addresses'])) {
          params.contract_addresses = params.contract_addresses.join(',');
        }

        if (Utils.isArray(params['vs_currencies'])) {
          params.vs_currencies = params.vs_currencies.join(',');
        }

        const path = `/simple/token_price/${assetPlatform}`;

        return this._request(path, params);
      },
    };
  };

  /**
   * @description Calls related to finance endpoints
   */
  get finance() {
    return {
      /**
       * @description List all finance platforms
       * @function finance.fetchPlatforms()
       * @param {object} params - Parameters to pass through to the request
       * @param {number} params.per_page - Total results per page
       * @param {number} params.page - Page of results (paginated to 100 by default)
       * @returns {ReturnObject}
       */
      fetchPlatforms: (params = {}) => {
        const path = `/finance_platforms`;

        return this._request(path, params);
      },

      /**
       * @description List all finance products
       * @function finance.fetchProducts()
       * @param {object} params - Parameters to pass through to the request
       * @param {number} params.per_page - Total results per page
       * @param {number} params.page - Page of results (paginated to 100 by default)
       * @param {string} params.start_at - Start date of the financial products
       * @param {string} params.end_at - End date of the financial products
       * @returns {ReturnObject}
       */
      fetchProducts: (params = {}) => {
        const path = `/finance_products`;

        return this._request(path, params);
      },
    };
  };

  /**
   * @description Calls related to index endpoints
   */
  get indexes() {
    const pathPrefix = 'indexes';

    return {
      /**
       * @description List all market indexes
       * @function indexes.all()
       * @param {object} params - Parameters to pass through to the request
       * @param {number} params.per_page - Total results per page
       * @param {number} params.page - Page of results
       * @returns {ReturnObject}
       */
      all: (params = {}) => {
        const path = `/${pathPrefix}`;

        return this._request(path, params);
      },

      /**
       * @description Fetch market index by id
       * @function indexes.fetch()
       * @param {string} indexId - (Required) The index id (can be obtained from indexes.list())
       * @returns {ReturnObject}
       */
      fetch: (indexId) => {
        //Must have indexId
        if (!Utils.isString(indexId) || Utils.isStringEmpty(indexId)) Utils._WARN_('Invalid parameter', 'indexId must be of type: String and greater than 0 characters.');

        const path = `/${pathPrefix}/${indexId}`;

        return this._request(path);
      },

      /**
       * @description List market indexes id and name
       * @function indexes.list()
       * @returns {ReturnObject}
       */
      list: () => {
        const path = `/${pathPrefix}/list`;

        return this._request(path);
      },

    };
  };

  /**
   * @description Calls related to derivative endpoints
   */
  get derivatives() {
    const pathPrefix = 'derivatives';

    return {
      /**
       * @description List all derivative tickers
       * @function derivatives.fetchTickers()
       * @returns {ReturnObject}
       */
      fetchTickers: () => {
        const path = `/${pathPrefix}`;

        return this._request(path);
      },

      /**
       * @description List all derivative exchanges
       * @function derivatives.allExchanges()
       * @param {object} params - Parameters to pass through to the request
       * @param {string} params.order - Order results by CoinGecko.ORDER[*]
       * @param {number} params.per_page - Total results per page
       * @param {number} params.page - Page of results
       * @returns {ReturnObject}
       */
      allExchanges: (params = {}) => {
        const path = `/${pathPrefix}/exchanges`;

        return this._request(path, params);
      },

      /**
       * @description Show derivative exchange data
       * @function derivatives.fetchExchange()
       * @param {string} exchangeId - (Required) The exchange id (can be obtained from derivatives.listExchanges()) e.g. bitmex
       * @param {object} params - Parameters to pass through to the request
       * @param {boolean} params.include_tickers [default: false] - Include the tickers information
       * @returns {ReturnObject}
       */
      fetchExchange: (exchangeId, params = {}) => {
        //Must have exchangeId
        if (!Utils.isString(exchangeId) || Utils.isStringEmpty(exchangeId)) Utils._WARN_('Invalid parameter', 'exchangeId must be of type: String and greater than 0 characters.');

        const path = `/${pathPrefix}/exchanges/${exchangeId}`;

        return this._request(path, params);
      },

      /**
       * @description List all derivative exchanges name and identifier
       * @function derivatives.listExchanges()
       * @returns {ReturnObject}
       */
      listExchanges: () => {
        const path = `/${pathPrefix}/exchanges/list`;

        return this._request(path);
      },
    };
  };

  /**
   * @description Build options for https.request
   * @function _buildRequestOptions
   * @protected
   * @param {string} path - Relative path for API
   * @param {object} params - Object representing query strings for url parameters
   * @returns {Object} - {path, method, host, port} Options for request
   */
  _buildRequestOptions(path, params) {
    //Stringify object params if exist
    if (Utils.isObject(params)) params = querystring.stringify(params);
    else params = undefined;

    //Make relative path
    //Check if has params, append accordingly
    if (params == undefined) path = `/api/v${Constants.API_VERSION}${path}`;
    else path = `/api/v${Constants.API_VERSION}${path}?${params}`;

    //Return options
    return {
      path,
      method: 'GET',
      host: Constants.HOST,
      port: 443,
      timeout: CoinGecko.TIMEOUT,
    };
  };

  /**
   * @description Perform https request
   * @function _request
   * @protected
   * @param {string} path - Relative path for API
   * @param {object} params - Object representing query strings for url parameters
   * @returns {Promise} Body of https request data results
   */
  _request(path, params) {
    let options = this._buildRequestOptions(path, params);

    return new Promise((resolve, reject) => {
      //Perform request
      let req = https.request(options, (res) => {
        let body = [];

        //Set body on data
        res.on('data', (chunk) => {
          body.push(chunk);
        });

        //On end, end the Promise
        res.on('end', () => {
          try {
            body = Buffer.concat(body);
            body = body.toString();

            //Check if page is returned instead of JSON
            if (body.startsWith('<!DOCTYPE html>')) {
              Utils._WARN_('Invalid request', 'There was a problem with your request. The parameter(s) you gave are missing or incorrect.');
            } else if (body.startsWith('Throttled')) {
              Utils._WARN_('Throttled request', 'There was a problem with request limit.');
            }

            //Attempt to parse
            body = JSON.parse(body);
          }
          catch (error) {
            reject(error);
          };

          //Create return object
          resolve(
            ReturnObject(
              !(res.statusCode < 200 || res.statusCode >= 300),
              res.statusMessage,
              res.statusCode,
              body
            )
          );
        });
      });

      //On error, reject the Promise
      req.on('error', (error) => reject(error));

      //On timeout, reject the Promise
      req.on('timeout', () => {
        req.abort();
        reject(new Error(`CoinGecko API request timed out. Current timeout is: ${CoinGecko.TIMEOUT} milliseconds`));
      });

      //End request
      req.end();
    });
  };
};

//Set Constants
CoinGecko.API_VERSION = Constants.API_VERSION;
CoinGecko.REQUESTS_PER_SECOND = Constants.REQUESTS_PER_SECOND;
CoinGecko.ORDER = Constants.ORDER;
CoinGecko.STATUS_UPDATE_CATEGORY = Constants.STATUS_UPDATE_CATEGORY;
CoinGecko.STATUS_UPDATE_PROJECT_TYPE = Constants.STATUS_UPDATE_PROJECT_TYPE;
CoinGecko.EVENT_TYPE = Constants.EVENT_TYPE;
CoinGecko.TIMEOUT = Constants.TIMEOUT;

//

module.exports = exports = CoinGecko;
