/**
 * Require:
 *  - jQuery;
 *  - Underscore;
 *  - MESSAGES (window.MESSAGES) - global const object with custom messages (from config.js);
 */
;(function(window, $, _) {
    'use strict';

    var msgBoard = (function() {
        var msgBoardEl = document.getElementById('msg_board');

        /**
         * [updateMsg]
         * @param  {[String]} msg_title [key for MESSAGES object / id of template]
         * @param  {[Objetc]} params    [custom params for compiled template]
         */
        var updateMsg = function(msg_title, params) {
            var msg = '',
                msgFrag = document.createElement('div');

            msgFrag.className = 'fw-inner';
            /**
             * In first we trying found msg in MESSAGES object
             * then tpl with id like msg_title
             */
            if(MESSAGES[msg_title]) {
                msg = MESSAGES[msg_title];
            } else if(!!document.querySelector('#' + msg_title)) {
                msg = _.template( document.querySelector('#' + msg_title).innerHTML )(params);
            } else {
                throw new Error('[msgBoard] Not found msg with name '+ msg_title);
            }

            msgBoardEl.innerHTML = '';

            msgFrag.innerHTML = msg;
            msgBoardEl.appendChild(msgFrag);
        };

        return {
            update: updateMsg
        };
    }());

    /**
     * Check global variable
     * and add constructor MsgBoard
     */
    window.qbApp = window.qbApp || {};
    window.qbApp.MsgBoard = msgBoard;
}(window, jQuery, _));