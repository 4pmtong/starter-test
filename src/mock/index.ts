import Mock from 'mockjs';

interface IBody<T> {
  [propName: string]: T;
}

Mock.mock(/\/api\/common\/get_user_info/, <T>({ body }: IBody<T>) => {
  if (body) {
    return {
      code: 200,
      success: true,
      data: {
        name: 'Songyan Ho',
        email: 'songyan.ho@shopee.com',
        region_list: ['ID', 'MY', 'PH', 'SG', 'TH', 'TW', 'VN', 'All']
      },
      message: 'success'
    };
  } else {
    return {
      code: 401,
      message: '未登录'
    };
  }
});

export default Mock;
