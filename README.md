# 프로젝트 세팅 정보

### 1. ESLINT, PRETTIER 설정

NEXT JS를 사용하는 경우, ESLINT 는 자동으로 설정 되어 있지만 추가적인 내용을 포함하기 위해 아래 내용을 설명한다. [참고 블로그](https://velog.io/@kuwon15/NextJS-13-Prettier-ESLint-Recoil-%EC%B4%88%EA%B8%B0-%EC%84%B8%ED%8C%85-%ED%95%98%EA%B8%B0)

  <details>
    <summary>세팅방법 접기/펼치기</summary>
    <div markdown="1">

- ### vscode 에서 tab 넓이 2칸으로 변경
  Cmd + Shift + p => 입력창에 tab 이라고 입력 => Change tab display size 2로 변경
- ### prettier 설치

  ```Shell
  # 개발 모드 prettier 설치
  yarn add prettier -d

  # 설정 파일 생성 및 세팅
  echo -e '{\n  "semi": false,\n  "singleQuote": true,\n  "trailingComma": "all",\n  "useTabs": false,\n  "tabWidth": 2,\n  "printWidth": 80,\n  "arrowParens": "always"\n}' > .prettierrc

  ```

- ### prettier .gitignore 파일 적용 해제

  ```JSON
  "scripts": {
    ...
    "format": "prettier --check --ignore-path .gitignore .",
    "format:fix": "prettier --write --ignore-path .gitignore ."
  },

  ```

- ### ESLint 세팅
- airbnb : airbnb사에서 쓰고 있는 ESLint 규칙이 포함되어있는 확장이다. 다음 명령어로 설치할 수 있다.

  ```
  yarn add eslint-config-airbnb -d
  ```

- airbnb-typescript : airbnb 규칙을 typescript에서도 사용하기 위한 확장이다. typescript는 parsing이 필요하기 때문에 @typescript-eslint/eslint-plugin @typescript-eslint/parser 들과 함께 설치 해야 하며 "parserOptions"를 설정해야 한다.

  ```
  yarn add eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin@^6.0.0 @typescript-eslint/parser@^6.0.0 -d
  ```

- prettier : Prettier과의 충돌을 방지하는 확장이다. Prettier를 따로 사용하고 있기에 설정이 필요하였다. 다음 명령어로 설치할 수 있다.

  ```
  yarn add eslint-config-prettier -d
  ```

  또한 "react/react-in-jsx-scope" 규칙을 꺼버린 것을 볼 수 있다. 이는 jsx, tsx 파일에 React를 import하지 않으면 나타나는 에러인데 최신 React나 NextJS에서는 React를 import 하지 않아도 되기 때문에 규칙을 꺼버렸다.

    </div>
  </details>

### 2. API 호출 로직 정리

- 서버사이드 렌더링 시 조회 되었던 값을 클라이언트 사이드에서도 사용하기 위해 사용한다.

  [참고링크1](https://soobing.github.io/react/server-rendering-and-react-query/),
  [참고링크2](https://soobing.github.io/react/next-app-router-react-query/)

### 3. 아토믹 디자인 패턴을 활용한 패키지 구조 정리

- 공통으로 사용하는 컴포넌트와 이외의 것들은 app 폴더 바깥에 만들고, 각 페이지별로 사용하는 컴포넌트 이외의 것들은 안으로 넣었다.

  맞는지는 모르겠지만 DDD와 아토믹 디자인 패턴 섞어 적용해보았다.

  ```Shell
  ├── app # app 하위 파일은 라우팅이 되며 (DDD 및 아토믹 디자인 참하여 폴드 구조화 하였다.)
  │   ├── (route) # 라우팅 그룹을 나눌 수 있다 ex) (admin), (user)
  │   ├── favicon.ico
  │   ├── globals.css
  │   ├── layout.tsx
  │   ├── page.tsx
  │   └── posts # app 하위에 폴더를 만들게 되면 라우팅이 된다. ex) /posts
  │       ├── _components # 폴더 이름 앞에 "_" 붙이 게되면 경로로 인식하지 않는다.
  │       │   ├── molecules
  │       │   │   └── index.ts
  │       │   └── organisms
  │       │       └── index.ts
  │       ├── _hooks
  │       └── _service
  ├── components # 공통으로 사용될 컴포넌트를 정의 하며, 아토믹디자인을 참고 하였다.
  │   ├── atoms # 더이상 쪼개어 질 수 없는 컴포넌트를 모아둔다.
  │   │   ├── Button.tsx
  │   │   ├── CheckBox.tsx
  │   │   ├── Div.tsx
  │   │   ├── DivColumn.tsx
  │   │   ├── DivGrid.tsx
  │   │   ├── DivRow.tsx
  │   │   ├── Icons.ts
  │   │   ├── InputComponent.tsx
  │   │   ├── LoadingSpinner.tsx
  │   │   ├── MainColumn.tsx
  │   │   ├── RadioButton.tsx
  │   │   ├── RadioButtonWithLabel.tsx
  │   │   ├── SelectBox.tsx
  │   │   ├── TextAreaComponent.tsx
  │   │   ├── Texts.tsx
  │   │   └── index.ts
  │   ├── molecules # atoms 집합 컴포넌트 1개의 기능만을 갖는다. ex) 검색창
  │   │   └── index.ts
  │   ├── organisms # atoms, molecules를 조합한 집합 컴포넌트 여러개의 기능을 갖는다. ex) 검색창을 포함한 헤더
  │   │   └── index.ts
  │   └── templates # 큰 틀을 잡는데 사용 ex) 헤더만 있는 페에지, 헤더푸터를 포함한 페이지, 푸터만 있는 페이지 등등..
  │   │   └── index.ts
  │   └── cn.ts
  ├── hooks
  │   └── useReactQuery.tsx
  ├── service
  ├── types
  └── utils
  ```

  [참고링크1 - 카카오디벨로퍼](https://fe-developers.kakaoent.com/2022/220505-how-page-part-use-atomic-design-system/)

  [참고링크2 - 아토믹디자인과 도메인주도 설계가 바탕이 되는 디자인 시스템](https://brunch.co.kr/@designsystemguy/3)

### 4. 테일윈드, tailwind-merge, cva, clsx를 활용한 리액트 컴포넌트 관리

- 다음 적용사항은 테일윈드의 조건식 넣기 까다로운 불편함과 코드가 지저분해지는 문제를 해결하기 위해 적용하였습니다.

1. 라이브러 설치

- clsx: 조건부 렌더링을 사용하기 위해 추가
- cva: 스타일 클래스를 지정해서 사용가능
- tailwind-merge: props로 받아온 className은 적용되지 않지만 tailwind-merge 라이브러리를 사용하면 가능하여 추가

[참고링크 - tailwind를 이용한 효율적인(?) React Component 관리 tailwind-merge cva clsx 파헤치기](https://velog.io/@qwzx16/tailwind%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9D%B8-React-Component-%EA%B4%80%EB%A6%ACtailwind-merge-cva-clsx-%ED%8C%8C%ED%97%A4%EC%B9%98%EA%B8%B0)
