const webSocket = require('ws');
const { v1: uuidv1 } = require('uuid'); // v1: 타임스탬프(시간) 기준으로 생성
const userController = require('../controller/userController');

module.exports = () => {
    const wss = new webSocket.Server({ port: 8000 }); // 웹 소켓의 포트는 별도로 변경이 가능하다.

    // 클라이언트가 접속 시
    wss.on('connection', function connection(ws) {

        // 클라이언트가 메시지를 보내면 실행될 함수
        ws.on('message', function message(data) {
            let userData = JSON.parse(data);
            console.log(userData);
            if (userData.type === 1) { // 최초 접속
                ws.uuid = uuidv1();
                ws.userNumber = userData.userInfo.userNumber;
                console.log(`[${ws.userNumber}] 사용자 접속`);
            }

            // 사용자 정보
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
            clearInterval(wsInterval);
        });

        let count = 1;
        let newDate = new Date();
        newDate.setHours(newDate.getHours() + 9); // 한국 시간으로 설정
        let dayOfConnectedTime = newDate.getDate(); // 연결된 시각의 일
        let connectedTime = newDate.toString(); // 연결된 시각

        let dayOfcurrentTime // 현재 시각의 일
        let currentTime; // 현재 시각
        wsInterval = setInterval(() => {
            if (ws.readyState === ws.OPEN) {
                newDate = new Date();
                newDate.setHours(newDate.getHours() + 9); // 한국 시간으로 설정
                dayOfcurrentTime = newDate.getDate();
                currentTime = newDate.toString();

                if (dayOfConnectedTime !== dayOfcurrentTime) { // 연결된 시각의 날짜와 현재 시각의 날짜의 차이가 1일 차이일 때
                    // 연결된 시각을 현재 시각으로 다시 재설정                    
                    newDate = new Date();
                    newDate.setHours(newDate.getHours() + 9);
                    dayOfConnectedTime = newDate.getDate();
                    connectedTime = newDate.toString();

                    // 로그 테이블에 해당 사용자의 로그를 찍어 준다.
                    ws.send("Log data has been inserted.");
                }

                ws.send(`서버에서 ${count++}번 째 메시지: [연결된 시각: ${connectedTime} | 현재 시각: ${currentTime}] [연결된 시각의 일: ${dayOfConnectedTime} | 현재 시각의 일: ${dayOfcurrentTime}]`);
            }
        }, 3000);
    });
};