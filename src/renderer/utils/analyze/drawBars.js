import cloneDeep from 'lodash/cloneDeep';

/**
 * @description: 绘制柱状图
 */
const drawBars = ({ dataArray, canvasOptions, canvasCtx, width, height }) => {
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

	// 遍历绘制
	for (let i = 0; i < count; i++) {
		barHeight = doubleList[i];
		canvasCtx.fillStyle = canvasOptions.gradient;
		canvasCtx.fillRect(x, height - barHeight, barWidth, barHeight * percent);
		x += step;
	}
};

export default drawBars;
