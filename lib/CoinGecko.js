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
 * @version 1.0.5
 * @license MIT
 * @kind class
 */
class CoinGecko {

    /**
     * @description Check API server status
     * @function ping
     * @async
     * @returns {ReturnObject}
     */
    async ping() {
        const method = 'GET';
        let path = `/ping`;

        //Build options
        let options = this._buildRequestOptions(method, path);

        //Return request
        return this._request(options);
    };

    /**
     * @description Get cryptocurrency global data
     * @function global
     * @async
     * @returns {ReturnObject}
     */
    async global() {
        const method = 'GET';
        let path = `/global`;

        //Build options
        let options = this._buildRequestOptions(method, path);

        //Return request
        return this._request(options);
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
             * @async
             * @param {object} params - Parameters to pass through to the request
             * @param {string} params.order - Order results by CoinGecko.ORDER[*]
             * @param {number} params.per_page - Total results per page
             * @param {number} params.page - Page through results
             * @param {boolean} params.localization [default: true] - Set to false to exclude localized languages in response
             * @param {boolean} params.sparkline [default: false] - Include sparkline 7 days data
             * @returns {ReturnObject}
             */
            all: async(params={}) => {
                const method = 'GET';
                let path = `/${pathPrefix}`;

                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
            },

            /**
             * @description Use this to obtain all the coins’ id in order to make API calls
             * @function coins.list()
             * @async
             * @returns {ReturnObject}
             */
            list: async() => {
                const method = 'GET';
                let path = `/${pathPrefix}/list`;

                //Build options
                let options = this._buildRequestOptions(method, path);

                //Return request
                return this._request(options);
            },

            /**
             * @description Use this to obtain all the coins market data (price, market cap, volume)
             * @function coins.markets()
             * @async
             * @param {object} params - Parameters to pass through to the request
             * @param {string} params.vs_currency [default: usd] - The target currency of market data (usd, eur, jpy, etc.)
             * @param {array|string} params.ids - List of coin id to filter if you want specific results
             * @param {string} params.order - Order results by CoinGecko.ORDER[*]
             * @param {number} params.per_page - Total results per page
             * @param {number} params.page - Page through results
             * @param {boolean} params.sparkline [default: false] - Include sparkline 7 days data (true/false)
             * @returns {ReturnObject}
             */
            markets: async(params={}) => {
                const method = 'GET';
                let path = `/${pathPrefix}/markets`;

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

                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
            },

            /**
             * @description Get current data (name, price, market, … including exchange tickers) for a coin.
             * @function coins.fetch()
             * @async
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
            fetch: async(coinId, params={}) => {
                //Must have coinId
                if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

                const method = 'GET';
                let path = `/${pathPrefix}/${coinId}`;

                //Build request options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
            },

            /**
             * @description Get coin tickers (paginated to 100 items).
             * @function coins.fetchTickers()
             * @async
             * @param {string} coinId - (Required) The coin id (can be obtained from coins.list()) eg. bitcoin
             * @param {object} params - Parameters to pass through to the request
             * @param {string} params.page - Page through results
             * @param {number} params.exchange_ids - Filter tickers by exchange_ids
             * @returns {ReturnObject}
             */
            fetchTickers: async(coinId, params={}) => {
                //Must have coinId
                if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

                //Convert array to string
                if (Utils.isArray(params['exchange_ids'])) {
                    params.exchange_ids = params.exchange_ids.join(',');
                }

                const method = 'GET';
                let path = `/${pathPrefix}/${coinId}/tickers`;

                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
            },


            /**
             * @description Get historical data (name, price, market, stats) at a given date for a coin
             * @function coins.fetchHistory()
             * @async
             * @param {string} coinId - (Required) The coin id (can be obtained from coins.list()) eg. bitcoin
             * @param {object} params - Parameters to pass through to the request
             * @param {string} params.date - (Required) The date of data snapshot in dd-mm-yyyy eg. 30-12-2017
             * @param {boolean} params.localization [default: true] - Set to false to exclude localized languages in response
             * @returns {ReturnObject}
             */
            fetchHistory: async(coinId, params={}) => {
                //Must have coinId
                if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

                //Must be object
                if (!Utils.isObject(params)) Utils._WARN_('Invalid parameter', 'params must be of type: Object');

                //If no params.data, set to default today/now
                if (!Utils.isString(params['date']) || Utils.isStringEmpty(params['date'])) Utils._WARN_('Missing parameter', 'params must include `date` and be a string in format: `dd-mm-yyyy`');

                const method = 'GET';
                let path = `/${pathPrefix}/${coinId}/history`;

                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
            },

            /**
             * @description Get historical market data include price, market cap, and 24h volume (granularity auto)
             * @function coins.fetchMarketChart()
             * @async
             * @param {string} coinId - (Required) The coin id (can be obtained from coins.list()) eg. bitcoin
             * @param {object} params - Parameters to pass through to the request
             * @param {string} params.vs_currency - The target currency of market data (usd, eur, jpy, etc.)
             * @param {string} params.days - Data up to number of days ago (eg. 1,14,30,max)
             * @returns {ReturnObject}
             */
            fetchMarketChart: async(coinId, params={}) => {
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

                const method = 'GET';
                let path = `/${pathPrefix}/${coinId}/market_chart`;

                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
            },

            /**
             * @description Get status updates for a given coin
             * @function coins.fetchStatusUpdates()
             * @async
             * @param {string} coinId - (Required) The coin id (can be obtained from coins.list()) eg. bitcoin
             * @param {object} params - Parameters to pass through to the request
             * @param {number} params.per_page - Total results per page
             * @param {number} params.page - Page through results
             * @returns {ReturnObject}
             */
            fetchStatusUpdates: async(coinId, params={}) => {
                //Must have coinId
                if (!Utils.isString(coinId) || Utils.isStringEmpty(coinId)) Utils._WARN_('Invalid parameter', 'coinId must be of type: String and greater than 0 characters.');

                const method = 'GET';
                let path = `/${pathPrefix}/${coinId}/status_updates`;

                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
            },

            /**
             * @description Get coin info from contract address
             * @function coins.fetchCoinContractInfo()
             * @async
             * @param {object} contractAddress - (Required) Token’s contract address
             * @param {string} assetPlatform [default: ethereum] - (Required) Asset platform (only ethereum is supported at this moment)
             * @returns {ReturnObject}
             */
            fetchCoinContractInfo: async(contractAddress, assetPlatform='ethereum') => {
                //Must have contractAddress, assetPlatform
                if (!Utils.isString(contractAddress) || Utils.isStringEmpty(contractAddress)) Utils._WARN_('Invalid parameter', 'contractAddress must be of type: String and greater than 0 characters.');
                if (!Utils.isString(assetPlatform) || Utils.isStringEmpty(assetPlatform)) Utils._WARN_('Invalid parameter', 'assetPlatform must be of type: String and greater than 0 characters.');

                const method = 'GET';
                let path = `/${pathPrefix}/${assetPlatform}/contract/${contractAddress}`;

                //Build options
                let options = this._buildRequestOptions(method, path);

                //Return request
                return this._request(options);
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
             * @async
             * @returns {ReturnObject}
             */
            all: async() => {
                const method = 'GET';
                let path = `/${pathPrefix}`;

                //Build options
                let options = this._buildRequestOptions(method, path);

                //Return request
                return this._request(options);
            },

            /**
             * @description List all supported markets id and name
             * @function exchanges.list()
             * @async
             * @returns {ReturnObject}
             */
            list: async() => {
                const method = 'GET';
                let path = `/${pathPrefix}/list`;

                //Build options
                let options = this._buildRequestOptions(method, path);

                //Return request
                return this._request(options);
            },

            /**
             * @description Get exchange volume in BTC and top 100 tickers only for a given exchange
             * @function exchanges.fetch()
             * @async
             * @param {string} exchangeId - (Required) The exchange id (can be obtained from exchanges.all()) eg. binance
             * @returns {ReturnObject}
             */
            fetch: async(exchangeId) => {
                //Must have exchangeId
                if (!Utils.isString(exchangeId) || Utils.isStringEmpty(exchangeId)) Utils._WARN_('Invalid parameter', 'exchangeId must be of type: String and greater than 0 characters.');

                const method = 'GET';
                let path = `/${pathPrefix}/${exchangeId}`;

                //Build options
                let options = this._buildRequestOptions(method, path);

                //Return request
                return this._request(options);
            },

            /**
             * @description Get tickers for a given exchange
             * @function exchanges.fetchTickers()
             * @async
             * @param {string} exchangeId - (Required) The exchange id (can be obtained from exchanges.all()) eg. binance
             * @param {object} params - Parameters to pass through to the request
             * @param {number} params.page - Page through results
             * @param {number} params.coin_ids - Filter tickers by coin_ids
             * @returns {ReturnObject}
             */
            fetchTickers: async (exchangeId, params={}) => {
                //Must have exchangeId
                if (!Utils.isString(exchangeId) || Utils.isStringEmpty(exchangeId)) Utils._WARN_('Invalid parameter', 'exchangeId must be of type: String and greater than 0 characters.');

                //Convert array to string
                if (Utils.isArray(params['coin_ids'])) {
                    params.coin_ids = params.coin_ids.join(',');
                }

                const method = 'GET';
                let path = `/${pathPrefix}/${exchangeId}/tickers`;

                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
            },

            /**
             * @description Get status updates for a given exchange
             * @function exchanges.fetchStatusUpdates()
             * @async
             * @param {string} exchangeId - (Required) The exchange id (can be obtained from exchanges.all()) eg. binance
             * @param {object} params - Parameters to pass through to the request
             * @param {number} params.per_page - Total results per page
             * @param {number} params.page - Page through results
             * @returns {ReturnObject}
             */
            fetchStatusUpdates: async(exchangeId, params={}) => {
                //Must have exchangeId
                if (!Utils.isString(exchangeId) || Utils.isStringEmpty(exchangeId)) Utils._WARN_('Invalid parameter', 'exchangeId must be of type: String and greater than 0 characters.');

                const method = 'GET';
                let path = `/${pathPrefix}/${exchangeId}/status_updates`;

                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
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
             * @async
             * @param {object} params - Parameters to pass through to the request
             * @param {number} params.category - Filter results by CoinGecko.STATUS_UPDATE_CATEGORY[*]
             * @param {number} params.project_type - Filter results by CoinGecko.STATUS_UPDATE_PROJECT_TYPE[*] (If left empty returns both status from coins and markets)
             * @param {number} params.per_page - Total results per page
             * @param {number} params.page - Page through results
             * @returns {ReturnObject}
             */
            all: async(params={}) => {
                const method = 'GET';
                let path = `/status_updates`;

                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
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
             * @async
             * @param {object} params - Parameters to pass through to the request
             * @param {number} params.country_code - country_code of event (eg. ‘US’). Use events.fetchHistory() for list of country_codes
             * @param {string} params.type - Type of event (eg.‘Conference’). Use events.fetchTypes() for list of types. Or use CoinGecko.EVENT_TYPE[*]
             * @param {number} params.page - Page of results (paginated by 100)
             * @param {boolean} params.upcoming_events_only [default: true] - Lists only upcoming events
             * @param {string} params.from_date - Lists events after this date yyyy-mm-dd
             * @param {string} params.to_date - Lists events before this date yyyy-mm-dd (set upcoming_events_only to false if fetching past events)
             * @returns {ReturnObject}
             */
            all: async(params={}) => {
                const method = 'GET';
                let path = `/${pathPrefix}`;

                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
            },

            /**
             * @description Get list of event countries
             * @function events.fetchCountries()
             * @async
             * @returns {ReturnObject}
             */
            fetchCountries: async() => {
                const method = 'GET';
                let path = `/${pathPrefix}/countries`;

                //Build options
                let options = this._buildRequestOptions(method, path);

                //Return request
                return this._request(options);
            },

            /**
             * @description Get list of event types
             * @function events.fetchTypes()
             * @async
             * @returns {ReturnObject}
             */
            fetchTypes: async() => {
                const method = 'GET';
                let path = `/${pathPrefix}/types`;

                //Build options
                let options = this._buildRequestOptions(method, path);

                //Return request
                return this._request(options);
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
             * @async
             * @returns {ReturnObject}
             */
            all: async() => {
                const method = 'GET';
                let path = `/exchange_rates`;

                //Build options
                let options = this._buildRequestOptions(method, path);

                //Return request
                return this._request(options);
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
             * @async
             * @param {object} params - Parameters to pass through to the request
             * @param {array|string} params.ids - (Required) A single id or a list of coin ids to filter if you want specific results. Use coins.list() for a list of coin ids.
             * @param {array|string} params.vs_currencies [default: usd] - A single id or a list of ids. Use simple.supportedVsCurrencies() for a list of vsCurrency ids.
             * @param {boolean} params.include_24hr_vol [default: false] - To include 24hr_vol (true/false)
             * @param {boolean} params.include_last_updated_at [default: false] - To include last_updated_at of price (true/false)
             * @returns {ReturnObject}
             */
            price: async (params={}) => {
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

                const method = 'GET';
                let path = `/simple/price`;
                
                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
            },

            /**
             * @description Get list of supported vs/comparisons currencies
             * @function simple.supportedVsCurrencies()
             * @async
             * @returns {ReturnObject}
             */
            supportedVsCurrencies: async () => {
                const method = 'GET';
                let path = `/simple/supported_vs_currencies`;

                //Build options
                let options = this._buildRequestOptions(method, path);

                //Return request
                return this._request(options);
            },

            /**
             * @description Get current price of tokens (using contract addresses) for a given platform in any other currency that you need
             * @function simple.fetchTokenPrice()
             * @async
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
            fetchTokenPrice: async (params={}, assetPlatform='ethereum') => {
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

                const method = 'GET';
                let path = `/simple/token_price/${assetPlatform}`;

                //Build options
                let options = this._buildRequestOptions(method, path, params);

                //Return request
                return this._request(options);
            },
        };
    };

    /**
     * @description Build options for https.request
     * @function _buildRequestOptions
     * @protected
     * @param {string} method - One of CoinGecko.ACCEPTED_METHODS
     * @param {string} path - Relative path for API
     * @param {object} params - Object representing query strings for url parameters
     * @returns {Object} - {path, method, host, port} Options for request
     */
    _buildRequestOptions(method, path, params) {
        //Transform to uppercase
        method = method.toUpperCase();

        //Stringify object params if exist
        if (Utils.isObject(params)) params = querystring.stringify(params);
        else params = undefined;

        //Make relative path
        //Check if has params, append accordingly
        if (params == undefined) path = `/api/v${Constants.API_VERSION}${path}`;
        else path = `/api/v${Constants.API_VERSION}${path}?${params}`;

        //Create options
        let options = {
            path,
            method,
            host: Constants.HOST,
            port: 443,
        };

        //Return options
        return options;
    };

    /**
     * @description Perform https request
     * @function _request
     * @protected
     * @param {object} options - https.request options (from _buildRequestOptions())
     * @returns {Promise} Body of https request data results
     */
    _request(options) {
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
                        if (body.startsWith('<!DOCTYPE html>')) Utils._WARN_('Invalid request', 'There was a problem with your request. The parameter(s) you gave are missing or incorrect.');

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

            //End request
            req.end();
        });
    };
};

//Set Constants
CoinGecko.API_VERSION = Constants.API_VERSION;
CoinGecko.REQUESTS_PER_SECOND = Constants.REQUESTS_PER_SECOND;
CoinGecko.ACCEPTED_METHODS = Constants.ACCEPTED_METHODS;
CoinGecko.ORDER = Constants.ORDER;
CoinGecko.STATUS_UPDATE_CATEGORY = Constants.STATUS_UPDATE_CATEGORY;
CoinGecko.STATUS_UPDATE_PROJECT_TYPE = Constants.STATUS_UPDATE_PROJECT_TYPE;
CoinGecko.EVENT_TYPE = Constants.EVENT_TYPE;

//

module.exports = exports = CoinGecko;