export const APIGlobalConfig = {
  getAgentUrl: 'Guid/GetUserLikeNoSite?emp_name={emp_name}',
  /**
   * URL
   * 上传图片，获得返回的url
   * post { "PICTURE":"Base64 String..." }
   * 2017-09-30
   * @static
   */
  uploadPicture: 'IPQA/UploadPicture',

  getSelfPrivilege: 'Guid/GetUserFunctions?moduleID={moduleID}',

  getAllTips: 'users/tips',
  uploadError: 'utils/logs',

  loginUrl: 'global/login',
  // static loginUrl = 'http://10.86.3.57:8082/global/login';
};