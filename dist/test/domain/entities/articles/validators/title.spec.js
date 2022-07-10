"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const invalidTitle_1 = require("../../../../../src/domain/entities/articles/errors/invalidTitle");
const title_1 = require("../../../../../src/domain/entities/articles/validators/title");
describe('Title Domain Validator', () => {
    it('Should not create title with little characters', () => {
        const content = '123456789';
        const title = title_1.Title.create(content);
        expect(title).toEqual({ value: new invalidTitle_1.InvalidTitleError(content) });
    });
    it('Should not create title with Much characters', () => {
        let content = '';
        for (let i = 256; content.length < i; i) {
            content += 'o';
        }
        const title = title_1.Title.create(content);
        expect(title).toEqual({ value: new invalidTitle_1.InvalidTitleError(content) });
    });
    it('Should not create title if null', () => {
        const content = '';
        const title = title_1.Title.create(content);
        expect(title).toEqual({ value: new invalidTitle_1.InvalidTitleError(content) });
    });
});
