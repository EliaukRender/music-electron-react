import cloneDeep from 'lodash/cloneDeep';

const drawLightBars = ({ dataArray, canvasOptions, canvasCtx, width, height }) => {
	const list = Array.from(dataArray);
	const reverseList = cloneDeep(list).reverse();
	const doubleList = [...reverseList, ...list].filter((item, index) => index % 2 === 0).map((item) => item * 0.5);
	const count = doubleList.length > canvasOptions.maxFFTSize ? canvasOptions.count : doubleList.length;
	const percent = parseInt((height / 300) * 2, 10);
	canvasCtx.clearRect(0, 0, width, height); // 清除之前的绘制
	canvasCtx.fillStyle = canvasOptions.bgColor; // 设置背景颜色
	canvasCtx.fillRect(0, 0, width, height); // 绘制时的长度宽度
	const step = width / count;
	const barWidth = step - step / 4; // bar宽度
	let barHeight;
	let x = 0;

	// 添加阴影效果
	canvasCtx.shadowColor = '#F5DABC';
	canvasCtx.shadowBlur = 50; // 发光的模糊程度
	canvasCtx.shadowOffsetX = 5; // X 方向的阴影偏移量
	canvasCtx.shadowOffsetY = 10; // Y 方向的阴影偏移量

	// 遍历绘制
	for (let i = 0; i < count; i++) {
		barHeight = doubleList[i];
		canvasCtx.fillStyle = canvasOptions.gradient;
		canvasCtx.fillRect(x, height - barHeight, barWidth, barHeight * percent);
		x += step;
	}

	// 清除阴影属性，避免影响其他绘制
	canvasCtx.shadowColor = 'transparent';
	canvasCtx.shadowBlur = 0;
};

export default drawLightBars;
