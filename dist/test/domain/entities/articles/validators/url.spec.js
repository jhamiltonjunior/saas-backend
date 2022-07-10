"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invalidURL_1 = require("../../../../../src/domain/entities/articles/errors/invalidURL");
const url_1 = require("../../../../../src/domain/entities/articles/validators/url");
describe('URL Domain Validator', () => {
    it('Should create url without much hypen', () => {
        const content = '--much--hypen--here';
        const url = url_1.URL.create(content);
        expect(url).toEqual({
            value: {
                url: "much-hypen-here"
            }
        });
    });
    it('Should create url without much hypen', () => {
        const content = '--much  - -hypen--here';
        const url = url_1.URL.create(content);
        expect(url).toEqual({
            value: {
                url: "much-hypen-here"
            }
        });
    });
    it('Should not create url with few characters', () => {
        const content = '-much';
        const url = url_1.URL.create(content);
        expect(url).toEqual({
            value: new invalidURL_1.InvalidURLError(content)
        });
    });
    it('Should not create url with much characters', () => {
        let content = '';
        for (let i = 0; i < content.length; i++) {
            content = 'i';
        }
        const url = url_1.URL.create(content);
        expect(url).toEqual({
            value: new invalidURL_1.InvalidURLError(content)
        });
    });
});
