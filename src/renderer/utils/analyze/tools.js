/**
 * @description: 绘制渐变色
 * @param canvasCtx  canvas元素
 * @param width canvas的宽度
 * @param colors 颜色列表
 * @return gradient 渐变色
 */
export const getGradient = (canvasCtx, width, colors) => {
	const gradient = canvasCtx.createLinearGradient(0, 0, width, 0);
	const length = colors.length;
	const percent = 100 / length;
	for (let i = 0; i < colors.length; i++) {
		gradient.addColorStop((percent * i) / 100, colors[i]);
	}
	return gradient;
};
