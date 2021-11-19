import { outputArea_el, turnIndentedLinesIntoArray } from "./indentedLinesToArray.js";

export let inputTextArea_el;

export function start_inputTextArea() {
	inputTextArea_el = document.getElementById('inputTextBox');
	inputTextAreaInit();
	inputToOutput();
}

function inputTextAreaInit() {
	inputTextArea_el.addEventListener('keydown', function (e) {
		if (e.key == 'Tab') {
			e.preventDefault();
			var start = this.selectionStart;
			var end = this.selectionEnd;

			// set textarea value to: text before caret + tab + text after caret
			this.value = this.value.substring(0, start) +
				"\t" + this.value.substring(end);

			// put caret at right position again
			this.selectionStart =
				this.selectionEnd = start + 1;
			
			inputToOutput();
		}
	});

	inputTextArea_el.addEventListener('input', function (e) {
		inputToOutput();
	});
}

function inputToOutput() {
	const arr = turnIndentedLinesIntoArray(inputTextArea_el.value);
	const asString = JSON.stringify(arr, null, 4);
	console.log(inputTextArea_el.value, arr, asString);
	outputArea_el.innerHTML = asString;
}