// 영상 정보는 이 파일에서 관리합니다.
// 사진 저장 폴더: public/videos/ (코드에는 /videos/파일명.png)
// 한 영상을 추가할 때 아래 형식을 해당 분류의 [ ] 안에 복사하세요.
// { image: '/videos/nutrition-01.png', title: '영상 제목', channel: '채널명', time: '05:30', url: 'https://www.youtube.com/watch?v=실제영상ID' },

export const videoCategories = [
  { id: 'glucose', label: '혈당 관리' },
  { id: 'nutrition', label: '식단/영양' },
  { id: 'exercise', label: '운동' },
  { id: 'medicine', label: '약, 치료' },
  { id: 'daily', label: '일상' },
]

export const videoData = {
  glucose: [
    { image: '/video-01.png', title: '인슐린은 무엇일까? 당뇨병이 생기는 이유', channel: 'KBS 생로병사의 비밀', time: '00:25', url: 'https://www.youtube.com/watch?v=uVy_HnWh4vU' },
    { image: '/video-02.png', title: '혈당관리! 당뇨병 관리에서 가장 중요합니다. 혈당조절 잘 하고 계신가요?', channel: '굿닥터인부산', time: '39:53', url: 'https://www.youtube.com/watch?v=K3QllWYHyC8' },
    { image: '/video-03.png', title: '임신당뇨병, 건강한 혈당 조절법', channel: '당뇨병의 정석', time: '09:28', url: 'https://www.youtube.com/watch?v=4PNv4AxZEJs' },
    { image: '/video-04.png', title: '당뇨병의 원인과 증상 / 궁금증 해결', channel: '길병원TV', time: '50:26', url: 'https://www.youtube.com/watch?v=wcKLKODazrE' },
    { image: '/video-05.png', title: '당뇨병 치료를 위해 앞으로 해야할 것은?', channel: '당뇨병의 정석', time: '09:42', url: 'https://www.youtube.com/watch?v=epVuSuxApcs' },
    { image: '/video-06.png', title: '당뇨병, 어떤 경우 완치가 가능한가요?', channel: '서울대병원tv', time: '15:11', url: 'https://www.youtube.com/watch?v=78SpY4RXPok' },
  ],
  nutrition: [
    // 식단/영양 영상 추가

  {image: '/videos/nutrition-01.png',
    title: '식후 혈당 폭등 STOP! 배고픈 당뇨식은 옛말! 당뇨를 이긴 3가지 식사 원칙은?',
    channel: 'KBS 생로병사의 비밀',
    time: '45:34',
    url: 'https://www.youtube.com/watch?v=fb0CHf6zgMA&t=2s'
  },
{image: '/videos/nutrition-02.png',
    title: '당뇨 식단... 뭘 알아야 해먹죠😥 "당뇨환자"를 위한 봄맞이 산뜻한 채소 가득한 "비빔국수" 만드는 법!',
    channel: '아주대병원TV',
    time: '09:18',
    url: 'https://www.youtube.com/watch?v=nb2C1DVzymI'
  },
{image: '/videos/nutrition-03.png',
    title: '혈당 스파이크 잡는법★ 영양사의 당뇨 아침식단 TOP5',
    channel: '당뇨 인생극장',
    time: '09:03',
    url: 'https://www.youtube.com/watch?v=n_Fa9AN42iM'
  },
{image: '/videos/nutrition-04.png',
    title: '당뇨 환자 아침 공복에 좋은 음식 l 당뇨 환자 아침 식사 방법 총 정리 l 닥터딩요',
    channel: '닥터딩요',
    time: '29:38',
    url: 'https://www.youtube.com/watch?v=FihLathwM3Y&t=55s'
  },
{image: '/videos/nutrition-05.png',
    title: '당뇨 혈당 낮추는 영양소들 간단 정리',
    channel: '닥터조의 건강이야기',
    time: '11:03',
    url: 'https://www.youtube.com/watch?v=nnxcLamzRSc'
  },
{image: '/videos/nutrition-06.png',
    title: '혈당이 뚝 떨어집니다. 당뇨에 좋은 최고의 밥. 당뇨밥 만들기 [정라레]',
    channel: '정세연의 라이프연구소',
    time: '12:39',
    url: 'https://www.youtube.com/watch?v=LSxYd__rh4g'
  }





  ],
  exercise: [
    // 운동 영상 추가
    {image: '/videos/exercise-01.png',
    title: '당뇨병 필수 시청! 식후 혈당 잡는 5분 운동,지금 알려드립니다!',
    channel: '건강의학전문채널 하이닥',
    time: '05:38',
    url: 'https://www.youtube.com/watch?v=kKHxhFA_rr8'
  },
   {image: '/videos/exercise-02.png',
    title: '(ENG/CN)당뇨환자는 왜 운동을 해야만 하는걸까?',
    channel: '닥터케이 김지은',
    time: '14:42',
    url: 'https://www.youtube.com/watch?v=M6SncX2qGV8&t=65s'
  },
   {image: '/videos/exercise-03.png',
    title: '당뇨인 이거 하나로 혈당관리 하세요!! 하루 10분 운동!! (feat.아령)',
    channel: '당뇨병의 정석',
    time: '11:12',
    url: 'https://www.youtube.com/watch?v=2dogjT4kHWg'
  },
   {image: '/videos/exercise-04.png',
    title: '"인슐린 투여량이 절반으로 줄었습니다" 당뇨를 이긴 사람들의 운동 원칙 I KBS 20181107 방송',
    channel: 'KBS 생로병사의 비밀',
    time: '45:43',
    url: 'https://www.youtube.com/watch?v=bQ6ucwpNGXw'
  },
   {image: '/videos/exercise-05.png',
    title: '"호르몬의 대가" 안철우 교수가 알려주는 꾸준히 운동해서 젊음 되찾는 법',
    channel: 'EBS건강',
    time: '21:56',
    url: 'https://www.youtube.com/watch?v=v1_bx9ptoKA'
  }, {image: '/videos/exercise-06.png',
    title: '당뇨병을 예방하려면 꼭 해야되는 이 운동! 하루 7분하면 정상 혈당 됩니다!',
    channel: '인간미 넘치는 건강멘토',
    time: '16:05',
    url: 'https://www.youtube.com/watch?v=BaldiszhnZw'
  }


  ],
  medicine: [
    // 약, 치료 영상 추가
    {image: '/videos/medicine-01.png',
    title: '심부전까지 치료하는 당뇨약 (KBS 20221005 방송)]',
    channel: 'KBS 생로병사의 비밀',
    time: '09:11',
    url: 'https://www.youtube.com/watch?v=JlTQM86qBG8'
  },
    {image: '/videos/medicine-02.png',
    title: '당뇨환자라면 내가 무슨 약을 먹는지 알아야 합니다! 당뇨약의 모든 것',
    channel: '굿라이프',
    time: '33:35',
    url: 'https://www.youtube.com/watch?v=hQNGdbaOH0I'
  },
    {image: '/videos/medicine-03.png',
    title: '당뇨병약 복용하고 있다면 꼭 확인하세요 [약의 작용 vs 부작용]',
    channel: '분당서울대학교병원',
    time: '22:00',
    url: 'https://www.youtube.com/watch?v=lM9nj0KSWQo'
  },
    {image: '/videos/medicine-04.png',
    title: '당뇨병 환자 신장 건강 지키기, 약물치료와 적극적인 식이조절은 필수',
    channel: '헬스조선 Health Chosun',
    time: '19:43',
    url: 'https://www.youtube.com/watch?v=mkDvVUusq7c'
  },
    {image: '/videos/medicine-05.png',
    title: '내게 맞는 당뇨병 약이 따로 있다?!ㅣ동아아산건강강좌',
    channel: '서울아산병원',
    time: '11:27',
    url: 'https://www.youtube.com/watch?v=51kDegIzaVs&t=349s'
  },
    {image: '/videos/medicine-06.png',
    title: '당뇨병과 올바른 약 복용방법 / 영남대병원 약사 박정규, 정진희PD',
    channel: '의학채널 비온뒤',
    time: '54:36',
    url: 'https://www.youtube.com/watch?v=KM7IKr03kcM'
  },

  ],
  daily: [
    // 일상 영상 추가
    {image: '/videos/daily-01.png',
    title: 'Vlog. | 취뽀하고 받은 채용 검진에서 당뇨 확진 받은 썰 푼다,,, | 혈당 🩸 관리하는 당뇨 환자 브이로그',
    channel: '현지알지 HYUNJI',
    time: '13:14',
    url: 'https://www.youtube.com/watch?v=OT4GWayB9so'
  },
   {image: '/videos/daily-02.png',
    title: '[전당뇨vlog] | 당뇨인들은 아무약이나 먹으면 안된다 | 연속혈당측정기 제거하기',
    channel: '내당NEADANG',
    time: '14:43',
    url: 'https://www.youtube.com/watch?v=yrp5aq28u5o'
  },
   {image: '/videos/daily-03.png',
    title: '어느 날 급성 당뇨 진단받고 휴학생 된 VLOG (당뇨 브이로그 #1)',
    channel: '예당 YEDANG',
    time: '08:29',
    url: 'https://www.youtube.com/watch?v=1bDRLVYlphw'
  },
   {image: '/videos/daily-04.png',
    title: '당뇨 브이로그 EP. 25) 그렇게 먹고 혈당 유지 됨? 쌀국수 + 아이스크림 + 케이크까지!',
    channel: '제리풀 JERRYFUL LIFE',
    time: '13:56',
    url: 'https://www.youtube.com/watch?v=BqNYa6QTpmY'
  },
   {image: '/videos/daily-05.png',
    title: '당뇨보다 스트레스 관리하는 게 더 어려워요 1형당뇨 20년차 호두얌 대표 이슬기 2부',
    channel: '당뇨청년 나당식',
    time: '33:05',
    url: 'https://www.youtube.com/watch?v=1LElRSbijUk'
  },
   {image: '/videos/daily-06.png',
    title: '[3일브이로그] 당화혈색소 6 아래가 목표입니다만/관리와 함께 시작된 운동지옥/당뇨브이로그',
    channel: '달의 오늘',
    time: '16:40',
    url: 'https://www.youtube.com/watch?v=FOAaJstE6q0&t=34s'
  }

  ],
}
