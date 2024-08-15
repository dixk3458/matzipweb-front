const messages = {
  SUCCESS_SIGNUP: '회원가입을 축하합니다.',
  SUCCESS_SIGNIN: '로그인을 성공적으로 처리했습니다.',
  NOT_SELECTED_LOCATION: '선택된 위치가 없습니다. 위치를 선택해주세요.',
  CAN_NOT_GET_GEOLOCATION: '위치정보를 가져오는 도중 실패했습니다.',
  NOT_SUPPORTED_GEOLOCATION: '위치서비스를 지원하지 않습니다.',
  CAN_NOT_GET_ADDRESS: '주소를 가져오는 도중 실패했습니다.',
  INVALID_VALUE: '유효하지 않은 값입니다.',
  EXCEEDED_FILE_COUNT: '파일 개수를 초과했습니다. (최대 5개)',
  CAN_NOT_UPDATE_MARKER_CATEGORY: '카테고리를 업데이트하는 도중 실패했습니다.',
  CONFIRM_DELETE: '정말로 포스트를 삭제하시겠습니까?',
} as const;

export default messages;
