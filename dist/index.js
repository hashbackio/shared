'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountSettingSchema = exports.WatsonClassifierSchema = exports.AccountSettingPostBodySchema = exports.ZenDeskIntegrationSchema = exports.AccountIntegrationSchema = exports.TwitterFeedbackWithMaybeAnalysisSchema = exports.TwitterFeedbackSchema = exports.EmailFeedbackWithMaybeAnalysisSchema = exports.EmailFeedbackSchema = exports.EmailFeedbackPostBodySchema = exports.WatsonClassifyResponseSchema = exports.FeedbackAnalysisSchema = exports.UserSchema = exports.EmailUserSchema = exports.TwitterUserSchema = exports.SentimentAnalysisResponseSchema = exports.SentenceSchema = exports.CategorySchema = exports.SentimentSchema = exports.TextSpanSchema = exports.SupportedLanguageSchema = exports.getDynamoDbGlobalArn = exports.getTableNamePrefix = exports.getAnalyzeFeedbackTopicName = exports.getAnalyzeFeedbackSNS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// https://github.com/benmosher/eslint-plugin-import/issues/921
/* eslint-disable import/named */


var _Arns = require('./Arns');

Object.defineProperty(exports, 'getAnalyzeFeedbackSNS', {
  enumerable: true,
  get: function get() {
    return _Arns.getAnalyzeFeedbackSNS;
  }
});
Object.defineProperty(exports, 'getAnalyzeFeedbackTopicName', {
  enumerable: true,
  get: function get() {
    return _Arns.getAnalyzeFeedbackTopicName;
  }
});
Object.defineProperty(exports, 'getTableNamePrefix', {
  enumerable: true,
  get: function get() {
    return _Arns.getTableNamePrefix;
  }
});
Object.defineProperty(exports, 'getDynamoDbGlobalArn', {
  enumerable: true,
  get: function get() {
    return _Arns.getDynamoDbGlobalArn;
  }
});

var _joiBrowser = require('joi-browser');

var _joiBrowser2 = _interopRequireDefault(_joiBrowser);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _YearMonthBucket = require('./YearMonthBucket');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var AccountIntegrationSchema = exports.AccountIntegrationSchema = _joiBrowser2.default.object({
  status: _joiBrowser2.default.string().valid(['disconnected', 'awaitingApproval', 'connected']).required(),
  token: _joiBrowser2.default.string().required()
}).optionalKeys('token').unknown().required();

var ZenDeskIntegrationSchema = exports.ZenDeskIntegrationSchema = AccountIntegrationSchema.keys({
  subdomain: _joiBrowser2.default.string().allow('').required(),
  ticketImport: _joiBrowser2.default.object({
    inProgress: _joiBrowser2.default.boolean().required(),
    nextPage: _joiBrowser2.default.number().required()
  }).unknown().default({ inProgress: false, nextPage: 0 }, 'Defaults to no in progress import and Unix Epoch as the next page')
});

var AccountSettingPostBodySchema = exports.AccountSettingPostBodySchema = _joiBrowser2.default.object({
  twitterSearches: _joiBrowser2.default.array().items(_joiBrowser2.default.string()).default(function () {
    return [];
  }, 'Do not allow undefined or null to come out of the DB')
}).unknown().required();

var WatsonClassifierSchema = exports.WatsonClassifierSchema = _joiBrowser2.default.object({
  classifier_id: _joiBrowser2.default.string().required(),
  created: _joiBrowser2.default.string().required(),
  language: _joiBrowser2.default.string().required(),
  name: _joiBrowser2.default.string().required(),
  status: _joiBrowser2.default.string().valid(['Non Existent', 'Training', 'Failed', 'Available', 'Unavailable']).required(),
  status_description: _joiBrowser2.default.string().required(),
  url: _joiBrowser2.default.string().required()
});

var AccountSettingSchema = exports.AccountSettingSchema = _joiBrowser2.default.object(_extends({}, ModelSavedFieldsSchema, {
  apiToken: _joiBrowser2.default.string().guid(),
  feedbackUsageByDate: _joiBrowser2.default.object().pattern(_YearMonthBucket.YearMonthBucketRegex, _joiBrowser2.default.number().min(0).required()).required(),
  id: _joiBrowser2.default.string().required(),
  integrations: _joiBrowser2.default.object({ zenDesk: ZenDeskIntegrationSchema }).required(),
  tier: _joiBrowser2.default.string().valid(['notApproved', 'free']).required(),
  twitterSearches: _joiBrowser2.default.array().items(_joiBrowser2.default.string()).default(function () {
    return [];
  }, 'Do not allow undefined or null to come out of the DB'),
  watsonClassifier: WatsonClassifierSchema
})).unknown().required();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJnZXRBbmFseXplRmVlZGJhY2tTTlMiLCJnZXRBbmFseXplRmVlZGJhY2tUb3BpY05hbWUiLCJnZXRUYWJsZU5hbWVQcmVmaXgiLCJnZXREeW5hbW9EYkdsb2JhbEFybiIsIk1vZGVsU2F2ZWRGaWVsZHNTY2hlbWEiLCJhY2NvdW50SWQiLCJzdHJpbmciLCJyZXF1aXJlZCIsImNyZWF0ZWRBdCIsImlzb0RhdGUiLCJpZCIsImd1aWQiLCJkZWZhdWx0IiwidjQiLCJ1cGRhdGVkQXQiLCJTdXBwb3J0ZWRMYW5ndWFnZVNjaGVtYSIsInZhbGlkIiwiVGV4dFNwYW5TY2hlbWEiLCJvYmplY3QiLCJiZWdpbk9mZnNldCIsIm51bWJlciIsIm1pbiIsImNvbnRlbnQiLCJ1bmtub3duIiwiU2VudGltZW50U2NoZW1hIiwibWFnbml0dWRlIiwic2NvcmUiLCJtYXgiLCJDYXRlZ29yeVNjaGVtYSIsImNhdGVnb3J5TmFtZSIsImNvbmZpZGVuY2UiLCJTZW50ZW5jZVNjaGVtYSIsInNlbnRpbWVudCIsInRleHQiLCJTZW50aW1lbnRBbmFseXNpc1Jlc3BvbnNlU2NoZW1hIiwiZG9jdW1lbnRTZW50aW1lbnQiLCJsYW5ndWFnZSIsInNlbnRlbmNlcyIsImFycmF5IiwiaXRlbXMiLCJUd2l0dGVyVXNlclNjaGVtYSIsImF2YXRhclVybCIsInVyaSIsInVzZXJuYW1lIiwiRW1haWxVc2VyU2NoZW1hIiwiZW1haWwiLCJVc2VyU2NoZW1hIiwiY29tcGlsZSIsIkZlZWRiYWNrQW5hbHlzaXNTY2hlbWEiLCJjb250ZW50U2VudGltZW50IiwiZG9jdW1lbnRDYXRlZ29yaXphdGlvbiIsImZlZWRiYWNrSWQiLCJmZWVkYmFja1R5cGUiLCJhbGxvdyIsImtleXMiLCJjYXRlZ29yaXphdGlvbiIsInRvcERvY3VtZW50Q2F0ZWdvcmllcyIsInRvcFNlbnRlbmNlQ2F0ZWdvcmllcyIsInVzZXIiLCJ1c2VySWQiLCJXYXRzb25DbGFzc2lmeVJlc3BvbnNlU2NoZW1hIiwiY2xhc3NlcyIsImNsYXNzX25hbWUiLCJjbGFzc2lmaWVyX2lkIiwidG9wX2NsYXNzIiwidXJsIiwiYWxsb3dSZWxhdGl2ZSIsIkVtYWlsRmVlZGJhY2tQb3N0Qm9keVNjaGVtYSIsImVtYWlsU2VudERhdGUiLCJmcm9tIiwic3ViamVjdCIsInRvIiwiRW1haWxGZWVkYmFja1NjaGVtYSIsIkVtYWlsRmVlZGJhY2tXaXRoTWF5YmVBbmFseXNpc1NjaGVtYSIsImFuYWx5c2lzIiwiVHdpdHRlckZlZWRiYWNrU2NoZW1hIiwic3RhdHVzSWQiLCJUd2l0dGVyRmVlZGJhY2tXaXRoTWF5YmVBbmFseXNpc1NjaGVtYSIsIkFjY291bnRJbnRlZ3JhdGlvblNjaGVtYSIsInN0YXR1cyIsInRva2VuIiwib3B0aW9uYWxLZXlzIiwiWmVuRGVza0ludGVncmF0aW9uU2NoZW1hIiwic3ViZG9tYWluIiwidGlja2V0SW1wb3J0IiwiaW5Qcm9ncmVzcyIsImJvb2xlYW4iLCJuZXh0UGFnZSIsIkFjY291bnRTZXR0aW5nUG9zdEJvZHlTY2hlbWEiLCJ0d2l0dGVyU2VhcmNoZXMiLCJXYXRzb25DbGFzc2lmaWVyU2NoZW1hIiwiY3JlYXRlZCIsIm5hbWUiLCJzdGF0dXNfZGVzY3JpcHRpb24iLCJBY2NvdW50U2V0dGluZ1NjaGVtYSIsImFwaVRva2VuIiwiZmVlZGJhY2tVc2FnZUJ5RGF0ZSIsInBhdHRlcm4iLCJpbnRlZ3JhdGlvbnMiLCJ6ZW5EZXNrIiwidGllciIsIndhdHNvbkNsYXNzaWZpZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBO0FBQ0E7Ozs7Ozs7O2lCQVFFQSxxQjs7Ozs7O2lCQUNBQywyQjs7Ozs7O2lCQUNBQyxrQjs7Ozs7O2lCQUNBQyxvQjs7OztBQWZGOzs7O0FBQ0E7Ozs7QUFJQTs7OztBQW9CQSxJQUFNQyx5QkFBeUI7QUFDN0JDLGFBQVcscUJBQUlDLE1BQUosR0FBYUMsUUFBYixFQURrQjtBQUU3QkMsYUFBVyxxQkFBSUYsTUFBSixHQUNSRyxPQURRLEdB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QUFJLHFCQUFJSixNQUFKLEdBQWFDLFFBQWIsRUFYOEI7QUFZbEMyRixnQkFBYyxxQkFBSWhGLE1BQUosQ0FBVyxFQUFFaUYsU0FBU2pCLHdCQUFYLEVBQVgsRUFBa0QzRSxRQUFsRCxFQVpvQjtBQWFsQzZGLFFBQU0scUJBQUk5RixNQUFKLEdBQ0hVLEtBREcsQ0FDRyxDQUFDLGFBQUQsRUFBZ0IsTUFBaEIsQ0FESCxFQUVIVCxRQUZHLEVBYjRCO0FBZ0JsQ2tGLG1CQUFpQixxQkFBSW5ELEtBQUosR0FDZEMsS0FEYyxDQUNSLHFCQUFJakMsTUFBSixFQURRLEVBRWRNLE9BRmMsQ0FFTjtBQUFBLFdBQU0sRUFBTjtBQUFBLEdBRk0sRUFFSSxzREFGSixDQWhCaUI7QUFtQmxDeUYsb0JBQWtCWDtBQW5CZ0IsSUFxQmpDbkUsT0FyQmlDLEdBc0JqQ2hCLFFBdEJpQyxFQUE3QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbmltcG9ydCBKb2kgZnJvbSAnam9pLWJyb3dzZXInO1xuaW1wb3J0IHV1aWQgZnJvbSAndXVpZCc7XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZW5tb3NoZXIvZXNsaW50LXBsdWdpbi1pbXBvcnQvaXNzdWVzLzkyMVxuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25hbWVkICovXG5pbXBvcnQge1xuICBZZWFyTW9udGhCdWNrZXRSZWdleCxcbiAgdHlwZSBZZWFyTW9udGhCdWNrZXRUeXBlLFxufSBmcm9tICcuL1llYXJNb250aEJ1Y2tldCc7XG4vKiBlc2xpbnQtZW5hYmxlICovXG5cbmV4cG9ydCB7XG4gIGdldEFuYWx5emVGZWVkYmFja1NOUyxcbiAgZ2V0QW5hbHl6ZUZlZWRiYWNrVG9waWNOYW1lLFxuICBnZXRUYWJsZU5hbWVQcmVmaXgsXG4gIGdldER5bmFtb0RiR2xvYmFsQXJuLFxufSBmcm9tICcuL0FybnMnO1xuXG5leHBvcnQgdHlwZSBNb2RlbFNhdmVkRmllbGRzVHlwZSA9IHt8XG4gIGFjY291bnRJZDogc3RyaW5nLFxuICBjcmVhdGVkQXQ6IHN0cmluZyxcbiAgaWQ6IHN0cmluZyxcbiAgdXBkYXRlZEF0Pzogc3RyaW5nLFxufH07XG5cbmNvbnN0IE1vZGVsU2F2ZWRGaWVsZHNTY2hlbWEgPSB7XG4gIGFjY291bnRJZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIGNyZWF0ZWRBdDogSm9pLnN0cmluZygpXG4gICAgLmlzb0RhdGUoKVxuICAgIC5yZXF1aXJlZCgpLFxuICBpZDogSm9pLnN0cmluZygpXG4gICAgLmd1aWQoKVxuICAgIC5kZWZhdWx0KCgpID0+IHV1aWQudjQoKSwgJ3V1aWQgdjQnKSxcbiAgdXBkYXRlZEF0OiBKb2kuc3RyaW5nKCkuaXNvRGF0ZSgpLFxufTtcblxuZXhwb3J0IHR5cGUgU3VwcG9ydGVkTGFuZ3VhZ2VUeXBlID1cbiAgfCAnemgnXG4gIHwgJ3poLUhhbnQnXG4gIHwgJ2VuJ1xuICB8ICdmcidcbiAgfCAnZGUnXG4gIHwgJ2l0J1xuICB8ICdqYSdcbiAgfCAna28nXG4gIHwgJ3B0J1xuICB8ICdlcyc7XG5cbmV4cG9ydCBjb25zdCBTdXBwb3J0ZWRMYW5ndWFnZVNjaGVtYSA9IEpvaS5zdHJpbmcoKS52YWxpZChbXG4gICd6aCcsXG4gICd6aC1IYW50JyxcbiAgJ2VuJyxcbiAgJ2ZyJyxcbiAgJ2RlJyxcbiAgJ2l0JyxcbiAgJ2phJyxcbiAgJ2tvJyxcbiAgJ3B0JyxcbiAgJ2VzJyxcbl0pO1xuXG50eXBlIFRleHRTcGFuVHlwZSA9IHtcbiAgYmVnaW5PZmZzZXQ6IG51bWJlcixcbiAgY29udGVudDogc3RyaW5nLFxufTtcblxuZXhwb3J0IGNvbnN0IFRleHRTcGFuU2NoZW1hID0gSm9pLm9iamVjdCh7XG4gIGJlZ2luT2Zmc2V0OiBKb2kubnVtYmVyKClcbiAgICAubWluKC0xKVxuICAgIC5yZXF1aXJlZCgpLFxuICBjb250ZW50OiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbn0pLnVua25vd24oKTtcblxuZXhwb3J0IHR5cGUgU2VudGltZW50VHlwZSA9IHt8XG4gIG1hZ25pdHVkZTogbnVtYmVyLFxuICBzY29yZTogbnVtYmVyLFxufH07XG5cbmV4cG9ydCBjb25zdCBTZW50aW1lbnRTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgbWFnbml0dWRlOiBKb2kubnVtYmVyKClcbiAgICAubWluKDApXG4gICAgLnJlcXVpcmVkKCksXG4gIHNjb3JlOiBKb2kubnVtYmVyKClcbiAgICAubWluKC0xKVxuICAgIC5tYXgoMSlcbiAgICAucmVxdWlyZWQoKSxcbn0pLnVua25vd24oKTtcblxuZXhwb3J0IHR5cGUgQ2F0ZWdvcnlDb25maWRlbmNlVHlwZSA9IHtcbiAgY2F0ZWdvcnlOYW1lOiBzdHJpbmcsXG4gIGNvbmZpZGVuY2U6IG51bWJlcixcbn07XG5cbmV4cG9ydCBjb25zdCBDYXRlZ29yeVNjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICBjYXRlZ29yeU5hbWU6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICBjb25maWRlbmNlOiBKb2kubnVtYmVyKClcbiAgICAubWluKDApXG4gICAgLm1heCgxKVxuICAgIC5yZXF1aXJlZCgpLFxufSkudW5rbm93bigpO1xuXG5leHBvcnQgdHlwZSBTZW50ZW5jZVR5cGUgPSB7fFxuICBzZW50aW1lbnQ6IFNlbnRpbWVudFR5cGUsXG4gIHRleHQ6IFRleHRTcGFuVHlwZSxcbnx9O1xuXG5leHBvcnQgY29uc3QgU2VudGVuY2VTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgc2VudGltZW50OiBTZW50aW1lbnRTY2hlbWEucmVxdWlyZWQoKSxcbiAgdGV4dDogVGV4dFNwYW5TY2hlbWEucmVxdWlyZWQoKSxcbn0pLnVua25vd24oKTtcblxuZXhwb3J0IHR5cGUgU2VudGltZW50QW5hbHlzaXNSZXNwb25zZVR5cGUgPSB7fFxuICBkb2N1bWVudFNlbnRpbWVudDogU2VudGltZW50VHlwZSxcbiAgbGFuZ3VhZ2U6IFN1cHBvcnRlZExhbmd1YWdlVHlwZSxcbiAgc2VudGVuY2VzOiBTZW50ZW5jZVR5cGVbXSxcbnx9O1xuXG5leHBvcnQgY29uc3QgU2VudGltZW50QW5hbHlzaXNSZXNwb25zZVNjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICBkb2N1bWVudFNlbnRpbWVudDogU2VudGltZW50U2NoZW1hLnJlcXVpcmVkKCksXG4gIGxhbmd1YWdlOiBTdXBwb3J0ZWRMYW5ndWFnZVNjaGVtYS5yZXF1aXJlZCgpLFxuICBzZW50ZW5jZXM6IEpvaS5hcnJheSgpXG4gICAgLml0ZW1zKFNlbnRlbmNlU2NoZW1hKVxuICAgIC5kZWZhdWx0KCgpID0+IFtdLCAnRG8gbm90IGFsbG93IHVuZGVmaW5lZCBvciBudWxsIHRvIGNvbWUgb3V0IG9mIHRoZSBEQicpLFxufSkudW5rbm93bigpO1xuXG5leHBvcnQgdHlwZSBGZWVkYmFja1R5cGUgPSAnZW1haWwnIHwgJ3R3aXR0ZXInO1xuXG5leHBvcnQgdHlwZSBUd2l0dGVyVXNlclR5cGUgPSB7fFxuICBhdmF0YXJVcmw6IHN0cmluZyxcbiAgaWQ6IHN0cmluZyxcbiAgdXNlcm5hbWU6IHN0cmluZyxcbnx9O1xuXG5leHBvcnQgY29uc3QgVHdpdHRlclVzZXJTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgYXZhdGFyVXJsOiBKb2kuc3RyaW5nKClcbiAgICAudXJpKClcbiAgICAucmVxdWlyZWQoKSxcbiAgaWQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICB1c2VybmFtZTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG59KS51bmtub3duKCk7XG5cbmV4cG9ydCB0eXBlIEVtYWlsVXNlclR5cGUgPSB7fFxuICBpZDogc3RyaW5nLFxufH07XG5cbmV4cG9ydCBjb25zdCBFbWFpbFVzZXJTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgaWQ6IEpvaS5zdHJpbmcoKVxuICAgIC5lbWFpbCgpXG4gICAgLnJlcXVpcmVkKCksXG59KS51bmtub3duKCk7XG5cbmV4cG9ydCB0eXBlIFVzZXJUeXBlID0gRW1haWxVc2VyVHlwZSB8IFR3aXR0ZXJVc2VyVHlwZTtcblxuZXhwb3J0IGNvbnN0IFVzZXJTY2hlbWEgPSBKb2kuY29tcGlsZShbVHdpdHRlclVzZXJTY2hlbWEsIEVtYWlsVXNlclNjaGVtYV0pO1xuXG5leHBvcnQgdHlwZSBGZWVkYmFja1NlbnRpbWVudEFuZENhdGVnb3JpemF0aW9uVHlwZSA9IHt8XG4gIGNvbnRlbnRTZW50aW1lbnQ6IFNlbnRpbWVudFR5cGUsXG4gIGRvY3VtZW50Q2F0ZWdvcml6YXRpb246IENhdGVnb3J5Q29uZmlkZW5jZVR5cGVbXSxcbiAgc2VudGVuY2VzOiBBcnJheTx7XG4gICAgY2F0ZWdvcml6YXRpb246IENhdGVnb3J5Q29uZmlkZW5jZVR5cGVbXSxcbiAgICAuLi5TZW50ZW5jZVR5cGUsXG4gIH0+LFxuICB0b3BEb2N1bWVudENhdGVnb3JpZXM6IEFycmF5PHN0cmluZz4sXG4gIHRvcFNlbnRlbmNlQ2F0ZWdvcmllczogQXJyYXk8c3RyaW5nPixcbnx9O1xuXG5leHBvcnQgdHlwZSBGZWVkYmFja0FuYWx5c2lzVW5zYXZlZFR5cGUgPSB7fFxuICAuLi5GZWVkYmFja1NlbnRpbWVudEFuZENhdGVnb3JpemF0aW9uVHlwZSxcbiAgYWNjb3VudElkOiBzdHJpbmcsXG4gIGZlZWRiYWNrSWQ6IHN0cmluZyxcbiAgZmVlZGJhY2tUeXBlOiBGZWVkYmFja1R5cGUsXG4gIHVzZXI6IFVzZXJUeXBlLFxuICB1c2VySWQ6IHN0cmluZyxcbnx9O1xuXG5leHBvcnQgdHlwZSBGZWVkYmFja0FuYWx5c2lzVHlwZSA9IHtcbiAgLi4uRmVlZGJhY2tBbmFseXNpc1Vuc2F2ZWRUeXBlLFxuICAuLi5Nb2RlbFNhdmVkRmllbGRzVHlwZSxcbn07XG5cbmV4cG9ydCBjb25zdCBGZWVkYmFja0FuYWx5c2lzU2NoZW1hID0gSm9pLm9iamVjdCh7XG4gIC4uLk1vZGVsU2F2ZWRGaWVsZHNTY2hlbWEsXG4gIGNvbnRlbnRTZW50aW1lbnQ6IFNlbnRpbWVudFNjaGVtYS5yZXF1aXJlZCgpLFxuICBkb2N1bWVudENhdGVnb3JpemF0aW9uOiBKb2kuYXJyYXkoKVxuICAgIC5pdGVtcyhDYXRlZ29yeVNjaGVtYSlcbiAgICAuZGVmYXVsdCgoKSA9PiBbXSwgJ0RvIG5vdCBhbGxvdyB1bmRlZmluZWQgb3IgbnVsbCB0byBjb21lIG91dCBvZiB0aGUgREInKSxcbiAgZmVlZGJhY2tJZDogSm9pLnN0cmluZygpXG4gICAgLmd1aWQoKVxuICAgIC5kZWZhdWx0KCgpID0+IHV1aWQudjQoKSwgJ3V1aWQgdjQnKSxcbiAgZmVlZGJhY2tUeXBlOiBKb2kuc3RyaW5nKClcbiAgICAuYWxsb3coWydlbWFpbCcsICd0d2l0dGVyJ10pXG4gICAgLnJlcXVpcmVkKCksXG4gIHNlbnRlbmNlczogSm9pLmFycmF5KClcbiAgICAuaXRlbXMoXG4gICAgICBTZW50ZW5jZVNjaGVtYS5rZXlzKHtcbiAgICAgICAgY2F0ZWdvcml6YXRpb246IEpvaS5hcnJheSgpXG4gICAgICAgICAgLml0ZW1zKENhdGVnb3J5U2NoZW1hKVxuICAgICAgICAgIC5kZWZhdWx0KFxuICAgICAgICAgICAgKCkgPT4gW10sXG4gICAgICAgICAgICAnRG8gbm90IGFsbG93IHVuZGVmaW5lZCBvciBudWxsIHRvIGNvbWUgb3V0IG9mIHRoZSBEQidcbiAgICAgICAgICApLFxuICAgICAgfSkucmVxdWlyZWQoKVxuICAgIClcbiAgICAuZGVmYXVsdCgoKSA9PiBbXSwgJ0RvIG5vdCBhbGxvdyB1bmRlZmluZWQgb3IgbnVsbCB0byBjb21lIG91dCBvZiB0aGUgREInKSxcbiAgdG9wRG9jdW1lbnRDYXRlZ29yaWVzOiBKb2kuYXJyYXkoKVxuICAgIC5pdGVtcyhKb2kuc3RyaW5nKCkpXG4gICAgLmRlZmF1bHQoKCkgPT4gW10sICdEbyBub3QgYWxsb3cgdW5kZWZpbmVkIG9yIG51bGwgdG8gY29tZSBvdXQgb2YgdGhlIERCJyksXG4gIHRvcFNlbnRlbmNlQ2F0ZWdvcmllczogSm9pLmFycmF5KClcbiAgICAuaXRlbXMoSm9pLnN0cmluZygpKVxuICAgIC5kZWZhdWx0KCgpID0+IFtdLCAnRG8gbm90IGFsbG93IHVuZGVmaW5lZCBvciBudWxsIHRvIGNvbWUgb3V0IG9mIHRoZSBEQicpLFxuICB1c2VyOiBVc2VyU2NoZW1hLFxuICB1c2VySWQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxufSlcbiAgLnVua25vd24oKVxuICAucmVxdWlyZWQoKTtcblxuZXhwb3J0IHR5cGUgV2F0c29uQ2xhc3NpZnlSZXNwb25zZVR5cGUgPSB7XG4gIGNsYXNzZXM6IEFycmF5PHsgY2xhc3NfbmFtZTogc3RyaW5nLCBjb25maWRlbmNlOiBudW1iZXIgfT4sXG4gIGNsYXNzaWZpZXJfaWQ6IHN0cmluZyxcbiAgdGV4dDogc3RyaW5nLFxuICB0b3BfY2xhc3M6IHN0cmluZyxcbiAgdXJsOiBzdHJpbmcsXG59O1xuXG5leHBvcnQgY29uc3QgV2F0c29uQ2xhc3NpZnlSZXNwb25zZVNjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICBjbGFzc2VzOiBKb2kuYXJyYXkoKVxuICAgIC5pdGVtcyhcbiAgICAgIEpvaS5vYmplY3Qoe1xuICAgICAgICBjbGFzc19uYW1lOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgICAgICAgY29uZmlkZW5jZTogSm9pLm51bWJlcigpXG4gICAgICAgICAgLm1pbigwKVxuICAgICAgICAgIC5tYXgoMSlcbiAgICAgICAgICAucmVxdWlyZWQoKSxcbiAgICAgIH0pLnVua25vd24oKVxuICAgIClcbiAgICAuZGVmYXVsdCgoKSA9PiBbXSwgJ0RvIG5vdCBhbGxvdyB1bmRlZmluZWQgb3IgbnVsbCB0byBjb21lIG91dCBvZiB0aGUgREInKSxcbiAgY2xhc3NpZmllcl9pZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIHRleHQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICB0b3BfY2xhc3M6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICB1cmw6IEpvaS5zdHJpbmcoKVxuICAgIC51cmkoeyBhbGxvd1JlbGF0aXZlOiB0cnVlIH0pXG4gICAgLnJlcXVpcmVkKCksXG59KTtcblxuZXhwb3J0IHR5cGUgRW1haWxGZWVkYmFja1Bvc3RCb2R5VHlwZSA9IHt8XG4gIGNvbnRlbnQ6IHN0cmluZyxcbiAgZW1haWxTZW50RGF0ZTogc3RyaW5nLFxuICBmcm9tOiBzdHJpbmcsXG4gIHN1YmplY3Q6IHN0cmluZyxcbiAgdG86IHN0cmluZyxcbnx9O1xuXG5leHBvcnQgY29uc3QgRW1haWxGZWVkYmFja1Bvc3RCb2R5U2NoZW1hID0gSm9pLm9iamVjdCh7XG4gIGNvbnRlbnQ6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICBlbWFpbFNlbnREYXRlOiBKb2kuc3RyaW5nKClcbiAgICAuaXNvRGF0ZSgpXG4gICAgLnJlcXVpcmVkKCksXG4gIGZyb206IEpvaS5zdHJpbmcoKVxuICAgIC5lbWFpbCgpXG4gICAgLnJlcXVpcmVkKCksXG4gIHN1YmplY3Q6IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxuICB0bzogSm9pLnN0cmluZygpXG4gICAgLmVtYWlsKClcbiAgICAucmVxdWlyZWQoKSxcbn0pXG4gIC51bmtub3duKClcbiAgLnJlcXVpcmVkKCk7XG5cbmV4cG9ydCB0eXBlIEVtYWlsRmVlZGJhY2tVbnNhdmVkVHlwZSA9IHt8XG4gIC4uLkVtYWlsRmVlZGJhY2tQb3N0Qm9keVR5cGUsXG4gIGFjY291bnRJZDogc3RyaW5nLFxufH07XG5cbmV4cG9ydCB0eXBlIEVtYWlsRmVlZGJhY2tUeXBlID0ge1xuICAuLi5FbWFpbEZlZWRiYWNrVW5zYXZlZFR5cGUsXG4gIC4uLk1vZGVsU2F2ZWRGaWVsZHNUeXBlLFxufTtcblxuZXhwb3J0IGNvbnN0IEVtYWlsRmVlZGJhY2tTY2hlbWEgPSBFbWFpbEZlZWRiYWNrUG9zdEJvZHlTY2hlbWEua2V5cyh7XG4gIC4uLk1vZGVsU2F2ZWRGaWVsZHNTY2hlbWEsXG59KVxuICAudW5rbm93bigpXG4gIC5yZXF1aXJlZCgpO1xuXG5leHBvcnQgdHlwZSBFbWFpbEZlZWRiYWNrV2l0aE1heWJlQW5hbHlzaXNUeXBlID0ge1xuICAuLi5FbWFpbEZlZWRiYWNrVHlwZSxcbiAgYW5hbHlzaXM6ID9GZWVkYmFja0FuYWx5c2lzVHlwZSxcbn07XG5cbmV4cG9ydCBjb25zdCBFbWFpbEZlZWRiYWNrV2l0aE1heWJlQW5hbHlzaXNTY2hlbWEgPSBFbWFpbEZlZWRiYWNrU2NoZW1hLmtleXMoe1xuICBhbmFseXNpczogRmVlZGJhY2tBbmFseXNpc1NjaGVtYSxcbn0pXG4gIC51bmtub3duKClcbiAgLnJlcXVpcmVkKCk7XG5cbmV4cG9ydCB0eXBlIFR3aXR0ZXJGZWVkYmFja1Vuc2F2ZWRUeXBlID0ge3xcbiAgYWNjb3VudElkOiBzdHJpbmcsXG4gIHN0YXR1c0lkOiBzdHJpbmcsXG4gIHVzZXI6IFR3aXR0ZXJVc2VyVHlwZSxcbnx9O1xuXG5leHBvcnQgdHlwZSBUd2l0dGVyRmVlZGJhY2tUeXBlID0ge1xuICAuLi5Ud2l0dGVyRmVlZGJhY2tVbnNhdmVkVHlwZSxcbiAgLi4uTW9kZWxTYXZlZEZpZWxkc1R5cGUsXG59O1xuXG5leHBvcnQgY29uc3QgVHdpdHRlckZlZWRiYWNrU2NoZW1hID0gSm9pLm9iamVjdCh7XG4gIC4uLk1vZGVsU2F2ZWRGaWVsZHNTY2hlbWEsXG4gIHN0YXR1c0lkOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgdXNlcjogVHdpdHRlclVzZXJTY2hlbWEucmVxdWlyZWQoKSxcbn0pXG4gIC51bmtub3duKClcbiAgLnJlcXVpcmVkKCk7XG5cbmV4cG9ydCB0eXBlIFR3aXR0ZXJGZWVkYmFja1dpdGhNYXliZUFuYWx5c2lzVHlwZSA9IHtcbiAgLi4uVHdpdHRlckZlZWRiYWNrVHlwZSxcbiAgYW5hbHlzaXM6ID9GZWVkYmFja0FuYWx5c2lzVHlwZSxcbn07XG5cbmV4cG9ydCBjb25zdCBUd2l0dGVyRmVlZGJhY2tXaXRoTWF5YmVBbmFseXNpc1NjaGVtYSA9IFR3aXR0ZXJGZWVkYmFja1NjaGVtYS5rZXlzKFxuICB7XG4gICAgYW5hbHlzaXM6IEZlZWRiYWNrQW5hbHlzaXNTY2hlbWEsXG4gIH1cbilcbiAgLnVua25vd24oKVxuICAucmVxdWlyZWQoKTtcblxuZXhwb3J0IHR5cGUgQWNjb3VudFRpZXJUeXBlID0gJ25vdEFwcHJvdmVkJyB8ICdmcmVlJztcblxuZXhwb3J0IHR5cGUgQWNjb3VudEludGVncmF0aW9uU3RhdHVzVHlwZSA9XG4gIHwgJ2Rpc2Nvbm5lY3RlZCdcbiAgfCAnYXdhaXRpbmdBcHByb3ZhbCdcbiAgfCAnY29ubmVjdGVkJztcblxuZXhwb3J0IHR5cGUgQWNjb3VudEludGVncmF0aW9uVHlwZSA9IHt8XG4gIHN0YXR1czogQWNjb3VudEludGVncmF0aW9uU3RhdHVzVHlwZSxcbiAgdG9rZW4/OiBzdHJpbmcsXG58fTtcblxuZXhwb3J0IHR5cGUgWmVuRGVza0ludGVncmF0aW9uVHlwZSA9IHtcbiAgLi4uQWNjb3VudEludGVncmF0aW9uVHlwZSxcbiAgc3ViZG9tYWluOiBzdHJpbmcsXG4gIHRpY2tldEltcG9ydDoge1xuICAgIGluUHJvZ3Jlc3M6IGJvb2xlYW4sXG4gICAgbmV4dFBhZ2U6IG51bWJlcixcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBBY2NvdW50SW50ZWdyYXRpb25TY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgc3RhdHVzOiBKb2kuc3RyaW5nKClcbiAgICAudmFsaWQoWydkaXNjb25uZWN0ZWQnLCAnYXdhaXRpbmdBcHByb3ZhbCcsICdjb25uZWN0ZWQnXSlcbiAgICAucmVxdWlyZWQoKSxcbiAgdG9rZW46IEpvaS5zdHJpbmcoKS5yZXF1aXJlZCgpLFxufSlcbiAgLm9wdGlvbmFsS2V5cygndG9rZW4nKVxuICAudW5rbm93bigpXG4gIC5yZXF1aXJlZCgpO1xuXG5leHBvcnQgY29uc3QgWmVuRGVza0ludGVncmF0aW9uU2NoZW1hID0gQWNjb3VudEludGVncmF0aW9uU2NoZW1hLmtleXMoe1xuICBzdWJkb21haW46IEpvaS5zdHJpbmcoKVxuICAgIC5hbGxvdygnJylcbiAgICAucmVxdWlyZWQoKSxcbiAgdGlja2V0SW1wb3J0OiBKb2kub2JqZWN0KHtcbiAgICBpblByb2dyZXNzOiBKb2kuYm9vbGVhbigpLnJlcXVpcmVkKCksXG4gICAgbmV4dFBhZ2U6IEpvaS5udW1iZXIoKS5yZXF1aXJlZCgpLFxuICB9KVxuICAgIC51bmtub3duKClcbiAgICAuZGVmYXVsdChcbiAgICAgIHsgaW5Qcm9ncmVzczogZmFsc2UsIG5leHRQYWdlOiAwIH0sXG4gICAgICAnRGVmYXVsdHMgdG8gbm8gaW4gcHJvZ3Jlc3MgaW1wb3J0IGFuZCBVbml4IEVwb2NoIGFzIHRoZSBuZXh0IHBhZ2UnXG4gICAgKSxcbn0pO1xuXG5leHBvcnQgdHlwZSBBY2NvdW50U2V0dGluZ1Bvc3RCb2R5VHlwZSA9IHt8XG4gIHR3aXR0ZXJTZWFyY2hlczogc3RyaW5nW10sXG58fTtcblxuZXhwb3J0IGNvbnN0IEFjY291bnRTZXR0aW5nUG9zdEJvZHlTY2hlbWEgPSBKb2kub2JqZWN0KHtcbiAgdHdpdHRlclNlYXJjaGVzOiBKb2kuYXJyYXkoKVxuICAgIC5pdGVtcyhKb2kuc3RyaW5nKCkpXG4gICAgLmRlZmF1bHQoKCkgPT4gW10sICdEbyBub3QgYWxsb3cgdW5kZWZpbmVkIG9yIG51bGwgdG8gY29tZSBvdXQgb2YgdGhlIERCJyksXG59KVxuICAudW5rbm93bigpXG4gIC5yZXF1aXJlZCgpO1xuXG5leHBvcnQgdHlwZSBXYXRzb25DbGFzc2lmaWVyVHlwZSA9IHt8XG4gIGNsYXNzaWZpZXJfaWQ6IHN0cmluZyxcbiAgY3JlYXRlZDogc3RyaW5nLFxuICBsYW5ndWFnZTogc3RyaW5nLFxuICBuYW1lOiBzdHJpbmcsXG4gIHN0YXR1czogJ05vbiBFeGlzdGVudCcgfCAnVHJhaW5pbmcnIHwgJ0ZhaWxlZCcgfCAnQXZhaWxhYmxlJyB8ICdVbmF2YWlsYWJsZScsXG4gIHN0YXR1c19kZXNjcmlwdGlvbjogc3RyaW5nLFxuICB1cmw6IHN0cmluZyxcbnx9O1xuXG5leHBvcnQgY29uc3QgV2F0c29uQ2xhc3NpZmllclNjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICBjbGFzc2lmaWVyX2lkOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgY3JlYXRlZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIGxhbmd1YWdlOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgbmFtZTogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIHN0YXR1czogSm9pLnN0cmluZygpXG4gICAgLnZhbGlkKFsnTm9uIEV4aXN0ZW50JywgJ1RyYWluaW5nJywgJ0ZhaWxlZCcsICdBdmFpbGFibGUnLCAnVW5hdmFpbGFibGUnXSlcbiAgICAucmVxdWlyZWQoKSxcbiAgc3RhdHVzX2Rlc2NyaXB0aW9uOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbiAgdXJsOiBKb2kuc3RyaW5nKCkucmVxdWlyZWQoKSxcbn0pO1xuXG5leHBvcnQgdHlwZSBBY2NvdW50U2V0dGluZ1Vuc2F2ZWRUeXBlID0ge3xcbiAgLi4uQWNjb3VudFNldHRpbmdQb3N0Qm9keVR5cGUsXG4gIGFjY291bnRJZDogc3RyaW5nLFxuICBhcGlUb2tlbjogc3RyaW5nLFxuICBmZWVkYmFja1VzYWdlQnlEYXRlOiB7XG4gICAgW2tleTogWWVhck1vbnRoQnVja2V0VHlwZV06IG51bWJlcixcbiAgfSxcbiAgaW50ZWdyYXRpb25zOiB7XG4gICAgemVuRGVzazogWmVuRGVza0ludGVncmF0aW9uVHlwZSxcbiAgfSxcbiAgdGllcjogQWNjb3VudFRpZXJUeXBlLFxuICB3YXRzb25DbGFzc2lmaWVyOiA/V2F0c29uQ2xhc3NpZmllclR5cGUsXG58fTtcblxuZXhwb3J0IHR5cGUgQWNjb3VudFNldHRpbmdUeXBlID0ge1xuICAuLi5BY2NvdW50U2V0dGluZ1Vuc2F2ZWRUeXBlLFxuICAuLi5Nb2RlbFNhdmVkRmllbGRzVHlwZSxcbn07XG5cbmV4cG9ydCBjb25zdCBBY2NvdW50U2V0dGluZ1NjaGVtYSA9IEpvaS5vYmplY3Qoe1xuICAuLi5Nb2RlbFNhdmVkRmllbGRzU2NoZW1hLFxuICBhcGlUb2tlbjogSm9pLnN0cmluZygpLmd1aWQoKSxcbiAgZmVlZGJhY2tVc2FnZUJ5RGF0ZTogSm9pLm9iamVjdCgpXG4gICAgLnBhdHRlcm4oXG4gICAgICBZZWFyTW9udGhCdWNrZXRSZWdleCxcbiAgICAgIEpvaS5udW1iZXIoKVxuICAgICAgICAubWluKDApXG4gICAgICAgIC5yZXF1aXJlZCgpXG4gICAgKVxuICAgIC5yZXF1aXJlZCgpLFxuICBpZDogSm9pLnN0cmluZygpLnJlcXVpcmVkKCksXG4gIGludGVncmF0aW9uczogSm9pLm9iamVjdCh7IHplbkRlc2s6IFplbkRlc2tJbnRlZ3JhdGlvblNjaGVtYSB9KS5yZXF1aXJlZCgpLFxuICB0aWVyOiBKb2kuc3RyaW5nKClcbiAgICAudmFsaWQoWydub3RBcHByb3ZlZCcsICdmcmVlJ10pXG4gICAgLnJlcXVpcmVkKCksXG4gIHR3aXR0ZXJTZWFyY2hlczogSm9pLmFycmF5KClcbiAgICAuaXRlbXMoSm9pLnN0cmluZygpKVxuICAgIC5kZWZhdWx0KCgpID0+IFtdLCAnRG8gbm90IGFsbG93IHVuZGVmaW5lZCBvciBudWxsIHRvIGNvbWUgb3V0IG9mIHRoZSBEQicpLFxuICB3YXRzb25DbGFzc2lmaWVyOiBXYXRzb25DbGFzc2lmaWVyU2NoZW1hLFxufSlcbiAgLnVua25vd24oKVxuICAucmVxdWlyZWQoKTtcbiJdfQ==