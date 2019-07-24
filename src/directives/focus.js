import Vue from 'vue';

Vue.directive('focus', {
	inserted (el) {
		const tagNames = [ 'input', 'textarea' ];
		let inputEl = tagNames.includes(el.tagName.toLowerCase())
			? el
			: el.querySelector('input, textarea');
		inputEl.focus();
	}
});