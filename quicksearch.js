// ==UserScript==
// @name         AREEAnswer Quick search
// @namespace    https://github.com/KunoiSayami/AREEAnswer
// @version      0.1
// @author       KunoiSayami
// @match        https://ethics-s.moe.edu.tw/exam/*
// @match        https://stackoverflow.com/questions/26946235/*
// @grant        none
// ==/UserScript==
// Copyright (C) 2021 KunoiSayami
//
// This module is part of AREEAnswer and is released under
// the AGPL v3 License: https://www.gnu.org/licenses/agpl-3.0.txt
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

(function() {
    'use strict';

    window.answer = function () {}
    let BreakException = {};

    function update(text) {
        try {
            window.answer.body.forEach((item) => {
                if (item.name.includes(text)) {
                    let ans = '';
                    item.options.forEach((v) => {
                        if (v.includes('v'))
                            ans = v;
                    });
                    if (ans === '') {
                        ans = item.options.join('<br>');
                    }
                    console.log(ans);
                    $('#answer_result').html(ans);
                    throw BreakException;
                }
            });
        }
        catch (e) {
            if (e!== BreakException) {
                throw e;
            }
        }
    }

    function init() {
        let css = `<style>
        #areeanswer {
  position: fixed;
  width: 20%;
  height: 20vh;
  top: 80px;
  right: 0;
  bottom: 0;
  background-color: rgb(255,255,255);
  z-index: 2;
  cursor: pointer;
}
        </style>`;
        $('head').append(css);
        $('body').append(`<div id="areeanswer"><input id="answer_search"><div id="answer_result"></div></div>`);
        $('#answer_search').change((obj) => {
            console.log(obj.currentTarget.value);
            update(obj.currentTarget.value);
        });
    }
    init();
    $.get('https://raw.githubusercontent.com/KunoiSayami/AREEAnswer/master/answer.json', (text) => {
        window.answer.body = JSON.parse(text);
        //console.log(text);
    });
})();