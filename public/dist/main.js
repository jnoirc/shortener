"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const buttonShorten = document.getElementById('shorten');
const butttonCopy = document.getElementById('copy');
const shorten = () => {
    const field = document.getElementById('url');
    if (!field.value) {
        field.classList.add('error');
    }
    else {
        field.classList.remove('error');
    }
    const linkRequest = {
        destination: field.value,
        domain: { fullName: 'rebrand.ly' }
    };
    const requestHeaders = {
        'Content-Type': 'application/json',
        'apikey': 'b60aee4020d04dd1a9acb7dd2ee00797',
    };
    const request = () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch('https://api.rebrandly.com/v1/links', {
            method: 'post',
            headers: requestHeaders,
            body: JSON.stringify(linkRequest),
        });
        const data = yield response.json();
        let field = document.getElementById('url');
        if (data.shortUrl == undefined) {
            field.value = '';
            field.classList.add('error');
        }
        else {
            field.value = data.shortUrl;
            field.classList.remove('error');
        }
    });
    request();
};
const copy = () => {
    const inputUrl = document.getElementById('url');
    if (navigator.clipboard.writeText(inputUrl.value)) {
        butttonCopy.textContent = 'copied';
    }
    setTimeout(() => {
        butttonCopy.textContent = 'copy';
    }, 1000);
};
buttonShorten.addEventListener('click', shorten);
butttonCopy.addEventListener('click', copy);
