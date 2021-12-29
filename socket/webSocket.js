const webSocket = require('ws');
const { v1: uuidv1 } = require('uuid'); // v1: 타임스탬프(시간) 기준으로 생성
const userController = require('../controller/userController');

module.exports = () => {
    const wss = new webSocket.Server({ port: 8000 }); // 웹 소켓의 포트는 별도로 변경이 가능하다.

    // 클라이언트가 접속 시
    wss.on('connection', function connection(ws) {

        // 클라이언트가 메시지를 보내면 실행될 함수
        ws.on('message', function message(data) {
            let userInfo = JSON.parse(data);
            ws.uuid = uuidv1();
            ws.userNumber = userInfo.userNumber;
            console.log(ws.userNumber + " 클라이언트 접속");

            userController.getUserInfo(ws.userNumber)
            .then((rows) => {
                console.log(rows);
            })
            .catch((err) => {
                console.log(err);
            })
        });

        // 클라이언트에게 메시지를 전송
        ws.send("Hi");

        // 클라이언트가 연결을 종료하면 실행될 함수
        ws.on('close', function () {
            console.log(ws.userNumber + " 클라이언트 접속 종료");
        });
    });
};