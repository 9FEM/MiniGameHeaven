//REVIEW 현재 중앙 화면만 클릭해야 모달 등장으로 해야 하는데 centerCell 구할때
// getCetnerCell 함수 손보고, 바뀔때마다 centerCount 변수로 갖고 있는걸로하면 접근하기 쉬움
// const $listItem = document.querySelector(".list-item");
// const containerList = Array.from($listItem.children);
// console.log(containerList);
// 그래서 일단 셀 누구든 클릭하면 모달 뜨는 것으로 설정.

//REVIEW
// 1. 중앙만 선택 가능 || 뭐든 선택 가능 (선택한 셀 뜨기)
// 2. 셀 선택 후 버튼 필요 (선택 시 box shadow 같은 것으로 표시) || 그냥 셀 한번 누르면 GO


// 변수 하나도 같이 쓰고 하려면 결국 모듈화를 해야할 듯.
// 중앙셀 찾기 함수 처럼 함수를 같이 쓸게 아니라면 공용 변수는 한 객체에 모아두고 다 거기로 요청하게끔.


//REVIEW
// 클릭하면 클릭한 애가 el이라서 바로 해당 요소 확인 가능
// 다만 현재는 클릭 시 돌아가게 되니까 해당 요소 위치가 돌아가버리는데
// 중간은 클릭 시 실행(회전 X) 양 사이드 셀만 클릭 가능 클릭 시 해당 셀이 중앙으로는 어떨까?

const $main = document.querySelector('#app');

containerList.forEach((el) => {
	el.addEventListener('click', () => {
		console.log(el);
		onModal(el);
	})
});

function setGameScreen() {
	let newGameScreen = document.createElement('div');
	let closeGameBtn = document.createElement('button');
	closeGameBtn.className = 'game-close-btn';
	closeGameBtn.type = 'button';
	closeGameBtn.textContent = 'X';
	newGameScreen.appendChild(closeGameBtn);
	newGameScreen.classList.add('modal-screen', 'game-screen');
	$main.appendChild(newGameScreen);
	document.querySelector('.game-close-btn').addEventListener('click', offGame);
	offModal();
}

function gameFadeOff() {
	const $gameScreen = document.querySelector('.game-screen');
	$gameScreen.style.opacity = 1;
	$gameScreen.remove();
}

function offGame() {
	const $gameScreen = document.querySelector('.game-screen');
	$gameScreen.style.opacity = 0;
	setTimeout(gameFadeOff,3000);
	autoRotateMouseCheck = true;
}

function onModal(screen) {
	autoRotateMouseCheck = false;

	let newModal = document.createElement('div');
	let closeModalBtn = document.createElement('button');
	closeModalBtn.className = 'modal-close-btn';
	closeModalBtn.type = 'button';
	closeModalBtn.textContent = 'X';
	newModal.appendChild(closeModalBtn);
	newModal.className = 'modal-screen';
	$main.appendChild(newModal);
	setTimeout(setModalOn,10);
	setTimeout(setGameScreen, 1100);
}

function setModalOn() {
	document.querySelector('.modal-screen').style.transition = 'all 1s';
	document.querySelector('.modal-screen').style.opacity = 1;
	document.querySelector('.modal-close-btn').addEventListener('click', offModal);
}

function setModalOff() {
	const $forDel = document.querySelector('.modal-screen');
	$forDel.remove();
}

function offModal() {
	const $forDel = document.querySelector('.modal-screen');
	$forDel.style.opacity = 0;
	setTimeout(setModalOff,3000);
	autoRotateMouseCheck = true;
}