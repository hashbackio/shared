'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountSettingSchema = exports.AccountSettingPostBodySchema = exports.TwitterFeedbackWithMaybeAnalysisSchema = exports.TwitterFeedbackSchema = exports.EmailFeedbackWithMaybeAnalysisSchema = exports.EmailFeedbackSchema = exports.EmailFeedbackPostBodySchema = exports.WatsonClassifyResponseSchema = exports.FeedbackAnalysisSchema = exports.UserSchema = exports.EmailUserSchema = exports.TwitterUserSchema = exports.SentimentAnalysisResponseSchema = exports.SentenceSchema = exports.CategorySchema = exports.SentimentSchema = exports.TextSpanSchema = exports.SupportedLanguageSchema = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// https://github.com/benmosher/eslint-plugin-import/issues/921
/* eslint-disable import/named */


var _joiBrowser = require('joi-browser');

var _joiBrowser2 = _interopRequireDefault(_joiBrowser);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _YearMonthBucket = require('./YearMonthBucket');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-enable */

var ModelSavedFieldsSchema = {
  accountId: _joiBrowser2.default.string().required(),
  createdAt: _joiBrowser2.default.string().isoDate().required(),
  id: _joiBrowser2.default.string().guid().default(function () {
    return _uuid2.default.v4();
  }, 'uuid v4'),
  updatedAt: _joiBrowser2.default.string().isoDate()
};

var SupportedLanguageSchema = exports.SupportedLanguageSchema = _joiBrowser2.default.string().valid(['zh', 'zh-Hant', 'en', 'fr', 'de', 'it', 'ja', 'ko', 'pt', 'es']);

var TextSpanSchema = exports.TextSpanSchema = _joiBrowser2.default.object({
  beginOffset: _joiBrowser2.default.number().min(-1).required(),
  content: _joiBrowser2.default.string().required()
}).unknown();

var SentimentSchema = exports.SentimentSchema = _joiBrowser2.default.object({
  magnitude: _joiBrowser2.default.number().min(0).required(),
  score: _joiBrowser2.default.number().min(-1).max(1).required()
}).unknown();

var CategorySchema = exports.CategorySchema = _joiBrowser2.default.object({
  categoryName: _joiBrowser2.default.string().required(),
  confidence: _joiBrowser2.default.number().min(0).max(1).required()
}).unknown();

var SentenceSchema = exports.SentenceSchema = _joiBrowser2.default.object({
  sentiment: SentimentSchema.required(),
  text: TextSpanSchema.required()
}).unknown();

var SentimentAnalysisResponseSchema = exports.SentimentAnalysisResponseSchema = _joiBrowser2.default.object({
  documentSentiment: SentimentSchema.required(),
  language: SupportedLanguageSchema.required(),
  sentences: _joiBrowser2.default.array().items(SentenceSchema).default(function () {
    return [];
  }, 'Do not allow undefined or null to come out of the DB')
}).unknown();

var TwitterUserSchema = exports.TwitterUserSchema = _joiBrowser2.default.object({
  avatarUrl: _joiBrowser2.default.string().uri().required(),
  id: _joiBrowser2.default.string().required(),
  username: _joiBrowser2.default.string().required()
}).unknown();

var EmailUserSchema = exports.EmailUserSchema = _joiBrowser2.default.object({
  id: _joiBrowser2.default.string().email().required()
}).unknown();

var UserSchema = exports.UserSchema = _joiBrowser2.default.compile([TwitterUserSchema, EmailUserSchema]);

var FeedbackAnalysisSchema = exports.FeedbackAnalysisSchema = _joiBrowser2.default.object(_extends({}, ModelSavedFieldsSchema, {
  contentSentiment: SentimentSchema.required(),
  documentCategorization: _joiBrowser2.default.array().items(CategorySchema).default(function () {
    return [];
  }, 'Do not allow undefined or null to come out of the DB'),
  feedbackId: _joiBrowser2.default.string().guid().default(function () {
    return _uuid2.default.v4();
  }, 'uuid v4'),
  feedbackType: _joiBrowser2.default.string().allow(['email', 'twitter']).required(),
  sentences: _joiBrowser2.default.array().items(SentenceSchema.keys({
    categorization: _joiBrowser2.default.array().items(CategorySchema).default(function () {
      return [];
    }, 'Do not allow undefined or null to come out of the DB')
  }).required()).default(function () {
    return [];
  }, 'Do not allow undefined or null to come out of the DB'),
  topDocumentCategories: _joiBrowser2.default.array().items(_joiBrowser2.default.string()).default(function () {
    return [];
  }, 'Do not allow undefined or null to come out of the DB'),
  topSentenceCategories: _joiBrowser2.default.array().items(_joiBrowser2.default.string()).default(function () {
    return [];
  }, 'Do not allow undefined or null to come out of the DB'),
  user: UserSchema,
  userId: _joiBrowser2.default.string().required()
})).unknown().required();

var WatsonClassifyResponseSchema = exports.WatsonClassifyResponseSchema = _joiBrowser2.default.object({
  classes: _joiBrowser2.default.array().items(_joiBrowser2.default.object({
    class_name: _joiBrowser2.default.string().required(),
    confidence: _joiBrowser2.default.number().min(0).max(1).required()
  }).unknown()).default(function () {
    return [];
  }, 'Do not allow undefined or null to come out of the DB'),
  classifier_id: _joiBrowser2.default.string().required(),
  text: _joiBrowser2.default.string().required(),
  top_class: _joiBrowser2.default.string().required(),
  url: _joiBrowser2.default.string().uri({ allowRelative: true }).required()
});

var EmailFeedbackPostBodySchema = exports.EmailFeedbackPostBodySchema = _joiBrowser2.default.object({
  content: _joiBrowser2.default.string().required(),
  emailSentDate: _joiBrowser2.default.string().isoDate().required(),
  from: _joiBrowser2.default.string().email().required(),
  subject: _joiBrowser2.default.string().required(),
  to: _joiBrowser2.default.string().email().required()
}).unknown().required();

var EmailFeedbackSchema = exports.EmailFeedbackSchema = EmailFeedbackPostBodySchema.keys(_extends({}, ModelSavedFieldsSchema)).unknown().required();

var EmailFeedbackWithMaybeAnalysisSchema = exports.EmailFeedbackWithMaybeAnalysisSchema = EmailFeedbackSchema.keys({
  analysis: FeedbackAnalysisSchema
}).unknown().required();

var TwitterFeedbackSchema = exports.TwitterFeedbackSchema = _joiBrowser2.default.object(_extends({}, ModelSavedFieldsSchema, {
  statusId: _joiBrowser2.default.string().required(),
  user: TwitterUserSchema.required()
})).unknown().required();

var TwitterFeedbackWithMaybeAnalysisSchema = exports.TwitterFeedbackWithMaybeAnalysisSchema = TwitterFeedbackSchema.keys({
  analysis: FeedbackAnalysisSchema
}).unknown().required();

// currently only 1 tier
var AccountSettingPostBodySchema = exports.AccountSettingPostBodySchema = _joiBrowser2.default.object({
  twitterSearches: _joiBrowser2.default.array().items(_joiBrowser2.default.string()).default(function () {
    return [];
  }, 'Do not allow undefined or null to come out of the DB')
}).unknown().required();

var AccountSettingSchema = exports.AccountSettingSchema = _joiBrowser2.default.object(_extends({}, ModelSavedFieldsSchema, {
  feedbackUsageByDate: _joiBrowser2.default.object().pattern(_YearMonthBucket.YearMonthBucketRegex, _joiBrowser2.default.number().min(0).required()).required(),
  id: _joiBrowser2.default.string().required(),
  tier: _joiBrowser2.default.string().valid(['free']).required(),
  twitterSearches: _joiBrowser2.default.array().items(_joiBrowser2.default.string()).default(function () {
    return [];
  }, 'Do not allow undefined or null to come out of the DB')
})).unknown().required();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJNb2RlbFNhdmVkRmllbGRzU2NoZW1hIiwiYWNjb3VudElkIiwic3RyaW5nIiwicmVxdWlyZWQiLCJjcmVhdGVkQXQiLCJpc29EYXRlIiwiaWQiLCJndWlkIiwiZGVmYXVsdCIsInY0IiwidXBkYXRlZEF0IiwiU3VwcG9ydGVkTGFuZ3VhZ2VTY2hlbWEiLCJ2YWxpZCIsIlRleHRTcGFuU2NoZW1hIiwib2JqZWN0IiwiYmVnaW5PZmZzZXQiLCJudW1iZXIiLCJtaW4iLCJjb250ZW50IiwidW5rbm93biIsIlNlbnRpbWVudFNjaGVtYSIsIm1hZ25pdHVkZSIsInNjb3JlIiwibWF4IiwiQ2F0ZWdvcnlTY2hlbWEiLCJjYXRlZ29yeU5hbWUiLCJjb25maWRlbmNlIiwiU2VudGVuY2VTY2hlbWEiLCJzZW50aW1lbnQiLCJ0ZXh0IiwiU2VudGltZW50QW5hbHlzaXNSZXNwb25zZVNjaGVtYSIsImRvY3VtZW50U2VudGltZW50IiwibGFuZ3VhZ2UiLCJzZW50ZW5jZXMiLCJhcnJheSIsIml0ZW1zIiwiVHdpdHRlclVzZXJTY2hlbWEiLCJhdmF0YXJVcmwiLCJ1cmkiLCJ1c2VybmFtZSIsIkVtYWlsVXNlclNjaGVtYSIsImVtYWlsIiwiVXNlclNjaGVtYSIsImNvbXBpbGUiLCJGZWVkYmFja0FuYWx5c2lzU2NoZW1hIiwiY29udGVudFNlbnRpbWVudCIsImRvY3VtZW50Q2F0ZWdvcml6YXRpb24iLCJmZWVkYmFja0lkIiwiZmVlZGJhY2tUeXBlIiwiYWxsb3ciLCJrZXlzIiwiY2F0ZWdvcml6YXRpb24iLCJ0b3BEb2N1bWVudENhdGVnb3JpZXMiLCJ0b3BTZW50ZW5jZUNhdGVnb3JpZXMiLCJ1c2VyIiwidXNlcklkIiwiV2F0c29uQ2xhc3NpZnlSZXNwb25zZVNjaGVtYSIsImNsYXNzZXMiLCJjbGFzc19uYW1lIiwiY2xhc3NpZmllcl9pZCIsInRvcF9jbGFzcyIsInVybCIsImFsbG93UmVsYXRpdmUiLCJFbWFpbEZlZWRiYWNrUG9zdEJvZHlTY2hlbWEiLCJlbWFpbFNlbnREYXRlIiwiZnJvbSIsInN1YmplY3QiLCJ0byIsIkVtYWlsRmVlZGJhY2tTY2hlbWEiLCJFbWFpbEZlZWRiYWNrV2l0aE1heWJlQW5hbHlzaXNTY2hlbWEiLCJhbmFseXNpcyIsIlR3aXR0ZXJGZWVkYmFja1NjaGVtYSIsInN0YXR1c0lkIiwiVHdpdHRlckZlZWRiYWNrV2l0aE1heWJlQW5hbHlzaXNTY2hlbWEiLCJBY2NvdW50U2V0dGluZ1Bvc3RCb2R5U2NoZW1hIiwidHdpdHRlclNlYXJjaGVzIiwiQWNjb3VudFNldHRpbmdTY2hlbWEiLCJmZWVkYmFja1VzYWdlQnlEYXRlIiwicGF0dGVybiIsInRpZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBO0FBQ0E7OztBQUpBOzs7O0FBQ0E7Ozs7QUFJQTs7OztBQUlBOztBQVNBLElBQU1BLHlCQUF5QjtBQUM3QkMsYUFBVyxxQkFBSUMsTUFBSixHQUFhQyxRQUFiLEVBRGtCO0FBRTdCQyxhQUFXLHFCQUFJRixNQUFKLEdBQ1JHLE9BRFEsR0FFUkYsUUFGUSxFQUZrQjtBQUs3QkcsTUFBSSxxQkFBSUosTUFBSixHQUNESyxJQURDLEdBRURDLE9BRkMsQ0FFTztBQUFBLFdBQU0sZUFBS0MsRUFBTCxFQUFOO0FBQUEsR0FGUCxFQUV3QixTQUZ4QixDQUx5QjtBQVE3QkMsYUFBVyxxQkFBSVIsTUFBSixHQUFhRyxPQUFiO0FBUmtCLENBQS9COztBQXVCTyxJQUFNTSw0REFBMEIscUJBQUlULE1BQUosR0FBYVUsS0FBYixDQUFtQixDQUN4RCxJQUR3RCxFQUV4RCxTQUZ3RCxFQUd4RCxJQUh3RCxFQUl4RCxJQUp3RCxFQUt4RCxJQUx3RCxFQU14RCxJQU53RCxFQU94RCxJQVB3RCxFQVF4RCxJQVJ3RCxFQVN4RCxJQVR3RCxFQVV4RCxJQVZ3RCxDQUFuQixDQUFoQzs7QUFrQkEsSUFBTUMsMENBQWlCLHFCQUFJQyxNQUFKLENBQVc7QUFDdkNDLGVBQWEscUJBQUlDLE1BQUosR0FDVkMsR0FEVSxD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QVc7QUFDckQ2RCxtQkFBaUIscUJBQUl6QyxLQUFKLEdBQ2RDLEtBRGMsQ0FDUixxQkFBSWpDLE1BQUosRUFEUSxFQUVkTSxPQUZjLENBRU47QUFBQSxXQUFNLEVBQU47QUFBQSxHQUZNLEVBRUksc0RBRko7QUFEb0MsQ0FBWCxFQUt6Q1csT0FMeUMsR0FNekNoQixRQU55QyxFQUFyQzs7QUFzQkEsSUFBTXlFLHNEQUF1QixxQkFBSTlELE1BQUosY0FDL0JkLHNCQUQrQjtBQUVsQzZFLHVCQUFxQixxQkFBSS9ELE1BQUosR0FDbEJnRSxPQURrQix3Q0FHakIscUJBQUk5RCxNQUFKLEdBQ0dDLEdBREgsQ0FDTyxDQURQLEVBRUdkLFFBRkgsRUFIaUIsRUFPbEJBLFFBUGtCLEVBRmE7QUFVbENHLE1BQUkscUJBQUlKLE1BQUosR0FBYUMsUUFBYixFQVY4QjtBQVdsQzRFLFFBQU0scUJBQUk3RSxNQUFKLEdBQ0hVLEtBREcsQ0FDRyxDQUFDLE1BQUQsQ0FESCxFQUVIVCxRQUZHLEVBWDRCO0FBY2xDd0UsbUJBQWlCLHFCQUFJekMsS0FBSixHQUNkQyxLQURjLENBQ1IscUJBQUlqQyxNQUFKLEVBRFEsRUFFZE0sT0FGYyxDQUVOO0FBQUEsV0FBTSxFQUFOO0FBQUEsR0FGTSxFQUVJLHNEQUZKO0FBZGlCLElBa0JqQ1csT0FsQmlDLEdBbUJqQ2hCLFFBbkJpQyxFQUE3QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbmltcG9ydCBKb2kgZnJvbSAnam9pLWJyb3dzZXInO1xuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZW5tb3NoZXIvZXNsaW50LXBsdWdpbi1pbXBvcnQvaXNzdWVzLzkyMVxuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25hbWVkICovXG5pbXBvcnQge1xuICBZZWFyTW9udGhCdWNrZXRSZWdleCxcbiAgdHlwZSBZZWFyTW9udGhCdWNrZXRUeXBlLFxufSBmcm9tICcuL1llYXJNb250aEJ1Y2tldCc7XG4vKiBlc2xpbnQtZW5hYmxlICovXG5cbmV4cG9ydCB0eXBlIE1vZGVsU2F2ZWRGaWVsZHNUeXBlID0ge3xcbiAgYWNjb3VudElkOiBzdHJpbmcsXG4gIGNyZWF0ZWRBdDogc3RyaW5nLFxuICBpZDogc3RyaW5nLFxuICB1cGRhdGVkQXQ/OiBzdHJpbmcsXG58fTtcblxuY29uc3QgTW9kZWxTYXZlZEZpZWxkc1NjaGVtYSA9IHtcbiAgYWNjb3VudElkOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgY3JlYXRlZEF0OiBKb2kuc3RyaW5nKClcbiAgICAuaXNvRGF0ZSgpXG4gICAgLnJlcXVpcmVkKCksXG4gIGlkOiBKb2kuc3RyaW5nKClcbiAgICAuZ3VpZCgpXG4gICAgLmRlZmF1bHQoKCkgPT4gdXVpZC52NCgpLCAndXVpZCB2NCcpLFxuICB1cGRhdGVkQXQ6IEpvaS5zdHJpbmcoKS5pc29EYXRlKCksXG59O1xuXG5leHBvcnQgdHlwZSBTdXBwb3J0ZWRMYW5ndWFnZVR5cGUgPVxuICB8ICd6aCdcbiAgfCAnemgtSGFudCdcbiAgfCAnZW4nXG4gIHwgJ2ZyJ1xuICB8ICdkZSdcbiAgfCAnaXQnXG4gIHwgJ2phJ1xuICB8ICdrbydcbiAgfCAncHQnXG4gIHwgJ2VzJztcblxuZXhwb3J0IGNvbnN0IFN1cHBvcnRlZExhbmd1YWdlU2NoZW1hID0gSm9pLnN0cmluZygpLnZhbGlkKFtcbiAgJ3poJyxcbiAgJ3poLUhhbnQnLFxuICAnZW4nLFxuICAnZnInLFxuICAnZGUnLFxuICAnaXQnLFxuICAnamEnLFxuICAna28nLFxuICAncHQnLFxuICAnZXMnLFxuXSk7XG5cbnR5cGUgVGV4dFNwYW5UeXBlID0ge1xuICBiZWdpbk9mZnNldDogbnVtYmVyLFxuICBjb250ZW50OiBzdHJpbmcsXG59O1xuXG5leHBvcnQgY29uc3QgVGV4dFNwYW5TY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgYmVnaW5PZmZzZXQ6IEpvaS5udW1iZXIoKVxuICAgIC5taW4oLTEpXG4gICAgLnJlcXVpcmVkKCksXG4gIGNvbnRlbnQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxufSkudW5rbm93bigpO1xuXG5leHBvcnQgdHlwZSBTZW50aW1lbnRUeXBlID0ge1xuICBtYWduaXR1ZGU6IG51bWJlcixcbiAgc2NvcmU6IG51bWJlcixcbn07XG5cbmV4cG9ydCBjb25zdCBTZW50aW1lbnRTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgbWFnbml0dWRlOiBKb2kubnVtYmVyKClcbiAgICAubWluKDApXG4gICAgLnJlcXVpcmVkKCksXG4gIHNjb3JlOiBKb2kubnVtYmVyKClcbiAgICAubWluKC0xKVxuICAgIC5tYXgoMSlcbiAgICAucmVxdWlyZWQoKSxcbn0pLnVua25vd24oKTtcblxuZXhwb3J0IHR5cGUgQ2F0ZWdvcnlDb25maWRlbmNlVHlwZSA9IHtcbiAgY2F0ZWdvcnlOYW1lOiBzdHJpbmcsXG4gIGNvbmZpZGVuY2U6IG51bWJlcixcbn07XG5cbmV4cG9ydCBjb25zdCBDYXRlZ29yeVNjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICBjYXRlZ29yeU5hbWU6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICBjb25maWRlbmNlOiBKb2kubnVtYmVyKClcbiAgICAubWluKDApXG4gICAgLm1heCgxKVxuICAgIC5yZXF1aXJlZCgpLFxufSkudW5rbm93bigpO1xuXG5leHBvcnQgdHlwZSBTZW50ZW5jZVR5cGUgPSB7XG4gIHNlbnRpbWVudDogU2VudGltZW50VHlwZSxcbiAgdGV4dDogVGV4dFNwYW5UeXBlLFxufTtcblxuZXhwb3J0IGNvbnN0IFNlbnRlbmNlU2NoZW1hID0gSm9pLm9iamVjdCh7XG4gIHNlbnRpbWVudDogU2VudGltZW50U2NoZW1hLnJlcXVpcmVkKCksXG4gIHRleHQ6IFRleHRTcGFuU2NoZW1hLnJlcXVpcmVkKCksXG59KS51bmtub3duKCk7XG5cbmV4cG9ydCB0eXBlIFNlbnRpbWVudEFuYWx5c2lzUmVzcG9uc2VUeXBlID0ge3xcbiAgZG9jdW1lbnRTZW50aW1lbnQ6IFNlbnRpbWVudFR5cGUsXG4gIGxhbmd1YWdlOiBTdXBwb3J0ZWRMYW5ndWFnZVR5cGUsXG4gIHNlbnRlbmNlczogU2VudGVuY2VUeXBlW10sXG58fTtcblxuZXhwb3J0IGNvbnN0IFNlbnRpbWVudEFuYWx5c2lzUmVzcG9uc2VTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgZG9jdW1lbnRTZW50aW1lbnQ6IFNlbnRpbWVudFNjaGVtYS5yZXF1aXJlZCgpLFxuICBsYW5ndWFnZTogU3VwcG9ydGVkTGFuZ3VhZ2VTY2hlbWEucmVxdWlyZWQoKSxcbiAgc2VudGVuY2VzOiBKb2kuYXJyYXkoKVxuICAgIC5pdGVtcyhTZW50ZW5jZVNjaGVtYSlcbiAgICAuZGVmYXVsdCgoKSA9PiBbXSwgJ0RvIG5vdCBhbGxvdyB1bmRlZmluZWQgb3IgbnVsbCB0byBjb21lIG91dCBvZiB0aGUgREInKSxcbn0pLnVua25vd24oKTtcblxuZXhwb3J0IHR5cGUgRmVlZGJhY2tUeXBlID0gJ2VtYWlsJyB8ICd0d2l0dGVyJztcblxuZXhwb3J0IHR5cGUgVHdpdHRlclVzZXJUeXBlID0ge3xcbiAgYXZhdGFyVXJsOiBzdHJpbmcsXG4gIGlkOiBzdHJpbmcsXG4gIHVzZXJuYW1lOiBzdHJpbmcsXG58fTtcblxuZXhwb3J0IGNvbnN0IFR3aXR0ZXJVc2VyU2NoZW1hID0gSm9pLm9iamVjdCh7XG4gIGF2YXRhclVybDogSm9pLnN0cmluZygpXG4gICAgLnVyaSgpXG4gICAgLnJlcXVpcmVkKCksXG4gIGlkOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgdXNlcm5hbWU6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxufSkudW5rbm93bigpO1xuXG5leHBvcnQgdHlwZSBFbWFpbFVzZXJUeXBlID0ge3xcbiAgaWQ6IHN0cmluZyxcbnx9O1xuXG5leHBvcnQgY29uc3QgRW1haWxVc2VyU2NoZW1hID0gSm9pLm9iamVjdCh7XG4gIGlkOiBKb2kuc3RyaW5nKClcbiAgICAuZW1haWwoKVxuICAgIC5yZXF1aXJlZCgpLFxufSkudW5rbm93bigpO1xuXG5leHBvcnQgdHlwZSBVc2VyVHlwZSA9IEVtYWlsVXNlclR5cGUgfCBUd2l0dGVyVXNlclR5cGU7XG5cbmV4cG9ydCBjb25zdCBVc2VyU2NoZW1hID0gSm9pLmNvbXBpbGUoW1R3aXR0ZXJVc2VyU2NoZW1hLCBFbWFpbFVzZXJTY2hlbWFdKTtcblxuZXhwb3J0IHR5cGUgRmVlZGJhY2tTZW50aW1lbnRBbmRDYXRlZ29yaXphdGlvblR5cGUgPSB7fFxuICBjb250ZW50U2VudGltZW50OiBTZW50aW1lbnRUeXBlLFxuICBkb2N1bWVudENhdGVnb3JpemF0aW9uOiBDYXRlZ29yeUNvbmZpZGVuY2VUeXBlW10sXG4gIHNlbnRlbmNlczogQXJyYXk8e1xuICAgIGNhdGVnb3JpemF0aW9uOiBDYXRlZ29yeUNvbmZpZGVuY2VUeXBlW10sXG4gICAgLi4uU2VudGVuY2VUeXBlLFxuICB9PixcbiAgdG9wRG9jdW1lbnRDYXRlZ29yaWVzOiBBcnJheTxzdHJpbmc+LFxuICB0b3BTZW50ZW5jZUNhdGVnb3JpZXM6IEFycmF5PHN0cmluZz4sXG58fTtcblxuZXhwb3J0IHR5cGUgRmVlZGJhY2tBbmFseXNpc1Vuc2F2ZWRUeXBlID0ge3xcbiAgLi4uRmVlZGJhY2tTZW50aW1lbnRBbmRDYXRlZ29yaXphdGlvblR5cGUsXG4gIGFjY291bnRJZDogc3RyaW5nLFxuICBmZWVkYmFja0lkOiBzdHJpbmcsXG4gIGZlZWRiYWNrVHlwZTogRmVlZGJhY2tUeXBlLFxuICB1c2VyOiBVc2VyVHlwZSxcbiAgdXNlcklkOiBzdHJpbmcsXG58fTtcblxuZXhwb3J0IHR5cGUgRmVlZGJhY2tBbmFseXNpc1R5cGUgPSB7XG4gIC4uLkZlZWRiYWNrQW5hbHlzaXNVbnNhdmVkVHlwZSxcbiAgLi4uTW9kZWxTYXZlZEZpZWxkc1R5cGUsXG59O1xuXG5leHBvcnQgY29uc3QgRmVlZGJhY2tBbmFseXNpc1NjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICAuLi5Nb2RlbFNhdmVkRmllbGRzU2NoZW1hLFxuICBjb250ZW50U2VudGltZW50OiBTZW50aW1lbnRTY2hlbWEucmVxdWlyZWQoKSxcbiAgZG9jdW1lbnRDYXRlZ29yaXphdGlvbjogSm9pLmFycmF5KClcbiAgICAuaXRlbXMoQ2F0ZWdvcnlTY2hlbWEpXG4gICAgLmRlZmF1bHQoKCkgPT4gW10sICdEbyBub3QgYWxsb3cgdW5kZWZpbmVkIG9yIG51bGwgdG8gY29tZSBvdXQgb2YgdGhlIERCJyksXG4gIGZlZWRiYWNrSWQ6IEpvaS5zdHJpbmcoKVxuICAgIC5ndWlkKClcbiAgICAuZGVmYXVsdCgoKSA9PiB1dWlkLnY0KCksICd1dWlkIHY0JyksXG4gIGZlZWRiYWNrVHlwZTogSm9pLnN0cmluZygpXG4gICAgLmFsbG93KFsnZW1haWwnLCAndHdpdHRlciddKVxuICAgIC5yZXF1aXJlZCgpLFxuICBzZW50ZW5jZXM6IEpvaS5hcnJheSgpXG4gICAgLml0ZW1zKFxuICAgICAgU2VudGVuY2VTY2hlbWEua2V5cyh7XG4gICAgICAgIGNhdGVnb3JpemF0aW9uOiBKb2kuYXJyYXkoKVxuICAgICAgICAgIC5pdGVtcyhDYXRlZ29yeVNjaGVtYSlcbiAgICAgICAgICAuZGVmYXVsdChcbiAgICAgICAgICAgICgpID0+IFtdLFxuICAgICAgICAgICAgJ0RvIG5vdCBhbGxvdyB1bmRlZmluZWQgb3IgbnVsbCB0byBjb21lIG91dCBvZiB0aGUgREInXG4gICAgICAgICAgKSxcbiAgICAgIH0pLnJlcXVpcmVkKClcbiAgICApXG4gICAgLmRlZmF1bHQoKCkgPT4gW10sICdEbyBub3QgYWxsb3cgdW5kZWZpbmVkIG9yIG51bGwgdG8gY29tZSBvdXQgb2YgdGhlIERCJyksXG4gIHRvcERvY3VtZW50Q2F0ZWdvcmllczogSm9pLmFycmF5KClcbiAgICAuaXRlbXMoSm9pLnN0cmluZygpKVxuICAgIC5kZWZhdWx0KCgpID0+IFtdLCAnRG8gbm90IGFsbG93IHVuZGVmaW5lZCBvciBudWxsIHRvIGNvbWUgb3V0IG9mIHRoZSBEQicpLFxuICB0b3BTZW50ZW5jZUNhdGVnb3JpZXM6IEpvaS5hcnJheSgpXG4gICAgLml0ZW1zKEpvaS5zdHJpbmcoKSlcbiAgICAuZGVmYXVsdCgoKSA9PiBbXSwgJ0RvIG5vdCBhbGxvdyB1bmRlZmluZWQgb3IgbnVsbCB0byBjb21lIG91dCBvZiB0aGUgREInKSxcbiAgdXNlcjogVXNlclNjaGVtYSxcbiAgdXNlcklkOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbn0pXG4gIC51bmtub3duKClcbiAgLnJlcXVpcmVkKCk7XG5cbmV4cG9ydCB0eXBlIFdhdHNvbkNsYXNzaWZ5UmVzcG9uc2VUeXBlID0ge1xuICBjbGFzc2VzOiBBcnJheTx7IGNsYXNzX25hbWU6IHN0cmluZywgY29uZmlkZW5jZTogbnVtYmVyIH0+LFxuICBjbGFzc2lmaWVyX2lkOiBzdHJpbmcsXG4gIHRleHQ6IHN0cmluZyxcbiAgdG9wX2NsYXNzOiBzdHJpbmcsXG4gIHVybDogc3RyaW5nLFxufTtcblxuZXhwb3J0IGNvbnN0IFdhdHNvbkNsYXNzaWZ5UmVzcG9uc2VTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgY2xhc3NlczogSm9pLmFycmF5KClcbiAgICAuaXRlbXMoXG4gICAgICBKb2kub2JqZWN0KHtcbiAgICAgICAgY2xhc3NfbmFtZTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gICAgICAgIGNvbmZpZGVuY2U6IEpvaS5udW1iZXIoKVxuICAgICAgICAgIC5taW4oMClcbiAgICAgICAgICAubWF4KDEpXG4gICAgICAgICAgLnJlcXVpcmVkKCksXG4gICAgICB9KS51bmtub3duKClcbiAgICApXG4gICAgLmRlZmF1bHQoKCkgPT4gW10sICdEbyBub3QgYWxsb3cgdW5kZWZpbmVkIG9yIG51bGwgdG8gY29tZSBvdXQgb2YgdGhlIERCJyksXG4gIGNsYXNzaWZpZXJfaWQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICB0ZXh0OiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgdG9wX2NsYXNzOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgdXJsOiBKb2kuc3RyaW5nKClcbiAgICAudXJpKHsgYWxsb3dSZWxhdGl2ZTogdHJ1ZSB9KVxuICAgIC5yZXF1aXJlZCgpLFxufSk7XG5cbmV4cG9ydCB0eXBlIEVtYWlsRmVlZGJhY2tQb3N0Qm9keVR5cGUgPSB7fFxuICBjb250ZW50OiBzdHJpbmcsXG4gIGVtYWlsU2VudERhdGU6IHN0cmluZyxcbiAgZnJvbTogc3RyaW5nLFxuICBzdWJqZWN0OiBzdHJpbmcsXG4gIHRvOiBzdHJpbmcsXG58fTtcblxuZXhwb3J0IGNvbnN0IEVtYWlsRmVlZGJhY2tQb3N0Qm9keVNjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICBjb250ZW50OiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgZW1haWxTZW50RGF0ZTogSm9pLnN0cmluZygpXG4gICAgLmlzb0RhdGUoKVxuICAgIC5yZXF1aXJlZCgpLFxuICBmcm9tOiBKb2kuc3RyaW5nKClcbiAgICAuZW1haWwoKVxuICAgIC5yZXF1aXJlZCgpLFxuICBzdWJqZWN0OiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgdG86IEpvaS5zdHJpbmcoKVxuICAgIC5lbWFpbCgpXG4gICAgLnJlcXVpcmVkKCksXG59KVxuICAudW5rbm93bigpXG4gIC5yZXF1aXJlZCgpO1xuXG5leHBvcnQgdHlwZSBFbWFpbEZlZWRiYWNrVW5zYXZlZFR5cGUgPSB7fFxuICAuLi5FbWFpbEZlZWRiYWNrUG9zdEJvZHlUeXBlLFxuICBhY2NvdW50SWQ6IHN0cmluZyxcbnx9O1xuXG5leHBvcnQgdHlwZSBFbWFpbEZlZWRiYWNrVHlwZSA9IHtcbiAgLi4uRW1haWxGZWVkYmFja1Vuc2F2ZWRUeXBlLFxuICAuLi5Nb2RlbFNhdmVkRmllbGRzVHlwZSxcbn07XG5cbmV4cG9ydCBjb25zdCBFbWFpbEZlZWRiYWNrU2NoZW1hID0gRW1haWxGZWVkYmFja1Bvc3RCb2R5U2NoZW1hLmtleXMoe1xuICAuLi5Nb2RlbFNhdmVkRmllbGRzU2NoZW1hLFxufSlcbiAgLnVua25vd24oKVxuICAucmVxdWlyZWQoKTtcblxuZXhwb3J0IHR5cGUgRW1haWxGZWVkYmFja1dpdGhNYXliZUFuYWx5c2lzVHlwZSA9IHtcbiAgLi4uRW1haWxGZWVkYmFja1R5cGUsXG4gIGFuYWx5c2lzOiA/RmVlZGJhY2tBbmFseXNpc1R5cGUsXG59O1xuXG5leHBvcnQgY29uc3QgRW1haWxGZWVkYmFja1dpdGhNYXliZUFuYWx5c2lzU2NoZW1hID0gRW1haWxGZWVkYmFja1NjaGVtYS5rZXlzKHtcbiAgYW5hbHlzaXM6IEZlZWRiYWNrQW5hbHlzaXNTY2hlbWEsXG59KVxuICAudW5rbm93bigpXG4gIC5yZXF1aXJlZCgpO1xuXG5leHBvcnQgdHlwZSBUd2l0dGVyRmVlZGJhY2tVbnNhdmVkVHlwZSA9IHt8XG4gIGFjY291bnRJZDogc3RyaW5nLFxuICBzdGF0dXNJZDogc3RyaW5nLFxuICB1c2VyOiBUd2l0dGVyVXNlclR5cGUsXG58fTtcblxuZXhwb3J0IHR5cGUgVHdpdHRlckZlZWRiYWNrVHlwZSA9IHtcbiAgLi4uVHdpdHRlckZlZWRiYWNrVW5zYXZlZFR5cGUsXG4gIC4uLk1vZGVsU2F2ZWRGaWVsZHNUeXBlLFxufTtcblxuZXhwb3J0IGNvbnN0IFR3aXR0ZXJGZWVkYmFja1NjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICAuLi5Nb2RlbFNhdmVkRmllbGRzU2NoZW1hLFxuICBzdGF0dXNJZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIHVzZXI6IFR3aXR0ZXJVc2VyU2NoZW1hLnJlcXVpcmVkKCksXG59KVxuICAudW5rbm93bigpXG4gIC5yZXF1aXJlZCgpO1xuXG5leHBvcnQgdHlwZSBUd2l0dGVyRmVlZGJhY2tXaXRoTWF5YmVBbmFseXNpc1R5cGUgPSB7XG4gIC4uLlR3aXR0ZXJGZWVkYmFja1R5cGUsXG4gIGFuYWx5c2lzOiA/RmVlZGJhY2tBbmFseXNpc1R5cGUsXG59O1xuXG5leHBvcnQgY29uc3QgVHdpdHRlckZlZWRiYWNrV2l0aE1heWJlQW5hbHlzaXNTY2hlbWEgPSBUd2l0dGVyRmVlZGJhY2tTY2hlbWEua2V5cyhcbiAge1xuICAgIGFuYWx5c2lzOiBGZWVkYmFja0FuYWx5c2lzU2NoZW1hLFxuICB9XG4pXG4gIC51bmtub3duKClcbiAgLnJlcXVpcmVkKCk7XG5cbi8vIGN1cnJlbnRseSBvbmx5IDEgdGllclxuZXhwb3J0IHR5cGUgQWNjb3VudFRpZXJUeXBlID0gJ2ZyZWUnO1xuXG5leHBvcnQgdHlwZSBBY2NvdW50U2V0dGluZ1Bvc3RCb2R5VHlwZSA9IHt8XG4gIHR3aXR0ZXJTZWFyY2hlczogc3RyaW5nW10sXG58fTtcblxuZXhwb3J0IGNvbnN0IEFjY291bnRTZXR0aW5nUG9zdEJvZHlTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgdHdpdHRlclNlYXJjaGVzOiBKb2kuYXJyYXkoKVxuICAgIC5pdGVtcyhKb2kuc3RyaW5nKCkpXG4gICAgLmRlZmF1bHQoKCkgPT4gW10sICdEbyBub3QgYWxsb3cgdW5kZWZpbmVkIG9yIG51bGwgdG8gY29tZSBvdXQgb2YgdGhlIERCJyksXG59KVxuICAudW5rbm93bigpXG4gIC5yZXF1aXJlZCgpO1xuXG5leHBvcnQgdHlwZSBBY2NvdW50U2V0dGluZ1Vuc2F2ZWRUeXBlID0ge3xcbiAgLi4uQWNjb3VudFNldHRpbmdQb3N0Qm9keVR5cGUsXG4gIGFjY291bnRJZDogc3RyaW5nLFxuICBmZWVkYmFja1VzYWdlQnlEYXRlOiB7XG4gICAgW2tleTogWWVhck1vbnRoQnVja2V0VHlwZV06IG51bWJlcixcbiAgfSxcbiAgdGllcjogQWNjb3VudFRpZXJUeXBlLFxufH07XG5cbmV4cG9ydCB0eXBlIEFjY291bnRTZXR0aW5nVHlwZSA9IHtcbiAgLi4uQWNjb3VudFNldHRpbmdVbnNhdmVkVHlwZSxcbiAgLi4uTW9kZWxTYXZlZEZpZWxkc1R5cGUsXG59O1xuXG5leHBvcnQgY29uc3QgQWNjb3VudFNldHRpbmdTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgLi4uTW9kZWxTYXZlZEZpZWxkc1NjaGVtYSxcbiAgZmVlZGJhY2tVc2FnZUJ5RGF0ZTogSm9pLm9iamVjdCgpXG4gICAgLnBhdHRlcm4oXG4gICAgICBZZWFyTW9udGhCdWNrZXRSZWdleCxcbiAgICAgIEpvaS5udW1iZXIoKVxuICAgICAgICAubWluKDApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgKVxuICAgIC5yZXF1aXJlZCgpLFxuICBpZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIHRpZXI6IEpvaS5zdHJpbmcoKVxuICAgIC52YWxpZChbJ2ZyZWUnXSlcbiAgICAucmVxdWlyZWQoKSxcbiAgdHdpdHRlclNlYXJjaGVzOiBKb2kuYXJyYXkoKVxuICAgIC5pdGVtcyhKb2kuc3RyaW5nKCkpXG4gICAgLmRlZmF1bHQoKCkgPT4gW10sICdEbyBub3QgYWxsb3cgdW5kZWZpbmVkIG9yIG51bGwgdG8gY29tZSBvdXQgb2YgdGhlIERCJyksXG59KVxuICAudW5rbm93bigpXG4gIC5yZXF1aXJlZCgpO1xuIl19