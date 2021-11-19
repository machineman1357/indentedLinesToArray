export let outputArea_el;

export function init_indentedLinesToArray() {
	outputArea_el = document.querySelector("#outputArea");
}

export function turnIndentedLinesIntoArray(indentedLines) {
	const depthLevels = turnIndentedLinesIntoDepthLevels(indentedLines, true);
	const arr = turnArrDepthLevelsIntoArrayOrObject(depthLevels);

	return arr;
}

function turnIndentedLinesIntoDepthLevels(indentedLines, is_logs) {
	const linesSplitByTabs = getArrayOfLinesSplitByTabsFromIndentedLines(indentedLines);
	console.log(linesSplitByTabs);

	const depthLevels = [];
	const depthLevelsCounter = [];
	let lastDepthLevel = 0;
	for (let i = 0, len = linesSplitByTabs.length; i < len; i++) {
		const lineSplitByTabs = linesSplitByTabs[i];
		const depthLevel = lineSplitByTabs.length - 1;
		const addition = lineSplitByTabs[depthLevel];

		if(depthLevelsCounter[depthLevel] === undefined) {
			depthLevelsCounter[depthLevel] = 0;
		} else {
			if(depthLevel < lastDepthLevel) {
				// this means we jumped up one depth, and thus have to reset all lower depth levels (including current)
				if(is_logs) console.log(JSON.stringify(depthLevelsCounter, null, 4));
				depthLevelsCounter.splice(depthLevel + 1);
				depthLevelsCounter[depthLevel] += 1; // increment current depth level
				if(is_logs) console.log(JSON.stringify(depthLevelsCounter, null, 4));
			} else {
				depthLevelsCounter[depthLevel] += 1;
			}
		}

		lastDepthLevel = depthLevel;

		depthLevels.push([[...depthLevelsCounter], addition]);
	}
	if(is_logs) console.log(depthLevels);

	return depthLevels;
}

function getArrayOfLinesSplitByTabsFromIndentedLines(indentedLines) {
	const splitByLines = indentedLines.split("\n");

	const linesSplitByTabs = [];
	for (let i = 0, len = splitByLines.length; i < len; i++) {
		const line = splitByLines[i];
		const lineSplitByTabs = line.split("\t");
		linesSplitByTabs.push(lineSplitByTabs);
	}

	// const res = addArrayToArrayAtDepthLevel([], [0, 1], "Welcome to Next.js");
	// console.log(JSON.stringify(res, null, 4));

	return linesSplitByTabs;
}

function turnArrDepthLevelsIntoArrayOrObject (arraysOfDepthLevels, logs) {
	const arr = [];
	for (let i = 0, len = arraysOfDepthLevels.length; i < len; i++) {
		const arrayOfDepthLevels = arraysOfDepthLevels[i];
		const [depthLevels, addition] = arrayOfDepthLevels;
		
		if(logs) {
			console.log(
				"Depth Level:\n" +
				"\t" + depthLevels + "\n" +
				"Addition:\n" +
				"\t" +addition
			);
		}

		const res = addArrayToArrayAtDepthLevel(arr, depthLevels, addition);
		if(logs) console.log(JSON.stringify(res, null, 4));
	}

	if(logs) console.log(JSON.stringify(arr, null, 4));
	if(logs) console.log(arr);

	return arr;
}

function addArrayToArrayAtDepthLevel(targetArr, depthLevels, addition, currentArr, currentDepthLevelIndex = 0) {
	const currentDepthLevel = depthLevels[currentDepthLevelIndex];

	if(currentDepthLevelIndex === 0) {
		currentArr = targetArr;
	}

	if(currentDepthLevelIndex === depthLevels.length - 1) {
		const newArr =
		[
			addition,
			[]
		];

		currentArr[currentDepthLevel] = newArr;
	} else {
		currentArr = currentArr[currentDepthLevel];
		
	}

	currentDepthLevelIndex += 1;

	if(currentDepthLevelIndex === depthLevels.length) {
		return targetArr;
	} else {
		return addArrayToArrayAtDepthLevel(targetArr, depthLevels, addition, currentArr[1], currentDepthLevelIndex);
	}
}