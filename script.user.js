// ==UserScript==
// @name         ForsenPlace Script (Modified by YisusOnDev for esPlace)
// @namespace    https://github.com/YisusOnDev/esplace-war
// @version      16
// @description  Script 
// @author       ForsenPlace
// @match        https://www.reddit.com/r/place/*
// @match        https://new.reddit.com/r/place/*
// @icon         https://cdn.frankerfacez.com/emoticon/545961/4
// @require	     https://cdn.jsdelivr.net/npm/toastify-js
// @resource     TOASTIFY_CSS https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css
// @updateURL    https://github.com/YisusOnDev/esplace-war/raw/main/script.user.js
// @downloadURL  https://github.com/YisusOnDev/esplace-war/main/script.user.js
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant GM.xmlHttpRequest
// @connect reddit.com
// ==/UserScript==

const ORDERS_URL = 'https://raw.githubusercontent.com/YisusOnDev/esplace-war/main/orders.json'

const ORDER_UPDATE_DELAY = 4 * 60 * 1000
const TOAST_DURATION = 10 * 1000
const MAP_ERROR_RETRY_DELAY = 6 * 1000
const PARSE_ERROR_REFRESH_DELAY = 10 * 1000
const AFTER_PAINT_DELAY = 5.25 * 60 * 1000
const CHECK_AGAIN_DELAY = 30 * 1000
const REFRESH_TOKEN_DELAY = 30 * 60 * 1000

const COLOR_TO_INDEX = {
	'#6D001A': 0,
	'#BE0039': 1,
	'#FF4500': 2,
	'#FFA800': 3,
	'#FFD635': 4,
	'#FFF8B8': 5,
	'#00A368': 6,
	'#00CC78': 7,
	'#7EED56': 8,
	'#00756F': 9,
	'#009EAA': 10,
	'#00CCC0': 11,
	'#2450A4': 12,
	'#3690EA': 13,
	'#51E9F4': 14,
	'#493AC1': 15,
	'#6A5CFF': 16,
	'#94B3FF': 17,
	'#811E9F': 18,
	'#B44AC0': 19,
	'#E4ABFF': 20,
	'#DE107F': 21,
	'#FF3881': 22,
	'#FF99AA': 23,
	'#6D482F': 24,
	'#9C6926': 25,
	'#FFB470': 26,
	'#000000': 27,
	'#515252': 28,
	'#898D90': 29,
	'#D4D7D9': 30,
	'#FFFFFF': 31
};
const INDEX_TO_NAME = {
	'0': 'burgundy',
	'1': 'dark red',
	'2': 'red',
	'3': 'orange',
	'4': 'yellow',
	'5': 'pale yellow',
	'6': 'dark green',
	'7': 'green',
	'8': 'light green',
	'9': 'dark teal',
	'10': 'teal',
	'11': 'light teal',
	'12': 'dark blue',
	'13': 'blue',
	'14': 'light blue',
	'15': 'indigo',
	'16': 'periwinkle',
	'17': 'lavender',
	'18': 'dark purple',
	'19': 'purple',
	'20': 'pale purple',
	'21': 'magenta',
	'22': 'pink',
	'23': 'light pink',
	'24': 'dark brown',
	'25': 'brown', 
	'26': 'beige', 
	'27': 'black',
	'28': 'dark gray',
	'29': 'gray',
	'30': 'light gray',
	'31': 'white'
};

var currentOrdersByPrio = [];
var accessToken;
var canvas = document.createElement('canvas');

