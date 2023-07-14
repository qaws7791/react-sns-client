# React LEVEL 4 Assignment

🔶react와 react-query를 사용한 react app 만들기



## Features

- 글 목록 조회
- 단일 글 조회
- 글 생성
- 글 수정
- 글 삭제

### Requirement

- [x] use Dynamic Routing
- [x] use Custom Hook
- [x] Form Validation
  - 글 작성
  - 회원 가입
- [x] use Button Component
- [x] Redux devtool enabled only in development environments
  https://redux-toolkit.js.org/api/configureStore
  https://ko.vitejs.dev/guide/env-and-mode.html
- [x] Hide console.log in production environment
  https://esbuild.github.io/api/#drop
- [x] use Environment Variable
  https://ko.vitejs.dev/guide/env-and-mode.html#env-variables



## API Specification

| 기능         | url                | method | request                                                      | response                                                     |
| ------------ | ------------------ | ------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 글 생성      | /api/post          | POST   | Authorization:Bearer [token]<br />Body: {"content": "new Post"} | {<br/>    "post": {<br/>        "content": "new post",<br/>        "createdAt": 1688985563947,<br/>        "userId": "64ab9e4e82886aef265589fa",<br/>        "id": "64abdfdb5f41d100ff161426",<br/>        "__v": 0<br/>    }<br/>} |
| 글 목록 조회 | /api/post          | GET    |                                                              | {<br/>    "post": [<br/>        {<br/>            "_id": "64abda6c7a0b06b219d56357",<br/>            "content": "11",<br/>            "createdAt": 1688984172414,<br/>            "userId": {<br/>                "_id": "64ab9e4e82886aef265589fa",<br/>                "name": "test",<br/>                "id": "64ab9e4e82886aef265589fa"<br/>            },<br/>            "__v": 0,<br/>            "id": "64abda6c7a0b06b219d56357"<br/>        },<br/>        {<br/>            "_id": "64abd7da7a0b06b219d5633c",<br/>            "content": "날짜 테스트",<br/>            "createdAt": 1688983514081,<br/>            "userId": {<br/>                "_id": "64ab9e4e82886aef265589fa",<br/>                "name": "test",<br/>                "id": "64ab9e4e82886aef265589fa"<br/>            },<br/>            "__v": 0,<br/>            "id": "64abd7da7a0b06b219d5633c"<br/>        }<br/>    ]<br/>} |
| 글 수정      | /api/post/[postId] | PATCH  | Authorization:Bearer [token]<br />Body: { "content": "updated post"} | {<br/>    "post": {<br/>        "_id": "64abdfdb5f41d100ff161426",<br/>        "content": "updated post",<br/>        "createdAt": 1688985563947,<br/>        "userId": "64ab9e4e82886aef265589fa",<br/>        "__v": 0,<br/>        "id": "64abdfdb5f41d100ff161426"<br/>    }<br/>} |
| 글 삭제      | /api/post/[postId] | DELETE | Authorization:Bearer [token]                                 | {<br/>    "message": "글 삭제 성공"<br/>}                    |
| 단일 글 조회 | /api/post/[postId] | GET    |                                                              | {<br/>    "post": {<br/>        "_id": "64abda6c7a0b06b219d56357",<br/>        "content": "new post",<br/>        "createdAt": 1688984172414,<br/>        "userId": {<br/>            "_id": "64ab9e4e82886aef265589fa",<br/>            "name": "test",<br/>            "id": "64ab9e4e82886aef265589fa"<br/>        },<br/>        "__v": 0,<br/>        "id": "64abda6c7a0b06b219d56357"<br/>    }<br/>} |
|              |                    |        |                                                              |                                                              |
|              |                    |        |                                                              |                                                              |

