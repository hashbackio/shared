"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getAnalyzeFeedbackTopicName = exports.getAnalyzeFeedbackTopicName = function getAnalyzeFeedbackTopicName(stage) {
  return "analyze-feedback-" + stage;
};

var getAnalyzeFeedbackSNS = exports.getAnalyzeFeedbackSNS = function getAnalyzeFeedbackSNS(stage) {
  return "arn:aws:sns:#{AWS::Region}:#{AWS::AccountId}:" + getAnalyzeFeedbackTopicName(stage);
};

var getTableNamePrefix = exports.getTableNamePrefix = function getTableNamePrefix(stage) {
  return "feedback-analysis-api-" + stage;
};

var getDynamoDbGlobalArn = exports.getDynamoDbGlobalArn = function getDynamoDbGlobalArn(stage) {
  return "arn:aws:dynamodb:#{AWS::Region}:#{AWS::AccountId}:table/" + getTableNamePrefix(stage);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Bcm5zLmpzIl0sIm5hbWVzIjpbImdldEFuYWx5emVGZWVkYmFja1RvcGljTmFtZSIsInN0YWdlIiwiZ2V0QW5hbHl6ZUZlZWRiYWNrU05TIiwiZ2V0VGFibGVOYW1lUHJlZml4IiwiZ2V0RHluYW1vRGJHbG9iYWxBcm4iXSwibWFwcGluZ3MiOiI7Ozs7O0FBRU8sSUFBTUEsb0VBQThCLFNBQTlCQSwyQkFBOEIsQ0FBQ0MsS0FBRDtBQUFBLCtCQUNyQkEsS0FEcUI7QUFBQSxDQUFwQzs7QUFHQSxJQUFNQyx3REFBd0IsU0FBeEJBLHFCQUF3QixDQUFDRCxLQUFEO0FBQUEsMkRBQ2FELDRCQUM5Q0MsS0FEOEMsQ0FEYjtBQUFBLENBQTlCOztBQUtBLElBQU1FLGtEQUFxQixTQUFyQkEsa0JBQXFCLENBQUNGLEtBQUQ7QUFBQSxvQ0FDUEEsS0FETztBQUFBLENBQTNCOztBQUdBLElBQU1HLHNEQUF1QixTQUF2QkEsb0JBQXVCLENBQUNILEtBQUQ7QUFBQSxzRUFDeUJFLG1CQUN6REYsS0FEeUQsQ0FEekI7QUFBQSxDQUE3QiIsImZpbGUiOiJBcm5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcblxuZXhwb3J0IGNvbnN0IGdldEFuYWx5emVGZWVkYmFja1RvcGljTmFtZSA9IChzdGFnZTogc3RyaW5nKSA9PlxuICBgYW5hbHl6ZS1mZWVkYmFjay0ke3N0YWdlfWA7XG5cbmV4cG9ydCBjb25zdCBnZXRBbmFseXplRmVlZGJhY2tTTlMgPSAoc3RhZ2U6IHN0cmluZykgPT5cbiAgYGFybjphd3M6c25zOiN7QVdTOjpSZWdpb259OiN7QVdTOjpBY2NvdW50SWR9OiR7Z2V0QW5hbHl6ZUZlZWRiYWNrVG9waWNOYW1lKFxuICAgIHN0YWdlXG4gICl9YDtcblxuZXhwb3J0IGNvbnN0IGdldFRhYmxlTmFtZVByZWZpeCA9IChzdGFnZTogc3RyaW5nKSA9PlxuICBgZmVlZGJhY2stYW5hbHlzaXMtYXBpLSR7c3RhZ2V9YDtcblxuZXhwb3J0IGNvbnN0IGdldER5bmFtb0RiR2xvYmFsQXJuID0gKHN0YWdlOiBzdHJpbmcpID0+XG4gIGBhcm46YXdzOmR5bmFtb2RiOiN7QVdTOjpSZWdpb259OiN7QVdTOjpBY2NvdW50SWR9OnRhYmxlLyR7Z2V0VGFibGVOYW1lUHJlZml4KFxuICAgIHN0YWdlXG4gICl9YDtcbiJdfQ==